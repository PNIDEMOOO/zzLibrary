<template>
    <div class="BRBook-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 录入/删除书本
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <p>{{$data}}</p>
        <div class="bookInfoForm">
            <div class="form-box">
                <el-form label-width="40px">
                    <el-form-item label="ISBN" prop="isbn">
                        <el-input v-model="isbn" style="width: 200px" placeholder="输入书本的ISBN"></el-input>
                        <el-button type="primary" @click="search()">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="hasBookInfo" :model="hasBookInfo" ref="hasBookInfo" label-width="40px">
                    <el-form-item label="书名" prop="hasBookInfo.title">
                        <el-input v-model="hasBookInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="hasBookInfo.author">
                        <el-input v-model="hasBookInfo.author"></el-input>
                    </el-form-item>
                    <el-form-item label="版本" prop="hasBookInfo.edition">
                        <el-input v-model="hasBookInfo.edition"></el-input>
                    </el-form-item>
                    <el-form-item label="价钱" prop="hasBookInfo.price">
                        <el-input v-model="hasBookInfo.price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button disabled type="success" @click="addBook()">录入</el-button>
                        <el-button type="danger" @click="deleteBook()">删除</el-button>
                        <el-button @click="resetForm('hasBookInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="!hasBookInfo&&bookInfo" :model="bookInfo" ref="bookInfo" label-width="40px">
                    <el-form-item label="书名" prop="bookInfo.title">
                        <el-input v-model="bookInfo.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="bookInfo.author">
                        <el-input v-model="bookInfo.author"></el-input>
                    </el-form-item>
                    <el-form-item label="版本" prop="bookInfo.edition">
                        <el-input v-model="bookInfo.edition"></el-input>
                    </el-form-item>
                    <el-form-item label="价钱" prop="bookInfo.price">
                        <el-input v-model="bookInfo.price"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="success" @click="addBook()">录入</el-button>
                        <el-button disabled type="danger" @click="deleteBook()">删除</el-button>
                        <el-button @click="resetForm('bookInfo')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                isbn: null,
                bookInfo: null,
                hasBookInfo: null
            }
        },
        created(){
        },
        methods: {
            search(){
                this.$http.get(urlconf.searchBookByISBN(this.isbn)).then(resp => {
                    this.hasBookInfo = resp.body
                }, resp => {
                    this.hasBookInfo = null
                })

                var url = 'http://isbn.szmesoft.com/isbn/query?isbn=' + this.isbn;
//                this.$http.get(url).then(resp => {
//                    console.log("sssss")
////                    this.BookInfo = resp.body
//                }, resp => {
////                    this.BookInfo = null
//                })
//                this.$http.jsonp("http://isbn.szmesoft.com/isbn/query?isbn=" + this.isbn,
//                    {
//                        headers: {},
//                        emulateJSON: true
//                    }).then(resp => {
//                        console.log(resp.body)
////                    this.bookInfo = JSON.parse(resp.body)
//                }, resp => {
//                    this.bookInfo = null
//                })
            },
            addBook(){
                var info = {
                    "isbn": this.bookInfo.ISBN,
                    "title": this.bookInfo.BookName,
                    "author": this.bookInfo.Author,
                    "price": this.bookInfo.Price,
                    "edition": this.bookInfo.Publishing,
                    "copy": ''
                }
                this.$http.put(urlconf.addBook(this.admin.token), info).then(resp => {
                    alert("add success")
                }, resp => {
                    console.log("add failed!!!")
                })
            },
            deleteBook(){
                this.$http.delete(urlconf.deleteBook(this.admin.token,this.isbn)).then(resp => {
                    alert("delete success")
                }, resp => {
                    console.log("delete failed!!!")
                })
            }
        }
    }
</script>

<style scoped>
    .crumbs {
        margin: 10px 0;
    }

    .table-title {
        font-size: 20px;
    }

    .bookInfoForm {
        margin-top: 30px;
    }
</style>
