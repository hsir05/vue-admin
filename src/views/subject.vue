<template>
<div class="box">
    <div class="breadcrumb-wrap">
        <a-breadcrumb style="border-bottom: 1px doshed #e5e5e5">
            <a-breadcrumb-item href=""> <a-icon type="home" /> 首页</a-breadcrumb-item>
            <a-breadcrumb-item> 知网采集 </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <!-- 表单 -->
    <div class="wrap">

    <a-form-model layout="inline" ref="ruleForm"  :rules="rules"  :model="form"  @submit="handleSubmit" @submit.native.prevent class="form-wraps">
        <a-form-model-item label="机构" prop="institutionId">
            <a-select
                show-search size="large"
                :value="value"
               placeholder="专题"
                style="width: 200px"
                :default-active-first-option="false"
                :show-arrow="false"
                :filter-option="false"
                :not-found-content="null"
                @search="handleSearch"
                @change="handleChange"
                >
                <a-select-option v-for="d in data" :key="d.value">
                {{ d.text }}
                </a-select-option>
            </a-select>

            <!-- <a-select v-model="form.institutionId" size="large" style="width:200px" placeholder="专题">
                <a-select-option :value="item.value" v-for="item in subjectList" :key="item.label">{{item.label}}</a-select-option>
            </a-select> -->
        </a-form-model-item>

        <a-form-model-item  label="专题名称" prop="name">
            <a-input v-model="form.name"  size="large" type="text" placeholder="专题名称"></a-input>
        </a-form-model-item>

        <a-form-model-item>
            <a-button type="primary" html-type="submit" size="large" :disabled="form.type === '' || form.pp === ''">
                保存
            </a-button>
            <a-button type="primary" html-type="submit"  size="large" style="margin-left:10px;" :disabled="form.type === '' || form.pp === ''">
                重置
            </a-button>

        </a-form-model-item>
    </a-form-model>

    <a-table :columns="columns" rowKey="id" :data-source="tableData" bordered :pagination="false">
        <p slot="action" slot-scope="records" href="javascript:;">{{records.title}}
            <a-button type="danger" @click="handleDel(records.id)" icon="download">删除</a-button>
        </p>
    </a-table>
    <div class="btn-wrap">
        <a-pagination show-quick-jumper :default-current="2" :total="total" @change="onChange" />
    </div>
    
  </div>
</div>
</template>

<script>
import { acqData, getData, delData } from '@/api/index'
import { mixinObj } from '@/mixins/dataMixin'
export default {
    name: 'zw',
    mixins: [mixinObj], 
    data(){
        return {
            form: {
                user: '',
                name: '',
            },
            data: [],
            tableData: [],
            page: {
                current: 1,
                size: 10,
            },
            total: null,
            value: undefined,
            timeout: null,
            columns: [
                {
                    title: '机构',
                    dataIndex: 'institutionId',
                },
                {
                    title: '专题名称',
                    dataIndex: 'name',
                },
                { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
            ],
        }
    },
    created(){
        this.getData()
    },
    methods: {
        handleSearch(value) {
            // console.log(value);
            this.getSelData(value)
            // fetch(value, data => (this.data = data));
        },
        handleChange(value) {
            this.value = value;
            // this.getSelData(value)
        },
        getSelData(value){
            if (this.timeout) {
                clearTimeout(this.timeout);
                this.timeout = null;
            }
            this.timeout = setTimeout(() => {
                this.getInsData(value)
            }, 300);
        },
        getData(){
            getData('/dp-collection/specialSubject/page', this.page)
                .then(res => {
                    console.log(res.data.records);
                    this.tableData = res.data.records
                    this.total = res.data.total
                }).catch(err => {
                    console.log(err);
                })
        },
        handleDel(id){
            let _this = this
            this.$confirm({
                title: '确认删除',
                content: '确认删除',
                onOk() {
                    delData('/dp-collection/specialSubject/del', {id: id})
                        .then(() => {
                            _this.$message.info('删除成功！')
                            _this.getData()
                        }).catch(err => {
                            console.log(err);
                        })
                },
                onCancel() {},
            });
        },
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    acqData('/dp-collection/specialSubject/save', this.form)
                        .then(res => {
                            if(res.code === 200) {
                                this.$message.info('保存成功！')
                            }
                        }).catch(err => {
                            this.$message.error('保存失败，请稍后重试！')
                            console.log(err);
                        })
                }
            })
        },
        onChange(){

        }
    }
}
</script>

<style>
.form-wraps{
    margin: 10px 0;
}
</style>
