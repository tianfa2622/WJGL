<template>
  <div style="width:100%">
    <el-row justify="space-between">
      <el-col :span="8">
        <el-form-item label="流水号：">
          <el-input v-model="ruleForm.name" placeholder="请输入流水号"></el-input>
          <!-- <span>{{ ruleForm.name ? ruleForm.name : 2100082 }}</span> -->
        </el-form-item>
        <el-form-item label="送呈单位：">
          <el-input v-model="ruleForm.name" placeholder="请选择单位"></el-input>
        </el-form-item>
        <el-form-item label="文号：">
          <el-input v-model="ruleForm.name" placeholder="请输入文号"></el-input>
        </el-form-item>
        <el-form-item label="部门警种意见：">
          <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="联系人：">
          <el-input v-model="ruleForm.name" placeholder="请输入联系人"></el-input>
        </el-form-item>
        <el-form-item label="登记日期：">
          <el-date-picker v-model="ruleForm.name" type="date" style="width:100%" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
        </el-form-item>
        <el-form-item label="登记人：">
          <el-input v-model="ruleForm.name" placeholder="请输入登记人"></el-input>
          <!-- <span>{{ ruleForm.name ? ruleForm.name : '王湘琴' }}</span> -->
        </el-form-item>
        <el-form-item label="备注：">
          <el-input v-model="ruleForm.name" type="textarea" :rows="3" resize="none" placeholder="请输入内容"> </el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="来文内容：">
          <el-input v-model="ruleForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input v-model="ruleForm.name" placeholder="请联系电话"></el-input>
        </el-form-item>
        <el-form-item label="登记单位：">
          <el-input v-model="ruleForm.name" placeholder="请输入登记单位"></el-input>
          <!-- <span>{{ ruleForm.name ? ruleForm.name : '厅长秘书处' }}</span> -->
        </el-form-item>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: ['ruleForm']
}
</script>

<style scoped></style>
