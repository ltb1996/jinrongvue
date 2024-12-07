<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <div class="lab-container">
      <div class="breadcrumb-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item 
            :to="{ path: '/basicoperate' }"
          >技术实操</el-breadcrumb-item>
          <el-breadcrumb-item class="current-page">{{ currentLab?.title || '加载中...' }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="lab-content" v-if="currentLab">
        <h1>{{ currentLab.title }}</h1>
        <div
          class="lab-section"
          v-for="(section, index) in currentLab.sections"
          :key="index"
        >
          <h2>{{ section.title }}</h2>
          <p>{{ section.description }}</p>
          <div class="code-block">
            <textarea
              v-model="section.code"
              class="code-textarea"
              spellcheck="false"
            ></textarea>
            <el-button type="success" @click="toggleResult(section)">
              {{ section.result ? '隐藏结果' : '运行代码' }}
            </el-button>
          </div>
          <div v-if="section.result" class="result-block">
            <h3>运行结果：</h3>
            <div :class="['result-content', { 'echarts-content': currentLab?.title === 'ECharts实验' }]">
              <template v-if="currentLab?.title === 'ECharts实验'">
                <img :src="echartsresult" alt="ECharts结果" class="echarts-result-img"/>
              </template>
              <template v-else>
                {{ section.result }}
              </template>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <el-button type="primary" @click="handlePrevPage">上一页</el-button>
          <el-button type="primary" @click="handleNextPage">下一页</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavBar from "../components/nav-bar/index.vue";
import { ref, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import echartsresult from "../assets/img/echartsresult.png";

const route = useRoute();
const router = useRouter();

interface Section {
  title: string;
  description: string;
  code: string;
  result?: string;
}

interface Lab {
  id: number;
  title: string;
  sections: Section[];
}

const labContent: Lab[] = [
  {
    id: 1,
    title: "Vue基础实验",
    sections: [
      {
        title: "组件创建",
        description: "让我们来创建一个简单的Vue组件",
        code: `<template>
  <div class="hello">
    <h1>{{ message }}</h1>
    <button @click="changeMessage">改变消息</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const message = ref('Hello Vue!')
const changeMessage = () => {
  message.value = 'Message Changed!'
}
<\/script>`,
      },
    ],
  },
  {
    id: 2,
    title: "JavaScript实验",
    sections: [
      {
        title: "数组操作",
        description: "学习JavaScript数组的基本操作方法",
        code: `// 创建数组
const fruits = ['苹果', '香蕉', '橙子'];

// 添加元素
fruits.push('葡萄', '梨');
console.log(fruits);

// 删除元素
fruits.pop();
console.log(fruits);
`,
      },
    ],
  },
  {
    id: 3,
    title: "ECharts实验",
    sections: [
      {
        title: "基础折线图",
        description: "创建一个简单的ECharts折线图",
        code: `// 初始化echarts实例
const myChart = echarts.init(document.getElementById('main'));
// 配置项
const option = {
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [150, 230, 224, 218, 135, 147, 260],
    type: 'line'
  }]
};
// 使用配置项显示图表
myChart.setOption(option);`,
      },
    ],
  },
  {
    id: 4,
    title: "Mock.js实验",
    sections: [
      {
        title: "生成模拟数据",
        description: "使用Mock.js生成随机的模拟数据",
        code: `// 使用 Mock.js 生成模拟数据
const data = Mock.mock({
  'list': [{
    'id|+1': 1,
    'name': '@cname',
    'age|18-60': 1,
    'city': '@city',
    'email': '@email'
  }]
});
console.log(data.list);`,
      },
    ],
  },
  {
    id: 5,
    title: "Axios实验",
    sections: [
      {
        title: "发送GET请求",
        description: "使用Axios发送GET请求获取数据",
        code: `// 发送GET请求
axios.get('https://api.example.com/data')
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });`,
      },
    ],
  },
];

const currentLab = ref<Lab | null>(null);

watch(
  () => route.params.id,
  (newId) => {
    const lab = labContent.find((lab) => lab.id === Number(newId));
    if (lab) {
      currentLab.value = lab;
    } else {
      router.push("/basicoperate");
    }
  },
  { immediate: true }
);

const executeJavaScript = (code: string) => {
  let output = '';
  const originalLog = console.log;
  
  console.log = (...args) => {
    output += args.map(arg => {
      if (Array.isArray(arg)) {
        // 数组使用一行显示
        return `[${arg.join(', ')}]`;
      } else if (typeof arg === 'object' && arg !== null) {
        // 对象仍然保持格式化显示
        return JSON.stringify(arg, null, 2);
      } else {
        return String(arg);
      }
    }).join(' ') + '\n';
  };

  try {
    new Function(code)();
    console.log = originalLog;
    return output || '代码执行成功，但没有输出结果';
  } catch (error: any) {
    console.log = originalLog;
    return `执行错误: ${error.message}`;
  }
};

const toggleResult = (section: Section) => {
  if (section.result) {
    // 如果已经有结果，则清空结果
    section.result = '';
  } else {
    // 如果没有结果，则运行代码
    try {
      switch (currentLab.value?.title) {
        case "JavaScript实验":
          section.result = executeJavaScript(section.code);
          break;
        case "Vue基础实验":
          section.result = "Message Changed!";
          break;
        case "ECharts实验":
          section.result = "图表创建成功！";
          break;
        case "Mock.js实验":
          section.result = `[  
  {  
    "id": 1,  
    "name": "王芳",  
    "age": 45,  
    "city": "广州",  
    "email": "wangfang@example.com"  
  }  
]`;
          break;
        case "Axios实验":
          section.result = "请求发送成功！";
          break;
        default:
          section.result = "代码执行完成";
      }
    } catch (error: any) {
      section.result = `执行错误: ${error.message}`;
    }
  }
};

const handleNextPage = () => {
  const currentId = Number(route.params.id);
  const nextId = currentId + 1;

  if (nextId > labContent.length) {
    // 如果最后一个实验，跳转到index页面
    router.push("/index");
  } else {
    // 否则跳转到下一个实验
    router.push(`/lab/${nextId}`);
  }
};

const handlePrevPage = () => {
  const currentId = Number(route.params.id);
  const prevId = currentId - 1;

  if (prevId < 1) {
    // 如果是第一个实验，跳转到basicoperate页面
    router.push("/basicoperate/shoppage");
  } else {
    // 否则跳转到上一个实验
    router.push(`/lab/${prevId}`);
  }
};
</script>

<style scoped>
.allStyle {
  display: flex;
  flex-direction: column;
  background: url("../assets/img/pageBg.png") center center no-repeat;
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

.lab-container {
  margin-top: 100px;
  padding: 20px;
  color: #fff;
  height: calc(100vh - 120px);
  overflow-y: auto;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;
}

.lab-container::-webkit-scrollbar {
  display: none;
}

.lab-content {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
  padding-bottom: 40px;
}

.code-block {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
}

.code-textarea {
  width: 100%;
  min-height: 300px;
  background: transparent;
  border: none;
  color: #00eaff;
  font-family: monospace;
  font-size: 16px;
  line-height: 1.5;
  padding: 10px;
  margin-bottom: 10px;
  resize: vertical;
  outline: none;
  white-space: pre;
  overflow-x: auto;
  scrollbar-width: none;  /* Firefox */
  -ms-overflow-style: none;  /* IE and Edge */
}

.code-textarea::-webkit-scrollbar {
  display: none;  /* Chrome, Safari, Opera */
}

.code-textarea:focus {
  /* border: 1px solid rgba(0, 234, 255, 0.3); */
  background: rgba(0, 234, 255, 0.05);
}

.result-block {
  background: rgba(0, 234, 255, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
  overflow: hidden;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
}

.breadcrumb-container {
  max-width: 1200px;
  margin: 0 auto 20px;
  padding: 10px 0px;
}

:deep(.el-breadcrumb) {
  color: #fff;
  font-size: 16px;
  line-height: 1;
  text-shadow: 1px 1px 2px black;
}

:deep(.el-breadcrumb__item) {
  color: #fff;
}

:deep(.el-breadcrumb__inner) {
  color: inherit;
  font-weight: normal;
  transition: color 0.3s;
}

:deep(.el-breadcrumb__inner.is-link:hover) {
  color: #00eaff;
}

:deep(.el-breadcrumb__separator) {
  color: #fff;
  margin: 0 8px;
}

:deep(.current-page .el-breadcrumb__inner) {
  color: #00eaff;
}

.result-content {
  text-align: left;
  white-space: pre-wrap;
  word-break: break-all;
  font-size: 14px;
  line-height: 1.5;
  color: #fff;
}

.echarts-content {
  display: flex;
  justify-content: center;
  align-items: center;
}

.echarts-result-img {
  max-width: 600px;
  width: 100%;
  height: auto;
  border-radius: 4px;
  margin: 10px 0;
}
</style>
