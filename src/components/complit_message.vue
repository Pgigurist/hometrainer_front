<template>
    <div class="complit_message">
        <h2>Завершено</h2>
        <img src="./../assets/good_img.jpeg" alt="молодец!">
        <center>
        <div v-on:click="confirm()" class="back-button">OK</div>
        </center>
    </div>
</template>
<script>

import Axios from 'axios'

export default{
    name: 'complit_message',
    methods:    {
        confirm: function(){
            this.$store.dispatch('ADD_AWARD', this.$store.getters.GET_TYPE)
            this.$store.dispatch('CHANGE_MAINMENUSTATUS')
            this.$store.dispatch('SET_FLASH_CHECKLIST')
        }
    }
    
}
</script>
<style lang="sass">
.complit_message
    //position: fixed;
    //top: 20%;
    //left: 40%;
    width: 350px;
    height: 400px;
    background-color: white;
    border: 3px solid #bddbff;
    border-radius: 20px;
    img
        width: 250px;
        
    .back-button
        margin: 10px;
        border: 1px solid #bddbff;
        border-radius: 25px;
        width: 150px;
    .back-button:hover
        border: 1px solid #a434ea;
</style>