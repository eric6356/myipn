chrome.runtime.onInstalled.addListener(function() {
    var podcastQueue = new Array(20) //podcastQueue: [oldestPodcast, secondOldestPodcast, ... latestPodcast]
    var subscribedPrograms = ['weizhidao', 'popdispatch', 'bixiaguan', 'crazycapital', 'taiyilaile', 'kernelpanic', 'fashionmonster', 'yitianshijie', 'hardimage', 'bowuzhi', 'wuciyuan']
    chrome.storage.sync.set({
        podcastQueue: podcastQueue,
        subscribedPrograms: subscribedPrograms,
        notiEnabled: true,
        badgeEnabled: true
    }, function() {
        console.log('config initilized.')
    })
})

function parsePodcastItem(itemEL) {
    var item = {}
    for (var i = 0; i < itemEL.children.length; i++) {
        var childEL = itemEL.children[i]
        if (childEL.tagName === 'description') {
            item.description = childEL.textContent.trim()
            var el = document.createElement('div')
            el.innerHTML = item.description
            item.descriptionText = el.innerText
        } else {
            item[childEL.tagName] = childEL.innerHTML
        }
    }
    var splitTitle = item.title.split(' ')
    item.episode = parseInt(splitTitle[1].slice(1, -1))
    item.pureTitle = splitTitle[2]
    item.pubDate = new Date(item.pubDate).toJSON()
    item.program = item.link.split('/').slice(-2, -1)[0]
    return item
}

function isNewPodcast(podcast) {
    console.log(`judging: ${podcast.title}`)
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get({
            podcastQueue: []
        }, function(x) {
            // TODO: use binary search here
            for (var i = 0; i < x.podcastQueue.length; i++) {
                var storedPodcast = x.podcastQueue[i]
                if (!storedPodcast) {
                    console.log(`stored podcast is ${storedPodcast}`)
                    break
                }
                if (podcast.title === storedPodcast.title) {
                    console.log(`same as storedPodcast[${i}], break`)
                    resolve({
                        isNew: false,
                        indexInQueue: i,
                        storedPodcast: storedPodcast
                    })
                    return
                } else {
                    console.log(`judging... ${podcast.title} !== ${storedPodcast.title}`)
                }
            }
            console.log(`podcast is new`)
            resolve({
                isNew: true
            })
        })
    })
}

function pushPodcasts(podcasts) {
    // podcasts: [latestPodcast, secondLatestPodcast, ... oldestPodcast]
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get('podcastQueue', function(x) {
            podcasts.slice().reverse().map(function(item) {
                x.podcastQueue.shift()
                x.podcastQueue.push({
                    title: item.title,
                    program: item.program,
                    episode: item.episode,
                    pureTitle: item.pureTitle,
                    pubDate: item.pubDate,
                    link: item.link,
                    listened: false
                })
                console.log(`item pushed: ${item.title}`)
            })
            chrome.storage.sync.set({
                podcastQueue: x.podcastQueue
            }, function() {
                resolve(podcasts)
            })
        })
    })
}

function notifyPodcastIfSubscribed(podcast) {
    return new Promise(function(resolve, reject) {
        chrome.storage.sync.get('subscribedPrograms', function(x) {
            if (x.subscribedPrograms.indexOf(podcast.program) !== -1) {
                var message = podcast.descriptionText.split('\n')[0]
                if (message.length > 20) {
                    message = message.slice(0, 17) + '...'
                }
                var opt = {
                    type: 'basic',
                    iconUrl: 'img/ipn_icons/' + ['icon', podcast.program, '300.png'].join('-'),
                    title: '#' + podcast.episode + ' ' + podcast.pureTitle,
                    message: message,
                    isClickable: true
                }
                chrome.notifications.create(podcast.title, opt, function() {
                    resolve(podcast)
                })
            }
        })
    })
}

var podcasts

function fetchAndUpdate(mute) {
    var parser = new DOMParser();
    fetch('http://ipn.li/feed')
        .then(function(response) {
            // get string from fetch request
            if (!response.ok) {
                throw Error(response.statusText)
            }
            return response.text()
        })
        .then(function(text) {
            // get podcasts
            var doc = parser.parseFromString(text, 'text/xml')
            var itemELs = doc.getElementsByTagName('item')
                // podcasts: [latestPodcast, secondLatestPodcast, ... oldestPodcast]
            podcasts = [].slice.call(itemELs).map(parsePodcastItem)
            var oldestPodcast = podcasts.slice(-1)[0]
            console.log(`oldestPodcast: ${oldestPodcast.title}`)
            return isNewPodcast(oldestPodcast)
        })
        .then(function(result) {
            var index = result.isNew ? podcasts.length : result.indexInQueue
            console.log(`index: ${index}, result: ${JSON.stringify(result)}`)
            var podcastsToPush = podcasts.slice(0, index)
            if (podcastsToPush.length) {
                return pushPodcasts(podcastsToPush)
            }
        })
        .then(function(podcasts) {
            if (podcasts !== undefined && !mute) {
                return Promise.all(podcasts.map(notifyPodcastIfSubscribed))
            }
        })
        .catch(err => console.log(err))
}

chrome.notifications.onClicked.addListener(function(title) {
    console.log(title)
    isNewPodcast({
            title: title
        })
        .then(function(result) {
            window.open(result.storedPodcast.link, '_blank')
            chrome.notifications.clear(title)
        })
})

chrome.storage.sync.get({
    notiEnabled: false
}, function(x) {
    if (x.notiEnabled) {
        console.log(`fetch and update for the first time at ${new Date()}`)
        fetchAndUpdate(true)
        chrome.alarms.create('fetch', {
            periodInMinutes: 10
        })
    }
})

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'fetch') {
        console.log(`fetch and update at ${new Date()}`)
        fetchAndUpdate()
    }
})

chrome.alarms.onAlarm.addListener(function(alarm) {
    if (alarm.name === 'fetch') {
        console.log(`fetch and update at ${new Date()}`)
        fetchAndUpdate()
    }
})
