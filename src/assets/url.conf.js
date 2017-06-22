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
    },
    Borrow(token){
        return this.root + 'Record/borrow?token=' + this.encodeToken(token)
    },
    Return(token){
        return this.root + 'Record/return?token=' + this.encodeToken(token)
    },
    searchBookByISBN(isbn){
        return this.root + 'Book/Get?isbn=' + isbn
    },
    searchBookByTitle(title, pageid){
        return this.root + 'Book/search?title=' + title + '&page=' + pageid
    },
    searchOuterBook(token, isbn){
        return this.root + 'Book/info?token=' + this.encodeToken(token) + '&isbn=' + isbn
    },
    addBook(token){
        return this.root + 'Book/add?token=' + this.encodeToken(token)
    },
    deleteBook(token, isbn){
        return this.root + 'Book/Delete?token=' + this.encodeToken(token) + '&isbn=' + isbn
    },
    getCopy(isbn){
        return this.root + 'Copy/Get?isbn=' + isbn
    },
    addCopy(token, isbn, num){
        return this.root + 'Copy/add?token=' + this.encodeToken(token) + '&isbn=' + isbn + '&num=' + num
    },
    deleteCopy(token, id){
        return this.root + 'Copy/Delete?token=' + this.encodeToken(token) + '&id=' + id
    },
    getCopyRecord(token, id){
        return this.root + 'Record/copy?token=' + this.encodeToken(token) + '&copyId=' + id
    },
    getAllRecords(token, pageid){
        return this.root + 'Record/Get?token=' + this.encodeToken(token) + '&page=' + pageid
    },
    getAllBooks(pageid){
        return this.root + 'Book/Get?page=' + pageid
    },
    getAllUsers(token){
        return this.root + 'Account/Get?token=' + token
    }
}
