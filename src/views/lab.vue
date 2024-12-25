<template>
  <div class="allStyle">
    <nav-small-bar></nav-small-bar>
    <div class="lab-container">
      <div class="breadcrumb-container">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item>首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/basicoperate/shoppage' }"
            >技术实操</el-breadcrumb-item
          >
          <el-breadcrumb-item class="current-page">{{
            currentLab?.title || "加载中..."
          }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="sub-breadcrumb-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item
            :class="{ 'active-breadcrumb': currentSection === 'intro' }"
            @click="switchSection('intro')"
            >技术介绍</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :class="{ 'active-breadcrumb': currentSection === 'theory' }"
            @click="switchSection('theory')"
            >技术理论</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :class="{
              'active-breadcrumb': currentSection === 'implementation',
            }"
            @click="switchSection('implementation')"
            >技术实现</el-breadcrumb-item
          >
          <el-breadcrumb-item
            :class="{ 'active-breadcrumb': currentSection === 'example' }"
            @click="switchSection('example')"
            >技术习题</el-breadcrumb-item
          >
        </el-breadcrumb>
      </div>
      <div v-if="currentSection === 'intro'" class="lab-content">
        <h1>{{ currentLab?.title }} - 技术介绍</h1>
        <div class="intro-content">
          <template v-if="currentLab?.title && labIntros[currentLab.title]">
            <h2>{{ labIntros[currentLab.title].title }}</h2>
            <p>{{ labIntros[currentLab.title].description }}</p>
            <div class="intro-flex-container">
              <div class="intro-image-container">
                <h2>{{ labIntros[currentLab.title].biaoti }}架构图</h2>
                <img :src="labIntros[currentLab.title].image" alt="技术介绍图片" class="intro-image">
              </div>
              <div class="intro-features-container">
                <h2>主要特性</h2>
                <ul>
                  <li v-for="(feature, index) in labIntros[currentLab.title].features" :key="index">
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div v-if="currentSection === 'theory'" class="lab-content">
        <h1>{{ currentLab?.title }} - 技术理论</h1>
        <div class="theory-content">
          <template v-if="currentLab?.title && labTheories[currentLab.title]">
            <h2>{{ labTheories[currentLab.title].title }}</h2>
            <div class="theory-section">
              <template
                v-for="(principle, index) in labTheories[currentLab.title]
                  .principles"
                :key="index"
              >
                <h3>{{ index + 1 }}. {{ principle.name }}</h3>
                <p>{{ principle.description }}</p>
                <img :src="principle.vuedetailimg" alt="技术介绍图片" class="vuedetailimg">
              </template>
            </div>
          </template>
        </div>
      </div>
      <div v-if="currentSection === 'implementation' && currentLab" class="lab-content">
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
              {{ section.result ? "隐藏结果" : "运行代码" }}
            </el-button>
          </div>
          <div v-if="section.result" class="result-block">
            <h3>运行结果：</h3>
            <div
              :class="[
                'result-content',
                { 'echarts-content': currentLab?.title === 'ECharts实验' },
              ]"
            >
              <template v-if="currentLab?.title === 'ECharts实验'">
                <img
                  :src="echartsresult"
                  alt="ECharts结果"
                  class="echarts-result-img"
                />
              </template>
              <template v-else>
                {{ section.result }}
              </template>
            </div>
          </div>
        </div>
      </div>
      <div v-if="currentSection === 'example'" class="lab-content">
        <h1>{{ currentLab?.title }} - 技术习题</h1>
        <div class="quiz-content">
          <template v-if="currentLab?.title && labQuestions[currentLab.title]">
            <div
              v-for="question in labQuestions[currentLab.title]"
              :key="question.id"
              class="question-block"
            >
              <h3>{{ question.id }}. {{ question.title }}</h3>
              <div class="options-list">
                <div
                  v-for="(option, index) in question.options"
                  :key="index"
                  class="option-item"
                  :class="{
                    selected:
                      userAnswers[currentLab.title]?.[question.id] === index,
                    correct: showResults && index === question.correctAnswer,
                    wrong:
                      showResults &&
                      userAnswers[currentLab.title]?.[question.id] === index &&
                      index !== question.correctAnswer,
                  }"
                  @click="!showResults && handleAnswer(question.id, index)"
                >
                  <span class="option-label"
                    >{{ ["A", "B", "C", "D"][index] }}.</span
                  >
                  {{ option }}
                </div>
              </div>
            </div>
          </template>
          <div class="quiz-actions">
            <el-button type="primary" @click="checkAnswers" v-if="!showResults">提交答案</el-button>
            <el-button type="primary" @click="resetQuiz" v-else>重新作答</el-button>
            <el-button type="success" @click="exportQuestions">导出习题</el-button>
          </div>  
        </div>
      </div>
      <div class="section-navigation">
        <el-button type="primary" @click="handlePrevSection">上一步</el-button>
        <el-button type="primary" @click="handleNextSection">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import NavSmallBar from "../components/navsmall-bar/index.vue";
