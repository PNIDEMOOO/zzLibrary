<template>
    <div class="BRBook-wrap">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 借书
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="borrowBook" ref="borrowBook" label-width="100px">
                <el-form-item label="用户名" prop="b_Username">
                    <el-input v-model="borrowBook.b_Username"></el-input>
                </el-form-item>
                <el-form-item label="复本id" prop="b_copy">
                    <el-input v-model="borrowBook.b_copy" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitBorrow('borrowBook')">提交</el-button>
                    <el-button @click="resetBorrow('borrowBook')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item class="table-title"><i class="el-icon-menu table-title"></i> 还书
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="form-box">
            <el-form :model="returnBook" ref="returnBook" label-width="100px">
                <el-form-item label="用户名" prop="r_Username">
                    <el-input v-model="returnBook.r_Username"></el-input>
                </el-form-item>
                <el-form-item label="复本id" prop="r_copy">
                    <el-input v-model="returnBook.r_copy" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitReturn('returnBook')">提交</el-button>
                    <el-button @click="resetReturn('returnBook')">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import urlconf from 'assets/url.conf'
    export default {
        props: ['admin'],
        data() {
            return {
                borrowBook: {
                    b_Username: null,
                    b_copy: null,
                },
                returnBook: {
                    r_Username: null,
                    r_copy: null
                }
            }
        },
        created(){
        },
        methods: {
            submitBorrow(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(urlconf.Borrow(this.admin.token), {
                            username: this.borrowBook.b_Username,
                            copy: this.borrowBook.b_copy
                        }).then((response) => {
                            this.$message({
                                message: '借书成功！',
                                type: 'success'
                            });
                            this.borrowBook.b_Username = null
                            this.borrowBook.b_copy = null
                            this.returnBook.r_Username = null
                            this.returnBook.r_copy = null
                        }, response => {
                            this.$message({
                                message: '借书失败！',
                                type: 'error'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetBorrow(formName) {
                this.$refs[formName].resetFields();
            },
            submitReturn(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.$http.post(urlconf.Return(this.admin.token), {
                            username: this.returnBook.r_Username,
                            copy: this.returnBook.r_copy
                        }).then((response) => {
                            console.log("ssssss")
                            this.borrowBook.b_Username = null
                            this.borrowBook.b_copy = null
                            this.returnBook.r_Username = null
                            this.returnBook.r_copy = null
                            this.$message({
                                message: '还书成功！',
                                type: 'success'
                            });
                        }, response => {
                            this.$message({
                                message: '还书失败！',
                                type: 'error'
                            });
                        });
                    } else {
                        return false;
                    }
                });
            },
            resetReturn(formName) {
                this.$refs[formName].resetFields();
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
</style>
