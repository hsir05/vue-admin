<template>
  <div class="">
    <!-- 图片上传组件辅助-->

    <!-- <el-form
            ref="newUploadForm"
            :model="newUploadForm"
            style="margin-bottom:15px;"
            label-width="80px"
            label-position="left"
            >
            <el-upload
            class="avatar-uploader"
            :action="serverUrl"
            name="file"
            :headers="header"
            :show-file-list="false"
            list-type="picture"
            :multiple="false"
            accept="image/*"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :http-request="handleUpload"
            :before-upload="beforeUpload">
            </el-upload>
         </el-form> -->
    <!-- v-loading="quillUpdateImg" -->
    <quill-editor
      class="editor"
      ref="myQuillEditor"
      v-model="content"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @ready="onEditorReady($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
  </div>
</template>

<script>
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { quillEditor } from "vue-quill-editor";
// import { ImportFile } from "@/api/upload/upload";
export default {
  name: "Ueditor",
  props: {
    fieldName: {
      type: String,
      default: function() {
        return "";
      }
    },
    value: {
      type: String
    },
    /*图片大小*/
    maxSize: {
      type: Number,
      default: function() {
        return 2000000;
      }
    },
    placeholder: {
      type: String,
      default: function() {
        return "请输入内容";
      }
    }
  },
  components: {
    quillEditor
  },
  data() {
    return {
      content: this.value,
      imageFileName: null,
      newUploadForm: {
        fileName: ""
      },
      quillUpdateImg: false,
      editorOption: {
        modules: {
          toolbar: {
            container: toolbarOptions,
            handlers: {
              // image: function(value) {
              // if (value) {
              //     // 触发input框选择图片文件
              //     document.querySelector(".avatar-uploader input").click();
              // } else {
              //     this.quill.format("image", false);
              // }
              // },
            }
          }
        },
        placeholder: this.placeholder, //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true //语法检测
      },
      serverUrl: "xxx", // 这里写你要上传的图片服务器地址
      header: {
        "Content-Type": "multipart/form-data"
      }
    };
  },
  watch: {
    value(val) {
      this.content = val;
      this.$emit("handleEdit", this.content, this.fieldName);
    }
  },
  methods: {
    // 失去焦点
    onEditorBlur(editor) {
      console.log(editor);
    },
    // 获得焦点
    onEditorFocus(editor) {
      console.log(editor);
    },
    // 开始
    onEditorReady(editor) {
      console.log(editor);
    },
    // 值发生变化
    onEditorChange(editor) {
      this.content = editor.html;
      this.$emit("handleEdit", this.content, this.fieldName);
    },
    beforeUpload(file) {
      this.files = file;
      const isLt2M = file.size < this.maxSize ? false : true;
      if (isLt2M) {
        this.$message.warning(
          `只能上传小于${this.maxSize / 1024 / 1024} M的文件!`
        );
        return;
      }
      this.imageFileName = file.name;
      this.quillUpdateImg = true;
    },
    handleUpload() {
      let headers = {
        "Content-Type": "multipart/form-data"
      };
      let fileFormData = new FormData();
      fileFormData.append("file", this.files, this.imageFileName); // 上传的文件
      fileFormData.append("fileName", this.newUploadForm.fileName); // 文件名

      let url = "/dp-data/minio/upload";
      console.log(url);
      console.log(headers);

      //   let _this = this;
      //   ImportFile(url, headers, fileFormData)
      //     .then(res => {
      //       let quill = _this.$refs.myQuillEditor.quill;
      //       let length = quill.getSelection().index;
      //       quill.insertEmbed(length, "image", res.data.link);
      //       quill.setSelection(length + 1);

      //       _this.quillUpdateImg = false;

      //       _this.$message({
      //         type: "success",
      //         message: "上传成功！"
      //       });
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    },
    uploadSuccess(res) {
      let quill = this.$refs.myQuillEditor.quill;
      if (res.code == 200) {
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.data.link);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    }
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    }
  }
};
</script>

<style scoped>
.editor {
  line-height: normal !important;
  height: 500px;
  margin-top: -44px;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
/deep/ .ql-container {
  height: calc(100% - 80px) !important;
}
.editor {
  width: 750px;
}
</style>
