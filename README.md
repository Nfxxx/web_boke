## oems前端文档

生产环境部署目录
172.16.2.229  /home/liujingyu下的dist

测试环境部署目录
172.16.200.246  /home/project/web/


### 本地开发环境安装
## 开发环境需要安装nodejs及npm
```
1 安装nodejs 版本：14.17.6
2 安装npm 版本：6.14.15
3 安装webstorm
4 git clone git@172.16.1.58:oems/ms-oms-web.git
5 加载modules，如果内网无法下载，手工导入可以
6 确认src/api/baseconfig.js 配置是连接测试或者生产环境
7 启动项目，控制台：npm run dev
```

### 部署步骤(以测试环境为例)

```python
####需确保 环境中已经安装nginx ####
## nginx 安装命令
yum install nginx



## 部署
1.本地 npm run build:prod #编译安装
2.将dist发布到服务器上
4. nginx -s reload #重启nginx，也可以不执行该命令，自动重启。    
    
  
###nginx命令###
# 重启命令    
nginx -s reload
# 启动命令
nginx
# 停止命令
nginx -s stop    

###nginx配置路径###
/etc/nginx/nginx.conf

###配置详情，添加一个server###
server {
         listen 8000;
         server_name 127.0.0.1;
         charset utf-8;
         # Load configuration files for the default server block.
         # include /etc/nginx/default.d/*.conf;
 
         location / {
             root /home/liujingyu/dist;
             index index.html;
             try_files $uri $uri/ ls
             /index.html;
         }

```



