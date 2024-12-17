import pandas as pd
from sqlalchemy import create_engine

host = '172.18.103.142'  # MySQL主机名
user = 'root'  # MySQL用户名
password = 'boke123'
database = 'funddata'  # 数据库名称
# 与MySQL建立连接
BASE_CONN_URL = f"mysql+pymysql://{user}:{password}@{host}:3306/{database}"
conn = create_engine(BASE_CONN_URL, connect_args={"charset": "utf8"})


df=pd.read_excel('881001.WI.xlsx',header=1)
new_df=pd.DataFrame(columns=['date','name','value'])
df = df.drop(df.index[-1]).dropna().set_index('日期')
# print(df)
for index, row in df.iterrows():
    for column_name, value in row.items():
      list=[index,column_name,value]
      new_df = new_df._append(pd.Series(list, index=new_df.columns), ignore_index=True)
print(new_df)
new_df.to_sql('index_table', conn, if_exists='append', index=False)
