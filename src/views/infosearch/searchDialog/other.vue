<template>
  <div style="width:100%">
    <el-row justify="space-between">
      <el-col :span="8">
        <el-form-item label="流水号：">
          <el-input v-model="ruleForm.serial_num" placeholder="请输入流水号"></el-input>
        </el-form-item>
        <el-form-item label="收文时间：">
          <!-- <el-date-picker v-model="ruleForm.finish_date" type="datetime" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker> -->
          <el-date-picker v-model="ruleForm.finish_date" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="ruleForm.phone" placeholder="请联系电话"></el-input>
        </el-form-item>
        <el-form-item label="上级领导批示：">
          <el-input v-model="ruleForm.sjldps" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="批示人：">
          <el-select v-model="ruleForm.approvedBy" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in PSRoptions" :key="item.id" :label="item.name" :value="item.name"> </el-option> </el-select>
        </el-form-item>
        <el-form-item label="办结情况：">
          <el-select v-model="ruleForm.accom" style="width:100%" clearable placeholder="请选择"> <el-option v-for="item in bjqk" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
        </el-form-item>
        <el-form-item label="登记人：">
          <el-input v-model="ruleForm.registrant" placeholder="请输入登记人"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="文号：">
          <el-input v-model="ruleForm.reference_num" placeholder="请输入文号"></el-input>
        </el-form-item>
        <el-form-item label="联系人：">
          <el-input v-model="ruleForm.phone_name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="来文单位：">
          <!-- <el-select v-model="ruleForm.name" style="width:100%" clearable placeholder="请选择单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
          <el-input v-model="ruleForm.company" placeholder="请输入单位"></el-input>
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.comment" placeholder="请输入备注"> </el-input>
        </el-form-item>
        <el-form-item label="批示时间：">
          <el-date-picker v-model="ruleForm.instructionsDate" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
        </el-form-item>
        <el-form-item label="办结时间：">
          <el-date-picker v-model="ruleForm.conclude_data" style="width:100%" type="datetimerange" placeholder="选择日期" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
        </el-form-item>
        <el-form-item label="登记单位：">
          <el-input v-model="ruleForm.registrant_company" placeholder="请输入登记单位"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="来文份数：">
          <el-input v-model.number="ruleForm.number" placeholder="请输入份数"></el-input>
        </el-form-item>
        <el-form-item label="登记日期：">
          <el-date-picker v-model="ruleForm.creat_date" type="datetime" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
        </el-form-item>
        <el-form-item label="来文内容：">
          <el-input v-model="ruleForm.content" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="部门警种意见：">
          <el-input v-model="ruleForm.bmjzyj" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="批示内容：">
          <el-input v-model="ruleForm.instructionsContent" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="办结备注：">
          <el-input v-model="ruleForm.comments" placeholder="请输入备注"> </el-input>
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['ruleForm', 'PSRoptions'],
  data() {
    return {
      bjqk: [
        { label: '已办结', value: true },
        { label: '未办结', value: false }
      ]
    }
  }
}
</script>

<style scoped></style>
