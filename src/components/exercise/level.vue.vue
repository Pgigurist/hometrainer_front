<template>
    <div class="level">
        <div
            class="main_control_button"
            v-on:click="showChecklist()"
        >{{level.title}}</div>
    </div>
</template>

<script>

    export default {
        name: 'level',
        data () {
            return {
                title: 'бронза'
            }
        },
        components: {
        },
        props:  {
            level: Object,
        },
        methods:    {
            showChecklist(){
                this.set_type(this.level.value)
                console.log(this.level.value)
                this.$store.dispatch("CHANGE_MAINMENUSTATUS", this.level.value)
            },
            set_type: function(type){
                this.$store.dispatch('ADD_TYPE', type)
            }
        }
    }
</script>

<style>
    
</style>