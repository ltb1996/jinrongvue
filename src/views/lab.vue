<template>
  <div class="allStyle">
    <nav-bar></nav-bar>
    <div class="lab-container">
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
            <pre
              style="margin-bottom: 10px"
            ><code>{{ section.code }}</code></pre>
            <el-button type="success" @click="runCode(section)"
              >运行代码</el-button
            >
          </div>
          <div v-if="section.result" class="result-block">
            <h3>运行结果：</h3>
            <div class="result-content">{{ section.result }}</div>
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

const runCode = (section: Section) => {
  try {
    // 根据不同的实验类型执行不同的逻辑
    switch (currentLab.value?.title) {
      case "Vue基础实验":
        section.result = "Message Changed!";
        break;
      case "JavaScript实验":
        const jsResult = eval(section.code);
        section.result = "['苹果', '香蕉', '橙子', '葡萄']";
        break;
      case "ECharts实验":
        section.result = "图表创建成功！";
        break;
      case "Mock.js实验":
        // const mockResult = eval(section.code);
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
};

const handleNextPage = () => {
  const currentId = Number(route.params.id);
  const nextId = currentId + 1;

  if (nextId > labContent.length) {
    // 如果是最后一个实验，跳转到index页面
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
    router.push("/basicoperate");
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
  overflow-x: hidden;
}

.lab-container {
  margin-top: 100px;
  padding: 20px;
  color: #fff;
}

.lab-content {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border: 1px solid rgba(0, 234, 255, 0.3);
  border-radius: 8px;
  padding: 20px;
}

.code-block {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
}

.code-block pre {
  color: #00eaff;
  margin: 0;
}

.result-block {
  background: rgba(0, 234, 255, 0.1);
  padding: 20px;
  border-radius: 4px;
  margin: 20px 0;
}

.navigation-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  padding: 0 20px;
}
</style>
