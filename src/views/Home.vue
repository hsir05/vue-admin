<template>
  <div class="home">
      <h3 class="dashbord-title">平台简介</h3>
    <a-list item-layout="horizontal" bordered :data-source="data">
        <a-list-item slot="renderItem" slot-scope="item, index">
            <span class="" style="margin-right:10px">{{index + 1}}.</span>
            <a-list-item-meta :description="item.content" style="text-align:center">
        </a-list-item-meta>
        </a-list-item>
    </a-list>
  </div>
</template>

<script>
export default {
  name: "dashbord",
 data(){
     return {
         data: [
             {
                 content: '本平台基于Selenium进行开发。设计知网、万方、CSCD、EI、爱学术平台的元数据及全文采集。'
             },
             {
                 content: '知网平台支持期刊、会议、博硕士、专利采集。采集效率为1天2000-3000条。数据集大小约为6000条，每年超出6000的部分无法采集。高频采集会导致封IP。'
             },
             {
                 content: '万方平台支持期刊、会议、博硕士、专利采集。采集效率为1天1500-2000条。数据集大小约为5000条，每年超出5000的部分无法采集。高频采集会导致页面加载速度过慢的问题。支持按年度采集'
             },
             {
                 content: 'CSCD平台采集效率为1天2000-4000条。数据集大小约为2000条，超过2000的部分必须进行分割，否则会造成数据丢失。支持高频采集和按条数采集'
             },
             {
                 content: 'EI平台支持期刊、会议、专著章节采集。采集效率为1天1000-1500条，支持按条数采集。超过4000的部分必须进行分割，否则会造成数据丢失。'
             },
             {
                 content: '爱学术平台首先要配置会员账号密码，然后才能采集。采集效率为1天150条，仅支持中文题名（不带特殊字符），否则会造成采集失败。高频采集会导致页面加载速度过慢的问题。'
             },
             {
                 content: `爱学术平台采集步骤：1、配置账号密码、下载路径、Excel生成路径、打开文件监控开关；2、组织题名文件；3、等待下载成功，Excel文件会自动出现在生成路径下。`
             },
             {
                 content: 'WOS平台支持期刊、会议采集。采集效率为1小时5000-10000条，使用高级检索表达式采集。因认证次数有限制，建议每小时采集1-2次。'
             },
         ]
     }
 }
};
</script>
<style scoped lang="scss">
.dashbord-title{
    text-align: center;
    font-size: 18px;
}
.ant-list-item-meta-description{
    text-align: left;
    color: #666;
    font-size: 16px;
}
.ant-list-item{
    align-items: flex-start;

}
</style>
