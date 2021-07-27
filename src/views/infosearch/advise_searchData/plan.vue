<template>
  <div>
    <!-- <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm"> -->
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <el-form-item label="流水号：">
          <el-input v-model="ruleForm.serialNum" style="width:100%" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item label="来文单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.unit" style="width:100%" placeholder="请输入来文单位"></el-input>
        </el-form-item>
        <el-form-item label="交办时间：">
          <el-date-picker v-model="assignmentDate" type="datetimerange" style="width:100%" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:Ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="主办单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择主办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.subUnit" style="width:100%" placeholder="请输入主办单位"></el-input>
        </el-form-item>
        <el-form-item label="领衔委员：">
          <el-input v-model="ruleForm.leadingMember" style="width:100%" placeholder="请输入领衔委员"></el-input>
        </el-form-item>
        <el-form-item label="登记人：">
          <el-input v-model="ruleForm.registrant" style="width:100%" placeholder="请输入登记人"></el-input>
        </el-form-item>
        <el-form-item label="届：">
          <el-input v-model="ruleForm.session" style="width:100%" placeholder="请输入届"></el-input>
        </el-form-item>
        <el-form-item label="批示人：">
          <el-select v-model="ruleForm.approvedBy" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in PSRoptions" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
        ></el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.remarks" resize="none" placeholder="请输入内容"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="登记日期：">
          <el-date-picker v-model="registerDate" type="datetimerange" style="width:100%" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:Ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="界别：">
          <el-input v-model="ruleForm.circles" style="width:100%" placeholder="请输入界别"></el-input>
        </el-form-item>
        <el-form-item label="政协提案编号：">
          <el-input v-model="ruleForm.number" style="width:100%" placeholder="请输入提案编号"></el-input>
        </el-form-item>
        <el-form-item label="分办单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择分办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.hostUnit" placeholder="请输入分办单位"> </el-input>
        </el-form-item>
        <el-form-item label="办公电话：">
          <el-input v-model="ruleForm.officePhone" style="width:100%" placeholder="请输入办公电话"></el-input>
        </el-form-item>
        <el-form-item label="登记单位：">
          <el-input v-model="ruleForm.theApplicant" style="width:100%" placeholder="请输入登记单位"></el-input>
        </el-form-item>
        <el-form-item label="次：">
          <el-input v-model="ruleForm.second" style="width:100%" placeholder="请输入次"></el-input>
        </el-form-item>
        <el-form-item label="批示时间：">
          <el-date-picker v-model="instructionsDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="实际办结时间：">
          <el-date-picker v-model="concludeDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="标题：">
          <el-input v-model="ruleForm.title" style="width:100%" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="要求办结时间：">
          <el-date-picker v-model="completionDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="办理情况：">
          <el-select v-model="ruleForm.situation" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in bloptions" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
        ></el-form-item>
        <el-form-item label="会办单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择会办单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.organization" placeholder="请输入会办单位"> </el-input>
        </el-form-item>
        <el-form-item label="手机：">
          <el-input v-model="ruleForm.phoneNumber" style="width:100%" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item label="通讯地址：">
          <el-input v-model="ruleForm.postalAddress" style="width:100%" placeholder="请输入通讯地址"></el-input>
        </el-form-item>
        <el-form-item label="邮编：">
          <el-input v-model="ruleForm.postcode" style="width:100%" placeholder="请输入邮编"></el-input>
        </el-form-item>
        <el-form-item label="批示内容：">
          <el-input v-model="ruleForm.instructionsContent" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="办结备注：">
          <el-input v-model="ruleForm.comment" placeholder="请输入内容"> </el-input>
        </el-form-item>
      </el-col>
    </el-row>
    <!-- </el-form> -->
  </div>
</template>

<script>
export default {
  props: ['ruleForm', 'options', 'PSRoptions', 'bloptions'],
  data() {
    return {
      registerDate: [],
      completionDate: [],
      // receivingDate: [],
      instructionsDate: [],
      assignmentDate: [],
      concludeDate: []
    }
  },
  methods: {
    getTimeFormat() {
      if (this.registerDate && this.registerDate.length > 0) {
        this.ruleForm.registerStartDate = this.registerDate[0]
        this.ruleForm.registerEndDate = this.registerDate[1]
      }
      if (this.completionDate && this.completionDate.length > 0) {
        this.ruleForm.completionStartDate = this.completionDate[0]
        this.ruleForm.completionEndDate = this.completionDate[1]
      }
      if (this.assignmentDate && this.assignmentDate.length > 0) {
        this.ruleForm.assignmentStartDate = this.assignmentDate[0]
        this.ruleForm.assignmentEndDate = this.assignmentDate[1]
      }
      if (this.instructionsDate && this.instructionsDate.length > 0) {
        this.ruleForm.instructionsStartDate = this.instructionsDate[0]
        this.ruleForm.instructionsEndDate = this.instructionsDate[1]
      }
      if (this.concludeDate && this.concludeDate.length > 0) {
        this.ruleForm.concludeStartDate = this.concludeDate[0]
        this.ruleForm.concludeEndDate = this.concludeDate[1]
      }
      this.$emit('update:rule-form', this.ruleForm)
    }
  }
}
</script>

<style></style>
