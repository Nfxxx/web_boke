import os
import uvicorn
from pathlib import Path
from fastapi import FastAPI
from utils.read_sql import CompleteSql
import numpy as np
import pandas as pd
import datetime
from utils.index_name import mapping_name
import json

a = pd.read_excel(r'\\172.18.0.7\波克私募\资管文档\BK_资管投资净值跟踪\2024\FX.xlsx', sheet_name='Sheet3',
                  header=None)
a.columns = ['daily']
last_frb = a.loc[a.index[-1], 'daily']
formatted_date = last_frb.strftime("%Y%m%d")
print(formatted_date)
market_table=CompleteSql().market_table()
a=pd.read_excel(f'SZR639波克平衡多策略1号私募证券投资基金委托资产资产估值表{market_table}.xls',skiprows=5)
all_money=a[a['科目代码']=='资产净值']
true_money=all_money['市值'].values[0]
new_df=pd.DataFrame(columns=['Fund','金额市值','占比'])
for index, row in a.iterrows():
  try:
    if row['科目代码'][:4] =='1108' and row['科目代码'][-3:]=='OTC':
      fund=row['科目名称']
      if row['科目名称'][-2:] =='A类' or row['科目名称'][-2:] =='B类':
        fund=fund[:-2]
      list=[fund,row['市值'],row['成本占比']]
      new_df = new_df._append(pd.Series(list, index=new_df.columns), ignore_index=True)
  except:
    pass
result = pd.merge(new_df, market_table, on='Fund', how='left')

new_res=result[['Company','MarketValue','金额市值','占比']]
grouped = new_res.groupby(by=[new_res['Company'], new_res['MarketValue']])
future=pd.DataFrame(columns=['公司','公司规模','金额市值','占比'])
for name, group in grouped:
    Name = group['Company'].unique()[0]
    Direction = group['MarketValue'].unique()[0]
    Volume = group['金额市值'].sum()
    ratio = group['占比'].sum()
    a = [Name, Direction, Volume, ratio]
    future = future._append(pd.Series(a, index=future.columns), ignore_index=True)

# print(future)
