import pandas as pd
import numpy as np
from utils.read_sql import CompleteSql
from utils.index_name import mapping_name
def perfomance_calc(nav_df, freq=1):
  nav_df.drop(index=nav_df.index[0], inplace=True)
  nav_df=nav_df.replace(0, np.nan).fillna(method='ffill')

  nav_df = nav_df.fillna(0)
  # 2 周 1 日频
  freq_dic = {2: 52, 1: 250}
  print(nav_df)
  # 收益率
  ret = nav_df.apply(lambda x: x.dropna().iloc[-1] / x.dropna().iloc[1] - 1)
  print(ret)
  # 年化收益率
  num = nav_df.apply(lambda x: x.dropna().count())
  ret_yr = np.power(ret + 1, freq_dic[1] / num) - 1
  print(ret_yr)
  # 年化波动率
  std_yr = nav_df.apply(lambda x: x.dropna().pct_change().std(ddof=0)) * np.sqrt(freq_dic[freq])
  # 最大回撤
  calc_dd = lambda x: 1 - x / x.expanding(min_periods=1).max()
  maxdd = nav_df.apply(lambda x: -calc_dd(x).max())
  newdd=nav_df.apply(lambda x: -calc_dd(x).iloc[-1])
  # 夏普：年化收益率/年化波动率
  sharpe_ratio = ret_yr/std_yr
  # 卡玛：年化收益率/最大回撤
  kama_ratio=-ret_yr/maxdd
  res = pd.concat([ret, ret_yr, std_yr, maxdd,sharpe_ratio,kama_ratio,newdd], axis=1)

  res.columns = ['收益率', '年化收益率', '年化波动率', '最大回撤','夏普比率','卡玛比率','最新回撤']
  res=res.fillna(0)
  return res




