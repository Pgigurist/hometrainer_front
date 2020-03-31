import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'


Vue.use(Vuex)

export default new Vuex.Store({
    state: {

        //SERVER DATA
        user: '',
        levels: [
            {
                title: 'тренировка уровень 1',
                value: '01'
            },
            {
                title: 'тренировка уровень 2',
                value: '02'
            },
            {
                title: 'тренировка уровень 3',
                value: '03'
            }
        ],//need blank in future
        //checklist:  '',
        
        //APP STAGE
        type: '',
        autorized_menu: false,
        register_menu: false,    
        isHiddenMainMenu: true,
        isHiddenTraningContent: false,
        isCompliteContent: false,
        complite: false,
        
        //FAKE DATA FOR DEV
        
        //fake user
        /*
        user: {
            login: 'Николай',
            gold: 1,
            silver: 0,
            bronze: 3,
        },
        */
        
        //fake checklist
        ///*
        checklist:  [
            {
                title:  'exercise',
                index: 0,
                state: false,
                repetitions: [
                    {
                        index: 0,
                        checked: false
                    },
                    {
                        index: 1,
                        checked: false
                    },
                    {
                        index: 2,
                        checked: false
                    },
                    {
                        index: 3,
                        checked: false
                    },
                ],
                url: 'https://youtu.be/i0DE4_7Fki0'
            },
            {
                title:  'exercise',
                index: 1,
                state: false,
                repetitions: [
                    {
                        index: 0,
                        checked: false
                    },
                    {
                        index: 1,
                        checked: false
                    },
                    {
                        index: 2,
                        checked: false
                    },
                    {
                        index: 3,
                        checked: false
                    },
                ],
                url: 'https://youtu.be/i0DE4_7Fki0'
            }
        ],
        //*/
    },
    mutations: {
        
        //USER
        SET_USER: (state, payload)=>{
            state.user = payload
        },
        DROP_USER: (state, payload)=>{
            state.user = ''
        },
        
        //SERVER DATA
        
        SET_AUTORIZED_MENU: (state)=>{
            state.autorized_menu = !state.autorized_menu
        },
        SET_REGISTER_MENU: (state)=>{
            state.register_menu = !state.register_menu
        },
        SET_LEVELS: (state, payload)=>{
              state.levels = payload.levels
        },
        
        //APP STAGE NUTATIONS
        SET_HIDDENMAINMENU: (state)=>{
            state.isHiddenMainMenu = !state.isHiddenMainMenu
        },
        SET_HIDDENTRANINGCONTENT: (state)=>{
            state.isHiddenTraningContent = !state.isHiddenTraningContent
        },
        CHANGE_REPETITION: (state, indexes)=>{
            state.checklist[indexes.i].repetitions[indexes.n].checked = !state.checklist[indexes.i].repetitions[indexes.n].checked
        },
        SET_CHECKLIST_ITEM_STATE: (state, index)=>{
            state.checklist[indexes.index] = !state.checklist[indexes.index]
        },
        SET_CHECKLIST_REPETITION_STATE: (state, index)=>{
            let status = 1
            state.checklist[index].repetitions.reduce(function(stat, repetition){
                if(repetition.checked){
                    status++
                }
            })
            //console.log(status)
            if(status == state.checklist[index].repetitions.length) state.checklist[index].state = true
            
            //let complit = false
            let complit = 1
            state.checklist.reduce(function(val, item){
                
                //complit = complit+item.state
                if(item.state){
                    complit++
                }
            })
            
            if(complit >= state.checklist.length){
                state.complite = true
            }
            
        },
        FLASH_CHECKLIST: (state)=>{
            for(let i=0; i<state.checklist.length; i++){
                state.checklist[i].state = false
                for(let n=0; n<state.checklist[i].repetitions.length; n++){
                    state.checklist[i].repetitions[n].checked = false
                }
            }
            state.complite = false
        },
        SET_CURRENT_CHECKLIST: (state, payload)=>{
            state.checklist = payload
        },
        SET_TYPE: (state, payload)=>{
            state.type = payload
        },
        //mutations with awards
        INCREM_GOLD: (state)=>{
            state.user.gold = state.user.gold+1
        },
        INCREM_SILVER: (state)=>{
            state.user.silver = state.user.silver+1
        },
        INCREM_BRONZE: (state)=>{
            state.user.bronze = state.user.bronze+1
        },
        
    },
    actions: {
        //SERVER DATA ACTIONS
        
        //user actions
        REGISTER: async(context, payload)=>{
            let {data} = await Axios.post('/ajax/register/', payload)
            .catch((e)=>{
                console.error(e.message)
            })
            context.commit('SET_USER', data.user)
        },
        LOGIN: async(context, payload)=>{
            let {data} = await Axios.post('/ajax/login/', payload)
            .catch((e)=>{
                console.error(e.message)
            })
            context.commit('SET_USER', data.user)
        },   
        LOGOUT: async(context)=>{
            Axios.get('/ajax/logout/')
            context.commit('DROP_USER')
        },
        ADD_AWARD: async(context, payload)=>{
            let {data} = await Axios.post('/ajax/complitChecklist/', {
                status: true,
                type: payload,
            })
            
            switch(data.award){
                case 'gold':
                    console.log('try gold')
                    context.commit('INCREM_BRONZE')
                    break
                case 'silver':
                    console.log('try silver')
                    context.commit('INCREM_SILVER')
                    break
                case 'bronze':
                    console.log('try bronze')
                    context.commit('INCREM_GOLD')
                    break
                default:
                    break;
            }
        },
        
        //APP STATUS
        CHANGE_MAINMENUSTATUS: async(context)=>{
            context.commit('SET_HIDDENMAINMENU')
            context.commit('SET_HIDDENTRANINGCONTENT')
        },
        CHANGE_AUTORIZED_MENU: async(context)=>{
            context.commit('SET_AUTORIZED_MENU')
        },
        CHANGE_REGISTER_MENU: async(context)=>{
            context.commit('SET_REGISTER_MENU')
        },
        GET_MAINMENU_STATUS: async(context, payload)=>{
            context.commit('GET_MAINMENU_STATUS', payload)
        },
        GET_CHECKLIST: async(context, payload)=>{
            context.commit('GET_CHECKLIST', payload)
        },
        CHECK_REPETITION: async(context, payload)=>{
            context.commit('CHANGE_REPETITION', payload)
        },
        CHANGE_CHECKLIST_ITEM_STATE: async(context, payload)=>{
            context.commit('SET_CHECKLIST_ITEM_STATE', payload)
        },
        GET_CHECHLIST_REPETITIONS_STATE: async(context, payload)=>{
            context.commit('SET_CHECKLIST_REPETITION_STATE', payload)
        },
        SET_FLASH_CHECKLIST: async(context, payload)=>{
            context.commit('FLASH_CHECKLIST', payload)
        },     
        GET_CURRENT_CHECKLIST:  async(context, payload)=>{
            
          let {data} = await Axios.post('/ajax/getChecklist/', { type: context.state.type})
            .catch((e)=>{
                console.error(e.message)
            })
          let temp = JSON.parse(data)
 
          let list = new Array()
          for(let i=0; i<temp.length; i++){
              if(temp[i]){
                  let obj = new Object()
                  obj.title = temp[i].title[0]
                  obj.index = i
                  obj.state = false
                  obj.description = temp[i].description[0]
                  obj.repetitions = new Array()
                  if(temp[i].youtube[0]!= undefined){
                    obj.url = temp[i].youtube[0]
                  }
                  for(let n=0; n<temp[i].repetition; n++){
                      let rep = new Object()
                      rep.index = n
                      rep.checked = false
                      obj.repetitions.push(rep)
                  }
                  list.push(obj)
              }
          }
          context.commit('SET_CURRENT_CHECKLIST', list)
        },
        ADD_TYPE: async(context, payload)=>{
            context.commit('SET_TYPE', payload)
        },
   
    },
    modules: {
    },

    getters: {
        MAINMENU_VISIBILITY: state =>{
            return state.isHiddenMainMenu
        },
        
        TRANINGCONTENT_VISIBILITY: state =>{
            return state.isHiddenTraningContent
        },
        
        CHECKLIST: state =>{
            return state.checklist
        },
        
        COMPLITE_CONTENT: state=>{
            return state.complite
        },
        
        GET_TYPE: state=>{
            return state.type
        },
        
        GET_AUTORIZED_MENU: state=>{
            return state.autorized_menu
        },
        GET_REGISTER_MENU: state=>{
            return state.register_menu
        },
        GET_USER: state=>{
            if(state.user === ''){
                return false
            }else{
                return state.user
            }
        },
        GET_LEVELS: state=>{
            return state.levels
        }
        
    },
})
