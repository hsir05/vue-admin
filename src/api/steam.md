# 说明

1. 关于流文件下载

    **必须在请求头必须设置 `config['responseType'] = 'blob'`**

```javascript
blobFileDownload(fileName, content){
    //构造一个blob对象来处理数据
    const blob = new Blob([content],{ type: 'application/vnd.ms-excel' })
    // 支持a标签download的浏览器
    if ('download' in document.createElement('a')) {
        const link = document.createElement('a')//创建a标签
        link.download = fileName//a标签添加属性
        link.style.display = 'none'
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()//执行下载
        URL.revokeObjectURL(link.href) //释放url
        document.body.removeChild(link)//释放标签
        this.$message.success('下载成功！')
    } else { //其他浏览器
        navigator.msSaveBlob(blob, fileName)
    }
}

const content = res.data
const fileName = "导出所有条目" + ".xlsx"
this.blobFileDownload(fileName, content)

```
