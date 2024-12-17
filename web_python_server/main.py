import warnings
import numpy as np

warnings.filterwarnings("ignore", category=FutureWarning)
import pandas as pd
import uvicorn
from pathlib import Path
from fastapi import FastAPI, Request
from utils.read_sql import CompleteSql
import datetime
import json
from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
import utils.calculate as calculate
import utils.read_sql as sqls
router = APIRouter(tags=["默认路由"])

app = FastAPI()
app.add_middleware(
  CORSMiddleware,
  # 允许跨域的源列表，例如 ["http://www.example.org"] 等等，["*"] 表示允许任何源
  allow_origins=["*"],
  # 跨域请求是否支持 cookie，默认是 False，如果为 True，allow_origins 必须为具体的源，不可以是 ["*"]
  allow_credentials=False,
  # 允许跨域请求的 HTTP 方法列表，默认是 ["GET"]
  allow_methods=["*"],
  # 允许跨域请求的 HTTP 请求头列表，默认是 []，可以使用 ["*"] 表示允许所有的请求头
  # 当然 Accept、Accept-Language、Content-Language 以及 Content-Type 总之被允许的
  allow_headers=["*"],
)


class JsonResponse(object):
  def __init__(self, code, msg, data):
    self.code = code
    self.msg = msg
    self.data = data

  @classmethod
  def seccess(cls, code=200, msg='success', data=None):
    return cls(code, msg, data)

  @classmethod
  def fail(cls, code=400, msg='fail', data=None):
    return cls(code, msg, data)

  def to_dict(self):
    return json.dumps({
      "code": self.code,
      "msg": self.msg,
      "data": self.data
    })


@app.get("/")
async def root():
  return JsonResponse.seccess(msg='链接通过', data='0')


# 产品列表
@app.get("/table/ProductList")
async def ProductList():
  a = CompleteSql().fund_info_table()[
    ['fundname0', 'fundname', 'holder', 'fundclass', 'strategy', 'fundcode', 'holdercode', 'newcate']]

  # print(a.columns)
  return JsonResponse.seccess(msg='查询数据成功', data=a.to_json())


# 看板饼图数据入口
@app.get('/chart/getPineLine')
async def Pinelist():
  a = CompleteSql().action_record_table()
  start_time = datetime.date(2023, 11, 10)
  a = a[['Master_name', 'Slave_code_name', 'Slave_name', 'Trade_classes', 'Application_date', 'Amount']][
    (a['Application_date'] > start_time) & (a['Trade_classes'] == '申购')]
  a.drop_duplicates(subset='Slave_code_name', inplace=True)
  b = CompleteSql().fund_info_table()
  b = b[['fundname', 'fundclass', 'fundcode', 'newcate']]
  b.drop_duplicates(subset='fundcode', inplace=True)
  b.rename(columns={'fundcode': 'Slave_code_name'}, inplace=True)
  magre_parent = pd.merge(a, b, on='Slave_code_name', how='left')
  magre_parent = magre_parent.fillna('不计')
  # magre_parent=magre_parent[magre_parent['newcate']!='不计']
  magre_parent.rename(columns={'newcate': 'fundclass', 'fundclass': 'newcate'}, inplace=True)
  magre_parent = magre_parent.reset_index(drop=True)
  magre_parent = magre_parent.to_json(force_ascii=False)
  return magre_parent


