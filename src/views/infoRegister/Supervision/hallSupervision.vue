<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>督办件</el-breadcrumb-item>
          <el-breadcrumb-item>厅批督办件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <!-- 头部按钮 -->
        <div slot="header" class="clearfix">
          <div class="box-card_header_title">
            <span>厅批督办件登记</span>
          </div>
          <el-row type="flex" justify="space-around">
            <el-col :span="5">
              <el-button @click="LogBtn">日志</el-button>
              <el-popover v-model="visible" placement="top" width="400" trigger="click" title="打印条形码" style="margin-left:10px">
                <el-row type="flex" justify="center">
                  <svg id="barcode"></svg>
                </el-row>
                <div style="text-align: center; margin: 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button v-print="printObj" type="primary" size="mini" @click="visible = false">确定</el-button>
                </div>
                <el-button slot="reference" :disabled="barcodeData === null">条形码打印</el-button>
              </el-popover>
            </el-col>
            <el-col :span="4">
              <el-button>督办单</el-button>
              <el-button @click="ScanCodeToSign">扫码签收</el-button>
            </el-col>
          </el-row>
        </div>

        <!-- 基本信息 -->
        <el-card class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>基本信息</span>
            <el-button v-if="BtnType !== 'View'" style="float: right;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button style="float: right; padding: 3px 10px" type="text" @click="resetForm('ruleForm')">重置</el-button> -->
          </div>

          <el-form ref="ruleForm" :disabled="disabled" :model="ruleForm" :rules="rules" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" required>
                  <span>{{ ruleForm.serialNum }}</span>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="文号：">
                  <el-input v-model="ruleForm.documentNum" placeholder="请输入文号"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文内容：" prop="content">
                  <el-input v-model="ruleForm.content" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="涉及内容：">
                  <el-input v-model="ruleForm.involve" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="督办号：">
                  湘公督办[
                  <el-input v-model.number="ruleForm.supervisionNum_1" maxlength="4" style="width:70px;"></el-input> ] <el-input v-model.number="ruleForm.supervisionNum_2" maxlength="4" style="width:70px;"></el-input>号
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="收文时间：">
                  <el-date-picker v-model="ruleForm.receivingTime" style="width:100%" type="datetime" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文份数：" prop="quantity">
                  <el-input v-model.number="ruleForm.quantity" placeholder="请输入来文份数"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="来件渠道：">
                  <el-input v-model="ruleForm.incomingChannel" placeholder="请输入来件渠道"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="来文单位：" prop="unit">
                  <!-- <el-select v-model="ruleForm.unit" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select> -->
                  <el-input v-model="ruleForm.unit" placeholder="请输入来文单位"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系人：" prop="contacts">
                  <el-input v-model="ruleForm.contacts" placeholder="请输入联系人"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记日期："> <el-date-picker v-model="ruleForm.registerDate" type="datetime" placeholder="选择日期" style="width:100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker></el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="原件领导批示：">
                  <el-input v-model="ruleForm.instructions" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-row>
                  <el-col :span="12">
                    <el-form-item label="登记人：">
                      <span>{{ ruleForm.registrant }}</span>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="登记单位：">
                      <span>{{ ruleForm.theApplicant }}</span>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="备注：">
                  <el-input v-model="ruleForm.remarks" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </el-card>

        <!-- 送呈领导 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>送呈领导</span>
          </div>

          <el-row>
            <el-col :span="4" style="text-align:center"><div style="padding:10px 0;">领导批示：</div></el-col>
            <el-col :span="18">
              <el-button v-for="(ld, index) in Ldlist" :key="index" plain class="leadershipBtn" :disabled="disabled" @click="addDomain(ld)">
                {{ ld.name }}
              </el-button>
            </el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="22">
              <el-card v-for="(item, index) in ruleForm.delivers" :key="index" class="box-card">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="20">
                    <el-form ref="InstructionsForm" :disabled="disabled === true ? disabled : item.read" label-width="90px" class="demo-dynamic">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="批示人：">
                            <span>{{ item.approvedBy }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="16">
                          <el-form-item label="批示时间：">
                            <el-date-picker v-model="item.instructionsData" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                            <el-button style="margin-left:10px" @click="item.read = true">{{ item.read === true ? '已圈阅' : '圈阅' }}</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="批示内容：">
                        <el-input v-model="item.instructionsContent" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" class="delete_btn_class" :disabled="disabled" @click="delInstructions(index)">删 除</el-button>
                  </el-col>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>

        <!-- 办理 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办理</span>
          </div>
          <el-row type="flex" justify="center">
            <el-col :span="10">
              <el-form ref="HandleForm" :disabled="disabled" :model="HandleForm" label-width="120px">
                <el-form-item label="主办责任单位：">
                  <el-input v-model="HandleForm.hostUnit" placeholder="请输入主办责任单位"></el-input>
                </el-form-item>
                <el-form-item label="会办责任单位：">
                  <el-input v-model="HandleForm.toDoUnit" placeholder="请输入会办责任单位"></el-input>
                </el-form-item>
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="HandleForm.requiredDate" style="width:100%;" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="HandleForm.remark" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>

        <!-- 办结 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>办结</span>
          </div>
          <el-row type="flex" justify="center">
            <el-form ref="FinishForm" :model="bjsj" :disabled="disabled === true ? disabled : bjsj.situation" label-width="90px" class="demo-dynamic">
              <el-col :span="18">
                <el-form-item label="办结时间：">
                  <el-date-picker v-model="bjsj.concludeData" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                  <el-button style="margin-left:30px" type="primary" @click="bjsj.situation = true">{{ bjsj.situation === true ? '已办结' : '办结' }}</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="备注：">
                  <el-input v-model="bjsj.comment" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
            </el-form>
          </el-row>
        </el-card>

        <!-- 附件 -->
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <span>附件</span>
          </div>
          <el-row type="flex" justify="center">
            <el-col :span="18">
              <el-row type="flex" justify="center">
                <el-col :span="2">
                  <span>附件：</span>
                </el-col>
                <el-col :span="10">
                  <el-upload action="" :on-remove="handleRemove" :on-exceed="handleExceed" :before-remove="beforeRemove" :multiple="false" :limit="1" :file-list="fileList" :auto-upload="false">
                    <el-link type="danger">添加附件</el-link>
                  </el-upload>
                  <div style="margin-top:20px">
                    <span style="color:#5a81a9;font-size:14px">模拟上传文件.word</span>
                    <el-link type="danger" style="margin-left:20px" @click="downTemplate">下载</el-link>
                  </div>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </el-card>

        <!--跟踪办理  -->
        <template v-if="BtnType !== 'Add'">
          <el-card v-if="$store.state.code == 1" class="box-card  Children">
            <div slot="header" class="clearfix">
              <el-row type="flex" justify="space-between" align="middle">
                <el-col :span="4">
                  <span>跟踪办理</span>
                </el-col>
                <el-col :span="4">
                  <el-button :disabled="disabled" @click="addTracking">添加</el-button>
                </el-col>
              </el-row>
            </div>
            <el-row v-for="(j, i) in trackingData" :key="i" style="margin-bottom:20px">
              <el-form ref="FinishForm" label-width="110px" :disabled="disabled" class="demo-dynamic">
                <el-col>
                  <el-card style="padding-left:30px">
                    <!-- 跟踪办理情况模块 -->
                    <el-row type="flex" justify="space-between">
                      <el-col :span="18">
                        <el-row>
                          <el-col :span="18" style="margin-left:30px">
                            <el-form-item label="要求办结时间：">
                              <el-date-picker v-model="j.requiredDate" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                            </el-form-item>
                          </el-col>
                          <el-col :span="18" style="margin-left:30px">
                            <el-form-item label="跟踪办理情况：">
                              <el-input v-model="j.track" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                            </el-form-item>
                          </el-col>
                        </el-row>
                      </el-col>
                      <el-col :span="3">
                        <el-button type="danger" @click="delTracking(i)">删除</el-button>
                      </el-col>
                    </el-row>

                    <!-- 跟踪办理领导批示模块 -->
                    <el-row>
                      <el-col :span="4" style="text-align:center"><div style="padding:10px 0;">领导批示：</div></el-col>
                      <el-col :span="18">
                        <el-button v-for="(ld, index) in Ldlist" :key="index" plain class="leadershipBtn" :disabled="disabled" @click="addDomain1(ld, i)">
                          {{ ld.name }}
                        </el-button>
                      </el-col>
                    </el-row>

                    <!-- 跟踪办理领导批示输入框模块 -->
                    <el-row type="flex" justify="center" style="margin-top:20px">
                      <el-col :span="23">
                        <el-card v-for="(item, index) in j.delivers" :key="index" class="box-card">
                          <el-row type="flex" justify="space-between" align="middle">
                            <el-col :span="20">
                              <el-row>
                                <el-col :span="8">
                                  <el-form-item label="批示人：">
                                    <span>{{ item.approvedBy }}</span>
                                  </el-form-item>
                                </el-col>
                                <el-col :span="16">
                                  <el-form-item label="批示时间：">
                                    <el-date-picker v-model="item.instructionsData" :disabled="disabled === true ? disabled : item.read" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                                    <el-button style="margin-left:10px" :disabled="disabled === true ? disabled : item.read" @click="item.read = true">{{ item.read === true ? '已圈阅' : '圈阅' }}</el-button>
                                  </el-form-item>
                                </el-col>
                              </el-row>
                              <el-form-item label="批示内容：">
                                <el-input v-model="item.instructionsContent" :disabled="disabled === true ? disabled : item.read" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                              </el-form-item>
                            </el-col>
                            <el-col :span="3">
                              <el-button type="danger" class="delete_btn_class" @click="delInstructions1(index, i)">删 除</el-button>
                            </el-col>
                          </el-row>
                        </el-card>
                      </el-col>
                    </el-row>

                    <!-- 跟踪办理附件模块 -->
                    <el-row type="flex" justify="center">
                      <el-col :span="22">
                        <el-row type="flex">
                          <el-col :span="2">
                            <span>附件：</span>
                          </el-col>
                          <el-col :span="10">
                            <el-upload action="" :on-remove="handleRemove" :on-exceed="handleExceed" :before-remove="beforeRemove" :multiple="false" :limit="1" :file-list="j.fileList" :auto-upload="false">
                              <el-link type="danger">添加附件</el-link>
                            </el-upload>
                            <div style="margin-top:20px">
                              <span style="color:#5a81a9;font-size:14px">模拟上传文件.word</span>
                              <el-link type="danger" style="margin-left:20px" @click="downTemplate">下载</el-link>
                            </div>
                          </el-col>
                        </el-row>
                      </el-col>
                    </el-row>

                    <!-- 跟踪办理办结模块 -->
                    <el-row type="flex" class="GZBLBJ_class" style="margin-top:10px">
                      <el-col :span="18">
                        <el-form-item label="实际办结时间：">
                          <el-date-picker v-model="j.concludeData" :disabled="disabled === true ? disabled : j.situation" type="datetime" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                          <el-button style="margin-left:30px" type="primary" :disabled="disabled === true ? disabled : j.situation" @click="j.situation = true">{{ j.situation === true ? '已办结' : '办结' }}</el-button>
                        </el-form-item>
                      </el-col>
                      <el-col :span="18">
                        <el-form-item label="办结备注：">
                          <el-input v-model="j.comment" :disabled="disabled === true ? disabled : j.situation" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                        </el-form-item>
                      </el-col>
                    </el-row>
                  </el-card>
                </el-col>
              </el-form>
            </el-row>
          </el-card>
        </template>
      </el-card>

      <el-card class="box-card">
        <el-row type="flex" justify="space-around" class="search_box">
          <el-col :span="7">
            <span class="span_color" style="margin-left:15px">流水号:</span>
            <el-input v-model="conditionInputs.serialNum" style="width:70%" placeholder="请输入内容" clearable> </el-input>
          </el-col>
          <el-col :span="7">
            <span class="span_color">来文内容:</span>
            <el-input v-model="conditionInputs.content" style="width:70%" placeholder="请输入内容" clearable> </el-input>
          </el-col>
          <el-col :span="7">
            <span class="span_color">办理情况:</span>
            <el-select v-model="conditionInputs.situation" style="width:70%" clearable placeholder="请选择">
              <el-option v-for="item in blqkSelect" :key="item.value" :label="item.label" :value="item.value"> </el-option>
            </el-select>
          </el-col>
          <el-col :span="16" style="margin-top:15px">
            <span class="span_color">收文时间:</span>
            <el-date-picker v-model="timeData" type="daterange" range-separator="-" value-format="yyyy-MM-dd HH:mm:ss" start-placeholder="开始日期" end-placeholder="结束日期"> </el-date-picker>
          </el-col>
          <el-col :span="6" style="margin-top:15px;text-align:center">
            <el-button style="width:150px" @click="search(conditionInputs)">查询</el-button>
            <el-button style="width:150px" type="danger" @click="batchDeletion">批量删除</el-button>
          </el-col>
        </el-row>
        <el-table :data="tableData" border style="width: 100%" height="500" @selection-change="handleSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column label="序号" type="index" width="50px" align="center" :resizable="false"></el-table-column>
          <el-table-column label="文件类型" prop="fileType" :resizable="false" align="center">
            <template slot-scope="scope">
              <template v-for="wjlx in wj_Type">
                <span v-if="scope.row.fileType === wjlx.value" :key="wjlx.value">{{ wjlx.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" header-align="center" prop="serialNum" :resizable="false"> </el-table-column>
          <el-table-column label="督办号" prop="supervisionNum" min-width="160" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="receivingTime" min-width="110" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="文号" prop="documentNum" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="unit" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="content" min-width="200" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="要求办结时间" :resizable="false" min-width="110" prop="completionTime" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.transactions[0].requiredDate }}</span>
            </template>
          </el-table-column>
          <el-table-column label="登记人" prop="registrant" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="文件状态" prop="fileStatus" align="center" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.fileStatus === 1">未签收</span>
              <span v-if="scope.row.fileStatus === 2">已签收</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row.serialNum)">查看</el-link>
              <el-link type="primary" class="ml_15" @click="tableModify(scope.row)">修改</el-link>
              <el-link type="danger" class="ml_15" @click="tabeleDel(scope.row)">删除</el-link>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination :current-page="currentPage" :page-sizes="[10, 15, 20, 25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange"> </el-pagination>
      </el-card>
    </div>

    <SignFordialog :sig="sigDialogVisible" @setsig="getsig"></SignFordialog>
    <LogDialog :is-show="logDialogVisible" @SetClose="SetClose" />
  </div>
