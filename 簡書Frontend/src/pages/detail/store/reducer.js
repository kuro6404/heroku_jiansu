
import {fromJS} from 'immutable'
import React from "react";
import {Content} from "../style";
import * as actionTypes from "./actionTypes";


const defaultState = {
    title:'',
    content:''
}
/*
const defaultState = fromJS({
    title:"力拚重返大聯盟 林子偉將轉戰雙城",
    content:  `<img src="https://s.yimg.com/ny/api/res/1.2/GGz1g0DQeE5J3KnJk7xK2w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTYzOS42/https://s.yimg.com/uu/api/res/1.2/KfFU8nE2M4U5fx9MnI6mng--~B/aD01MzM7dz04MDA7YXBwaWQ9eXRhY2h5b24-/https://media.zenfs.com/zh-tw/nownews.com/05727a75d365ee2c774f274143cbf8b5" />
                <p>
                    根據大聯盟明尼蘇達雙城隊官網的消息，我國旅美好手林子偉確定轉戰雙城，雙方簽下一張小聯盟約，他也確定結束自己在波士頓紅襪的4季生涯。
                </p>
                <p>
                    林子偉今年賽季受到疫情影響，僅出賽了26場比賽，敲出8支安打，打擊率只有1成54，季後也沒有獲得續約，當時就有媒體認為他會離開紅襪。
                </p>
                <p>
                    返台時他表示自己還想要留在美國，也暫時沒有去日本及韓國打球的意願，首要的目標仍然是爭取重返大聯盟的機會。
                </p>
                <p>
                    如今他確定和雙城簽約，下季也將會轉戰美聯中區。
                </p>
`
})

 */

export const DetailReducer = (state = defaultState,action)=> {
    const newState = JSON.parse(JSON.stringify(state));
    switch (action.type){
        case actionTypes.GET_DETAIL:
        {
            newState.title = action.title;
            newState.content = action.content;
            return newState;
            /*
            return state.merge({
                title:action.title,
                content:action.content,
            })

             */
        }
        default:
            return state;
    }
}