import Vue from "vue";
import App from "./App.vue";
// 引入路由模块
import VueRouter from "vue-router";
// 引入index组件
import index from "./components/index.vue";
import goodsInfo from "./components/goodsInfo.vue";
import buyCar from "./components/buyCar.vue";
import payOrder from "./components/payOrder.vue";
import login from "./components/login.vue";
import orderInfo from "./components/orderInfo.vue";
import paySuccess from "./components/paySuccess.vue";
import personalCenter from "./components/PersonalCenter.vue";
import orderCenter from "./components/orderCenter.vue";
import lookOrder from "./components/lookOrder.vue";
// 导入ui框架
import ElementUI from "element-ui";
// 导入css
import "element-ui/lib/theme-chalk/index.css";
// 导入懒加载插件
import VueLazyload from "vue-lazyload";
// 引入css
import "./assets/statics/site/css/style.css";
// 引入模块 moment
import moment from "moment";
// 导入 axios模块 目的是让所有组件都可以使用
import axios from "axios";
// 导入iViewUI框架
import iView from "iview";
import "iview/dist/styles/iview.css";
// 导入Vuex
import Vuex from "vuex";

// 正常的服务器
axios.defaults.baseURL = "http://47.106.148.205:8899";
//让ajax携带cookie
axios.defaults.withCredentials = true;
// 崩溃后的备用服务器
// axios.defaults.baseURL = 'http://127.0.0.1:8848';
// 挂载到Vue的原型上->Vue实例化出来的对象 共用 vue-resource this.$http
Vue.prototype.axios = axios;

// 使用路由中间件 $route
Vue.use(VueRouter);
// 使用ui中间件 $message
Vue.use(ElementUI);
// 使用懒加载中间件
Vue.use(VueLazyload, {
  // 图片当做资源来引入
  loading: require("./assets/statics/img/loading2.gif")
});
// 使用iView $Message
Vue.use(iView);
// 使用Vuex
Vue.use(Vuex);

// 注册路由规则
const router = new VueRouter({
  routes: [
    // 访问的是 / 打到(重定向)
    {
      path: "/",
      redirect: "/index"
    },
    // index 都显示 index这个组件
    {
      path: "/index",
      component: index
    },
    {
      // goodsInfo/:id 参数
      // form表单中的 name属性
      path: "/goodsInfo/:id",
      component: goodsInfo
    },
    {
      path: "/buyCar",
      component: buyCar
    },
    // 订单支付路由
    // 动态路由匹配
    {
      path: "/payOrder/:ids",
      component: payOrder,
      // 路由元信息
      meta: { checkLogin: true }
    },
    // 登陆路由
    {
      path: "/login",
      component: login,
    },
    // 订单详情路由
    {
      path: "/orderInfo/:orderid",
      component: orderInfo,
      // 路由元数据
      meta: { checkLogin: true }
    },
    // 注册成功页
    {
      path: "/paySuccess",
      component: paySuccess,
      // 路由元数据
      meta: { checkLogin: true }
    },
    // 个人中心
    {
      path: "/personalCenter",
      component: personalCenter,
      // 路由元数据
      meta: { checkLogin: true }
    },
    // 订单中心
    {
      path: "/orderCenter",
      component: orderCenter,
      // 路由元数据
      meta: { checkLogin: true }
    },
    // 订单详情
    {
      path: "/lookOrder/:orderId",
      component: lookOrder,
      // 路由元数据
      meta: { checkLogin: true }
    },
  ]
});

// 注册全局过滤器
// 支持自定义规则
Vue.filter("cutTime", function(value,myFormat) {
  if(myFormat){
    return moment(value).format(myFormat);
  }else{
    return moment(value).format("YYYY年MM月DD日");
  }
});

// 判断数据是否存在
let buyList = JSON.parse(window.localStorage.getItem("buyList")) || {};

// 实例化一个 Vuex的 仓库
const store = new Vuex.Store({
  // 状态
  state: {
    // 数量
    // buyList: {}
    buyList,
    isLogin: false,
    // 来时的路由
    fromPath: "/"
  },
  // 类似于computed的属性
  getters: {
    totalCount(state) {
      let num = 0;
      // 遍历对象
      for (const key in state.buyList) {
        // 累加总数
        num += parseInt(state.buyList[key]);
      }
      return num;
    }
  },
  mutations: {
    // info->{goodId:xx,goodNum:xxx}
    buyGood(state, info) {
      if (state.buyList[info.goodId]) {
        // 解决字符串累加问题
        let oldNum = parseInt(state.buyList[info.goodId]);
        oldNum += parseInt(info.goodNum);
        // 重新赋值
        state.buyList[info.goodId] = oldNum;
      } else {
        // 没有 直接赋值这种方法 vue不会跟踪属性
        // state.buyList[info.goodId]=info.goodNum;
        // 需要使用 Vue.set(obj, 'newProp', 123) 替代
        Vue.set(state.buyList, info.goodId, parseInt(info.goodNum));
      }
    },
    // 直接修改数值的方法
    changeNum(state, info) {
      state.buyList[info.goodId] = info.goodNum;
    },
    // 删除数据
    delGoodById(state, id) {
      // 使用Vue的方法来删除
      Vue.delete(state.buyList, id);
    },
    // 修改登陆状态
    changeLogin(state, login) {
      state.isLogin = login;
    },
    // 保存来时的路由
    saveFromPath(state, fromPath) {
      state.fromPath = fromPath;
    }
  }
});

// beforeEach 可以当做一个回调函数 不是立刻触发 所以这里顺序不调整是可以的
router.beforeEach((to, from, next) => {
  // 保存来时的路由
  store.commit("saveFromPath", from.path);
  console.log(to);

  // from 从哪来 to 去哪里 next()下一个
  // if (to.path == "/payOrder/") {
  // 路由源信息进行判断
  if(to.meta.checkLogin){
    // 判断
    axios
      .get("/site/account/islogin")
      .then(response => {
        // // console.log(response);
        if (response.data.code == "nologin") {
          // 去登录页
          // // console.log('登录页')
          next("/login");
        } else {
          next();
        }
      })
      .catch(err => {});
  } else {
    next();
  }
});

Vue.config.productionTip = false;

new Vue({
  // 选择器
  el: "#app",
  // 挂载到vue
  router,
  // 渲染 App组件
  render: h => h(App),
  // 挂载仓库
  store,
  // 生命周期函数
  beforeCreate() {
    // console.log('app-beforeCreate');
    axios
      .get("/site/account/islogin")
      .then(response => {
        // console.log(response);
        // if(response.data.code=='logined')
        store.state.isLogin = response.data.code == "logined";
      })
      .catch(err => {
        // console.log(err);
      });
  },
  created() {
    // console.log('app-created');
  }
});

// 注册一些逻辑
window.onbeforeunload = function() {
  // alert('onbeforeunload');
  // window.localStorage.setItem('onbeforeunload',123);
  window.localStorage.setItem("buyList", JSON.stringify(store.state.buyList));
};