# 绩效指标统计
@app.post('/table/indexList')
async def indexList(request: Request):
  data = await request.json()
  fundclass = data['fundclass']
  fundclass2 = data['fundclass2']
  index = data['index']
  wei = data['wei']
  try:
    value_name = data['valueName']
  except:
    value_name = 1
  FX = pd.read_excel(r'\\172.18.0.7\波克私募\资管文档\资管中后台\BK_资管投资净值跟踪\2024\FX.xlsx', sheet_name='Sheet3',
                    header=None)
  FX.columns = ['daily']
  end_time = FX.loc[FX.index[-1], 'daily'].date()
  week_time= FX.loc[FX.index[-2], 'daily'].date()
  month_time=FX.loc[FX.index[-5], 'daily'].date()
  b = CompleteSql().fund_info_table()
  b = b[['fundname', 'strategy', 'fundcode', 'newcate']]
  b.drop_duplicates(subset='fundcode', inplace=True)
  b.rename(columns={'fundcode': 'Slave_code_name'}, inplace=True)
  magre_parent = b
  magre_parent = magre_parent.fillna('不计')

  magre_parent.rename(columns={'newcate': 'fundclass', 'strategy': 'newcate'}, inplace=True)
  magre_parent = magre_parent[['fundname', 'Slave_code_name', 'newcate', 'fundclass']]
  if fundclass !='全量搜索':
    magre_parent = magre_parent[(magre_parent['newcate'] == fundclass) & (magre_parent['fundclass'] == fundclass2)]
  else:
    magre_parent = magre_parent[magre_parent['fundclass'] == fundclass2]
  Slave_code_name = magre_parent['Slave_code_name'].to_list()
  a = CompleteSql().fundnetvalue()
  old_a = a[a['FundCode'].isin(Slave_code_name)]
  name_a = old_a[['FundCode', 'FundName']]
  name_a.rename(columns={'FundCode': 'Slave_code_name'}, inplace=True)
  magre_parent = pd.merge(magre_parent, name_a, on='Slave_code_name', how='left')
  magre_parent = magre_parent.drop_duplicates()

  start_time = end_time  - datetime.timedelta(days=255)
  result = calculate.cal_sample(wei, index, start_time, end_time, old_a['FundName'].to_list(),value_name)
  # print(result['子午中性十三号私募证券投资基金'])
  result_date = result.__deepcopy__().reset_index()
  monthly_last = result_date[(month_time <= result_date['date'].dt.date) & (result_date['date'].dt.date< end_time)]
  monthly_last=monthly_last.set_index('date')
  monthly_last=monthly_last.sum()
  monthly_profit=monthly_last.to_frame(name='近一个月收益')
  # print(monthly_profit)
  week_last = result_date[(week_time <= result_date['date'].dt.date) & (result_date['date'].dt.date< end_time)]
  week_last=week_last.set_index('date')
  week_last=week_last.sum()
  week_profit = week_last.T
  week_profit=week_profit.to_frame (name= '近一周收益')
  result = np.cumprod(result + 1)

  max_drawdown = calculate.perfomance_calc(result)[['最大回撤','最新回撤']]
  monthly_profit = monthly_profit.fillna(0)
  monthly_profit['最大回撤'] = max_drawdown['最大回撤']
  monthly_profit['最新回撤'] = max_drawdown['最新回撤']
  monthly_profit['近一周收益'] = week_profit['近一周收益']
  # print(monthly_profit)
  monthly_profit = monthly_profit.reset_index()
  all_profit = monthly_profit.rename(columns={'index': 'FundName'})
  # print(all_profit)
  # print(magre_parent)
  magre_data = pd.merge(magre_parent, all_profit, on='FundName', how='left')
  # print(magre_data)
  magre_data = magre_data.dropna(subset=['最大回撤','最新回撤'])
  cols = ['最大回撤', '最新回撤', '近一周收益']  # 这些是你想要检查是否都为0的列
  magre_data = magre_data[~(magre_data[cols] == 0).all(axis=1)]
  magre_data.rename(columns={'fundname': '基金名称', 'fundclass': '策略类型1', 'newcate': '策略类型2'}, inplace=True)
  magre_parent = magre_data.drop(['Slave_code_name', 'FundName'], axis=1)
  magre_parent = magre_parent.groupby('基金名称').tail(1)
  magre_parent = magre_parent.reset_index(drop=True)
  magre_parent = magre_parent.to_json(force_ascii=False)
  # print(magre_parent)
  return {'data': magre_parent}


# 绩效指标_净值计算
@app.post("/table/PostNetValue")
async def PostNetValue(request: Request):
  data = await request.json()
  wei = data['wei']
  daily = data['year']
  index_nub = data['index']
  index_name = data['seriesName']
  try:
    value_name = data['valueName']
  except:
    value_name = 1
  a = CompleteSql().fundnetvalue()
  a = a[['Date']][a['FundName'].isin(data['seriesName'])]
  if daily == 1:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=30)
  elif daily == 2:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=90)
  elif daily == 3:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=183)
  elif daily == 4:

    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=365)
  else:
    end_time = a['Date'].max()
    start_time = a['Date'].min()
  result = calculate.cal_sample(wei, index_nub, start_time, end_time, index_name,value_name)
  result = np.cumprod(result + 1)
  a = calculate.perfomance_calc(result)
  a['计算起始时间'] = start_time
  a = a.replace([np.inf, -np.inf], 0)
  a.index.name = '基金名称'
  a = a.reset_index()
  a['计算起始时间'] = a['计算起始时间'].astype('str')
  a = a.to_json(force_ascii=False)
  return {'data': a}


