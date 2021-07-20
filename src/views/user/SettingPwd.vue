<template>
  <div class="center-box">
    <el-form
      :model="formData"
      class="input-item"
      :rules="rules"
      label-width="100px"
      ref="pwdForm"
    >
      <el-form-item
        label="原密码"
        prop="oldPwd"
      >
        <el-input v-model="formData.oldPwd"></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPwd"
      >
        <el-input v-model="formData.newPwd"></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="newPwd2"
      >
        <el-input v-model="formData.newPwd2"></el-input>
      </el-form-item>
    </el-form>
    <div>
      <el-button
        type="primary"
        @click="toUpdatePwd"
      >确认</el-button>
      <el-button @click="cancle">取消</el-button>
    </div>
  </div>
</template>

<script>
import { reactive, ref, toRefs } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { changePwd } from '@/api/account'
import crypto from 'crypto'
import { ElMessage } from 'element-plus'

export default {
  name: 'SettingPwd',
  setup () {
    const router = useRouter()
    const validatePwd2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== state.formData.newPwd) {
        callback(new Error('两次输入密码不一致！'))
      } else {
        callback()
      }
    }

    const state = reactive({
      formData: {
        oldPwd: '',
        newPwd: '',
        newPwd2: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: '原密码不能为空', trigger: 'blur' }
        ],
        newPwd: [
          { required: true, message: '新密码不能为空', trigger: 'blur' },
          { max: 18, min: 6, message: '密码长度在6-18位之间', trigger: 'blur' }
        ],
        newPwd2: [
          { required: true, message: '请输入确认密码', trigger: 'blur' },
          { validator: validatePwd2, trigger: 'blur' }
        ]
      }
    })

    function cryptoEncode (data) {
      const md5 = crypto.createHash('md5')
      md5.update(data)
      md5.update(data).toString()
      const encodeData = md5.update(md5.update(data).toString())
      return encodeData.digest('hex')
    }

    const pwdForm = ref()
    const toUpdatePwd = () => {
      pwdForm.value.validate((valid) => {
        if (valid) {
          const oldPwd = cryptoEncode(state.formData.oldPwd)
          console.log(oldPwd)
          const newPwd = cryptoEncode(state.formData.newPwd)
          console.log(newPwd)
          const params = { oldPwd, newPwd }
          changePwd(params).then(res => {
            console.log('res==>', res)
            if (res.retCode === 200) {
              ElMessage.success('密码修改成功，请牢记！')
              router.go(-1)
            } else {
              ElMessage.error(res.retMsg)
            }
          })
        }
      })
    }

    const cancle = () => {
      router.go(-1)
    }

    return {
      ...toRefs(state),
      toUpdatePwd,
      cancle,
      pwdForm
    }
  }
}
</script>

<style lang="scss" scoped>
.center-box {
  width: 400px;
  height: 300px;
  border-radius: 10px;
  border: 1px solid #999999;
  margin: 0 auto;
  transform: translateY(50%);
  text-align: center;
  .center-box-title {
    line-height: 50px;
    border-bottom: 1px solid #999999;
  }
  .input-item {
    margin: 20px 20px;
  }
}
</style>
