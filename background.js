var ipnIconDict = {
  '壁下观': 'icon-bixiaguan-300.png',
  '博物志': 'icon-bowuzhi-300.png',
  '疯投圈': 'icon-crazycapital-300.png',
  '时尚怪物': 'icon-fashionmonster-300.png',
  '硬影像': 'icon-hardimage-300.png',
  '(Hi)story': 'icon-history-300.png',
  'IT公论': 'icon-itgonglun-300.png',
  '内核恐慌': 'icon-kernelpanic-300.png',
  '流行通信': 'icon-popdispatch-300.png',
  '太医来了': 'icon-taiyilaile-300.png',
  '無次元': 'icon-wcy-300.jpg',
  '味之道': 'icon-weizhidao-300.png',
  '选美': 'icon-xuanmei-300.png',
  '一天世界': 'icon-yitianshijie-300.png',
}

chrome.runtime.onInstalled.addListener(function () {
  var itemQueue = new Array(20)
  var subscribed = ['味之道', '流行通信', '壁下观看', '疯投圈', '太医来了', '内核恐慌', '时尚怪物', '一天世界', '硬影像', '博物志', '無次元']
  chrome.storage.sync.set({ itemQueue, subscribed }, function () { console.log('itemQueue initilized.') })
})

/*
itemQueue: [oldestItem, secondOldestItem, ... latestItem]
 */
function parseItem(itemEL) {
  var item = {}
  for (var i = 0; i < itemEL.children.length; i++) {
    var childEL = itemEL.children[i]
    if (childEL.tagName === 'description') {
      item.description = childEL.textContent.trim()
      var el = document.createElement('div')
      el.innerHTML = item.description
      item.descriptionText = el.innerText
    }
    else {
      item[childEL.tagName] = childEL.innerHTML
    }
  }
  var splitTitle = item.title.split(' ')
  item.podcast = splitTitle[0]
  item.episode = parseInt(splitTitle[1].slice(1, -1))
  item.pureTitle = splitTitle[2]
  item.pubDate = new Date(item.pubDate)
  return item
}

function isNewItem(item) {
  console.log(`judging: ${item.title}`)
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get({ itemQueue: [] }, function (x) {
      // TODO: use binary search here
      for (var i = 0; i < x.itemQueue.length; i++) {
        var storedItem = x.itemQueue[i]
        if (!storedItem) {
          console.log(`stored item is ${storedItem}`)
          break
        }
        if (item.title === storedItem.title) {
          console.log(`same as storedItem[${i}], break`)
          resolve({ isNew: false, indexInQueue: i, storedItem: storedItem })
          return
        }
        else {
          console.log(`judging... ${item.title} !== ${storedItem.title}`)
        }
      }
      console.log(`item is new`)
      resolve({ isNew: true })
    })
  })
}

function pushItems(items) {
  // items: [latestItem, secondLatestItem, ... oldestItem]
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get('itemQueue', function (x) {
      items.slice().reverse().map(function (item) {
        x.itemQueue.shift()
        x.itemQueue.push({
          title: item.title,
          pubDate: item.pubDate,
          link: item.link,
          read: false
        })
        console.log(`item pushed: ${item.title}`)
      })
      chrome.storage.sync.set({ itemQueue: x.itemQueue }, function () {
        resolve(items)
      })
    })
  })
}

function notifyItemIfSubscribed(item) {
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get('subscribed', function (x) {
      if (x.subscribed.indexOf(item.podcast) !== -1) {
        var message = item.descriptionText.split('\n')[0]
        if (message.length > 20) {
          message = message.slice(0, 17) + '...'
        }
        var opt = {
          type: 'basic',
          iconUrl: 'img/ipn_icons/' + ipnIconDict[item.podcast],
          title: '#' + item.episode + ' ' + item.pureTitle,
          message: message,
          isClickable: true
        }
        chrome.notifications.create(item.title, opt, function () {
          resolve(item)
        })
      }
    })
  })
}

var items
function fetchAndUpdate() {
  var parser = new DOMParser();
  fetch('http://ipn.li/feed')
    .then(function (response) {
      // get string from fetch request
      return response.text()
    })
    .then(function (text) {
      // get items
      var doc = parser.parseFromString(text, 'text/xml')
      var itemELs = doc.getElementsByTagName('item')
      // items: [latestItem, secondLatestItem, ... oldestItem]
      items = [].slice.call(itemELs).map(parseItem)
      var oldestItem = items.slice(-1)[0]
      console.log(`oldestItem: ${oldestItem.title}`)
      return isNewItem(oldestItem)
    })
    .then(function (result) {
      var index = result.isNew ? items.length : result.indexInQueue
      console.log(`index: ${index}, result: ${JSON.stringify(result)}`)
      var itemsToPush = items.slice(0, index)
      if (itemsToPush.length) {
        return pushItems(itemsToPush)
      }
    })
    .then(function (items) {
      if (items !== undefined) {
        return Promise.all(items.map(notifyItemIfSubscribed))
      }
    })
}

chrome.notifications.onClicked.addListener(function (title) {
  console.log(title)
  isNewItem({ title: title })
    .then(function (result) {
      window.open(result.storedItem.link, '_blank')
      chrome.notifications.clear(title)
    })
})

chrome.storage.sync.get({ notiEnabled: false }, function (x) {
  if (x.notiEnabled) {
    console.log(`fetch and update for the first time at ${new Date()}`)
    fetchAndUpdate()
    chrome.alarms.create('fetch', { periodInMinutes: 10 })
  }
})

chrome.alarms.onAlarm.addListener(function (alarm) {
  if (alarm.name === 'fetch') {
    console.log(`fetch and update at ${new Date()}`)
    fetchAndUpdate()
  }
})