@app.post("/table/PostExcessReturn")
async def fundList():
  a = CompleteSql().fund_info_table()
  return JsonResponse.seccess(msg='查询数据成功', data=a.to_json())


# 月度收益表
@app.post("/table/MonthIncome")
async def MonthIncome(request: Request):
  data = await request.json()
  index_name = data['seriesName']
  years = data['years'].split('-')[0]
  # 1.数据获取 2.数据按月切割 3.补全前值 4.计算月度收益 5.计算全年超额
  Rudeness_M = CompleteSql().fundnetvalue()
  Rudeness_M = Rudeness_M[['Date', 'FundName', 'NetValue']][Rudeness_M['FundName'].isin(index_name)]
  New_Rudeness = Rudeness_M.pivot_table(index='Date', columns='FundName', values='NetValue')
  start_time = datetime.date(int(years), 12, 20)
  end_time = datetime.date(int(years) + 2, 1, 1)
  Rudeness_M = New_Rudeness.fillna(method='ffill')
  Rudeness_M = Rudeness_M[(start_time < Rudeness_M.index) & (Rudeness_M.index < end_time)]
  Rudeness_M.index = pd.to_datetime(Rudeness_M.index)
  monthly_last = Rudeness_M.resample('M').last()
  monthly_last = monthly_last.dropna(axis=1)
  last = monthly_last.pct_change().T
  last = last.drop(columns=last.columns[0])
  year_last = Rudeness_M.resample('1Y').last()
  year_last = year_last.dropna(axis=1)
  year_last = year_last.reset_index(drop=True)
  year_last_T = year_last.pct_change().T
  year_last_T = year_last_T.drop(columns=year_last_T.columns[0])
  year_last_T.rename(columns={1: '全年超额'}, inplace=True)
  last = last.fillna(0)
  last['全年超额'] = year_last_T['全年超额']

  last = last.to_json(force_ascii=False)
  return {"data": last}


# 收益相关性 revenue pertinence
@app.post("/table/PostRevenueList")
async def PostRevenueList(request: Request):
  data = await request.json()
  wei = data['wei']
  daily = data['year']
  index_nub = data['index']
  index_name = data['seriesName']
  try:
    value_name = data['valueName']
  except:
    value_name = 1
  a = CompleteSql().fundnetvalue()
  a = a[['Date']][a['FundName'].isin(data['seriesName'])]
  if daily == 1:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=30)
  elif daily == 2:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=90)
  elif daily == 3:
    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=183)
  elif daily == 4:

    end_time = a['Date'].max()
    start_time = end_time - datetime.timedelta(days=365)
  else:
    end_time = a['Date'].max()
    start_time = a['Date'].min()
  result = calculate.cal_sample(wei, index_nub, start_time, end_time, index_name,value_name)
  a = result.corr()
  a = a.dropna(axis=1, how='all')
  a = a.dropna(how='all')
  a = a.to_json(force_ascii=False)
  return JsonResponse.seccess(msg='查询数据成功', data=a)


@app.get("/list/fundclass")
async def fundclass():
  a = CompleteSql().fund_info_table()
  b = CompleteSql().fundnetvalue()
  fundclass=a['strategy'].unique().tolist()
  fundclass.insert(0, '全量搜索')
  return {"fundclass": fundclass, "fundclass2": a['newcate'].unique().tolist(),
          'lastDate': b['Date'].max()}



@app.get("/list/lastDate")
async def lastDate():
  a = pd.read_excel(r'\\172.18.0.7\波克私募\资管文档\资管中后台\BK_资管投资净值跟踪\2024\FX.xlsx', sheet_name='Sheet3',
                    header=None)
  a.columns = ['daily']
  last_frb = a.loc[a.index[-1], 'daily']
  return {'lastDate': str(last_frb)}


@app.get("/list/fundname")
async def fundname():
  a = CompleteSql().fundnetvalue()
  return {"name": a['FundName'].unique().tolist()}


