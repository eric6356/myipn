import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// export const allPrograms = ['bixiaguan', 'bowuzhi', 'crazycapital', 'fashionmonster', 'hardimage', 'history', 'itgonglun', 'kernelpanic', 'popdispatch', 'taiyilaile', 'wuciyuan', 'weizhidao', 'xuanmei', 'yitianshijie']

// const monkStored = {
//     subscribedPrograms: allPrograms,
//     podcastQueue: [{
//         "episode": 41,
//         "link": "https://ipn.li/yitianshijie/41",
//         "listened": true,
//         "program": "yitianshijie",
//         "pubDate": "2016-11-30T15:11:14.000Z",
//         "pureTitle": "书与虚拟现实",
//         "title": "一天世界 #41: 书与虚拟现实"
//     }, {
//         "episode": 26,
//         "link": "https://ipn.li/wuciyuan/26",
//         "listened": true,
//         "program": "wuciyuan",
//         "pubDate": "2016-12-02T04:26:09.000Z",
//         "pureTitle": "关于",
//         "title": "無次元 #26: 关于 Ivo Pogorelich 的号外节目"
//     }, {
//         "episode": 105,
//         "link": "https://ipn.li/weizhidao/105",
//         "listened": true,
//         "program": "weizhidao",
//         "pubDate": "2016-12-02T05:55:43.000Z",
//         "pureTitle": "闲话飞机餐",
//         "title": "味之道 #105: 闲话飞机餐"
//     }, {
//         "episode": 47,
//         "link": "https://ipn.li/bixiaguan/47",
//         "listened": true,
//         "program": "bixiaguan",
//         "pubDate": "2016-12-03T09:39:02.000Z",
//         "pureTitle": "巨匠之作：独乐寺山门与观音阁",
//         "title": "壁下观 #47: 巨匠之作：独乐寺山门与观音阁"
//     }, {
//         "episode": 5,
//         "link": "https://ipn.li/crazycapital/5",
//         "listened": true,
//         "program": "crazycapital",
//         "pubDate": "2016-12-05T12:41:09.000Z",
//         "pureTitle": "你会在网上买家具吗？",
//         "title": "疯投圈 #5: 你会在网上买家具吗？"
//     }, {
//         "episode": 42,
//         "link": "https://ipn.li/yitianshijie/42",
//         "listened": true,
//         "program": "yitianshijie",
//         "pubDate": "2016-12-07T05:14:37.000Z",
//         "pureTitle": "连音有几种弹法？",
//         "title": "一天世界 #42: 连音有几种弹法？"
//     }, {
//         "episode": 48,
//         "link": "https://ipn.li/bixiaguan/48",
//         "listened": true,
//         "program": "bixiaguan",
//         "pubDate": "2016-12-09T21:58:24.000Z",
//         "pureTitle": "去元代的韩城",
//         "title": "壁下观 #48: 去元代的韩城"
//     }, {
//         "episode": 101,
//         "link": "https://ipn.li/taiyilaile/101",
//         "listened": true,
//         "program": "taiyilaile",
//         "pubDate": "2016-12-10T14:56:55.000Z",
//         "pureTitle": "和一千块一片的药比起来，黄金实在是便宜货",
//         "title": "太医来了 #101: 和一千块一片的药比起来，黄金实在是便宜货"
//     }, {
//         "episode": 58,
//         "link": "https://ipn.li/bowuzhi/58",
//         "listened": true,
//         "program": "bowuzhi",
//         "pubDate": "2016-12-11T08:27:52.000Z",
//         "pureTitle": "由两岸故宫掐架引发的讨论",
//         "title": "博物志 #58: 由两岸故宫掐架引发的讨论"
//     }, {
//         "episode": 59,
//         "link": "https://ipn.li/bowuzhi/59",
//         "listened": true,
//         "program": "bowuzhi",
//         "pubDate": "2016-12-11T08:45:28.000Z",
//         "pureTitle": "番外：神奇格伦在哪里",
//         "title": "博物志 #59: 番外：神奇格伦在哪里"
//     }, {
//         "episode": 43,
//         "link": "https://ipn.li/yitianshijie/43",
//         "listened": false,
//         "program": "yitianshijie",
//         "pubDate": "2016-12-13T07:29:52.000Z",
//         "pureTitle": "Magic",
//         "title": "一天世界 #43: Magic Leap 的难产和 AirPods 的延迟"
//     }, {
//         "episode": 102,
//         "link": "https://ipn.li/taiyilaile/102",
//         "listened": false,
//         "program": "taiyilaile",
//         "pubDate": "2016-12-13T11:09:48.000Z",
//         "pureTitle": "当你的记忆被一点一点抹去……",
//         "title": "太医来了 #102: 当你的记忆被一点一点抹去……"
//     }, {
//         "episode": 44,
//         "link": "https://ipn.li/yitianshijie/44",
//         "listened": false,
//         "program": "yitianshijie",
//         "pubDate": "2016-12-15T05:27:53.000Z",
//         "pureTitle": "[番外篇]《声东击西》第五期：火人节就是硅谷，这种说法太夸张吗？",
//         "title": "一天世界 #44: [番外篇]《声东击西》第五期：火人节就是硅谷，这种说法太夸张吗？"
//     }, {
//         "episode": 49,
//         "link": "https://ipn.li/bixiaguan/49",
//         "listened": false,
//         "program": "bixiaguan",
//         "pubDate": "2016-12-15T08:51:45.000Z",
//         "pureTitle": "博物馆之成",
//         "title": "壁下观 #49: 博物馆之成"
//     }, {
//         "episode": 106,
//         "link": "https://ipn.li/weizhidao/106",
//         "listened": false,
//         "program": "weizhidao",
//         "pubDate": "2016-12-18T15:54:37.000Z",
//         "pureTitle": "Comfort",
//         "title": "味之道 #106: Comfort Food"
//     }, {
//         "episode": 41,
//         "link": "https://ipn.li/hardimage/41",
//         "listened": false,
//         "program": "hardimage",
//         "pubDate": "2016-12-19T14:15:13.000Z",
//         "pureTitle": "Grand",
//         "title": "硬影像 #41: Grand Narrative"
//     }, {
//         "episode": 50,
//         "link": "https://ipn.li/bixiaguan/50",
//         "listened": false,
//         "program": "bixiaguan",
//         "pubDate": "2016-12-22T05:54:51.000Z",
//         "pureTitle": "圣诞去帝都看教堂",
//         "title": "壁下观 #50: 圣诞去帝都看教堂"
//     }, {
//         "episode": 45,
//         "link": "https://ipn.li/yitianshijie/45",
//         "listened": false,
//         "program": "yitianshijie",
//         "pubDate": "2016-12-23T12:07:19.000Z",
//         "pureTitle": "作为听觉 AR 的 AirPods",
//         "title": "一天世界 #45: 作为听觉 AR 的 AirPods"
//     }, {
//         "episode": 60,
//         "link": "https://ipn.li/bowuzhi/60",
//         "listened": false,
//         "program": "bowuzhi",
//         "pubDate": "2016-12-24T17:52:39.000Z",
//         "pureTitle": "圣诞闲聊节目之二",
//         "title": "博物志 #60: 圣诞闲聊节目之二"
//     }, {
//         "episode": 103,
//         "link": "https://ipn.li/taiyilaile/103",
//         "listened": false,
//         "program": "taiyilaile",
//         "pubDate": "2016-12-24T18:34:28.000Z",
//         "pureTitle": "作为军事医学史中的主要演员，拿破仑表示他很忙",
//         "title": "太医来了 #103: 作为军事医学史中的主要演员，拿破仑表示他很忙"
//     }],
//     notiEnabled: false,
//     badgeEnabled: false,
//     autoMark: true,
// }
//

