<template>
  <section class="editor-wrap">
    <editor
      v-model="value"
      fieldName="value"
      @handleEdit="handleEdit"
      placeholder="请输入内容"
    ></editor>
  </section>
</template>

<script>
import Editor from "./modal/edit";
export default {
  components: {
    Editor
  },
  data() {
    return {
      value: "内容"
    };
  },
  methods: {
    handleEdit(val, field) {
      console.log(val);
      console.log(field);
    }
  }
};
</script>
<style scoped>
.editor-wrap {
  margin: 40px 0;
}
</style>
