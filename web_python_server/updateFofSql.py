import pandas as pd
from sqlalchemy import create_engine
import datetime


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
    df = df[['UID', 'Date', 'FundCode',
             'FundName',
             'NetValue',
             'AccValue',
             'Source',
             'Comment']]
    # print(df)
    return df

  def Sql_Close(self):
    self.conn.close()


host = '172.18.103.142'  # MySQL主机名
user = 'root'  # MySQL用户名
password = 'boke123'
database = 'funddata'  # 数据库名称
# 与MySQL建立连接
BASE_CONN_URL = f"mysql+pymysql://{user}:{password}@{host}:3306/{database}"
conn = create_engine(BASE_CONN_URL, connect_args={"charset": "utf8"})

a = CompleteSql()

# # fund_info_table 更新
# fund_info_table= a.fund_info_table()
# fund_info_table_new=pd.read_excel('file/fundinfo2.xlsx')[['产品名称0', '产品名称', '投资主体', '产品大类', '策略类别', '产品代码', 'master_lv', 'slave_lv', '投资主体代码', '新版大类']]
# fund_info_table_new.rename(columns={'产品名称0':'fundname0', '产品名称':'fundname', '投资主体':'holder', '产品大类':'fundclass', '策略类别':'strategy','产品代码':'fundcode','投资主体代码':'holdercode', '新版大类':'newcate'}, inplace=True)
# fund_info_table_new=fund_info_table_new._append(fund_info_table)
# fund_info_table_diff_df=fund_info_table_new.drop_duplicates(subset=fund_info_table_new.columns,keep=False)
# if len(fund_info_table_diff_df) !=0 :
#   fund_info_table_diff_df.to_sql('fund_info_table', conn, if_exists='append', index=False)
# else:
#   print('fund_info_table 未发现新数据')
#
# # link_table 更新
# link_table= a.link_table()
# link_table_new=pd.read_excel('file/many_ss-2024-01-08-2024-01-12.xlsx').drop(labels=['date.1'], axis=1)
# if len(link_table[link_table['date']>'2024-01-08']) ==0 :
#   print(link_table[link_table['date']>'2024-01-08'])
#   link_table_new.to_sql('link_table', conn, if_exists='append', index=False)
# else:
#   print('link_table 未发现新数据')
#
#
# # action_record_table 更新
# action_record_table = a.action_record_table()
# action_record_table['Confirm_Date']=action_record_table['Confirm_Date'].astype(str)
# action_record_table['Application_date']=action_record_table['Application_date'].astype(str)
# action_record_table =action_record_table[action_record_table['Confirm_Date']>'2023-11-01']
# action_record_table_new = pd.read_excel('file/action_record_table.xlsx', sheet_name='交易动作记录').drop(labels=['备注'], axis=1)
# action_record_table_new=action_record_table_new[action_record_table_new['确认日期']>'2023-11-01']
# action_record_table_new.rename(
#   columns={'投资主体': 'Name', '主体名称': 'Master_name', '标的代码': 'Slave_code_name', '标的名称': 'Slave_name',
#            '交易类别': 'Trade_classes', '申请日期': 'Application_date', '确认日期': 'Confirm_Date', '确认金额': 'Amount',
#            '确认份额': 'Share', '单位净值': 'Value', '交易费用': 'Fee', '业绩报酬': 'Performance_reward',
#            '信息来源': 'Information_sources'
#            },
#   inplace=True)
# action_record_table_new['Confirm_Date']=action_record_table_new['Confirm_Date'].astype(str)
# action_record_table_new['Application_date']=action_record_table_new['Application_date'].astype(str)
# action_record_table_new=action_record_table_new._append(action_record_table)
# print(action_record_table_new)
# action_record_table_new_diff=action_record_table_new.drop_duplicates(subset=action_record_table_new.columns,keep=False)
# print(action_record_table_new_diff)
# # action_record_table_new_diff.to_excel('1.xlsx')
# if len(action_record_table_new_diff) !=0 :
#   action_record_table_new_diff.to_sql('action_record_table', conn, if_exists='append', index=False)
# else:
#   print('fund_info_table 未发现新数据')
#

# fundnetvalue 更新
fundnetvalue_table = a.fundnetvalue()
fundnetvalue_table_list = fundnetvalue_table['UID'].values
fundnetvalue_table_new = pd.read_csv('../../ms-oms-web/web_python_server/file/clean_sss2.csv', encoding='gbk')
try:
  fundnetvalue_table_new=fundnetvalue_table_new.drop(labels=['Unnamed: 0'],axis=1)
except:
  pass

fundnetvalue_table_new.rename(


  columns={'日期': 'Date', '产品代码': 'FundCode', '产品名称': 'FundName', '单位净值': 'NetValue',
           '累计净值': 'AccValue', '来源文件': 'Source'
           },
  inplace=True)
# print(fundnetvalue_table_new[fundnetvalue_table_new['Date']=='2024-01-31'])
fundnetvalue_table_new = fundnetvalue_table_new[~fundnetvalue_table_new['UID'].isin(fundnetvalue_table_list)]
# fundnetvalue_table_new = fundnetvalue_table_new.drop_duplicates(subset=['UID'],keep='first')
# print(fundnetvalue_table_new)
#
if len(fundnetvalue_table_new) != 0:
  fundnetvalue_table_new.to_sql('fundnetvalue', conn, if_exists='append', index=False)
else:
  print('fund_info_table 未发现新数据')
