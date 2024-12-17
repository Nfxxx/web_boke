import pandas as pd
from sqlalchemy import create_engine


class CompleteSql:
  def __init__(self):
    host = '172.18.103.142'  # MySQL主机名
    user = 'root'  # MySQL用户名
    password = 'boke123'
    database = 'funddata'  # 数据库名称
    # 与MySQL建立连接
    BASE_CONN_URL = f"mysql+pymysql://{user}:{password}@{host}:3306/{database}"
    self.conn = create_engine(BASE_CONN_URL, connect_args={"charset": "utf8"})

  def link_table(self):
    # 查询语句
    query = "SELECT * FROM link_table;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    df = df[['date'
      , 'master_name'
      , 'master_code'
      , 'master_lv'
      , 'slave_name'
      , 'slave_code'
      , 'slave_lv'
      , 'asset'
      , 'profit_chg'
      , 'share'
      , 'total_share']]
    # print(df)
    return df

  def action_record_table(self):
    # 查询语句
    query = "SELECT * FROM action_record_table;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    df = df[['Name'
      , 'Master_name'
      , 'Slave_code_name'
      , 'Slave_name'
      , 'Trade_classes'
      , 'Application_date'
      , 'Confirm_Date'
      , 'Amount'
      , 'Share'
      , 'Value'
      , 'Fee'
      , 'Performance_reward'
      , 'Information_sources'
      ]]
    return df

  def fund_info_table(self):
    # 查询语句
    query = "SELECT * FROM fund_info_table;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    # print(df)
    return df

  def fundnetvalue(self):
    # 查询语句
    query = "SELECT * FROM fundnetvalue;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    df = df[['Date', 'FundCode',
             'FundName',
             'NetValue',
             'AccValue',
             'Source',
             'Comment']]
    # print(df)
    return df

  def index_table(self):
    # 查询语句
    query = "SELECT * FROM index_table;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    df = df[['date','name','value']]
    # print(df)
    return df

  def market_table(self):
    # 查询语句
    query = "SELECT * FROM marketvalue_table;"
    # 将结果存入DataFrame
    df = pd.read_sql(query, self.conn)
    df = df[['Company','Fund','MarketValue']]
    # print(df)
    return df
  def add_web(self,web_name):
    data={'web_name':[web_name]}
    fundnetvalue_table_new=pd.DataFrame(data)
    try:
      fundnetvalue_table_new.to_sql('web_amac', self.conn, if_exists='append', index=False)
      return '成功'
    except Exception as e:
      return e


if __name__ == '__main__':
  a = CompleteSql().index_table()
  print(a)
