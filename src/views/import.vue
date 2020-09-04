<template>
  <div class="box">
        <div class="breadcrumb-wrap">
            <a-breadcrumb style="border-bottom: 1px doshed #e5e5e5">
                <a-breadcrumb-item href=""> <a-icon type="home" /> 首页</a-breadcrumb-item>
                <a-breadcrumb-item>数据导出</a-breadcrumb-item>
            </a-breadcrumb>
        </div>
        <div class="btn-wrap">
            <a-button  type="primary" icon="delete">批量删除</a-button>
            <a-button  style="margin-left:10px" type="primary" icon="download">合并导出</a-button>
            <a-button  style="margin-left:10px" type="primary" icon="download">导出到Csv文件</a-button>
            <a-button  style="margin-left:10px" type="primary" icon="download">导出到Excel文件</a-button>
        </div>
        <a-table :columns="columns" :row-selection="rowSelection" :data-source="data" bordered>
            <p slot="action" slot-scope="records" href="javascript:;">{{records.title}}
                <a-button type="primary" size="small" icon="download">导出</a-button>
            </p>
        </a-table>
  </div>
</template>

<script>
export default {
    name: 'import',
    data(){
        return {
            rowSelection: {
                onChange:  (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                onSelect: (record, selected, selectedRows) => {
                    console.log(record, selected, selectedRows);
                },
                onSelectAll: (selected, selectedRows, changeRows) => {
                    console.log(selected, selectedRows, changeRows);
                },
            },
            columns: [
                {
                    title: '采集单位/表达式',
                    dataIndex: 'content',
                },
                {
                    title: '已采集条数',
                    dataIndex: 'collected',
                },
                {
                    title: '总条数',
                    dataIndex: 'total',
                },
                 {
                    title: '文献类型',
                    dataIndex: 'datafrom',
                },
                {
                    title: '年份/开始条数/key',
                    width:90,
                    dataIndex: 'year',
                },
                 {
                    title: '来源平台',
                    dataIndex: 'source',
                },
                { title: '操作', dataIndex: '', key: 'x', scopedSlots: { customRender: 'action' } }
            ],
            data: []
        }
    },
    methods: {
        onChange(){
            (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                }
        }
    }
}
</script>

<style>

</style>