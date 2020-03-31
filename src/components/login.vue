<template>
    <div class="login">
       <center>
        <h4>авторизация</h4>
        <div class="login-form">
            <div class="title-form">email</div>
            <input
                type="text"    
                class="input-form"
                v-model='username'
                v-bind:class='{
                    err: login_err
                }'>
            <div class="title-form">пароль</div>
            <input
                type="text" 
                class="input-form" 
                v-model='password'
                v-bind:class='{
                    err: pass_err
                }'>
            <div class="button-form" id="confirm-form" v-on:click='login()'>войти</div>
            <div class="button-form cancel" id="confirm-form" v-on:click='hide'>отмена</div>
        </div>
        </center>
    </div>
</template>
<script>
export default{
    name: 'login',
    data: function(){
        return {
            username: '',
            password: '',
            passwordConfirm: '',
            errorMessage: '',
            login_err: false,
            pass_err: false,
            passConf_err: false,
        }
    },
    computed:   {
        
    },
    methods: {
        register(){
            
            this.$store.dispatch(
                'REGISTER',
                {
                    'login': this.username,
                    'password': this.password,
                    'passwordConfirm': this.passwordConfirm
                }
            )
            this.$store.dispatch(
                'LOGIN',
                {
                    'login': this.username,
                    'password': this.password,
                }
            )
            this.$store.dispatch('CHANGE_AUTORIZED_MENU')
        },
        login(){
            console.log('login')
            //if(login){
                if(this.login === '' || this.password===''){
                    this.login_err = true
                    this.pass_err = true
                }else{
                    
                    this.$store.dispatch(
                        'LOGIN',
                        {
                            'login': this.username,
                            'password': this.password,
                            //'passwordConfirm': this.passwordConfirm
                        }
                    )
                    this.$store.dispatch('CHANGE_AUTORIZED_MENU')
                }   
        },
        hide(){
            this.$store.dispatch('CHANGE_AUTORIZED_MENU')
        },
        /*
        set_show_register(){
            this.set_show_register = !this.show_register
        }
        */
    }
}
</script>
<style lang="sass">
.login
    //position: fixed;
    //top: 10px;
    //left: 10px;
    background-color: white;
    border: 1px solid #32a9ff;
    border-radius: 20px;
    width: 250px;
    height: 390px;
    font-size: 20px;
    .title-form
        width: 200px;
        height: 30px;
        margin: 15px;
    .input-form
        width: 200px;
        height: 30px;
        margin: 10px;
        font-size: 15px;
        border: 1px solid #32a9ff;
        border-radius: 10px;
    .input-form:hover
        border: 1pt solid #2d49b8;
    .button-form
        width: 200px;
        height: 30px;
        margin: 10px;
        font-size: 18px;
        background-color: #59ff5961;
        border: 1px solid #59ff5961;
        border-radius: 10px;
    .button-form:hover
        border: 1pt solid #2d49b8;
 
    .err
        border: 1px solid #ff3232a8;
        background-color: #ff32320d;
</style>