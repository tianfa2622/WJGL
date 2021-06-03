<template>
  <div>
    <el-dialog title="平级和下级来文-签收文件" :visible.sync="sigDialogVisible" :close-on-click-modal="closeonclickmodal" :close-on-press-escape="closeonpressescape" width="30%" center>
      签字:<el-input v-model="textarea1" type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="请输入内容"> </el-input>
      备注：
      <el-input v-model="textarea2" type="textarea" :autosize="{ minRows: 5, maxRows: 10 }" placeholder="请输入内容"> </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="determine">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['sig'],
  data() {
    return {
      sigDialogVisible: false,
      closeonclickmodal: false,
      closeonpressescape: false,
      textarea1: '',
      textarea2: ''
    }
  },
  watch: {
    sig() {
      this.sigDialogVisible = this.sig
      console.log(this.sigDialogVisible)
    }
  },
  methods: {
    determine() {
      this.sigDialogVisible = false
      this.$emit('setsig', this.sigDialogVisible)
    }
  }
}
</script>

<style lang="less" scoped></style>