import { ref, onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import echartsresult from "../assets/img/echartsresult.png";
import vueall from "../assets/img/vueall.png";
import vuesxbd1 from "../assets/img/vuesxbd1.png";
import vuezjhkf from "../assets/img/vuezjhkf.jpeg";
import vuexndom from "../assets/img/vuexndom.png";
import vuesmzq from "../assets/img/vuesmzq.png";
import vuezhiling from "../assets/img/vuezhiling.png";

const route = useRoute();
const router = useRouter();

interface Section {
  title: string;
  description: string;
  code: string;
  result?: string;
}

interface LabIntro {
  title: string;
  description: string;
  features: string[];
  biaoti: string;
  image: string;
}

interface LabTheory {
  title: string;
  principles: {
    name: string;
    description: string;
    vuedetailimg: string;
  }[];
}

interface Lab {
  id: number;
  title: string;
  sections: Section[];
}

interface Question {
  id: number;
  title: string;
  options: string[];
  correctAnswer: number;
  userAnswer?: number;
}

const isLastLab = computed(() => {
  return Number(route.params.id) === 5; // 5 是 Axios 实验的 id
});

const labIntros: Record<string, LabIntro> = {
  Vue基础实验: {
    title: "Vue.js 简介",
    biaoti: "Vue",
    description:
      "Vue.js 是一个用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。",
    features: [
      "响应式数据绑定：Vue 通过数据绑定机制，自动将数据的变化反映到视图上。",
      "组件化开发：Vue 的组件系统允许开发者将 UI 分解为独立、可复用的组件。",
      "虚拟 DOM：Vue 使用虚拟 DOM 来优化实际 DOM 操作，通过 diff 算法计算出最小的更新范围，从而提高性能。",
      "生命周期钩子：Vue 提供了生命周期钩子，允许开发者在特定阶段执行自定义逻辑。",
      "指令系统：Vue 提供了丰富的指令系统，允许开发者直接操作 DOM。",
    ],
    image: vueall,
  },
  ECharts实验: {
    title: "ECharts 简介",
    biaoti: "ECharts",
    description:
      "ECharts 是一个使用 JavaScript 实现的开源可视化库，提供直观，交互丰富，可高度个性化定制的数据可视化图表。",
    features: [
      "丰富的可视化类型",
      "响应式图表设计",
      "强大的交互能力",
      "多种数据格式支持",
    ],
    image: echartsresult,
  },
  JavaScript实验: {
    title: "JavaScript 简介",
    biaoti: "JavaScript",
    description:
      "JavaScript 是一种具有函数优先特性的轻量级、解释型或即时编译型的编程语言。它是最流行的 Web 脚本语言，被广泛应用于客户端和服务器端开发。",
    features: [
      "动态类",
      "函数式编程",
      "面向对象编程",
      "事件驱动",
      "跨平台支持",
    ],
    image: vueall,
  },
  "Mock.js实验": {
    title: "Mock.js 简介",
    biaoti: "Mock.js",
    description:
      "Mock.js 是一个模拟数据生成器，可以帮助前端开发者独立于后端进行开发。它可以拦截 Ajax 请求，返回模拟响应数据。",
    features: [
      "数据模板定义",
      "随机数据生成",
      "Ajax 请求拦截",
      "支持自定义数据规则",
      "完善的中文数据支持",
    ],
    image: vueall,
  },
  Axios实验: {
    title: "Axios 简介",
    biaoti: "Axios",
    description:
      "Axios 是一个基于 Promise 的 HTTP 客户端，可以用于浏览器和 Node.js。它提供一个简单而强大的方式来发送 HTTP 请求。",
    features: [
      "支持 Promise API",
      "拦截请求和响应",
      "转换请求和响应数据",
      "动转换 JSON 数据",
      "客户端支持防御 XSRF",
    ],
    image: vueall,
  },
};

const labTheories: Record<string, LabTheory> = {
  Vue基础实验: {
    title: "Vue 的核心原理",
    principles: [
      {
        name: "响应式数据绑定",
        description: "Vue 2使用Object.defineProperty实现数据劫持，Vue 3使用Proxy实现数据劫持，提供更高效的双向数据绑定。",
        vuedetailimg: vuesxbd1
      },
      {
        name: "组件化开发",
        description: "Vue组件是可复用的代码模块，包含HTML模板、JavaScript代码和CSS样式，支持模块化开发和代码复用。",
        vuedetailimg: vuezjhkf
      },
      {
        name: "虚拟 DOM",
        description: "Vue使用虚拟DOM优化性能，通过对比新旧虚拟DOM树的差异，最小化实际DOM操作，提高渲染效率。",
        vuedetailimg: vuexndom
      },
      {
        name: "生命周期钩子",
        description: "Vue提供了完整的生命周期钩子函数，包括创建、挂载、更新和销毁阶段，方便开发者在不同阶段执行代码。",
        vuedetailimg: vuesmzq
      },
      {
        name: "指令系统",
        description: "Vue提供了16个内置指令，包括v-text、v-html、v-show、v-if等，方便开发者直接操作DOM和处理数据。",
        vuedetailimg: vuezhiling
      }
    ]
  },
  ECharts实验: {
    title: "ECharts 的技术原理",
    principles: [
      {
        name: "渲染引擎",
        description:
          "ECharts 使用 Canvas 或 SVG 作为渲染引擎，通过数据驱动方式进行图表绘制。",
        vuedetailimg: echartsresult,
      },
      {
        name: "数据处理",
        description:
          "内部实现了高效的数据处理模块，支持大数据量的展示和实时更新。",
        vuedetailimg: echartsresult,
      },
      {
        name: "布局算法",
        description: "采用智能的布局算法，确保图表元素的合理分布和展示。",
        vuedetailimg: echartsresult,
      },
    ],
  },
  JavaScript实验: {
    title: "JavaScript 的核心原理",
    principles: [
      {
        name: "事件循环机制",
        description:
          "JavaScript 使用事件循环来处理异步操作，包任务和微任务队列的调度机制，确保代码的有序执行。",
        vuedetailimg: vueall,
      },
      {
        name: "原型链继承",
        description:
          "通过原型链实现对象之间的继承关系，是 JavaScript 面向对象编程的核心机制。",
        vuedetailimg: vueall,
      },
      {
        name: "闭包",
        description:
          "闭包允许函数访问并操作函数外部的变量，是实现数据私有和模块化的要机制。",
        vuedetailimg: vueall,
      },
    ],
  },
  "Mock.js实验": {
    title: "Mock.js 的技术原理",
    principles: [
      {
        name: "数据模板语法",
        description:
          "使用特定的模板语法定义数据结构和生成规则，支持属性值自定义生成规则。",
        vuedetailimg: vueall,
      },
      {
        name: "请求拦截",
        description:
          "通过重 XMLHttpRequest 和 Fetch API，实现对 Ajax 请求的拦截和模拟响应。",
        vuedetailimg: vueall,
      },
      {
        name: "随机数据生成",
        description: "基于预定义的数据池和随机算法，生成符合规则的模拟数据。",
        vuedetailimg: vueall,
      },
    ],
  },
  Axios实验: {
    title: "Axios 的技术原理",
    principles: [
      {
        name: "请求处理",
        description:
          "基于 Promise 封装 XMLHttpRequest，提供统一的接口处理各种 HTTP 请求。",
        vuedetailimg: vueall,
      },
      {
        name: "拦截器链",
        description:
          "通过请求和响应拦截器链，实现请求前的预处理和响应后的统一处理。",
        vuedetailimg: vueall,
      },
      {
        name: "适配器模式",
        description:
          "使用适配器模式兼容不同环境（浏览器/Node.js），确保在不同平台上的一致性。",
        vuedetailimg: vueall,
      },
    ],
  },
};

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
    <input type="text" v-model="userInput" placeholder="输入你的消息" />  
    <button @click="updateMessage">更新消息</button>  
    <div v-if="isMessageUpdated">  
      <p>最新消息: {{ updatedMessage }}</p>  
    </div>  
    <div>  
      <h2>消息历史:</h2>  
      <ul>  
        <li v-for="(msg, index) in messageHistory" :key="index">{{ msg }}</li>  
      </ul>  
    </div>  
  </div>  
</template>  

< setup>  
import { ref, computed } from 'vue'  
const message = ref('Hello Vue!')  
const userInput = ref('')  
const messageHistory = ref([])  
const changeMessage = () => {  
  message.value = 'Message Changed!'  
  recordMessage(message.value)  
}  
const updateMessage = () => {  
  if (userInput.value.trim()) {  
    message.value = userInput.value  
    recordMessage(message.value)  
    userInput.value = '' // Clear input after update  
  }  
}  
const recordMessage = (msg) => {  
  messageHistory.value.push(msg)  
}  
const isMessageUpdated = computed(() => {  
  return message.value !== 'Hello Vue!'  
})  
const updatedMessage = computed(() => {  
  return message.value  
})  
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
        description: "习JavaScript数组的基本操作方法",
        code: `const fruits = ['���果', '香蕉', '橙子'];

fruits.push('葡萄', '梨');
console.log(fruits);

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
        code: `const myChart = echarts.init(document.getElementById('main'));
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

const labQuestions: Record<string, Question[]> = {
  "Vue基础实验": [
    {
      id: 1,
      title: "Vue中的数据双向绑定是通过以下哪个指令实现的？",
      options: ["v-if", "v-for", "v-model", "v-show"],
      correctAnswer: 2,
    },
    {
      id: 2,
      title: "Vue组件中的 setup() 函数在什么时候执行？",
      options: ["组更新时", "组件创前", "组件销毁时", "组件挂载后"],
      correctAnswer: 1,
    },
    {
      id: 3,
      title: "Vue 3中,如何定义响应式数据？",
      options: ["使用data选项", "使用ref()/reactive()", "使用computed", "使用watch"],
      correctAnswer: 1,
    },
    {
      id: 4,
      title: "Vue 3中的组合式API主要解决了什么问题？",
      options: ["性能问题", "样式问题", "代码复用和组织问题", "路由问题"],
      correctAnswer: 2,
    },
    {
      id: 5,
      title: "在Vue 3中,如何获取模板引用？",
      options: ["使用$refs", "使用ref()定义并在模板中用ref属性", "使用querySelector", "使用getElementById"],
      correctAnswer: 1,
    }
  ],
  "JavaScript实验": [
    {
      id: 1,
      title: "以下哪个方法可以向数组末尾添加元素？",
      options: ["pop()", "shift()", "unshift()", "push()"],
      correctAnswer: 3,
    },
    {
      id: 2,
      title: "JavaScript中，以下哪个是基本数据类型？",
      options: ["Array", "Object", "Symbol", "Function"],
      correctAnswer: 2,
    },
    {
      id: 3,
      title: "JavaScript中的闭包是什么？",
      options: [
        "一个对象",
        "一个函数",
        "一个能访问自由变量的函数",
        "一个类"
      ],
      correctAnswer: 2,
    },
    {
      id: 4,
      title: "Promise的状态有哪些？",
      options: [
        "running/stopped",
        "pending/fulfilled/rejected",
        "start/end",
        "success/error"
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      title: "以下哪个不是JavaScript的事件循环中的任务队列？",
      options: [
        "宏任务队列",
        "微任务队列",
        "优先任务队列",
        "定时器队列"
      ],
      correctAnswer: 2,
    }
  ],
  "ECharts实验": [
    {
      id: 1,
      title: "ECharts中，以下哪个配置项用于设置图表标题？",
      options: ["series", "xAxis", "title", "legend"],
      correctAnswer: 2,
    },
    {
      id: 2,
      title: "ECharts图表的渲染默认使用哪种技术？",
      options: ["SVG", "Canvas", "WebGL", "HTML"],
      correctAnswer: 1,
    },
    {
      id: 3,
      title: "ECharts中如何实现表的自适应调整大小？",
      options: [
        "自动调整",
        "使用resize()方法",
        "设置responsive选项",
        "使用scale()方法"
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      title: "ECharts中的dataset主要用于什么？",
      options: [
        "设置样式",
        "管理动画",
        "数据集中管理",
        "控制交互"
      ],
      correctAnswer: 2,
    },
    {
      id: 5,
      title: "在ECharts中，如何实现多个图表的联动？",
      options: [
        "使用connect()",
        "设置link选项",
        "使用connect选项",
        "自动联动"
      ],
      correctAnswer: 0,
    }
  ],
  "Mock.js实验": [
    {
      id: 1,
      title: "Mock.js中，生成随机中文姓名使用以下哪个占位符？",
      options: ["@name", "@cname", "@fullname", "@username"],
      correctAnswer: 1,
    },
    {
      id: 2,
      title: "Mock.js数据模板中，|+1 表示什么？",
      options: ["随机加1", "自增1", "加法运算", "数组长度加1"],
      correctAnswer: 1,
    },
    {
      id: 3,
      title: "Mock.js如何设置数据生成的延迟时间？",
      options: [
        "使用timeout选项",
        "使用delay选项",
        "使用setTimeout",
        "使用time选项"
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      title: "Mock.js中如何生成指定范围内的随机数？",
      options: [
        "@random",
        "@integer(min,max)",
        "@number",
        "@range"
      ],
      correctAnswer: 1,
    },
    {
      id: 5,
      title: "Mock.js中如何拦截Ajax请求？",
      options: [
        "自动拦截",
        "使用Mock.mock(url, template)",
        "使用Mock.intercept()",
        "使用Mock.setup()"
      ],
      correctAnswer: 1,
    }
  ],
  "Axios实验": [
    {
      id: 1,
      title: "Axios发送请求后返回的是什么类型的对象？",
      options: ["String", "Array", "Promise", "Number"],
      correctAnswer: 2,
    },
    {
      id: 2,
      title: "使用Axios发GET请求的正确方法是？",
      options: [
        "axios.get(url).then()",
        "axios.post(url).then()",
        "axios.request(url).then()",
        "axios.fetch(url).then()"
      ],
      correctAnswer: 0,
    },
    {
      id: 3,
      title: "Axios如何设置请求拦截器？",
      options: [
        "axios.intercept()",
        "axios.interceptors.request.use()",
        "axios.middleware()",
        "axios.use()"
      ],
      correctAnswer: 1,
    },
    {
      id: 4,
      title: "Axios如何取消请求？",
      options: [
        "使用cancel token",
        "使用abort()",
        "使用stop()",
        "使用close()"
      ],
      correctAnswer: 0,
    },
    {
      id: 5,
      title: "Axios默认的请求超时时间是多少？",
      options: [
        "0ms(无超时)",
        "1000ms",
        "5000ms",
        "10000ms"
      ],
      correctAnswer: 0,
    }
  ],
};

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
  let output = "";
  const originalLog = console.log;

  console.log = (...args) => {
    output +=
      args
        .map((arg) => {
          if (Array.isArray(arg)) {
            // 数组使用一行显示
            return `[${arg.join(", ")}]`;
          } else if (typeof arg === "object" && arg !== null) {
            // 对象仍然保持格式化显示
            return JSON.stringify(arg, null, 2);
          } else {
            return String(arg);
          }
        })
        .join(" ") + "\n";
  };

  try {
    new Function(code)();
    console.log = originalLog;
    return output || "代码执成功，但没有输出结";
  } catch (error: any) {
    console.log = originalLog;
    return `执行错误: ${error.message}`;
  }
};

const toggleResult = (section: Section) => {
  if (section.result) {
    // 如果已经有结果，则清空结果
    section.result = "";
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

const currentSection = ref("intro"); // 默认显示技术介绍部分

const switchSection = (section: string) => {
  currentSection.value = section;
  // 添加动回顶部的逻辑
  const container = document.querySelector('.lab-container');
  if (container) {
    container.scrollTo({
      top: 0,
      behavior: 'smooth' // 使用平滑滚动效果
    });
  }
};

const sectionOrder = ["intro", "theory", "implementation", "example"];

const handleNextSection = () => {
  const currentIndex = sectionOrder.indexOf(currentSection.value);

  // 如果当前不是最后一个部分，则切换到下一个部分
  if (currentIndex < sectionOrder.length - 1) {
    currentSection.value = sectionOrder[currentIndex + 1];
  } else {
    // 如果是最后一个部分(example)
    const currentId = Number(route.params.id);
    if (currentId < 5) {
      // 如果是最一个实验
      // 跳转到下一实验的第一个部分(intro)
      router.push(`/lab/${currentId + 1}`);
      currentSection.value = "intro";
    } else {
      // 如果是最后一个实验(Axios实验)，跳转到index页面
      router.push("/index");
    }
  }
};
// 相应地，也需要修改handlePrevSection函数以保持一致性
const handlePrevSection = () => {
  const currentIndex = sectionOrder.indexOf(currentSection.value);

  // 如果当前不是第一个部分，则切换到上一个部分
  if (currentIndex > 0) {
    currentSection.value = sectionOrder[currentIndex - 1];
  } else {
    // 如果是第一个部分(intro)
    const currentId = Number(route.params.id);
    if (currentId > 1) {
      // 如果不是第一个实验
      // 跳转到上一个实验的最后一个部分(example)
      router.push(`/lab/${currentId - 1}`);
      currentSection.value = "example";
    } else {
      // 如果是第一个实验，跳转回技术实操页面
      router.push("/basicoperate/shoppage");
    }
  }
};

const userAnswers = ref<Record<string, Record<number, number>>>({
  Vue基础实验: {},
  ECharts实验: {},
  JavaScript实验: {},
  "Mock.js实验": {},
  Axios实验: {},
});
const showResults = ref(false);

const handleAnswer = (questionId: number, answerIndex: number) => {
  if (currentLab.value) {
    if (!userAnswers.value[currentLab.value.title]) {
      userAnswers.value[currentLab.value.title] = {};
    }
    userAnswers.value[currentLab.value.title][questionId] = answerIndex;
  }
};

const checkAnswers = () => {
  showResults.value = true;
};

const resetQuiz = () => {
  if (currentLab.value) {
    userAnswers.value[currentLab.value.title] = {};
  }
  showResults.value = false;
};

const exportQuestions = () => {
  // 收集所有实验的题目
  const allQuestions = {
    'Vue基础实验': labQuestions['Vue基础实验'],
    'JavaScript实验': labQuestions['JavaScript实验'],
    'ECharts实验': labQuestions['ECharts实验'],
    'Mock.js实验': labQuestions['Mock.js实验'],
    'Axios实验': labQuestions['Axios实验']
  };

  // 格式化题目数据
  const formattedData = Object.entries(allQuestions).map(([experimentName, questions]) => {
    const formattedQuestions = questions.map(q => {
      return {
        题目: q.title,
        选项A: q.options[0],
        选项B: q.options[1],
        选项C: q.options[2],
        选项D: q.options[3],
        正确答案: ['A', 'B', 'C', 'D'][q.correctAnswer - 1]
      };
    });
    return {
      实验名称: experimentName,
      习题: formattedQuestions
    };
  });

  // 换为JSON字符串
  const jsonString = JSON.stringify(formattedData, null, 2);
  
  // 创建Blob对象
  const blob = new Blob([jsonString], { type: 'application/json' });
  
  // 创建下载链接
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = '实验习题集.json';
  
  // 触发下载
  document.body.appendChild(link);
  link.click();
  
  // 清理
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
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
  margin-top: 220px;
  padding: 20px;
  color: #fff;
  min-height: calc(100vh - 360px);
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none;
  position: relative;
  z-index: 1;
  padding-bottom: 120px;
}

.lab-container::-webkit-scrollbar {
  display: none;
}

.lab-content {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  height: auto;
  min-height: 0;
}

.code-block {
  background: rgba(0, 0, 0, 0.5);
  padding: 20px;
  border-radius: 4px;
  height: auto;
}

.code-textarea {
  width: 100%;
  min-height: 420px;
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
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.code-textarea::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
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

.breadcrumb-container {
  position: fixed;
  top: 140px;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 8px;
}

.sub-breadcrumb-container {
  position: fixed;
  top: 180px;
  left: 0;
  right: 0;
  z-index: 100;
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 20px;
  border-radius: 8px;
  /* 移除背景色和模糊效果 */
  /* background: rgba(0, 0, 0, 0.8); */
  /* backdrop-filter: blur(10px); */
  /* 移除边框 */
  /* border: 1px solid rgba(0, 234, 255, 0.3); */
}

:deep(.el-breadcrumb) {
  color: #fff;
  font-size: 16px;
  line-height: 1;
  text-shadow: 1px 1px 2px black;
}

:deep(.el-breadcrumb__item) {
  color: #fff !important;
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

.active-breadcrumb :deep(.el-breadcrumb__inner) {
  color: #00eaff !important;
  cursor: pointer;
}

:deep(.el-breadcrumb__inner) {
  cursor: pointer;
  color: #fff !important;
}

:deep(.el-breadcrumb__inner:hover) {
  color: #00eaff !important;
}

.intro-content,
.theory-content {
  color: #fff;
  line-height: 1.6;
}

.intro-content h2,
.theory-content h2 {
  color: #00eaff;
  margin: 15px 0 15px;
}

.intro-content ul,
.theory-content ul {
  /* margin: 10px 0; */
}

.intro-content li,
.theory-content li {
  margin: 8px 0;
}
.intro-image {
  width: 700px;
  height: 600px;
}

.theory-section {
  padding: 15px;
  background: rgba(0, 234, 255, 0.1);
  border-radius: 8px;
}

.theory-section h3 {
  color: #00eaff;
  margin: 10px 0;
}

.section-navigation {
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-20%);
  display: flex;
  justify-content: flex-end;
  gap: 20px;
  width: 100%;
  max-width: 1200px;
  padding: 0 20px;
  z-index: 100;
}

.section-navigation .el-button {
  background: rgba(0, 234, 255, 0.1);
  border: 1px solid #00eaff;
  color: #fff;
  width: 150px;
  height: 60px;
  font-size: 18px;
  padding: 12px 24px;
  border-radius: 4px;
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
}

.section-navigation .el-button:hover {
  background: rgba(0, 234, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 234, 255, 0.2);
}

.section-navigation .el-button:disabled {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.5);
  cursor: not-allowed;
}

.example-content {
  text-align: center;
  padding: 40px;
  color: #fff;
  font-size: 18px;
}

.quiz-content {
  padding: 20px;
}

.question-block {
  margin-bottom: 30px;
  background: rgba(0, 0, 0, 0.3);
  padding: 20px;
  border-radius: 8px;
  border: 1px solid rgba(0, 234, 255, 0.2);
}

.question-block h3 {
  color: #00eaff;
  margin-bottom: 20px;
}

.options-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.option-item {
  padding: 15px 20px;
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid rgba(0, 234, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
}

.option-item:hover {
  background: rgba(0, 234, 255, 0.1);
}

.option-item.selected {
  background: rgba(0, 234, 255, 0.2);
  border-color: #00eaff;
}

.option-item.correct {
  background: rgba(0, 255, 0, 0.2);
  border-color: #00ff00;
}

.option-item.wrong {
  background: rgba(255, 0, 0, 0.2);
  border-color: #ff0000;
}

.option-label {
  margin-right: 15px;
  color: #00eaff;
  font-weight: bold;
}

.quiz-actions {
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 20px;
}

.quiz-actions .el-button {
  width: 150px;
}

.intro-flex-container {
  display: flex;
  gap: 40px;
  /* margin-top: 20px; */
  align-items: flex-start;
}

.intro-image-container {
  flex: 1;
}

.intro-features-container {
  flex: 1;
  background: rgba(0, 234, 255, 0.1);
  padding: 13px 13px 13px 18px;
  border-radius: 8px;
  /* min-height: 600px; */
  display: flex;
  flex-direction: column;
}

.intro-image {
  width: 100%;
  height: auto;
  max-width: 600px;
  border-radius: 8px;
  border: 1px solid rgba(0, 234, 255, 0.3);
}

.intro-features-container ul {
  /* margin-top: 20px; */
}

.intro-features-container li {
  margin: 15px 0;
  padding: 10px;
  background: rgba(0, 234, 255, 0.05);
  border-radius: 4px;
  transition: all 0.3s ease;
}

.intro-features-container li:hover {
  background: rgba(0, 234, 255, 0.1);
  transform: translateX(5px);
}

.vuedetailimg {
  width: 500px;
  height: auto;
  margin: 18px auto;
}

.theory-section p {
  white-space: pre-wrap; /* 保留换行符并允许自动换行 */
  line-height: 1.6;
}
</style>
