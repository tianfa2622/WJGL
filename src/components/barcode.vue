<template>
  <div>
    <el-dialog :visible.sync="barcodeVisible" width="25%" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true" title="条形码" @close="close">
      <div class="barcode_class">
        <svg id="barcode" ref="barcode" style="width:100%"></svg>
      </div>
      <span slot="footer" style="text-align: center">
        <el-button @click="close">取 消</el-button>
        <!-- <el-button type="primary" v-print="printObj" @click="close">打 印</el-button> -->
      </span>
    </el-dialog>
  </div>
</template>

<script>
import JsBarcode from 'jsbarcode'
export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ['isShow', 'barcodeData'],
  data() {
    return {
      printObj: {
        id: 'barcode', // 打印的元素id
        popTitle: '', // 打印的标题
        extraCss: '', // 打印可引入外部的一个css文件
        extraHead: '' // 打印头部文字
      },
      barcodeVisible: false // 弹出层控制显示
    }
  },
  watch: {
    isShow() {
      this.barcodeVisible = this.isShow
    },
    barcodeVisible() {
      if (this.barcodeVisible === true) {
        this.getBarcode()
      }
    }
  },
  mounted() {},
  methods: {
    // 关闭按钮
    close() {
      this.barcodeVisible = false
      this.$emit('BarcodeSetClose', this.barcodeVisible)
    },
    getBarcode() {
      let data = 12345
      console.log(this.barcodeData)
      if (this.barcodeData) {
        data = this.barcodeData
      }
      const options = {
        format: 'CODE128',
        displayValue: false,
        fontSize: 18,
        height: 100
      }
      window.setTimeout(function() {
        // JsBarcode('#barcode', data, {
        //   format: 'CODE39', // 选择要使用的条形码类型
        //   width: 2, // 设置条之间的宽度
        //   height: 100, // 高度
        //   displayValue: false, // 是否在条形码下方显示文字
        //   // text: data, // 覆盖显示的文本
        //   // font: 'fantasy', // 设置文本的字体
        //   background: '#eee', // 设置条形码的背景
        //   lineColor: '#2196f3', // 设置条和文本的颜色。
        //   margin: 15 // 设置条形码周围的空白边距
        // })
        JsBarcode('#barcode', data, options)
      }, 0)
    }
  }
}
</script>

<style scoped>
.table {
  width: 100%;
  /* height: 100%; */
}
.Pagin {
  width: 100%;
  margin-top: 20px;
  text-align: center;
}
.barcode_class {
  text-align: center;
  width: 100%;
}
</style>
