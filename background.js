var showRule = {
  // That fires when a page's URL contains a 'g' ...
  conditions: [
    new chrome.declarativeContent.PageStateMatcher({
      pageUrl: { urlPrefix: 'http://ipn.li/' },
    })
  ],
  // And shows the extension's page action.
  actions: [new chrome.declarativeContent.ShowPageAction()]
}

// When the extension is installed or upgraded ...
chrome.runtime.onInstalled.addListener(function () {
  var itemQueue = new Array(20)
  chrome.storage.sync.set({itemQueue}, function () {console.log('itemQueue initilized.')})

  // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([showRule]);
  });
});

/*
itemQueue: [oldestItem, secondOldestItem, ... latestItem]
 */

function parseItem(itemEL) {
  var item = {}
  for (var i = 0; i < itemEL.children.length; i++) {
    childEL = itemEL.children[i]
    item[childEL.tagName] = childEL.innerHTML
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
    chrome.storage.sync.get({itemQueue: []}, function (x) {
      // TODO: use binary search here
      for (var i = 0; i < x.itemQueue.length; i++) {
        var storedItem = x.itemQueue[i]
        if (!storedItem) {
          console.log(`stored item is ${storedItem}`)
          break
        }
        if (item.title === storedItem.title) {
          console.log(`same as storedItem[${i}], break`)
          resolve({isNew: false, indexInQueue: i})
          return
        }
        else {
          console.log(`judging... ${item.title} !== ${storedItem.title}`)
        }
      }
      console.log(`item is new`)
      resolve({isNew: true})
    })
  })
}

function pushItems(items) {
  // items: [latestItem, secondLatestItem, ... oldestItem]
  return new Promise(function (resolve, reject) {
    chrome.storage.sync.get({itemQueue: []}, function (x) {
      items.slice().reverse().map(function (item) {
        delete item.description
        x.itemQueue.shift()
        x.itemQueue.push(item)
        console.log(`item pushed: ${item.title}`)
      })
      chrome.storage.sync.set({itemQueue: x.itemQueue}, function () {
        resolve(items)
      })
    })
  })
}

function fetchAndUpdate() {
  var items
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
        // TODO: handle notification here
        (function () {})()
      }
    })
}

chrome.alarms.create('fetch', { periodInMinutes: 10 })

chrome.alarms.onAlarm.addListener(function (alarm) {
  fetchAndUpdate()
})
