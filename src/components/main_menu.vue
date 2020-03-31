<template>
    <div class="main_menu">
       <center>
        
        <h1>домашний тренер</h1>
        <div class="control_panel" v-for="level in levels">
            <!--div class="main_control_button" v-on:click="showChecklist('01')">тренировка уровень 1</div-->
            <!--div class="main_control_button" v-on:click="showChecklist('02')">тренировка уровень 2</div-->
            <!--div class="main_control_button" v-on:click="showChecklist('03')">тренировка уровень 3</div-->
            <!--div class="main_control_button" v-on:click="showChecklist('04')">средний уровень</div-->
            <level v-bind:level="level"></level>
        </div>
        </center>
    </div>
</template>
<script>

import level from './exercise/level.vue'

export default {
    name: 'main_menu',
    methods:    {
        showChecklist : function(type){
            this.set_type(type)
            this.$store.dispatch("CHANGE_MAINMENUSTATUS", type)
        },
        set_type: function(type){
            this.$store.dispatch('ADD_TYPE', type)
        }
    },
    computed:   {
        levels: function(){
            return this.$store.getters.GET_LEVELS
        }
    },
    components: {
        level
    }
}
</script>
<style lang="sass">
    .main_control_button 
        width: 250px;
        height: 30px;
        margin: 5pt;
        border: 1pt solid #32a9ff;
        border-radius: 20px;
    .main_control_button:hover
        border: 1pt solid #2d49b8;
</style>
