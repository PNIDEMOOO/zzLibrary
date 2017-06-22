<template>
    <div class="BRBook-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 录入/删除复本
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!--<p>{{$data}}</p>-->
        <div class="bookInfoForm">
            <div class="form-box">
                <el-form label-width="40px">
                    <el-form-item label="ISBN" prop="isbn">
                        <el-input v-model="isbn" style="width: 200px" placeholder="输入书本的ISBN"></el-input>
                        <el-button type="primary" @click="search()">查询</el-button>
                    </el-form-item>
                </el-form>
                <el-form v-if="hasBookInfo" :model="hasBookInfo" ref="hasBookInfo" label-width="40px">
                    <el-form-item label="书名">
                        <p>{{hasBookInfo.title}}</p>
                    </el-form-item>
                    <el-form-item label="作者">
                        <p>{{hasBookInfo.author}}</p>
                    </el-form-item>
                    <el-form-item label="版本">
                        <p>{{hasBookInfo.edition}}</p>
                    </el-form-item>
                    <el-form-item label="价钱">
                        <p>{{hasBookInfo.price}}</p>
                    </el-form-item>
                    <el-form-item label="录入" style="vertical-align: middle">
                        <el-input-number v-model="addNum" :min="1"></el-input-number>

                        <el-button type="success" @click="addCopy()">确认录入</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <el-table v-if="copyInfo" :data="copyInfo" border style="width: 502px" ref="multipleTable">
            <el-table-column prop="$id" label="序号" width="100">
            </el-table-column>
            <el-table-column prop="book" label="ISBN" width="200">
            </el-table-column>
            <el-table-column prop="id" label="ID" sortable width="100">
            </el-table-column>
            <el-table-column label="操作" width="100">
                <template scope="scope">
                    <el-button size="small" @click="deleteCopy(scope.$index, scope.row)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                isbn: null,
                copyInfo: null,
                hasBookInfo: null,
                addNum: null,
                deleteId: null
            }
        },
        created(){
        },
        methods: {
            search(){
                this.$http.get(urlconf.searchBook(this.isbn)).then(resp => {
                    this.hasBookInfo = resp.body
                }, resp => {
                    this.hasBookInfo = null
                })
                this.$http.get(urlconf.getCopy(this.isbn)).then(resp => {
                    this.copyInfo = resp.body
                }, resp => {
                    this.copyInfo = null
                })
            },
            addCopy(){
                this.$http.put(urlconf.addCopy(this.admin.token, this.isbn, this.addNum)).then(resp => {
                    alert("add success")
                }, resp => {
                    console.log("add failed!!!")
                })
            },
//            deleteCopy(){
//                this.$http.delete(urlconf.deleteCopy(this.admin.token, this.deleteId)).then(resp => {
//                    alert("delete success")
//                    this.$router.push('/ADCopy');
//                }, resp => {
//                    console.log("delete failed!!!")
//                })
//            },
            deleteCopy(index, row) {
                this.$http.delete(urlconf.deleteCopy(this.admin.token, row.id)).then(resp => {
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
