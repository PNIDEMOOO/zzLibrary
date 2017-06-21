<template>
    <div class="signUp-wrap">
        <div class="signUpForm">
            <div class="title">注册</div>
            <div class="form-box">
                <el-form :model="info" :rules="rules2" ref="info" label-width="100px">
                    <el-form-item label="用户名" prop="Username">
                        <el-input v-model="info.Username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="Password">
                        <el-input type="password" v-model="info.Password" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="checkPass">
                        <el-input type="password" v-model="info.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="管理员" prop="Admincode">
                        <el-input v-model="info.Admincode"></el-input>
                    </el-form-item>
                    <p>{{$data}}</p>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('info')">提交</el-button>
                        <el-button @click="resetForm('info')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>


    </div>
</template>
<script>
    import urlconf from 'assets/url.conf'
    export default {
        data() {
            var checkUsername = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('用户名不能为空'));
                }
                else {
                    callback();
                }
            };
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.info.checkPass !== '') {
                        this.$refs.info.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.info.Password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                user: null,
                info: {
                    Username: '',
                    Password: '',
                    checkPass: '',
                    Admincode: ''
                },
                rules2: {
                    Username: [
                        {validator: checkUsername, trigger: 'blur'}
                    ],
                    Password: [
                        {validator: validatePass, trigger: 'blur'}
                    ],
                    checkPass: [
                        {validator: validatePass2, trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        console.log("valid!");
                        this.$http.post(urlconf.signup(), {
                            Username: this.info.Username,
                            Password: this.info.Password,
                            Admincode: this.info.Admincode
                        }).then((response) => {
                            if (response.status == 200) {//注册成功
                                this.$http.post(urlconf.login(), {
                                    Username: this.info.Username,
                                    Password: this.info.Password
                                }).then(resp => {
                                    this.user = resp.body
                                    sessionStorage.user = JSON.stringify(this.user)
                                    localStorage.user = JSON.stringify({
                                        Username: this.user.user,
                                        token: this.user.token
                                    })
                                    if(this.user.isadmin){
                                        this.$router.push('/AdminHome');
                                    }
                                    else{
                                        this.$router.push('/UserHome');
                                    }
                                })
                            }
                        });
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        }
    }
</script>

<style scoped>
    .signUp-wrap {
        /*background: url("../../images/bg0.jpg") no-repeat fixed;*/
        background-color: #eee;
        height: 100%;
        padding-top: 20px;
    }

    .signUpForm {
        background-color: rgba(255, 255, 255, 0.9);
        width: 50%;
        margin: auto;
        padding: 30px 90px 10px;
    }

    .title {
        text-align: center;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>
