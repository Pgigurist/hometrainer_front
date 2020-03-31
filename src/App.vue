<template>
  <div id="app">
    <!--img alt="Vue logo" src="./assets/logo.png"-->
    
    <!--msg="Welcome to Your Vue.js App"/-->
    <center>
    <div v-if="user != false" class="user-info">
        <h3>{{user.login}}</h3>
        <div class="awards">
            <div class="award gold">
                <div class="award-count">{{user.gold}}</div>
            </div>
            <div class="award silver">
                <div class="award-count">{{user.silver}}</div>
            </div>
            <div class="award bronze">
                <div class="award-count">{{user.bronze}}</div>
            </div>
        </div>
    </div>
    
    </center>
    
    <img src="./assets/logo.png" alt="Хрустальные пазлы">
    
    
    <main_menu v-if="mainMenu"></main_menu>
    <center>
       <register v-if="reg"></register>
       <login v-if='autorized'></login>
        <div v-if="user === false || reg === true" class="login-button" v-on:click='show_login_form'>
            войти
        </div>
        <div v-if="user != false" class="login-button" v-on:click='logout'>
            выйти
        </div>
        <div v-if="user === false || reg === true" class="login-button" v-on:click='show_reg_form'>
            регистрация
        </div>
    </center>
    <traning_content v-if="traningContent"></traning_content>
    
    <center>
        <complit_message v-if="sucessMessage"></complit_message>
        <social></social>
    </center>
    
  </div>
</template>

<script>

import register from './components/register.vue'
import login from './components/login.vue'
import main_menu from './components/main_menu.vue'
import traning_content from './components/traning_content.vue'
import complit_message from './components/complit_message.vue'
import social from './components/social.vue'

export default {
    name: 'App',
    data:   function(){
        return {
            registration_form: false
        }
    },
    
    methods:    {
        show_login_form(){
            this.$store.dispatch('CHANGE_AUTORIZED_MENU')
        },
        show_reg_form(){
            this.$store.dispatch('CHANGE_REGISTER_MENU')
        },
        logout(){
            this.$store.dispatch('LOGOUT')
        }
    },
    
    computed:   {
        mainMenu: function(){
            return this.$store.getters.MAINMENU_VISIBILITY
        },
        traningContent: function(){
            return this.$store.getters.TRANINGCONTENT_VISIBILITY  
        },
        sucessMessage: function(){
            return this.$store.getters.COMPLITE_CONTENT
        },
        autorized: function(){
            return this.$store.getters.GET_AUTORIZED_MENU
            //return null
        },
        user: function(){
            return this.$store.getters.GET_USER
        },
        reg: function(){
            return this.$store.getters.GET_REGISTER_MENU
        }
    },
    components: {
        main_menu,
        traning_content,
        complit_message,
        register,
        login,
        social,
    },
    beforeCreate(){
        
    },
}
</script>

<style lang="sass">
#app
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;

    .login-button
        //color: #a4a6a7ad;
        width: 250px;
        height: 30px;
        margin: 5pt;
        border: 1pt solid #32a9ff;
        border-radius: 20px;
    .login-button:hover
        border: 1pt solid #2d49b8;
        
    .awards
        width: 246px;
        height: 82px
        .award
            width: 70px;
            height: 70px;
            //border: 1px solid black;
            border-radius: 35px;
            float: left;
            margin: 5px;
            box-shadow: 0 0 10px;
            border-width: 2px 0ж
            .award-count
                position: relative;
                left: 20px;
                width: 30px;
                height: 30px;
                //border: 1px solid black;
                border-radius: 15px;
                background-color: #f0f8ffc7
        .gold
            background-color: #ffbd64b8;
        .silver
            background-color: #8080808f;
        .bronze
            background-color: #9a3434b0;
</style>
