<template>
    <div class="register">
        <div class="register-box">
            <div class="register-label">email</div>
            <input
                type="text"
                class="register-input"
                v-model='login'
                v-bind:class='{
                    err: login_err
                }'>
        </div>
        <div class="register-box">
            <div class="rgister-label">пароль</div>
            <input
                class="register-input"
                v-model='pass'
                v-bind:class='{
                    err: pass_err
                }'>
            <div class="register-label">повторите пароль</div>
            <input
                class="register-input"
                v-model='repPass'
                v-bind:class='{
                    err: repPass_err
                }'>
        </div>
        <!--div class="register-box">
            <div class="register-label">любимый цвет</div>
            <div class="register-choices-box">
                <div class="register-choice green"></div>
                <div class="register-choice yellow"></div>
                <div class="register-choice blue"></div>
            </div>
        </div-->
        <div class="register-box">
            <button class="register-confirm" v-on:click='register()'>зарегистрироваться</button>
            <button class="register-confirm" v-on:click='hide_reg_form()'>отмена</button>
        </div>
        
    </div>
</template>

<script>
    export default {
        name: 'register',
        data () {
            return {
                login: '',
                login_err: false,
                pass: '',
                pass_err: false,
                repPass: '',
                repPass_err: false,
            }
        },
        components: {
        },
        methods:    {
            register(){
            //let username, password, errorMessage = this
                if(this.login === ''|| this.pass ==''||this.repPass==''){
                    this.login_err = true
                    this.pass_err = true
                    this.repPass_err = true
                }else if(this.pass != this.repPass){
                    this.pass_err = true
                    this.repPass_err = true
                }else{
                    this.$store.dispatch(
                        'REGISTER',
                        {
                            'login': this.login,
                            'password': this.pass,
                            'passwordConfirm': this.repPass
                        }
                    )
                    this.hide_reg_form()
                }
            },
            hide_reg_form(){
                this.$store.dispatch('CHANGE_REGISTER_MENU')
            }
        }
    }
</script>

<style lang="sass">
    .register
        border: 1px solid #bddbff;
        border-radius: 20px;
        width: 250px;
        margin: 5px;
        .register-box
            margin: 5px;
            font-size: 20px;
            width: 210px;
            //border: 1px solid;
            .register-input
                font-size: 18px;
                border: 1px solid #bddbff;
                border-radius: 9px;
                text-align: center;
            .register-confirm
                font-size: 18px;
                //border: 1px solid #bddbff;
                border-radius: 9px;
                margin: 5px;
        .register-choices-box
            //border: 1px solid;
            height: 60px;
            margin: 7px;
            .register-choice
                margin: 3px;
                width: 54px;
                height: 54px;
                border-radius: 28px;
                float: left;
                border: 2px solid white;
            .register-choice:hover
                border: 2px solid #bddbff;
            .green
                background-color: lightgreen;
            .yellow
                background-color: #ffbc00e0;
            .blue
                background-color: #0000ffa3;
    .err
        border: 1px solid #ff3232a8;
        background-color: #ff32320d;
</style>