@app.post("/line/Demo")
async def read_data(request: Request):
  data = await request.json()
  # print(data)
  wei = data['wei']
  index_nub = data['index']
  index_name = data['series2Data']
  try:
    value_name = data['valueName']
  except:
    value_name = 1
  start_time = datetime.date(int(data['year']), 1, 1)
  end_time = datetime.date(2024, 12, 31)
  result = calculate.cal_sample(wei, index_nub, start_time, end_time, index_name,value_name)
  a = result.cumsum()
  daily = a.index.to_list()
  series = []
  for i in data['series2Data']:
    q = {'name': i, 'data': a[i].values.tolist()}
    series.append(q)
  to_json = {"categories": daily, "series": series}
  # print(to_json)
  return to_json



@app.post("/web_add")
async def web_add(request: Request):

  data = await request.json()
  web = data['web']
  a = sqls.CompleteSql()
  ret=a.add_web(web)
  return {"log": ret}



@app.post("/table/TI_Control")
async def TI_Control(request: Request):

  data = await request.json()
  findname = data['findname']
  print(findname)
  root_path=r'C:\Users\niefanxiang\Desktop\flow-master\MOM\email_FOF'
  a = pd.read_excel(r'\\172.18.0.7\波克私募\资管文档\资管中后台\BK_资管投资净值跟踪\2024\FX.xlsx', sheet_name='Sheet3',
                    header=None)
  a.columns = ['daily']
  last_frb = a.loc[a.index[-1], 'daily']
  formatted_date = last_frb.strftime("%Y%m%d")
  if findname=='平衡':
    a = pd.read_excel(root_path+r"\\"+f'a_a_【估值表】SZR639 波克平衡多策略1号私募证券投资基金_{formatted_date}SZR639波克平衡多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls', skiprows=5)
    df=calculate.singal_fund_cal(a)
  elif findname=='锐进':
    a = pd.read_excel(root_path+r"\\"+f'a_a_【估值表】SB4549 波克锐进多策略1号私募证券投资基金_{formatted_date}SB4549波克锐进多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls', skiprows=5)
    df=calculate.singal_fund_cal(a)
  elif findname == '稳健':
    a = pd.read_excel(root_path+r"\\"+f'a_a_【估值表】SZR642 波克稳健多策略1号私募证券投资基金_{formatted_date}SZR642波克稳健多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls', skiprows=5)
    df=calculate.singal_fund_cal(a)
  else:
    all_df=pd.DataFrame(columns=['公司', '公司规模', '金额市值', '占比'])
    a = pd.read_excel(
      root_path + r"\\" + f'a_a_【估值表】SZR639 波克平衡多策略1号私募证券投资基金_{formatted_date}SZR639波克平衡多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls',
      skiprows=5)
    balance = calculate.singal_fund_cal(a)
    all_df = all_df._append(balance, ignore_index=True)
    a = pd.read_excel(root_path+r"\\"+f'a_a_【估值表】SB4549 波克锐进多策略1号私募证券投资基金_{formatted_date}SB4549波克锐进多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls', skiprows=5)
    ruijing=calculate.singal_fund_cal(a)
    all_df = all_df._append(ruijing, ignore_index=True)
    a = pd.read_excel(root_path+r"\\"+f'a_a_【估值表】SZR642 波克稳健多策略1号私募证券投资基金_{formatted_date}SZR642波克稳健多策略1号私募证券投资基金委托资产资产估值表{formatted_date}.xls', skiprows=5)
    wenjian=calculate.singal_fund_cal(a)
    all_df = all_df._append(wenjian, ignore_index=True)
    future = pd.DataFrame(columns=['公司', '公司规模', '金额市值', '占比'])
    all_money=all_df['金额市值'].sum()
    # print(all_money)
    grouped = all_df.groupby(by=[all_df['公司'], all_df['公司规模']])
    for name, group in grouped:
      Name = group['公司'].unique()[0]
      Direction = group['公司规模'].unique()[0]
      Volume = group['金额市值'].sum()
      ratio = Volume/all_money
      a = [Name, Direction, Volume, ratio]
      future = future._append(pd.Series(a, index=future.columns), ignore_index=True)
    df=future
  magre_parent = df.reset_index(drop=True)
  magre_parent = magre_parent.to_json(force_ascii=False)
  return {'data': magre_parent}


if __name__ == '__main__':
  uvicorn.run(f'{Path(__file__).stem}:app', host="172.18.103.142", port=5555)
  pass
