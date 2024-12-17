l

# 问题记录

1.  i18n 变量父组件无法共享给子组件问题

   - 不要使用 json定义 i18n 信息

   - 子slot 使用 :data 绑定数据

2. 子订单中 订单编号 是不是 order字段

# 待处理任务

##### 0429

- [ ] SwapMonitor页面直接替换为http://172.16.2.228:2233/（这个是实盘环境，需要用测试环境http://172.16.1.46:2233/ ），对应的前端页面是ajax.html
- [ ] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。
- [ ] 可能还会有几个字段要加上。
- [x] broker，channel，group加上筛选过滤
- [x] 数据检查页面的格式完善。
- [x] msci的total_cap中文展示。

##### 0430

- [x] SwapMonitor页面直接替换为http://172.16.2.228:2233/（这个是实盘环境，需要用测试环境http://172.16.1.46:2233/ ），对应的前端页面是ajax.html，后端测试环境是http://172.16.1.51:8998/，实盘环境是http://172.16.2.228:8998/
- [ ] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。
- [ ] 可能还会有几个字段要加上。
- [ ] Aggregation下的order页面改一下接口字段，新字段在接口(2)中。（优先级比较高）



##### 0506

- [ ] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。
- [x] Aggregation下的order页面改一下接口字段，新字段在接口(2)中。（优先级比较高）（10.34搞定，未测试。）
- [x] portfolio筛选



##### 0507

- [ ] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。页面上加筛选和搜索（目前完成了子订单查询）
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。

##### 0507

- [x] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。页面上加筛选和搜索（目前完成了子订单查询，搜索框中目前只可以搜AccountIds和Symbols，有些搜索不能模糊搜索，比如orderQid. 现在的是keyup监听事件）（子单和母单的time展示问题）
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。
- [x] OMS-config组合信号配置中的组合详情编辑css样式、新增一个组合信号配置V1，然后界面展示如类Combine Signal V1，详情查看展示如类CombineJoinV1，权重分散为前四个字段，后两个不变。

##### 0510

- [x] 修改的页面替换接口，目前有三个接口，分别是母单查询、查询母单关联下子单、子单查询。页面上加筛选和搜索（目前完成了子订单查询，搜索框中目前只可以搜AccountIds和Symbols，有些搜索不能模糊搜索，比如orderQid. 现在的是keyup监听事件）（子单和母单的time展示问题）
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。
- [x] OMS-config组合信号配置中的组合详情编辑css样式、新增一个组合信号配置V1，然后界面展示如类Combine Signal V1，详情查看展示如类CombineJoinV1，权重分散为前四个字段，后两个不变。

##### 0511

- [x] 母单页面、子单页面的轮询和子母单关联页面；聚合页面
- [ ] 轮询后有一些问题，detail中的数据可以单独作为一列
- [ ] 聚合下的position,对应接口是持仓聚合统计接口
- [ ] Position Info目前接口还待定
- [ ] 母单页面的查询条件，有些是下拉框，有些是输入框。
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。
- [x] OMS-config组合信号配置中的组合详情编辑css样式、新增一个组合信号配置V1，然后界面展示如类Combine Signal V1，详情查看展示如类CombineJoinV1，权重分散为前四个字段，后两个不变。测试环境目前接口有问题。

##### 0512

- [ ] 轮询后有一些问题，detail中的数据可以单独作为一列
- [x] 聚合下的position,对应接口是持仓聚合统计接口
- [x] Position Info目前接口还待定（已经解决）
- [x] monitor新增了几个字段
- [ ] 母单页面的查询条件，有些是下拉框，有些是输入框。
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。（已经拉下来了，KDB是一个数据库）
- [x] OMS-config组合信号配置中的组合详情编辑css样式、新增一个组合信号配置V1，然后界面展示如类Combine Signal V1，详情查看展示如类CombineJoinV1，权重分散为前四个字段，后两个不变。测试环境目前接口有问题。测试一下，然后部署到生产。

##### 0513

- [x] 轮询后有一些问题，detail中的数据可以单独作为一列
- [x] 母单页面的查询条件，有些是下拉框，有些是输入框。所有的分页都看一下。母单加一个撤单的按钮，接口已给；多加了一个历史延迟查询页面，和子单延迟统计页面类似，key选项仿照聚合查询的key选项。（目前已经接好，但是接口有问题，等接口调通了在测试）
- [ ] 母单查询子单，OrderType可能会不传，其实是0，需要设置默认值，所有的int，double都设置成default 0母单，子单的数据映射和proto类型一致，需要检查一下。母单是不是也有这个问题（只改了部分数据，这个需要比对一下）
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。（已经拉下来了，KDB是一个数据库）（KDB目前知道了架构）
- [ ] 策略配置中的组合信号，也需要从v1中查询，是这两类组合信号的并集。

##### 0514

