<template>
<div class="login-wrap">
    <a-form :form="form" @submit="handleSubmit" class="form">
        <h3 class="login-title">数据采集系统</h3>
        <a-form-item
        :validate-status="userNameError() ? 'error' : ''"
        :help="userNameError() || ''"
        >
        <a-input size="large"
            v-decorator="[
            'username',
            {
                rules: [{ required: true, message: '请输入用户名' }]
            }
            ]"
            placeholder="test"
        >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
        </a-form-item>
        <a-form-item
        :validate-status="passwordError() ? 'error' : ''"
        :help="passwordError() || ''"
        >
        <a-input-password placeholder="testUser123456" v-decorator="[
            'password',
            {
                rules: [{ required: true, message: '请输入密码 ' }]
            }
            ]" size="large" >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input-password> 

        <!-- <a-input size="large"
            v-decorator="[
            'password',
            {
                rules: [{ required: true, message: '请输入密码 ' }]
            }
            ]"
            :type="pwdType" 
            placeholder="testUser123456"
        >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input> -->
        </a-form-item>
        <a-form-item>
        <a-button
        size="large"
            type="primary"
            style="width:100%"
            html-type="submit"
            :disabled="hasErrors(form.getFieldsError())"
         >
            登录
        </a-button>
        </a-form-item>
    </a-form>
  </div>
</template>

<script>
function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

export default {
  name: "Login",
  data() {
    return {
      pwdType: 'password',
      hasErrors,
      form: this.$form.createForm(this, { name: "horizontal_login" })
    };
  }, 
  mounted() {
    this.$nextTick(() => {
      this.form.validateFields();
    });
  },
  methods: {
    userNameError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("username") && getFieldError("username");
    },
    passwordError() {
      const { getFieldError, isFieldTouched } = this.form;
      return isFieldTouched("password") && getFieldError("password");
    },
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
            this.$store.dispatch("login", values)
            .then(() => {
                this.$router.push({ path: "/" });
            })
            .catch(err => {
                console.log(err);
            })
        
        }
      });
    } 
  }
};
</script>
<style lang="scss" scoped>
.login-wrap{
    background-color: #435760;
    height: 100%;
}
.form {
  width: 400px;
  padding: 30px;
  margin: 0 auto;
  border: 1px solid #e5e5e5;
  border-radius: 3px;
  transform: translateY(50%);
  background-color: white;
}
.login-title {
  text-align: center;
  padding: 10px;
  font-size: 24px;
}
</style>
