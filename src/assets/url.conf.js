export default {
    // api的根目录地址
    // root: 'http://localhost:49224/api/',
    root: 'http://zz.ngrok.donggu.me/api/',
    encodeToken (token) {
        return token.replace(/\+/g, '%2B')
    },

    // 各种请求的api统一为函数，返回字符串
    // get方法则带参
    signup () {
        return this.root + 'Account/signup'
    },
    login () {
        return this.root + 'Account/login'
    },
    //获取用户借书余额，过期书的本数等
    GetUserInfo(token, username){
        return this.root + 'Account/info?token=' + this.encodeToken(token) + '&username=' + username
    },
    //获取用户的借书记录
    GetUserRecord(token, username){
        return this.root + 'Record/user?token=' + this.encodeToken(token) + '&user=' + username
    },
    Renew(token){
        return this.root + 'Record/renew?token=' + this.encodeToken(token)
    }
}
