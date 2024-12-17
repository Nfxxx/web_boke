import Vue from 'vue';
import Router from 'vue-router';
import {i18n} from '@/i18n';

Vue.use(Router);
// console.log(i18n)
const lang = i18n._vm.locale;
const messages = i18n._vm.messages[lang].common;
// console.log(messages)
/* Layout */
import Layout from '@/layout';

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/order/order_aggregation',
  },

  {
    path: '/order',
    component: Layout,
    meta: {title: "基金管理", icon: 'dingdan'},
    children: [

      {
        path: 'sub',
        name: 'suborder',
        component: () => import('@/views/order/SubOrder'),
        meta: {title: "基金产品页", icon: 'dingdan'},
      },
      {
        path: 'order_aggregation',
        name: 'order_aggregation',
        component: () => import('@/views/order/OrderAgg'),
        meta: {title: "基金看板", icon: 'dingdan'},
      },
      {
        path: 'compare',
        name: 'compare',
        component: () => import('@/views/order/compare'),
        meta: {title: "对比页面", icon: 'dingdan'},
      },
      {
        path: 'month_profit',
        name: 'month_profit',
        component: () => import('@/views/order/month_profit'),
        meta: {title: "月度历史收益", icon: 'dingdan'},
      },
      {
        path: 'corre_profit',
        name: 'corre_profit',
        component: () => import('@/views/order/corre_profit'),
        meta: {title: "收益相关性", icon: 'dingdan'},
      },
      {
        path: 'Performance_indicator',
        name: 'Performance_indicator',
        component: () => import('@/views/order/Performance_indicator'),
        meta: {title: "绩效指标统计", icon: 'dingdan'},
      },
      {
        path: 'web_add',
        name: 'web_add',
        component: () => import('@/views/order/web_add'),
        meta: {title: "基协爬取网页录入", icon: 'dingdan'},
      },
      {
        path: 'TI_Control',
        name: 'TI_Control',
        component: () => import('@/views/order/TargetIntegratedControl'),
        meta: {title: "标的集中度控制", icon: 'dingdan'},
      },
      {
        path: 'Fund_Waring',
        name: 'Fund_Waring',
        component: () => import('@/views/order/fund_warning'),
        meta: {title: "警告信息查询", icon: 'dingdan'},
      },
    ]
  },
  {
    path: '/data_dict',
    component: Layout,
    meta: {title: "数据字典", icon: 'el-icon-s-data'},
    children: [
      {
        path: 'zyyxData',
        name: 'zyyxData',
        component: () => import('@/views/datadict/zyyx'),
        meta: {title: "朝阳永续", icon: 'el-icon-s-data'},
      },
      {
        path: 'windData',
        name: 'windData',
        component: () => import('@/views/datadict/wind'),
        meta: {title: "wind", icon: 'el-icon-s-data'},

      },
      {
        path: 'ossData',
        name: 'ossData',
        component: () => import('@/views/datadict/oss_data'),
        meta: {title: "oss磁盘数据", icon: 'el-icon-s-data'}
      },
      {
        path: 'datayesData',
        name: 'datayesData',
        component: () => import('@/views/datadict/datayes'),
        meta: {title: "通联字典", icon: 'el-icon-s-data'}
      },
      {
        path: 'choiceData',
        name: 'choiceData',
        component: () => import('@/views/datadict/choice'),
        meta: {title: "东方财富", icon: 'el-icon-s-data'}
      },
      {
        path: 'ifindData',
        name: 'ifindData',
        component: () => import('@/views/datadict/ifind'),
        meta: {title: "同花顺", icon: 'el-icon-s-data'}
      },

    ]
  },
  {
    path: '/tradingData',
    component: Layout,
    meta: {title: "交易数据", icon: 'el-icon-s-data'},
    children: [
      {
        path: 'position',
        name: 'position',
        component: () => import('@/views/position/index'),
        meta: {title: "持仓信息", icon: 'cangku'}
      },
      {
        path: 'borrow',
        name: 'borrow',
        component: () => import('@/views/borrow/index'),
        meta: {title: "券池信息", icon: 'cangku'}
      }
    ]
  },

  {
    path: '/strategyMonitor',
    component: Layout,
    meta: {title: "策略监控", icon: 'dingdan'},

    children: [
      {
        path: 'portfolio/unfinish',
        name: 'portfolioUnfinish',
        component: () => import('@/views/monitor/portfolio'),
        meta: {title: "组合交易监控", icon: 'dingdan'}
      },
      {
        path: 'portfolio/finish',
        name: 'portfolioFinish',
        component: () => import('@/views/monitor/portfolio1'),
        meta: {title: "组合交易完成", icon: 'dingdan'}
      },
      {
        path: 'monitorzk',
        name: 'monitorzk',
        component: () => import('@/views/monitor/monitorzk'),
        meta: {title: "连续交易监控", icon: 'dingdan'},
      },
      {
        path: 'monitorhis',
        name: 'monitorhis',
        component: () => import('@/views/monitor/monitorhis'),
        meta: {title: "连续交易统计", icon: 'dingdan'},
      },
      {
        path: 'shortmonitorV2',
        name: 'shortmonitorV2',
        component: () => import('@/views/monitor/ShortMonitorV2'),
        meta: {title: "shortingV2监控", icon: 'dingdan'}
      },
      {
        path: 'intradaymonitor',
        name: 'intradaymonitor',
        component: () => import('@/views/monitor/IntradayMonitor'),
        meta: {title: "日内监控", icon: 'dingdan'}
      },
    ]
  },
  {
    path: '/scriptDaily',
    component: Layout,
    meta: {title: "常用脚本", icon: 'el-icon-zoom-out'},
    children: [
      {
        path: 'fixtimeduration',
        name: 'FixTimeDuration',
        component: () => import('@/views/script/fixTimeduration'),
        meta: {title: "运行换仓策略", icon: 'el-icon-zoom-out'},

      }, {
        path: 'fixPortfolio',
        name: 'FixPortfolio',
        component: () => import('@/views/script/fixPortfolio'),
        meta: {title: "运行特定组合", icon: 'el-icon-zoom-out'},

      }, {
        path: 'rebalanceStrategy',
        name: 'RebalanceStrategy',
        component: () => import('@/views/script/rebalanceStrategy'),
        meta: {title: "换仓策略测试", icon: 'el-icon-zoom-out'},

      }, {
        path: 'shortingStrategy',
        name: 'ShortingStrategy',
        component: () => import('@/views/script/shortingStrategy'),
        meta: {title: "Shorting策略测试", icon: 'el-icon-zoom-out'},
      },
    ]
  },
  {
    path: '/system',
    component: Layout,
    meta: {title: "System", icon: 'el-icon-s-data'},
    children: [
      {
        path: 'server_monitor',
        name: 'server_monitor',
        component: () => import('@/views/systemInfo/systemInfo'),
        meta: {title: "服务监控", icon: 'dingdan'}
      },
    ]
  },
  {
    path: '/Navigations',
    component: Layout,
    children: [
      {
        path: 'Navigations',
        name: 'Navigations',
        component: () => import('@/views/others/ems'),
        meta: {title: "其他", icon: 'el-icon-monitor'}
      }
    ]
  },

  // http://172.16.0.64:8818/index

  // 404 page must be placed at the end !!!
  {path: '*', redirect: '/404', hidden: true}
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({y: 0}),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
