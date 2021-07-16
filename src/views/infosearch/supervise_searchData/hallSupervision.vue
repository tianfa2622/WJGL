<template>
  <div>
    <!-- <el-form ref="ruleForm" :model="ruleForm" label-width="125px" class="demo-ruleForm"> -->
    <el-row type="flex" justify="space-between">
      <el-col :span="8">
        <el-form-item label="流水号：">
          <el-input v-model="ruleForm.serialNum" style="width:100%" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item label="涉及内容：">
          <el-input v-model="ruleForm.involve" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="来文份数：">
          <el-input v-model.number="ruleForm.quantity" style="width:100%" placeholder="请输入来文份数"></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="ruleForm.contacts" style="width:100%" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="原件领导批示：">
          <el-input v-model="ruleForm.instructions" resize="none" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="登记人：">
          <el-input v-model="ruleForm.registrant" style="width:100%" placeholder="请输入登记人"></el-input>
        </el-form-item>
        <el-form-item label="批示人：">
          <el-select v-model="ruleForm.approvedBy" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in PSRoptions" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
        ></el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文号：">
          <el-input v-model="ruleForm.documentNum" style="width:100%" placeholder="请输入文号"></el-input>
        </el-form-item>
        <el-form-item label="督办号：">
          湘公督办[
          <el-input v-model.number="ruleForm.supervisionNum_1" :maxlength="4" style="width:70px;"></el-input>] <el-input v-model.number="ruleForm.supervisionNum_2" :maxlength="4" style="width:70px;"></el-input>号
        </el-form-item>
        <el-form-item label="来件渠道：">
          <el-input v-model="ruleForm.incomingChannel" style="width:100%" placeholder="请输入来件渠道"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="ruleForm.phone" style="width:100%" placeholder="请输入联系电话"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.remarks" resize="none" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="登记日期：">
          <el-date-picker v-model="registerDate" type="datetimerange" style="width:100%" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:Ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="批示时间：">
          <el-date-picker v-model="instructionsDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="来文内容：">
          <el-input v-model="ruleForm.content" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="办理情况：">
          <el-select v-model="ruleForm.situation" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in bloptions" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select
        ></el-form-item>
        <el-form-item label="来文单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.unit" style="width:100%" placeholder="请输入来文单位"></el-input>
        </el-form-item>
        <el-form-item label="收文时间：">
          <el-date-picker v-model="receivingDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="要求办结时间：">
          <el-date-picker v-model="completionDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss" @change="getTimeFormat"> </el-date-picker>
        </el-form-item>
        <el-form-item label="登记单位：">
          <el-input v-model="ruleForm.theApplicant" style="width:100%" placeholder="请输入登记单位"></el-input>
        </el-form-item>
        <el-form-item label="批示内容：">
          <el-input v-model="ruleForm.instructionsContent" placeholder="请输入内容"> </el-input>
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
      receivingDate: [],
      instructionsDate: []
    }
  },
  methods: {
    getTimeFormat() {
      if (this.registerDate.length > 0) {
        this.ruleForm.registerStartDate = this.registerDate[0]
        this.ruleForm.registerEndDate = this.registerDate[1]
      }
      if (this.completionDate.length > 0) {
        this.ruleForm.completionStartDate = this.completionDate[0]
        this.ruleForm.completionEndDate = this.completionDate[1]
      }
      if (this.receivingDate > 0) {
        this.ruleForm.receivingStartDate = this.receivingDate[0]
        this.ruleForm.receivingEndDate = this.receivingDate[1]
      }
      if (this.instructionsDate.length > 0) {
        this.ruleForm.instructionsStartDate = this.instructionsDate[0]
        this.ruleForm.instructionsEndDate = this.instructionsDate[1]
      }
    }
  }
}
</script>

<style></style>
