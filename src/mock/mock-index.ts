import Mock from "mockjs";
//处理路径传参
import { parameteUrl } from "@/utils/query-param";

function ArrSet(Arr: any[], id: string): any[] {
  let obj: any = {};
  const arrays = Arr.reduce((setArr, item) => {
    obj[item[id]] ? "" : (obj[item[id]] = true && setArr.push(item));
    return setArr;
  }, []);
  return arrays;
}
/**
 * @description: min ≤ r ≤ max  随机数
 * @param {*} Min
 * @param {*} Max
 * @return {*}
 */
function RandomNumBoth(Min: any, Max: any) {
  var Range = Max - Min;
  var Rand = Math.random();
  var num = Min + Math.round(Rand * Range); //四舍五入
  return num;
}
//左中
export default [
  {
    url: "/bigscreen/countUserNum",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          offlineNum: 1259,
          alarmNum: 252,
          // lockNum: 0,
          totalNum: 28074,
        },
      });
      // a.data.onlineNum = a.data.totalNum - a.data.offlineNum - a.data.lockNum - a.data.alarmNum
      a.data.onlineNum = a.data.totalNum - a.data.offlineNum - a.data.alarmNum;
      return a;
    },
  },
  {
    url: "/bigscreen/countDeviceNum",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          alarmNum: 25519,
          offlineNum: 7919,
          totalNum: 25207,
          onlineNum: 79930,
        },
      });
      // a.data.onlineNum = a.data.totalNum - a.data.offlineNum
      return a;
    },
  },
  //左下
  {
    url: "/bigscreen/leftBottom",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          "list|20": [
            {
              provinceName: "1115656",
              cityName: "222",
              countyName: "333",
              createTime: "adadad",
              deviceId: "6c512d754bbcd6d7cd86abce0e0cac58",
              gatewayno: 100005,
              "onlineState|1": [0, 1],
            },
          ],
        },
      });
      return a;
    },
  },
  //中间原数据
  {
    url: "/bigscreen/alarmNum",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          dateList: [
            "2021-11-01",
            "2021-12-01",
            "2022-01-01",
            "2022-02-01",
            "2022-03-01",
            "2022-04-01",
          ],
          "numList|6": ["@integer(0, 1000)"],
          "numList2|6": ["@integer(0, 1000)"],
        },
      });
      return a;
    },
  },
  // 右上数据
  {
    url: "/bigscreen/righttopdatanew",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          dateList: [
            "教授人数",
            "副教授人数",
            "讲师人数",
            "博士学位",
            "硕士学位",
            "国家级人才",
          ],
          numList: [15, 35, 24, 50, 80, 20], // 盛宝学院数据
          numList2: [200, 300, 300, 200, 500, 300], // 三亚学院数据
        },
      });
      return a;
    },
  },
  //右中
  {
    url: "/bigscreen/ranking",
    type: "get",
    response: () => {
      // let num = Mock.mock({ "list|80": [{ value: "@integer(50,1000)", name: "@city()" }] }).list
      // //   console.log("ranking",num);
      // let newNum: any = [], numObj: any = {}
      // num.map((item: any) => {
      //     if (!numObj[item.name] && newNum.length < 8) {
      //         numObj[item.name] = true
      //         newNum.push(item)
      //     }
      // })
      // let arr = newNum.sort((a: any, b: any) => {
      //     return b.value - a.value
      // })
      // let a = {
      //     success: true,
      //     data: arr
      // }
      // return a
      const data = [
        { value: 352, name: "国际经济与贸易" },
        { value: 325, name: "保险学(保险科技)" },
        { value: 252, name: "经济与金融" },
        { value: 347, name: "金融科技" },
        { value: 580, name: "数字经济" },
        { value: 256, name: "投资学" },
        { value: 101, name: "区块链工程" },
        { value: 123, name: "国贸(中外合办)" },
      ];

      return {
        success: true,
        data: data,
      };
    },
  },
  //右下
  {
    url: "/bigscreen/rightBottom",
    type: "get",
    response: () => {
      const a = Mock.mock({
        success: true,
        data: {
          "list|40": [
            {
              alertdetail: "@csentence(5,10)",
              "alertname|1": ["水浸告警", "各种报警"],
              alertvalue: "@float(60, 200)",
              createtime: "2022-04-19",
              deviceid: null,
              "gatewayno|+1": 10000,
              phase: "A1",
              sbInfo: "@csentence(10,18)",
              "terminalno|+1": 100,
              provinceName: "@province()",
              cityName: "@city()",
              countyName: "@county()",
            },
          ],
        },
      });
      return a;
    },
  },
  //安装计划
  {
    url: "/bigscreen/installationPlan",
    type: "get",
    response: () => {
      interface InstallationPlanData {
        category: string[];
        barData: number[]; // 计划安装数
        lineData: number[]; // 实际安装数
        rateData: string[]; // 完成率
      }

      const a: InstallationPlanData = {
        category: [
          "2024-04",
          "2024-05",
          "2024-06",
          "2024-07",
          "2024-08",
          "2024-09",
        ],
        // barData: Mock.mock({
        //     "list|6": ["@integer(10, 100)"]  // 计划安装数 10-100
        // }).list,
        barData: [24, 25, 26, 24, 27, 31],
        // lineData: Mock.mock({
        //     "list|6": ["@integer(5, 80)"]    // 实际安装数 5-80
        // }).list,
        lineData: [10, 11, 13, 11, 13, 15],
        rateData: [],
      };

      // 计算完成率
      a.rateData = a.lineData.map((actual, index) => {
        const rate = (actual / a.barData[index]) * 100;
        return rate.toFixed(0);
      });

      return {
        success: true,
        data: a,
      };
    },
  },
  {
    url: "/bigscreen/centerMap",
    type: "get",
    response: (options: any) => {
      let params = parameteUrl(options.url);
      //不是中国的时候
      if (params.regionCode && !["china"].includes(params.regionCode)) {
        const a = Mock.mock({
          success: true,
          data: {
            "dataList|100": [
              {
                name: "@city()",
                value: "@integer(1, 1000)",
              },
            ],
            regionCode: params.regionCode, //-代表中国
          },
        });
        return a;
      } else {
        const a = Mock.mock({
          success: true,
          data: {
            "dataList|12": [
              {
                name: "@province()",
                value: "@integer(1, 1100)",
              },
            ],
            regionCode: "china",
          },
        });
        // 去重
        a.data.dataList = ArrSet(a.data.dataList, "name");
        return a;
      }
    },
  },
];