const state = {
    chromeStored: {
        subscribedPrograms: [],
        podcastQueue: [],
        notiEnabled: null,
        badgeEnabled: null,
        autoMark: null
    },
    preferenceOpened: false
}

export const helper = {
    getItemByTitle(state, title) {
        for (let item of state.chromeStored.podcastQueue) {
            if (item && item.title == title) {
                return item
            }
        }
    },
    updateStateFromStorage(state) {
        return new Promise((resolve, reject) => {
            // setTimeout(() => {
            //     Object.keys(monkStored).map(k => {
            //         Vue.set(state.chromeStored, k, monkStored[k])
            //     })
            //     console.log(`state updated: ${JSON.stringify(state)}`)
            //     resolve(state)
            // }, 1000)

            window.chrome.storage.sync.get(Object.keys(state.chromeStored), x => {
                Object.keys(x).map(k => {
                    Vue.set(state.chromeStored, k, x[k])
                })
                console.log(`state updated: ${JSON.stringify(state)}`)
                resolve(x)
            })

        })
    },
    saveStateToStorage(state) {
        return new Promise((resolve, reject) => {
            // setTimeout(state => {
            //     console.log(`state saved`)
            //     resolve(state)
            // }, 1000)

            window.chrome.storage.sync.set(state.chromeStored, x => {
                console.log(`state saved`)
                resolve(x)

            })

        })
    },
    updateBadge({getters}) {
        const text = (getters.badgeEnabled && getters.unlistened.length) ? getters.unlistened.length.toString() : ''
        window.chrome.browserAction.setBadgeText({ text })
    }
}