</template>

<script>
import SignFordialog from './Dialog/topsupsignFordialog'
// import LogDialog from './LogDialog/hallSupervision.vue'
import LogDialog from '@/components/LogDialog.vue'
import { searchAll, Add, Del, getDicGroupBy, searchOne, ModifyApi } from '@/api/infoRegister/Supervision/hallSupervision'
import { validatePhoneTwo, validateContacts, validateNumber } from '@/utils/verification'
import { getProjectNum } from '@/utils/comm'
import dayjs from 'dayjs'
import JsBarcode from 'jsbarcode'
export default {
  components: {
    // 扫码签收
    SignFordialog,
    // 日志弹出组件
    LogDialog
  },
  data() {
    return {
      barcodeData: null,
      visible: false,
      printObj: {
        id: 'barcode', // 打印的元素id
        popTitle: '二维码打印', // 打印的标题
        extraCss: '', // 打印可引入外部的一个css文件
        extraHead: '' // 打印头部文字
      },
      serialNum: null,
      // 文件类型
      wj_Type: [
        { value: 1, label: '呈批件' },
        { value: 2, label: '上级来文' },
        { value: 3, label: '平级和下级来文' },
        { value: 4, label: '群众来信' },
        { value: 5, label: '其他' },
        { value: 6, label: '上级督办件' },
        { value: 7, label: '厅批督办件' },
        { value: 8, label: '政协提案' },
        { value: 9, label: '人大建议' }
      ],
      ruleForm: {
        serialNum: getProjectNum(),
        registrant: this.$store.state.registrant,
        theApplicant: this.$store.state.Registered_unit,
        receivingTime: new Date(),
        quantity: 1,
        // completionTime: new Date(),
        registerDate: new Date(),
        fileType: 7,
        phone: null,
        documentNum: null,
        content: null,
        involve: null,
        incomingChannel: null,
        unit: null,
        contacts: null,
        instructions: null,
        remarks: null,
        supervisionNum_1: null,
        supervisionNum_2: null,
        transactions: [],
        delivers: [],
        concludes: [],
        trackings: []
      },
      rules: {
        contacts: [
          { required: true, message: '请输入联系人', trigger: 'blur' },
          { min: 2, max: 5, message: '长度在 2 到 5 个字符', trigger: 'blur' }
        ],
        unit: [{ required: true, message: '请选择单位', trigger: 'blur' }],
        content: [{ required: true, message: '请输入内容', trigger: 'blur' }],
        phone: [
          { required: false, trigger: 'blur' },
          { validator: validatePhoneTwo, trigger: 'blur' }
        ],
        quantity: [
          { required: false, trigger: 'blur' },
          { validator: validateNumber, trigger: 'blur' }
        ],
        hz: [{ validator: validateContacts, trigger: 'blur' }]
      },
      options: [],
      blqkSelect: [
        { label: '未办结', value: 1 },
        { label: '已办结', value: 0 }
      ],
      conditionInputs: {},
      timeData: [],
      tableData: [],
      // 当前页面
      currentPage: 1,
      // 当前展示条数
      pageSize: 10,
      // 总数
      total: 20,
      // 领导数据
      Ldlist: [],
      // 办结数据
      bjsj: {
        concludeData: new Date(),
        situation: false,
        comment: null
      },
      // 办理框数据
      HandleForm: {},
      // 跟踪办结数据
      trackingData: [],
      sigDialogVisible: false,
      wqrqzlxsl: 0,
      logDialogVisible: false, // 显示日志弹出框
      // 上传文件列表
      fileList: [],
      // 表格选择项
      multipleSelection: [],
      // 推送模块表格数据
      personnelTableData: [],
      BtnType: 'Add',
      disabled: false
    }
  },
  created() {
    this.serialNum = this.$route.params.serialNum
    if (this.serialNum) {
      this.tableView(this.serialNum)
    }
    this.search()
    this.getLdList()
  },
  methods: {
    // 生成条形码
    getBarcode() {
      let data = 12345
      if (this.barcodeData) {
        data = this.barcodeData
      }
      const options = {
        format: 'CODE128',
        displayValue: false,
        fontSize: 18,
        height: 100,
        width: 2
      }
      setTimeout(() => {
        JsBarcode('#barcode', data, options)
      }, 0)
      // window.setTimeout(function() {
      //   // JsBarcode('#barcode', data, {
      //   //   format: 'CODE39', // 选择要使用的条形码类型
      //   //   width: 2, // 设置条之间的宽度
      //   //   height: 100, // 高度
      //   //   displayValue: false, // 是否在条形码下方显示文字
      //   //   // text: data, // 覆盖显示的文本
      //   //   // font: 'fantasy', // 设置文本的字体
      //   //   background: '#eee', // 设置条形码的背景
      //   //   lineColor: '#2196f3', // 设置条和文本的颜色。
      //   //   margin: 15 // 设置条形码周围的空白边距
      //   // })
      //   JsBarcode('#barcode', data, options)
      // }, 0)
    },
    // 搜索按钮
    async search(data) {
      try {
        const pageData = {}
        let paramsData = {}
        if (data) {
          this.currentPage = 1
        }
        pageData.pageIndex = this.currentPage
        pageData.pageSize = this.pageSize
        pageData.fileType = 7
        paramsData = { ...data }
        if (this.timeData !== null && this.timeData.length > 0) {
          paramsData.receivingStartDate = this.timeData[0]
          paramsData.receivingEndDate = this.timeData[1]
        }
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
          res.data.forEach(e => {
            if (e.supervisionNum_1 && e.supervisionNum_2) {
              e.supervisionNum = `湘公督办 [ ${e.supervisionNum_1} ] ${e.supervisionNum_2} 号`
            } else {
              e.supervisionNum = '暂无数据'
            }
          })
          this.tableData = res.data
          this.total = res.count
          paramsData = {}
          if (data) {
            this.$message.success(res.message)
          }
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 获取领导数据
    async getLdList() {
      const res = await getDicGroupBy()
      if (res.code === 1) {
        this.Ldlist = res.data
      } else {
        this.$message('获取领导数据失败')
      }
    },
    // 切换每页条数
    handleSizeChange(val) {
      this.pageSize = val
      this.search()
    },
    // 切换当前页码
    handleCurrentChange(val) {
      this.currentPage = val
      this.search()
    },
    // 表格选择项发生变化时
    handleSelectionChange(val) {
      console.log(val)
      const arr = []
      val.forEach(e => {
        arr.push(e.serialNum)
      })
      this.multipleSelection = arr
    },
    // 批量删除
    async batchDeletion() {
      if (this.multipleSelection.length > 0) {
        this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          // eslint-disable-next-line space-before-function-paren
          .then(async () => {
            const id = this.multipleSelection.join(',')
            const res = await Del(id)
            if (res.code === 1) {
              this.$message.success(res.message)
              this.multipleSelection = []
              this.search()
            } else {
              this.$message.error(res.message)
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else {
        this.$message.info('请选择要删除的数据！')
      }
    },
    // 表格删除按钮
    tabeleDel(row) {
      this.$confirm('此操作将永久删除该条信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        // eslint-disable-next-line space-before-function-paren
        .then(async () => {
          const res = await Del(row.serialNum)
          if (res.code === 1) {
            this.$message.success(res.message)
            this.search()
          } else {
            this.$message.error(res.message)
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击领导名字增加批示框
    addDomain(data) {
      if (this.ruleForm.delivers !== []) {
        let XTnum = 0
        this.ruleForm.delivers.forEach(e => {
          if (data.name === e.approvedBy) {
            XTnum += 1
          }
        })
        if (XTnum > 2) {
          this.$message.error('领导最多可批示3次！')
        } else {
          this.ruleForm.delivers.push({
            approvedBy: data.name,
            instructionsData: new Date(),
            instructionsContent: '',
            read: false
          })
        }
      } else {
        this.ruleForm.delivers.push({
          approvedBy: data.name,
          instructionsData: new Date(),
          instructionsContent: '',
          read: false
        })
      }
    },
    // 批示框里删除按钮
    delInstructions(index) {
      if (index !== -1) {
        this.ruleForm.delivers.splice(index, 1)
      }
    },
    // 追加点击领导名字增加批示框
    addDomain1(data, i) {
      console.log(data, i)
      if (this.trackingData[i].delivers.length > 0) {
        let XTnum = 0
        this.trackingData[i].delivers.forEach(e => {
          if (data.name === e.approvedBy) {
            XTnum += 1
          }
        })
        if (XTnum > 2) {
          this.$message.error('领导最多可批示3次！')
        } else {
          this.trackingData[i].delivers.push({
            approvedBy: data.name,
            instructionsData: new Date(),
            instructionsContent: '',
            read: false
          })
        }
      } else {
        this.trackingData[i].delivers.push({
          approvedBy: data.name,
          instructionsData: new Date(),
          instructionsContent: '',
          read: false
        })
      }
    },
    // 追加批示框里删除按钮
    delInstructions1(index, i) {
      if (index !== -1) {
        this.trackingData[i].delivers.splice(index, 1)
      }
    },
    // 保存信息事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.ruleForm.receivingTime = dayjs(this.ruleForm.receivingTime).format('YYYY-MM-DD HH:mm:ss')
          this.ruleForm.registerDate = dayjs(this.ruleForm.registerDate).format('YYYY-MM-DD HH:mm:ss')
          this.ruleForm.completionTime = dayjs(this.ruleForm.completionTime).format('YYYY-MM-DD HH:mm:ss')
          // 判断批示内容和圈阅按钮，提交数据
          if (this.ruleForm.delivers && this.ruleForm.delivers.length > 0) {
            for (let i = 0; i < this.ruleForm.delivers.length; i++) {
              const p = this.ruleForm.delivers[i]
              if (p.instructionsContent !== '' || p.read === true) {
                p.instructionsData = dayjs(p.instructionsData).format('YYYY-MM-DD HH:mm:ss')
              } else {
                this.ruleForm.delivers.splice(i, 1)
              }
            }
            this.ruleForm.delivers.forEach(e => {
              e.instructionsData = dayjs(e.instructionsData).format('YYYY-MM-DD HH:mm:ss')
            })
          }
          // 判断办理数据
          if (Object.keys(this.HandleForm).length > 0) {
            this.ruleForm.transactions = [{ ...this.HandleForm }]
          }
          // 判断办结数据
          if (this.bjsj.comment || this.bjsj.situation === true) {
            const obj = this.bjsj
            obj.concludeData = dayjs(obj.concludeData).format('YYYY-MM-DD HH:mm:ss')
            this.ruleForm.concludes.push(obj)
          }
          // 判断追踪办理
          if (this.trackingData && this.trackingData.length > 0) {
            for (let i = 0; i < this.trackingData.length; i++) {
              const e = this.trackingData[i]
              if (e.track !== '' || e.delivers.length > 0 || e.comment !== '') {
                e.requiredDate = dayjs(e.requiredDate).format('YYYY-MM-DD HH:mm:ss')
                e.concludeData = dayjs(e.concludeData).format('YYYY-MM-DD HH:mm:ss')
                if (e.delivers.length > 0) {
                  for (let o = 0; o < e.delivers.length; o++) {
                    if (e.delivers[o].instructionsContent !== '' || e.delivers[o].read === true) {
                      e.delivers[o].instructionsData = dayjs(e.delivers[o].instructionsData).format('YYYY-MM-DD HH:mm:ss')
                    } else {
                      e.delivers.splice(o, 1)
                    }
                  }
                }
              } else {
                this.trackingData.splice(i, 1)
              }
            }
            this.ruleForm.trackings = this.trackingData
          }
          delete this.ruleForm.supervisionNum
          // this.$refs[formName].resetFields()
          switch (this.BtnType) {
            case 'Add':
              this.add(this.ruleForm)
              break
            case 'Modify':
              this.Modify(this.ruleForm)
              break
          }
        } else {
          return false
        }
      })
    },
    // 调取添加接口的方法
    async add(data) {
      try {
        const res = await Add({ ...data })
        if (res.code === 1) {
          this.$message.success(res.message)
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          Object.assign(this.$data.bjsj, this.$options.data().bjsj)
          this.HandleForm = {}
          Object.assign(this.$data.trackingData, this.$options.data().trackingData)
          this.BtnType = 'Add'
          this.search()
        } else {
          // this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 调取修改接口的方法
    async Modify(data) {
      try {
        // const obj = {}
        // obj.beforeDataChange = this.OldData
        // obj.AfterDataChange = data
        const res = await ModifyApi({ ...data })
        if (res.code === 1) {
          this.$message.success(res.message)
          Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
          Object.assign(this.$data.bjsj, this.$options.data().bjsj)
          this.HandleForm = {}
          Object.assign(this.$data.trackingData, this.$options.data().trackingData)
          this.BtnType = 'Add'
          this.search()
        } else {
          // this.$message.error(res.message)
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格查看按钮
    async tableView(row) {
      try {
        Object.assign(this.$data.ruleForm, this.$options.data().ruleForm)
        Object.assign(this.$data.bjsj, this.$options.data().bjsj)
        this.HandleForm = {}
        Object.assign(this.$data.trackingData, this.$options.data().trackingData)
        const res = await searchOne({ serialNum: row })
        if (res.code === 1) {
          this.$message.success(res.message)
          this.BtnType = 'View'
          this.disabled = true
          this.ruleForm = res.data
          this.barcodeData = res.data.serialNum
          if (res.data.concludes && res.data.concludes.length > 0) {
            this.bjsj = res.data.concludes[0]
          }
          if (res.data.transactions && res.data.transactions.length > 0) {
            this.HandleForm = res.data.transactions[0]
          }
          if (res.data.trackings && res.data.trackings.length > 0) {
            this.trackingData = res.data.trackings
          }
          this.getBarcode()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 表格修改按钮
    async tableModify(row) {
      try {
        const res = await searchOne({ serialNum: row.serialNum })
        if (res.code === 1) {
          this.disabled = false
          this.BtnType = 'Modify'
          // this.OldData = JSON.parse(JSON.stringify(res.data))
          // if (res.data.sclds === null) {
          //   res.data.sclds = []
          // }
          this.ruleForm = res.data
          this.barcodeData = res.data.serialNum
          if (res.data.concludes && res.data.concludes.length > 0) {
            this.bjsj = res.data.concludes[0]
          } else {
            Object.assign(this.$data.bjsj, this.$options.data().bjsj)
          }
          if (res.data.transactions && res.data.transactions.length > 0) {
            this.HandleForm = res.data.transactions[0]
          } else {
            this.HandleForm = {}
          }
          if (res.data.trackings && res.data.trackings.length > 0) {
            this.trackingData = res.data.trackings
          } else {
            Object.assign(this.$data.trackingData, this.$options.data().trackingData)
          }
          this.getBarcode()
        }
      } catch (error) {
        console.log(error)
      }
    },
    // 日志按钮
    LogBtn() {
      this.logDialogVisible = true
    },
    // 扫码签收
    ScanCodeToSign() {
      this.sigDialogVisible = true
    },
    // 重置事件
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 表格中操作>签收事件
    signForevent(row) {
      console.log(row)
      this.sigDialogVisible = true
    },
    // 组件传参->接收参数
    getsig(data) {
      this.sigDialogVisible = data
    },
    // 组件传参->接收参数 关闭日志
    SetClose(data) {
      this.logDialogVisible = data
    },
    // 上传列表删除
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    // 上传列表删除前
    beforeRemove(file, fileList) {
      console.log(file, fileList)
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    // 上传文件超出
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    // 下载附件按钮
    downTemplate() {},
    // 跟踪办理添加按钮
    addTracking() {
      this.trackingData.push({
        requiredDate: new Date(),
        track: '',
        delivers: [],
        concludeData: new Date(),
        situation: false,
        comment: ''
      })
    },
    // 删除办理框
    delTracking(index) {
      this.trackingData.splice(index, 1)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
}
.container .navigation {
  margin-bottom: 10px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: '';
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin-bottom: 15px;
}
.Children {
  width: 80%;
  margin: 0 auto;
  margin-bottom: 15px;
}
.condition {
  width: 100%;
  height: 50px;
  line-height: 50px;
  margin-bottom: 10px;
}
.condition .el-input {
  width: 180px;
  margin: 0 5px 0 5px;
}
.condition-col {
  display: inline-block;
  margin: 0 5px 0 5px;
}
.condition .el-select {
  width: 180px;
  margin: 0 5px 0 5px;
}
.el-pagination {
  margin: 15px 0 0 0;
  text-align: center;
}
.leadershipBtn:nth-child(n + 7) {
  margin-top: 10px;
}
.leadershipBtn:nth-child(8) {
  margin-top: 10px;
  /* margin-left: 0; */
}
.box-card_header_title {
  width: 100%;
  text-align: center;
}
.delete_btn_class {
  /* padding-top: 5px; */
  /* line-height: 8 !important; */
  margin-left: 20px;
  padding: 30px 15px;
}
::v-deep .delete_btn_class span {
  writing-mode: tb-rl;
}
/* .del_btn {
  height: 50%;
  margin-left: 20px;
} */
.search_box {
  flex-wrap: wrap;
  margin-bottom: 1.25rem;
}
.span_color {
  margin-right: 0.625rem;
}
.ml_15 {
  margin-left: 0.9375rem;
}
.GZBLBJ_class {
  flex-wrap: wrap;
}
</style>