- [x] 策略配置中的组合信号，也需要从v1中查询，是这两类组合信号的并集。
- [ ] 母单页面的查询条件，有些是下拉框，有些是输入框。所有的分页都看一下。母单加一个撤单的按钮，接口已给；多加了一个历史延迟查询页面，和子单延迟统计页面类似，key选项仿照聚合查询的key选项。（目前已经接好，但是接口有问题，等接口调通了在测试）
- [ ] 母单查询子单，OrderType可能会不传，其实是0，需要设置默认值，所有的int，double都设置成default 0母单，子单的数据映射和proto类型一致，需要检查一下。母单是不是也有这个问题（只改了部分数据，**这个需要比对一下**）
- [ ] MS-EMS、MS-EMS-KDB两个项目跑通。（已经拉下来了，KDB是一个数据库）（KDB目前知道了架构）

##### 0515

- [x] 策略配置中的组合信号，也需要从v1中查询，是这两类组合信号的并集。
- [x] 母单页面的查询条件，有些是下拉框，有些是输入框。所有的分页都看一下。母单加一个撤单的按钮，接口已给；多加了一个历史延迟查询页面，和子单延迟统计页面类似，key选项仿照聚合查询的key选项。（目前已经接好，但是接口有问题，等接口调通了在测试）（目前母单子单还在完善，接口，母单已经接好）
- [x] 母单查询子单，OrderType可能会不传，其实是0，需要设置默认值，所有的int，double都设置成default 0母单，子单的数据映射和proto类型一致，需要检查一下。母单是不是也有这个问题（只改了部分数据，这个需要比对一下）
- [x] MS-EMS、MS-EMS-KDB两个项目跑通。（已经拉下来了，KDB是一个数据库）（KDB目前知道了架构）

##### 0521

- [x] 撤单和重置bug，监控筛选后不更新。

##### 0525

- [x] 借券的页面
- [x] 子订单延迟和历史订单延迟页面增加三个字段和一个筛选框

**0601**

- [x] 母单页面数据下载

##### 0615

- [x] 添加一个ShortMonitor接口



### 新增任务(20210702)

**加两个历史页面 yuque 27、28，然后对应后端发布在测试环境1.51上，27页面叫Parent Order，28叫Position 然后把页面HistoryOrderDelay拿出来，新增一个二级菜单树History，把这三个都放进去**

### 新增任务(20210727)

**ShortingMonitor的下面添加一个Intraday Monitor 页面类似http://192.168.1.125:8003/intradayinfo，返回的data**

```python
{"data":[{"product_id":"1201","start_time":"09:10:00","end_time":"13:58:00","enable":true,"exposure":800000,"shorting":false,"trade_start_time":"2021-07-27T09:10:00Z","trade_end_time":"2021-07-27T13:58:00Z","all_buy_mount":0,"all_sell_amount":0,"finish_buy_amount":0,"finish_sell_amount":0,"open_pl":0,"close_pl":0,"commission":0,"finish_order_num":0,"un_finish_order_num":0,"error_order_num":0,"last_deal_time":0,"last_trade_time":0}],"errorId":0,"errorMsg":""}


type AccountConfig struct {
	ProductId string  `json:"product_id"`
	StartTime string  `json:"start_time"`
	EndTime   string  `json:"end_time"`
	Enable    bool    `json:"enable"`
	Exposure  float64 `json:"exposure"`
	Shorting  bool    `json:"shorting"`
}

c.JSON(200, gin.H{
		"errorId":  0,
		"errorMsg": "",
		"data":     statistics,
	})


type AccountStatistic struct {
	AccountConfig


	TradeStartTime time.Time `json:"trade_start_time"`
	TradeEndTime   time.Time `json:"trade_end_time"`


	AllBuyMount   float64 `json:"all_buy_mount"`
	AllSellAmount float64 `json:"all_sell_amount"`


	FinishBuyAmount  float64 `json:"finish_buy_amount"` #买
	FinishSellAmount float64 `json:"finish_sell_amount"` #卖


	OpenPL  float64 `json:"open_pl"` #多仓
	ClosePL float64 `json:"close_pl"` #开仓


	Commission float64 `json:"commission"` # 手续费


	FinishOrderNum   int32 `json:"finish_order_num"`
	UnFinishOrderNum int32 `json:"un_finish_order_num"`
	ErrorOrderNum    int32 `json:"error_order_num"`


	LastDealTime  int64 `json:"last_deal_time"`
	LastTradeTime int64 `json:"last_trade_time"`
}


# url 信息 get请求。
192.168.1.150 8090

17:04:01

http://127.0.0.1:8090/api/intraday/info

这是url
```

### 0802

```python
intraday monitor 小数保留2位，同时时间戳格式化成标准时分秒格式。
```

### 0811

```python
intraday monitor 所有小数 四舍五入 保留整数。
添加 Transfer和Profit两个字段
intraday monitor 所有小数，四舍五入保留整数。
```

### 0812

```python
status 为Cancel的订单 修改样式为 棕色，颜色更深一些。
```

### 0813

```python
 修改样式为 棕色，颜色更深一些。
```

### 0903

```python
shortmonitor 添加一个时间点ID显示
```

