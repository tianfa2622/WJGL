<template>
  <div>
    <div class="container">
      <div class="navigation">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>督办件</el-breadcrumb-item>
          <el-breadcrumb-item>上级督办件</el-breadcrumb-item>
        </el-breadcrumb>
      </div>

      <el-card class="box-card">
        <!-- 头部按钮 -->
        <div slot="header" class="clearfix">
          <div class="box-card_header_title">
            <span>上级督办件登记</span>
          </div>
          <el-row type="flex" justify="space-around">
            <el-col :span="5">
              <el-button @click="LogBtn">日志</el-button>
              <el-button>二维码打印</el-button>
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
            <el-button style="float: right;" type="primary" @click="submitForm('ruleForm')">提交</el-button>
            <!-- <el-button style="float: right; padding: 3px 10px" type="text" @click="resetForm('ruleForm')">重置</el-button> -->
          </div>

          <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="125px" class="demo-ruleForm">
            <el-row>
              <el-col :span="12">
                <el-form-item label="流水号：" required>
                  <el-input v-model="ruleForm.serialNum"></el-input>
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
                  <el-input v-model="ruleForm.supervisionNum" style="width:70px;"></el-input> ] <el-input v-model="ruleForm.supervisionNum" style="width:70px;"></el-input>号
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
                  <el-select v-model="ruleForm.unit" style="width:100%" clearable placeholder="请选择来文单位"> <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"> </el-option> </el-select>
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
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="ruleForm.completionTime" style="width:100%" type="datetime" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="联系电话：" prop="phone">
                  <el-input v-model="ruleForm.phone" placeholder="请输入联系电话"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="12">
                <el-form-item label="登记日期："> <el-date-picker v-model="ruleForm.registerDate" type="datetime" placeholder="选择日期" style="width:100%" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd HH:mm:ss"> </el-date-picker></el-form-item>
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
                <el-form-item label="原件领导批示：">
                  <el-input v-model="ruleForm.instructions" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
                </el-form-item>
              </el-col>
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
            <el-col :span="4" style="text-align:center"><div style="padding:15px 0;">领导批示：</div></el-col>
            <el-col :span="18"><el-button v-for="o in 12" :key="o" plain class="leadershipBtn" @click="addDomain">徐显辉</el-button></el-col>
          </el-row>

          <el-row type="flex" justify="center" style="margin-top:20px">
            <el-col :span="22">
              <el-card v-for="(item, index) in InstructionBox" :key="index" class="box-card">
                <el-row type="flex" justify="space-between" align="middle">
                  <el-col :span="20">
                    <el-form ref="InstructionsForm" :model="item.InstructionsForm" label-width="90px" class="demo-dynamic">
                      <el-row>
                        <el-col :span="8">
                          <el-form-item label="批示人：">
                            <span>{{ item.InstructionsForm.name ? item.InstructionsForm.name : '徐显辉' }}</span>
                          </el-form-item>
                        </el-col>
                        <el-col :span="16">
                          <el-form-item label="批示时间：">
                            <el-date-picker v-model="item.InstructionsForm.name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                            <el-button style="margin-left:10px">圈阅</el-button>
                          </el-form-item>
                        </el-col>
                      </el-row>
                      <el-form-item label="批示内容：">
                        <el-input v-model="item.InstructionsForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                      </el-form-item>
                    </el-form>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" class="delete_btn_class" @click="delInstructions(index)">删 除</el-button>
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
              <el-form ref="HandleForm" :model="HandleForm" label-width="120px">
                <el-form-item label="主办责任单位：">
                  <el-input v-model="HandleForm.name" placeholder="请输入主办责任单位"></el-input>
                </el-form-item>
                <el-form-item label="会办责任单位：">
                  <el-input v-model="HandleForm.name" placeholder="请输入主办责任单位"></el-input>
                </el-form-item>
                <el-form-item label="要求办结时间：">
                  <el-date-picker v-model="HandleForm.name" style="width:100%;" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd"> </el-date-picker>
                </el-form-item>
                <el-form-item label="备注：">
                  <el-input v-model="HandleForm.name" resize="none" type="textarea" :rows="3" placeholder="请输入内容"> </el-input>
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
            <el-form ref="FinishForm" :model="FinishForm" label-width="110px" class="demo-dynamic">
              <el-col :span="18">
                <el-form-item label="实际办结时间：">
                  <el-date-picker v-model="FinishForm.name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                  <el-button style="margin-left:30px" type="primary">办结</el-button>
                </el-form-item>
              </el-col>
              <el-col :span="18">
                <el-form-item label="办结备注：">
                  <el-input v-model="FinishForm.name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
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
        <el-card v-if="$store.state.code == 1" class="box-card  Children">
          <div slot="header" class="clearfix">
            <el-row type="flex" justify="space-between" align="middle">
              <el-col :span="4">
                <span>跟踪办理</span>
              </el-col>
              <el-col :span="4">
                <el-button @click="addTracking">添加</el-button>
              </el-col>
            </el-row>
          </div>
          <el-row v-for="(j, i) in trackingData" :key="i" style="margin-bottom:20px">
            <el-col>
              <el-card>
                <!-- 跟踪办理情况模块 -->
                <el-row type="flex" justify="space-between">
                  <el-col :span="18">
                    <el-form ref="FinishForm" :model="j.tracking" label-width="110px" class="demo-dynamic">
                      <el-row>
                        <el-col :span="18" style="margin-left:30px">
                          <el-form-item label="要求办结时间：">
                            <el-date-picker v-model="[j.tracking].name" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col :span="18" style="margin-left:30px">
                          <el-form-item label="跟踪办理情况：">
                            <el-input v-model="[j.tracking].name" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form>
                  </el-col>
                  <el-col :span="3">
                    <el-button type="danger" @click="delTracking(i)">删除</el-button>
                  </el-col>
                </el-row>

                <!-- 跟踪办理领导批示模块 -->
                <el-row>
                  <el-col :span="4" style="text-align:center"><div style="padding:15px 0;">领导批示：</div></el-col>
                  <el-col :span="18"><el-button v-for="o in 12" :key="o" plain class="leadershipBtn" @click="addDomain">徐显辉</el-button></el-col>
                </el-row>

                <!-- 跟踪办理领导批示输入框模块 -->
                <el-row type="flex" justify="center" style="margin-top:20px">
                  <el-col :span="23">
                    <el-card v-for="(item, index) in j.InstructionBox" :key="index" class="box-card">
                      <el-row type="flex" justify="space-between" align="middle">
                        <el-col :span="20">
                          <el-form ref="InstructionsForm" :model="item[j.InstructionsForm]" label-width="90px" class="demo-dynamic">
                            <el-row>
                              <el-col :span="8">
                                <el-form-item label="批示人：">
                                  <span>{{ item[[j.InstructionsForm].name] ? item[[j.InstructionsForm].name] : '徐显辉' }}</span>
                                </el-form-item>
                              </el-col>
                              <el-col :span="16">
                                <el-form-item label="批示时间：">
                                  <el-date-picker v-model="item[[j.InstructionsForm].name]" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                                  <el-button style="margin-left:10px">圈阅</el-button>
                                </el-form-item>
                              </el-col>
                            </el-row>
                            <el-form-item label="批示内容：">
                              <el-input v-model="item[[j.InstructionsForm].name]" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                            </el-form-item>
                          </el-form>
                        </el-col>
                        <el-col :span="3">
                          <el-button type="danger" class="delete_btn_class" @click="delInstructions(index)">删 除</el-button>
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
                <el-row type="flex" style="margin-top:10px">
                  <el-form ref="FinishForm" :model="j.FinishForm" label-width="110px" class="demo-dynamic">
                    <el-col :span="18">
                      <el-form-item label="实际办结时间：">
                        <el-date-picker v-model="j[FinishForm.name]" type="date" placeholder="选择日期" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm"> </el-date-picker>
                        <el-button style="margin-left:30px" type="primary">办结</el-button>
                      </el-form-item>
                    </el-col>
                    <el-col :span="18">
                      <el-form-item label="办结备注：">
                        <el-input v-model="j[FinishForm.name]" type="textarea" resize="none" :rows="3" placeholder="请输入内容"> </el-input>
                      </el-form-item>
                    </el-col>
                  </el-form>
                </el-row>
              </el-card>
            </el-col>
          </el-row>
        </el-card>
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
        <el-table :data="tableData" style="width: 100%" height="500" @selection-change="handleSelectionChange">
          <el-table-column label="全选" type="selection" width="50px" :resizable="false"></el-table-column>
          <el-table-column label="序号" type="index" width="50px" align="center" :resizable="false"></el-table-column>
          <el-table-column label="文件类型" prop="fileType" :resizable="false" align="center">
            <template slot-scope="scope">
              <template v-for="wjlx in wj_Type">
                <span v-if="scope.row.fileType === wjlx.value" :key="wjlx.value">{{ wjlx.label }}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column label="流水号" prop="serialNum" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="督办号" prop="supervisionNum" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="收文时间" prop="receivingTime" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="文号" prop="documentNum" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="来文单位" prop="unit" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="来文内容" prop="content" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="要求办结时间" prop="completionTime" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="登记人" prop="registrant" :resizable="false" align="center"> </el-table-column>
          <el-table-column label="文件状态" prop="fileStatus" align="center" :resizable="false">
            <template slot-scope="scope">
              <span v-if="scope.row.fileStatus === '0'">签收</span>
              <span v-if="scope.row.fileStatus === '1'">已签收</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center">
            <template slot-scope="scope">
              <el-link type="primary" @click="tableView(scope.row)">查看</el-link>
              <!-- <el-link type="primary" class="ml_15" @click="tableModify(scope.row)">修改</el-link> -->
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
import LogDialog from './LogDialog/topSupervision.vue'
// eslint-disable-next-line no-unused-vars
import { searchAll, Add, Del, getDicGroupBy, searchOne, ModifyApi, searchAlreadyPush, searchCanPush } from '@/api/infoRegister/Supervision/topSupervision'
import { validatePhoneTwo, validateContacts, validateNumber } from '@/utils/verification'
import { getProjectNum } from '@/utils/comm'
// import dayjs from 'dayjs'
export default {
  components: {
    // 扫码签收
    SignFordialog,
    // 日志弹出组件
    LogDialog
  },
  data() {
    return {
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
        registrant: '王湘琴',
        theApplicant: '厅长秘书处',
        receivingTime: new Date(),
        quantity: 1,
        completionTime: new Date(),
        registerDate: new Date(),
        fileType: 6
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
      sigDialogVisible: false,
      wqrqzlxsl: 0,
      logDialogVisible: false, // 显示日志弹出框
      // 批示数据
      InstructionBox: [
        {
          InstructionsForm: {
            name: ''
          }
        }
      ],
      // 办结数据
      FinishForm: {
        name: ''
      },
      // 上传文件列表
      fileList: [],
      // 表格选择项
      multipleSelection: [],
      // 推送模块表格数据
      personnelTableData: [],
      // 选择人员弹出层搜索数据
      dialogData: { name: '' },
      // 选择人员弹出层表格数据项
      dialogTableData: [{ name: '123' }],
      // 选择人员弹出层表格选择项
      Selection: [],
      // 是否显示弹出层
      dialogFormVisible: false,
      // 办理框数据
      HandleForm: { name: '' },
      // 跟踪办结数据
      trackingData: [
        {
          tracking: {
            name: ''
          },
          FinishForm: {
            name: ''
          },
          InstructionBox: [
            {
              InstructionsForm: {
                name: ''
              }
            }
          ],
          fileList: []
        }
      ]
    }
  },
  created() {
    this.search()
    this.getLdList()
  },
  methods: {
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
        pageData.fileType = 6
        paramsData = { ...data }
        if (this.timeData !== null && this.timeData.length > 0) {
          paramsData.receivingStartDate = this.timeData[0]
          paramsData.receivingEndDate = this.timeData[1]
        }
        const res = await searchAll({ ...pageData, ...paramsData })
        if (res.code === 1) {
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
    // 日志按钮
    LogBtn() {
      this.logDialogVisible = true
    },
    // 扫码签收
    ScanCodeToSign() {
      this.sigDialogVisible = true
    },
    // 保存信息事件
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert('submit!')
          this.$refs[formName].resetFields()
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    // 点击领导名字增加批示框
    addDomain() {
      this.InstructionBox.push({
        InstructionsForm: {
          name: ''
        }
      })
    },
    // 批示框里删除按钮
    delInstructions(index) {
      if (index !== -1) {
        this.InstructionBox.splice(index, 1)
      }
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
    // 表格查看按钮
    tableView(row) {
      console.log(row)
    },
    // 跟踪办理添加按钮
    addTracking() {
      this.trackingData.push({
        tracking: {
          name: ''
        },
        FinishForm: {
          name: ''
        },
        InstructionBox: [
          {
            InstructionsForm: {
              name: ''
            }
          }
        ],
        fileList: []
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
  width: 70%;
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
</style>
