<script setup lang="ts">
import ItemWrap from "@/components/item-wrap";
import LeftTop from "./left-top.vue";
import LeftCenter from "./left-center.vue";
import LeftBottom from "./left-bottom.vue";
import CenterMap from "./center-map.vue";
import CenterBottom from "./center-bottom.vue";
import RightTop from "./right-top.vue";
import RightCenter from "./right-center.vue";
import RightBottom from "./right-bottom.vue";

import { Edit } from "@element-plus/icons-vue";
import { ref, provide } from 'vue';
import * as XLSX from 'xlsx';
import { ElMessage } from 'element-plus';

// 定义数据接口
interface AlertData {
  gatewayno: string;
  terminalno: string;
  alertvalue: string;
  provinceName: string;
  createtime: string;
  alertdetail: string;
  leftnumone: string;
  leftnumtwo: string;
  leftnumthree: string;
}

// 创建全局状态来存储上传的数据
const uploadedData = ref<AlertData[] | null>(null);
provide('uploadedData', uploadedData);

const processExcelData = (data: any[]) => {
  return data.map(row => {
    const excelDate = row.createtime;
    let formattedDate;
    
    if (typeof excelDate === 'number') {
      // 处理 Excel 数字格式的日期
      const date = new Date((excelDate - 25569) * 86400 * 1000);
      formattedDate = date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit'
      }).replace(/\//g, '-');
    } else if (typeof excelDate === 'string') {
      // 处理字符串格式的日期，只保留年月日
      formattedDate = excelDate.split(' ')[0]; // 分割日期和时间，只取日期部分
    } else {
      formattedDate = excelDate;
    }

    return {
      ...row,
      createtime: formattedDate,
      numone: Number(row.numone) || 0,
      numtwo: Number(row.numtwo) || 0
    };
  });
};

const handleFileChange = (file: any) => {
  const fileReader = new FileReader();
  fileReader.onload = (e: any) => {
    try {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'array' });
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      
      // 处理数据并转换日期
      const processedData = processExcelData(jsonData);
      
      uploadedData.value = processedData;
      console.log(uploadedData.value, '+++++++++++++++');
      ElMessage.success('数据更新成功');
    } catch (error) {
      console.error('解析错误:', error);
      ElMessage.error('文件解析失败，请检查文件格式');
    }
  };
  fileReader.readAsArrayBuffer(file.raw);
};
</script>

<template>
  <div class="index-box">
    <div class="contetn_left">
      <div class="pagetab">
        <el-upload
          class="upload-button"
          action=""
          :show-file-list="false"
          :auto-upload="false"
          :disabled="false"
          accept=".xlsx,.xls"
          @change="handleFileChange"
        >
          <el-button type="primary">上传文件</el-button>
        </el-upload>
      </div>
      <ItemWrap class="contetn_left-top contetn_lr-item" title="三亚学院人数统计">
        <LeftTop />
      </ItemWrap>
      <ItemWrap class="contetn_left-center contetn_lr-item" title="三亚学院用户总览">
        <LeftCenter />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="数据统计图1"
        style="padding: 0 10px 16px 10px"
      >
        <LeftBottom />
      </ItemWrap>
    </div>
    <div class="contetn_center">
      <CenterMap class="contetn_center_top" title="曲线数据" />
      <ItemWrap class="contetn_center-bottom" title="吉利集团新能源半年销量">
        <CenterBottom />
      </ItemWrap>
    </div>
    <div class="contetn_right">
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="盛宝学院雷达数据">
        <RightTop />
      </ItemWrap>
      <ItemWrap
        class="contetn_left-bottom contetn_lr-item"
        title="盛宝学院专业人数(TOP8)"
        style="padding: 0 10px 16px 10px"
      >
        <RightCenter />
      </ItemWrap>
      <ItemWrap class="contetn_left-bottom contetn_lr-item" title="数据统计图2">
        <RightBottom />
      </ItemWrap>
    </div>
  </div>
</template>

<style scoped lang="scss">
.index-box {
  width: 100%;
  display: flex;
  min-height: calc(100% - 64px);
  justify-content: space-between;
}
//左边 右边 结构一样
.contetn_left,
.contetn_right {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  position: relative;
  width: 540px;
  box-sizing: border-box;
  flex-shrink: 0;
}
.contetn_center {
  flex: 1;
  margin: 0 54px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  .contetn_center-bottom {
    height: 315px;
  }
}

.contetn_lr-item {
  height: 310px;
}
</style>

<style lang="scss" scoped>
// .upload-button {
//   .el-upload {
//     .el-button {
//       .el-icon {
//         display: none !important;
//       }
//     }
//   }
//   // margin-bottom: 20px; /* 添加一些底部间距 */
// }
// .index-box .upload-button .el-upload .el-button .el-icon {
//   display: none !important;
// }
.upload-button {
  position: absolute;
  left: 0;
  top: -30px;
 }
</style>
