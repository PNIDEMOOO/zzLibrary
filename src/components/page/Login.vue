<template>
    <div class="login-wrap">
        <div class="ms-title">图书馆管理系统</div>
        <div class="ms-login">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="demo-ruleForm">
                <el-form-item prop="Username">
                    <el-input v-model="ruleForm.Username" placeholder="Username"></el-input>
                </el-form-item>
                <el-form-item prop="Password">
                    <el-input type="Password" placeholder="Password" v-model="ruleForm.Password"
                              @keyup.enter.native="submitForm('ruleForm')"></el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                </div>
                <div class="signUp-btn">
                    <el-button type="primary" @click="signUp">注册</el-button>
                </div>
                <!--<p style="font-size:12px;line-height:30px;color:#999;">Tips : 用户名和密码随便填。</p>-->
            </el-form>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        data: function () {
            return {
                user: null,
                ruleForm: {
                    Username: '',
                    Password: ''
                },
                rules: {
                    Username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'}
                    ],
                    Password: [
                        {required: true, message: '请输入密码', trigger: 'blur'}
                    ]
                }
            }
        },
        created(){
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user)
                if (this.user.isadmin) {
                    this.$router.push('/AdminHome');
                }
                else {
                    this.$router.push('/UserHome');
                }
            }
        },
        methods: {
            signUp: function () {
                this.$router.push('/signup');
            },
            submitForm(formName) {
                const self = this;
                self.$refs[formName].validate((valid) => {
//                    登录检验
                    if (valid) {
                        console.log("valid!!!")
                        this.$http.post(urlconf.login(), {
                            Username: this.ruleForm.Username,
                            Password: this.ruleForm.Password
                        }).then(resp => {
                            this.user = resp.body
                            sessionStorage.user = JSON.stringify(this.user)
                            localStorage.user = JSON.stringify({
                                Username: this.user.user,
                                token: this.user.token
                            })
                            if (this.user.isadmin) {
                                this.$router.push('/AdminHome');
                            }
                            else {
                                this.$router.push('/UserHome');
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        /*background-color: #3b485b;*/
        /*background-image: url("../../images/bg0.jpg");*/
    }

    .ms-title {
        position: absolute;
        top: 50%;
        width: 100%;
        margin-top: -230px;
        text-align: center;
        font-size: 30px;
        color: #fff;

    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 300px;
        height: 190px;
        margin: -150px 0 0 -190px;
        padding: 40px;
        border-radius: 5px;
        background: #fff;
    }

    .login-btn {
        text-align: center;
        margin-bottom: 10px;
    }

    .signUp-btn {
        text-align: center;
        margin-bottom: 10px;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
    }

    .signUp-btn button {
        width: 100%;
        height: 36px;
    }
</style>
