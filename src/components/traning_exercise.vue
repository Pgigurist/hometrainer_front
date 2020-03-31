<template>
    <div
        class="traningExercise"
        v-bind:class='{
            complit: item.state
        }'>
       <center>
        <div class="info-box">
            <div class="title"><h4>№{{item.index+1}} {{item.title}}</h4></div>
            <transition name='fade'>
                <div v-if='!item.state'>
                    <div class="expr">
                    <p>{{item.description}}
                    </p></div>
                    <button v-on:click='change_reps()'>{{button_text}}</button>
                    <button v-on:click='add_url()'>видео пример</button>
                    <transition name='fade'>
                        <div v-if='isReps' class="rep-box">
                            <div
                                class="rep"
                                v-for='elm in item.repetitions'
                                v-on:click="checked({i:item.index, n: elm.index})"
                                v-bind:class="{executed : elm.checked, complite : item.state}"
                                ><p></p>
                            </div>
                        </div>
                    </transition>
                </div>
            </transition>
        </div>
        </center>
    </div>
</template>
<script>

import Tone from "tone"
const synth = new Tone.Synth().toMaster();

    export default {
        name: 'traningExercise',
        data: ()=>{return{
            isReps: false,
        }},
        methods:    {
            change_reps(){
                this.isReps = !this.isReps
            },
            checked: function(i){
                synth.triggerAttackRelease("E4", "10n")
                this.$store.dispatch('CHECK_REPETITION', i)  
                this.$store.dispatch('GET_CHECHLIST_REPETITIONS_STATE', i.i)
            },
            add_url(url){
                //console.log(this.item)
                this.$emit('addUrl', this.item.url)
            }
        },
        computed:   {
            button_text: function(){
                if(this.isReps){
                    return 'скрыть'
                }
                return 'начать'
            },
        },
        props: {
            item: Object,
        },
    }
</script>
<style lang="sass">

    .fade-enter-active
        transition: opacity .5s;
    .fade-leave-active
        transition: opacity .5s;
    .fade-enter
        opacity: 0;
    .fade-leave-to /* .fade-leave-active до версии 2.1.8 */
        opacity: 0;

    .traningExercise
        width: 87%;
        border: 1px solid #32a9ff
        border-radius: 20px
        margin: 5px
        .info-box
            //border: 1px solid
            margin: 3px
            .title
            .expr
        .rep-box
            height: 60px
            margin: 3px
            align-content: center
            .rep
                float: left;
                height: 50px;
                width: 50px;
                border: 1px solid #32a9ff;
                border-radius: 25px;
                margin: 5px;
            .executed
                background-color: lightgreen;
        button
            font-size: 18px;
            width: 250px;
            height: 30px;
            margin: 5pt;
            border: 1pt solid #32a9ff;
            border-radius: 20px
    .complit
        border: 1pt solid lightgreen;
        


</style>