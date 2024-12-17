import requests
#飞书文档的储存地址结构：https://企业地址/sheets/shtcnjGdHzBm7Qa85UXQYk9OPxh?sheet=402cb1     #一般来说sh开头为文档地址，sheet=后跟工作簿地址，这两块是代码需要引用的参数
# 12https://boke.feishu.cn/wiki/IEHTwQl3PiSWz8kx7iyc7eIDnyb?renamingWikiNode=false
import json
import time
# 12
# 2024旅游报名（锁定中）
# Untitled 测试
# 2024旅游报名（锁定中） 真实情况
tat = 'u-eNqkJbFhx0eG6SAJEZNvbE1k5_7w4g7HUa0001Sa0Bxy'
url = "https://open.feishu.cn/open-apis/wiki/v2/spaces/get_node?token=IEHTwQl3PiSWz8kx7iyc7eIDnyb"   #写入的sh开头的文档地址，其他不变
header = {"Content-Type": "application/json", "Authorization": "Bearer " + str(tat)} #请求头
msg = 'START'
want_row = [8,9,10]
obj_token = requests.get(url, headers=header).json()
file_token = obj_token['data']['node']['obj_token']
url = f"https://open.feishu.cn/open-apis/sheets/v3/spreadsheets/{file_token}/sheets/query"
sheet_id = requests.get(url, headers=header).json()['data']['sheets'][0]['sheet_id']
url = f'https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/{file_token}/protected_dimension'
try_num = 0
while(msg!='success'):
    if msg =='cell is locked':
        try_num+=1
        post_data = {"addProtectedDimension": [
            {"dimension": {"sheetId": sheet_id, "majorDimension": "ROWS", "startIndex": want_row[try_num], "endIndex": want_row[try_num]}}]}
    else:
        time.sleep(1)
        post_data = {"addProtectedDimension":[{"dimension":{"sheetId":sheet_id,"majorDimension":"ROWS","startIndex":want_row[try_num],"endIndex":want_row[try_num]}}]}
    r2 = requests.post(url, data=json.dumps(post_data), headers=header)
    msg = r2.json()['msg']
msg = 'NEXT'
while(msg!='success'):
    url = f"https://open.feishu.cn/open-apis/sheets/v2/spreadsheets/{file_token}/values"
    post_data = {"valueRange": {"range": f"{sheet_id}!F{want_row[try_num]}:I{want_row[try_num]}","values": [["金亚梅", '财务部','',17]]}}
    r2 = requests.put(url, data=json.dumps(post_data), headers=header)  #请求写入
    msg = r2.json()['msg']
