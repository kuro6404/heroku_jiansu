import * as actionType from "./actionTypes";
import {fromJS} from 'immutable'
import React from "react";

const defaultState = {
    topicList:[],
    articleList:[],
    recommendList:[],
    recommendWriter:[],
    articlePage:0,
    showScroll:false,
}

export const HomeReducer = (state = defaultState,action)=>{
    const newState = JSON.parse(JSON.stringify(state));
    switch(action.type){
        case actionType.INIT_HOME:
        {
            newState.topicList = action.topicList;
            newState.articleList = action.articleList;
            newState.recommendList = action.recommendList;
            return newState;
            /*
            return state.merge({
                topicList:fromJS(action.topicList),
                articleList:fromJS(action.articleList),
                recommendList:fromJS(action.recommendList),

            })

             */

        }
        case actionType.ADD_LIST:
        {
            newState.articleList = newState.articleList.concat(action.list);
            newState.articlePage = action.page;
            return newState;
            /*
            return state.merge({
                articleList:state.get('articleList').concat(action.list),
                articlePage:action.page
            })

             */
        }
        case actionType.CHANGE_SCROLL:
        {
            newState.showScroll = action.value;
            return newState;
        }
        case actionType.INIT_PAGE:
        {
            newState.articlePage = action.value;
            return newState;
        }
        case actionType.UPDATE_WRITER:
        {
            newState.recommendWriter = action.recommendWriter;
            return newState;
        }
        default:
            return state;
    }
}

/*
const  defaultState = fromJS({
    topicList : [{
        id:1,
        title:"社會熱點",
        },
        {
            id:2,
            title:"手繪",
        }
    ],

    articleList:[{
        id:1,
        title:"力拚重返大聯盟 林子偉將轉戰雙城",
        desc:"根據大聯盟明尼蘇達雙城隊官網的消息，我國旅美好手林子偉確定轉戰雙城，雙方簽下一張小聯盟約，他也確定結束自己在波士頓紅襪的4季生涯。"
    },
    {
        id:2,
        title:"《半導體》威盛攜馬偕醫院 開發急診室智慧醫療看板應用",
        desc:"【時報記者王逸芯台北報導】威盛(2388)今(2)日宣布，再度攜手馬偕紀念醫院，雙方繼智慧急診行動資訊站與病人資訊查詢面板、智慧病床卡後，再次以資訊圖像化、辨識色彩化的「急診戰情室」概念，打造更完整的智慧資訊看板。"
    },
    {
        id:3,
        title:"冬衣拿出來！下週恐迎更強冷空氣 3大降雨熱區出爐",
        desc:"今（5）日受東北季風影響，全台各地天氣涼冷，中央氣象局表示，明（6）日至週二（8日）持續受東北季風影響，北部、東北部及東部天氣較涼，其他地區早晚亦較涼，另外，天氣職人吳聖宇表示，週一（7日）到週三（9日）東北季風恐比本週更強，北部、東北部全天溫度偏涼。"
    }
    ],

    recommendList : [{
        id:1,
        imgUrl:'https://cdn2.jianshu.io/assets/web/banner-s-daily-e6f6601abc495573ad37f2532468186f.png'
    },
        {
            id:2,
            imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-club-aa8bdf19f8cf729a759da42e4a96f366.png"
        },
        {
            id:3,
            imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-7-1a0222c91694a1f38e610be4bf9669be.png"
        },
        {
            id:4,
            imgUrl:"https://cdn2.jianshu.io/assets/web/banner-s-5-4ba25cf5041931a0ed2062828b4064cb.png"
        }
    ]
})

 */