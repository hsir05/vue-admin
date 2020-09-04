<template>
<div class="box">
    <div class="breadcrumb-wrap">
        <a-breadcrumb style="border-bottom: 1px doshed #e5e5e5">
            <a-breadcrumb-item href=""> <a-icon type="home" /> 首页</a-breadcrumb-item>
            <a-breadcrumb-item> 爱学术采集 </a-breadcrumb-item>
        </a-breadcrumb>
    </div>
    <!-- 表单 -->
    <div class="wrap" style="width: 500px">
        <div class="clearfix" style="width: 500px">
            <a-upload :file-list="fileList" :remove="handleRemove" :before-upload="beforeUpload">
            <a-button> <a-icon type="upload" /> 题名文件</a-button>
            </a-upload>
            <a-button
            type="primary"
            :disabled="fileList.length === 0"
            :loading="uploading"
            style="margin-top: 16px"
            @click="handleUpload"
            >
            {{ uploading ? '正在上传...' : '开始上传' }}
            </a-button>
        </div>
    
  </div>
</div>
</template>

<script>
export default {
    name: 'axs',
    data(){
        return {
            fileList: [],
            uploading: false,
        }
    },
    methods: {
        handleRemove(file) {
            const index = this.fileList.indexOf(file);
            const newFileList = this.fileList.slice();
            newFileList.splice(index, 1);
            this.fileList = newFileList;
        },
        beforeUpload(file) {
            this.fileList = [...this.fileList, file];
            return false;
        },
         handleUpload() {
            const { fileList } = this;
            const formData = new FormData();
            fileList.forEach(file => {
                formData.append('files[]', file);
            });
            this.uploading = true;
            // reqwest({
            //     url: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
            //     method: 'post',
            //     processData: false,
            //     data: formData,
            //     success: () => {
            //     this.fileList = [];
            //     this.uploading = false;
            //     this.$message.success('upload successfully.');
            //     },
            //     error: () => {
            //     this.uploading = false;
            //     this.$message.error('upload failed.');
            //     },
            // });
        },
    }
}
</script>

<style>

</style>