const getters = {
    podcastQueue(state) {
        return state.chromeStored.podcastQueue
    },
    unlistened(state) {
        let itemList = state.chromeStored.podcastQueue.filter(podcast => state.chromeStored.subscribedPrograms.indexOf(podcast.program) !== -1 && !podcast.listened)
        itemList.reverse()
        return itemList
    },
    all(state) {
        let itemList = state.chromeStored.podcastQueue.slice()
        itemList.reverse()
        return itemList
    },
    preferenceOpened(state) {
        return state.preferenceOpened
    },
    notiEnabled(state) {
        return state.chromeStored.notiEnabled
    },
    badgeEnabled(state) {
        return state.chromeStored.badgeEnabled
    },
    autoMark(state) {
        return state.chromeStored.autoMark
    }
}

const mutations = {
    markListened(state, { title }) {
        let podcast = helper.getItemByTitle(state, title)
        Vue.set(podcast, 'listened', true)
    },
    markUnlistened(state, { title }) {
        let podcast = helper.getItemByTitle(state, title)
        Vue.set(podcast, 'listened', false)
    },
    flipListened(state, { title }) {
        let podcast = helper.getItemByTitle(state, title)
        Vue.set(podcast, 'listened', !podcast.listened)
    },
    openPreference(state) {
        state.preferenceOpened = true
    },
    closePreference(state) {
        state.preferenceOpened = false
    },
    flipNoti(state) {
        state.chromeStored.notiEnabled = !state.chromeStored.notiEnabled
    },
    flipBadge(state) {
        state.chromeStored.badgeEnabled = !state.chromeStored.badgeEnabled
    },
    flipAutoMark(state) {
        state.chromeStored.autoMark = !state.chromeStored.autoMark
    },
}

const actions = {
    markListened({state, commit, getters}, podcast) {
        commit('markListened', podcast)
        helper.saveStateToStorage(state)
        helper.updateBadge({ getters })
    },
    markUnlistened({state, commit, getters}, podcast) {
        commit('markUnlistened', podcast)
        helper.saveStateToStorage(state)
        helper.updateBadge({ getters })
    },
    flipListened({state, commit, getters}, podcast) {
        commit('flipListened', podcast)
        helper.saveStateToStorage(state)
        helper.updateBadge({ getters })
    },
    updateStateFromStorage({state, getters}) {
        helper.updateStateFromStorage(state).then(() => {
            helper.updateBadge({ getters })
        })
    },
    flipNoti({state, commit}) {
        commit('flipNoti')
        helper.saveStateToStorage(state)
    },
    flipBadge({state, commit, getters}) {
        commit('flipBadge')
        helper.saveStateToStorage(state)
        helper.updateBadge({ getters })
    },
    flipAutoMark({state, commit}) {
        commit('flipAutoMark')
        helper.saveStateToStorage(state)
    },
}

export const store = new Vuex.Store({
    state,
    getters,
    mutations,
    actions,
})
