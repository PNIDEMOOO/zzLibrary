<template>
    <div class="wrapper">
        <v-head></v-head>
        <div class="content">
            <userTable :user="this.user" :userinfo="this.userinfo" :userRecord="this.userRecord"></userTable>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    import vHead from './Header.vue';
    import userTable from '../page/UserTable.vue'
    export default {
        components: {
            vHead, userTable
        },
        data(){
            return {
                user: null,
                userinfo: null,
                userRecord: null
            }
        },
        created(){
            if (sessionStorage.user) {
                this.user = JSON.parse(sessionStorage.user)
                this.$http.get(urlconf.GetUserInfo(this.user.token, this.user.user)).then(resp => {
                    this.userinfo = resp.body
                })
                this.$http.get(urlconf.GetUserRecord(this.user.token, this.user.user)).then(resp => {
                    this.userRecord = resp.body
                    for (var i = 0; i < this.userRecord.length; i++) {
                        this.userRecord[i].isclosed = this.userRecord[i].isclosed ? "是" : "否"
                        this.userRecord[i].borrow_time =this.userRecord[i].borrow_time.replace('T', ' ')
                        this.userRecord[i].deadline =this.userRecord[i].deadline.replace('T', ' ')

                    }
                })
            }
        }
    }
</script>

<style scoped>
    .content {
        left: 0;
        /*top:0;*/
    }

    .UserHome-wrap {
        /*height: 100%;*/
        position: relative;
        /*overflow: auto;*/
    }
</style>
