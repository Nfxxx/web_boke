<template>
  <div>
    <!-- 账号信息表 -->
    <h2>公共账号信息表</h2>
    <table border="1">
      <thead>
      <tr>
        <th>账号</th>
        <th>密码</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, index) in accounts" :key="index">
        <td>{{ item.username }}</td>
        <td>{{ item.password }}</td>
      </tr>
      </tbody>
    </table>

    <!-- 花顺iFinD 电脑端-下载激活流程 -->
    <h2>花顺iFinD 电脑端-下载激活流程</h2>
    <ol>
      <li>
        <strong>电脑端安装：</strong>
        <ul>
          <li>官网：<a href="https://www.51ifind.com/index.php?c=index&a=download" target="_blank">www.51ifind.com</a></li>
          <li>下载中心 - 下载“同花顺iFinD PC全版”（默认安装）</li>
          <li>Mac首页 - 下载中心 - 苹果系统版本下载</li>
        </ul>
      </li>
      <li>
        <strong>注册认证：</strong>
        <ul>
          <li>填写公司、姓名、手机号，邮箱</li>
        </ul>
      </li>
      <li>
        <strong>数据查找：</strong>
        <ul>
          <li>工具-常用工具-大金融数据库 输入表名查看字段含义</li>
        </ul>
      </li>
    </ol>

    <!-- 攻略链接 -->
    <p>
      <strong>【攻略】同花顺iFind快速上手指南：</strong>
      <a href="https://kdocs.cn/l/cfecX8UCUgmH" target="_blank">点击查看</a>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        { username: 'shbksm005', password: 'ggr6Ah17' },
        { username: 'shbksm006', password: '11K6CxEp' },
        { username: 'shbksm007', password: 'c3S3bpG1' },
        { username: 'shbksm008', password: 'h971HtED' }
      ]
    };
  }
};
</script>

<style>
table {
  width: 50%;
  border-collapse: collapse;
  margin: 20px 0;
}
th, td {
  padding: 8px;
  text-align: left;
  border: 1px solid #ddd;
}
th {
  background-color: #f2f2f2;
}
ol, ul {
  margin: 10px 0;
  padding-left: 20px;
}
li {
  margin: 5px 0;
}
a {
  color: #007bff;
  text-decoration: none;
}
a:hover {
  text-decoration: underline;
}
</style>
