<template>
<div class="box">
    <div class="breadcrumb-wrap">
        <a-breadcrumb style="border-bottom: 1px doshed #e5e5e5">
            <a-breadcrumb-item href=""> <a-icon type="home" /> 首页</a-breadcrumb-item>
            <a-breadcrumb-item> scopus采集 </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <!-- 表单 -->
    <div class="wrap">
        <div class="progress-wrap">
            <h4 class="progress-title">采集进度</h4>
            <a-progress :percent="percent" />
        </div>

        <a-form-model ref="ruleForm"  :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit" @submit.native.prevent class="form-wrap">
            <a-form-model-item  label="检索表达式" prop="query">
                <a-input v-model="form.query"  size="large" type="text" placeholder="检索表达式">
                </a-input>
            </a-form-model-item>

            <a-form-model-item  label="采集KEY" prop="key">
                <a-input v-model="form.key"  size="large" type="text" placeholder="采集单位">
                </a-input>
            </a-form-model-item>

            <a-form-model-item label="专题" prop="specialSubjectId">
                <a-select v-model="form.specialSubjectId" size="large" placeholder="专题">
                    <a-select-option :value="item.value" v-for="item in subjectList" :key="item.label">{{item.label}}</a-select-option>
                </a-select>
            </a-form-model-item>
        

            <a-form-model-item style="text-align: center;">
                <a-button type="primary" html-type="submit" size="large" :disabled="form.type === '' || form.pp === ''">
                    采集
                </a-button>
                <a-button type="primary" html-type="submit"  size="large" style="margin-left:10px;" :disabled="form.type === '' || form.pp === ''">
                    重置
                </a-button>
                <a-button type="danger" html-type="submit" size="large" style="margin-left:10px" :disabled="form.type === '' || form.pp === ''">
                    停止采集
                </a-button>

        </a-form-model-item>
    </a-form-model>
    
  </div>
</div>
</template>

<script>
import { acqData } from '@/api/index'
import { mixinObj } from '@/mixins/dataMixin'
export default {
    name: 'scopus',
    mixins: [mixinObj],
    data(){
        return {
            form: {
                query: '',
                key: '',
                specialSubjectId: ''
            },
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    acqData('/dp-collection/scopus/grab', this.form)
                        .then(res => {
                            console.log(res);
                        }).catch(err => {
                            console.log(err);
                        })
                }
            })
        },
    }
}
</script>

<style>

</style>
