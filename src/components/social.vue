<template>
    <div class="social">
        <vue-yandex-share v-bind="options"></vue-yandex-share>
    </div>
</template>

<script>


    import VueYandexShare from '@alexlit/vue-yandex-share';

    export default {
        name: 'social',
        data () {
            return {
                options : {
                  accessToken: null,
                  bare: false,
                  counter: false,
                  copy: 'last',
                  description: null,
                  direction: 'horizontal',
                  hashtags: null,
                  image: null,
                  lang: 'ru',
                  limit: 24,
                  popupDirection: 'bottom',
                  popupPosition: 'inner',
                  size: 'm',
                  title: null,
                  url: null,
                  services: [
                    //'blogger',
                    //'delicious',
                    //'digg',
                    //'evernote',
                    'facebook',
                    //'gplus',
                    //'linkedin',
                    'lj',
                    //'moimir',
                    //'odnoklassniki',
                    //'pinterest',
                    //'pocket',
                    //'qzone',
                    //'reddit',
                    //'renren',
                    //'sinaWeibo',
                    //'skype',
                    //'surfingbird',
                    'telegram',
                    'tencentWeibo',
                    //'tumblr',
                    'twitter',
                    'viber',
                    'vkontakte',
                    'whatsapp',
                  ],
                
                }
            }
        },   
        components: {
            VueYandexShare
        }
    }
</script>

<style lang="sass">
    .social
        margin: 10px;
        padding-top: 10px;
</style>