def cal_sample(wei,index_nub,start_time,end_time,index_name,value_name):
  a = CompleteSql().fundnetvalue()
  if value_name==1:
    a = a[['Date', 'FundName', 'NetValue']][a['FundName'].isin(index_name)]
    chgPct_table = a.pivot_table(index='Date', columns='FundName', values='NetValue')
  else:
    a = a[['Date', 'FundName', 'AccValue']][a['FundName'].isin(index_name)]
    chgPct_table = a.pivot_table(index='Date', columns='FundName', values='AccValue')
  chgPct_table = chgPct_table[(start_time < chgPct_table.index) & (chgPct_table.index <= end_time)]
  index_df = CompleteSql().index_table()
  Rudeness_M = chgPct_table[(start_time < chgPct_table.index) & (chgPct_table.index <= end_time)]
  Rudeness_M = Rudeness_M.drop_duplicates(keep='last')
  Rudeness_M_copy = Rudeness_M.__deepcopy__()
  try:
    index_table = index_df[index_df['name'] == mapping_name.index_name(code=index_nub).to_string()].drop('name',
                                                                                                         axis=1)
  except:
    index_table = index_df[index_df['name'] == mapping_name.index_name(code=1).to_string()].drop('name',
                                                                                                 axis=1)
  index_table = index_table.drop_duplicates(subset='date',keep='last')
  index_table['value'] = index_table['value'].astype(float)
  index_table['index_date'] = pd.to_datetime(index_table['date']).dt.date
  index_table['date'] = pd.to_datetime(index_table['date'])
  index_table = index_table.set_index('index_date')
  index_table = index_table[(start_time < index_table.index) & (index_table.index < end_time)]
  index_table = index_table.set_index('date')
  if wei == 1:
    index_table = index_table.reset_index()
    Rudeness_M_copy.index = pd.to_datetime(Rudeness_M_copy.index)
    Rudeness_M_copy = Rudeness_M_copy.reset_index()
    Rudeness_M_copy.rename(columns={'Date': 'date'}, inplace=True)
    Rudeness_M_profit = pd.merge(Rudeness_M_copy, index_table, on=['date'], how='right')
    Rudeness_M_profit = Rudeness_M_profit.fillna(method='ffill')
    Rudeness_M_profit = Rudeness_M_profit.drop_duplicates(keep='last')
    Rudeness_M_profit = Rudeness_M_profit.set_index('date')
    Rudeness_M_profit = Rudeness_M_profit.drop('value', axis=1)
    Rudeness_M_profit = (Rudeness_M_profit / Rudeness_M_profit.shift(1)) - 1
    Rudeness_M_profit = Rudeness_M_profit.fillna(0)
    result = Rudeness_M_profit
    result = result.fillna(0)
  else:
    df_replaced = Rudeness_M.applymap(lambda x: 1 if pd.notnull(x) else x)
    df_replaced.index = pd.to_datetime(df_replaced.index)
    df_replaced = df_replaced.reset_index()
    df_replaced.rename(columns={'Date': 'date'}, inplace=True)
    index_table = index_table.reset_index()
    merged_df = pd.merge(df_replaced, index_table, on=['date'], how='right')
    merged_df = merged_df.drop_duplicates(keep='last')
    merged_df = merged_df.set_index('date')
    merged_df = merged_df.mul(merged_df['value'], axis=0)
    merged_df = merged_df.fillna(method='ffill')
    merged_df = merged_df.fillna(0).drop('value', axis=1)
    merged_df = merged_df / merged_df.shift(1)
    merged_df = merged_df.replace([np.inf, -np.inf], 0)
    merged_df = merged_df.apply(lambda col: col.where(col != 1, np.NAN))
    Rudeness_M_copy.index = pd.to_datetime(Rudeness_M_copy.index)
    Rudeness_M_copy = Rudeness_M_copy.reset_index()
    Rudeness_M_copy.rename(columns={'Date': 'date'}, inplace=True)
    Rudeness_M_profit = pd.merge(Rudeness_M_copy, index_table, on=['date'], how='right')
    Rudeness_M_profit = Rudeness_M_profit.fillna(method='ffill')
    Rudeness_M_profit = Rudeness_M_profit.drop_duplicates(keep='last')
    Rudeness_M_profit = Rudeness_M_profit.set_index('date')
    Rudeness_M_profit = Rudeness_M_profit.drop('value', axis=1)
    Rudeness_M_profit = Rudeness_M_profit / Rudeness_M_profit.shift(1)
    Rudeness_M_profit = Rudeness_M_profit.fillna(0)
    result = Rudeness_M_profit - merged_df
    result = result.fillna(0)
  result= result.replace([np.inf, -np.inf], 0)
  return result

def singal_fund_cal(a):
  market_table = CompleteSql().market_table()
  # a = pd.read_excel(r'SZR639波克平衡多策略1号私募证券投资基金委托资产资产估值表20240517.xls', skiprows=5)
  all_money = a[a['科目代码'] == '资产净值']
  true_money = all_money['市值'].values[0]
  new_df = pd.DataFrame(columns=['Fund', '金额市值', '占比'])
  for index, row in a.iterrows():
    try:
      if row['科目代码'][:4] == '1108' and row['科目代码'][-3:] == 'OTC':
        fund = row['科目名称']
        if row['科目名称'][-2:] == 'A类' or row['科目名称'][-2:] == 'B类':
          fund = fund[:-2]
        list = [fund, row['市值'], row['市值占比']]
        new_df = new_df._append(pd.Series(list, index=new_df.columns), ignore_index=True)
    except:
      pass
  result = pd.merge(new_df, market_table, on='Fund', how='left')

  new_res = result[['Company', 'MarketValue', '金额市值', '占比']]
  grouped = new_res.groupby(by=[new_res['Company'], new_res['MarketValue']])
  future = pd.DataFrame(columns=['公司', '公司规模', '金额市值', '占比'])
  for name, group in grouped:
    Name = group['Company'].unique()[0]
    Direction = group['MarketValue'].unique()[0]
    Volume = group['金额市值'].sum()
    ratio = group['占比'].sum()
    a = [Name, Direction, Volume, ratio]
    future = future._append(pd.Series(a, index=future.columns), ignore_index=True)

  return future
