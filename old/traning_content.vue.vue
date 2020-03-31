<template>
   <!--comm>OLD VERLION</comm-->
    <div class="traning_content">
       
        <h1>тренировка</h1>
        <div class="prew">
            <div class="vid" v-if="is_blank_url">
                <youtube
                    :video-id="vidId"
                    :player-vars="{
                                autoplay: 1 ,
                                mute: 1,
                                
                            }"
                ></youtube>
                
            </div>
        </div>
        <table>
            <tr>
                <th>задание</th>
                <th class="description">видео</th>
                <th class="description">описание</th>
                
                <th>повторения</th>
            </tr>

           
            <tr class="traningItem" v-for="item in current_checklist">
                
                <td
                    v-bind:class="{complite : item.state}"
                    
                    >{{item.title}}</td>
                <td 
                    class="description"
                    v-bind:class="{complite : item.state}"
                    v-on:click="set_vid_url(item.url)">
                        <div class="watch-button">смотреть ролик</div>
                </td>
                <td>{{item.description}}</td>
                <td v-bind:class="{complite : item.state}">{{item.repetitions.length}}</td>
                
                <td v-for="rep in item.repetitions" v-on:click="checked({i:item.index, n:rep.index}
                )"><div class="content-check" v-bind:class="{executed : rep.checked, complite : item.state}"></div></td>
                
            </tr>
            
        </table>
        <center>
            <div class="back-button" v-on:click="back_button">назад</div>
        </center>
    </div>
</template>
<script>

import { getIdFromURL, getTimeFromURL } from 'vue-youtube-embed'
import Tone from "tone"

const synth = new Tone.Synth().toMaster();


export default {
    name: 'traning_content',
    data: function(){return{
        reps: '',
        count: 0,
        type: '',
        url: ''
    }},
    componets: {
        //TraningItem,
        //video_prew,
    },
    methods: {
        back_button: function(){
            this.$store.dispatch('CHANGE_MAINMENUSTATUS')
            this.$store.dispatch('SET_FLASH_CHECKLIST')
        },
        checked: function(i){
            synth.triggerAttackRelease("E4", "10n")
            this.$store.dispatch('CHECK_REPETITION', i)  
            this.$store.dispatch('GET_CHECHLIST_REPETITIONS_STATE', i.i)
        },
        set_vid_url: function(url){
            this.url = url
        }
        
    },
    computed: {
        current_checklist: function(){
            //this.reps = this.$store.getters.CHECKLIST
            return this.$store.getters.CHECKLIST
        },
        vidId: function(){
            return getIdFromURL(this.url)
        },
        is_blank_url: function(){
            if(this.url === ''){
                return false
            }else{
                return true
            }
        }
    },
    beforeCreate(){
        this.$store.dispatch('GET_CURRENT_CHECKLIST', {})
    }
    
}
    
</script>
<style lang="sass">
.traning_content
    
    .complite
        background-color: #90ee9052;
        //display: none;
    
    td
        border-radius: 15px;
    
    td.description
        width: 15em;
    .content-check
        margin: 5px;
        width: 50px;
        height: 50px;
        border: 1px solid #bddbff;
        border-radius: 25px;
    .content-check:hover
        border: 1px solid #a434ea;
    .back-button
        border: 1px solid #bddbff;
        border-radius: 25px;
        width: 150px;
    .back-button:hover
        border: 1px solid #a434ea;
    .watch-button
        border: 1px solid #bddbff;
        border-radius: 15px;
        width: 150px;
    .watch-button:hover
        border: 1px solid #a434ea;
.executed
    background-color: lightgreen;
</style>