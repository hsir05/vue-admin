<template>
<div class="box">
    <div class="breadcrumb-wrap">
        <a-breadcrumb style="border-bottom: 1px doshed #e5e5e5">
            <a-breadcrumb-item href=""> <a-icon type="home" /> 首页</a-breadcrumb-item>
            <a-breadcrumb-item> CSCD采集 </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <!-- 表单 -->
    <div class="wrap">
        <div class="progress-wrap">
            <h4 class="progress-title">采集进度</h4>
            <a-progress :percent="percent" />
        </div>

        <a-form-model ref="ruleForm"  :rules="rules" :model="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 18 }" @submit="handleSubmit" @submit.native.prevent class="form-wrap">
        <a-form-model-item label="文献类型" prop="type">
            <a-select v-model="form.type" size="large" placeholder="文献类型">
                <a-select-option value="perio">引文</a-select-option>
            </a-select>
        </a-form-model-item>

          <a-form-model-item label="专题" prop="specialSubjectId">
            <a-select v-model="form.specialSubjectId" size="large" placeholder="专题">
                <a-select-option :value="item.value" v-for="item in subjectList" :key="item.label">{{item.label}}</a-select-option>
            </a-select>
        </a-form-model-item>

        <a-form-model-item  label="机构" prop="title">
            <a-input v-model="form.title"  size="large" type="text" placeholder="采集单位">
            </a-input>
        </a-form-model-item>
         <a-form-model-item  label="开始采集数" prop="year">
            <a-input v-model="form.year"  size="large" type="text" placeholder="开始采集数(序号)">
            </a-input>
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
    name: 'zw',
    mixins: [mixinObj], 
    data(){
        return {
            form: {
                user: '',
                password: '',
            },
              percent: 0, 
            type: {
                '1': '/dp-collection/zw/journal',
                '2': '/dp-collection/professional',

                '3': '/dp-collection/meeting',
                '4': '/dp-collection/professionalMeeting',

                '5': '/dp-collection/patent',
                '6': '/dp-collection/professionalPatent',

                '7': '/dp-collection/master',
                '8': '/dp-collection/professionalMaster',
            },
        }
    },
    methods: {
        handleSubmit() {
            this.$refs.ruleForm.validate(valid => {
                if (valid) {
                    acqData('/dp-collection/cscd/grab', this.form)
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
