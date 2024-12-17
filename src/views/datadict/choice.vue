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
    <h2>东方财富 在线数据字典 使用</h2>
    <ol>
      <li>
        <strong>在线平台登录：</strong>
        <ul>
          <li>数据字典使用平台：<a href="https://choice-sync-dictionary.eastmoney.com/" target="_blank">choice-sync-dictionary.eastmoney.com/</a></li>
          <li>输入账户密码</li>
          <li>可以通过以购买的表查看</li>
        </ul>
      </li>

    </ol>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accounts: [
        { username: 'prd_jgscm0001', password: 'bg807877' },
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
