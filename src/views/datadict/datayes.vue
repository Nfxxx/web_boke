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
    <h2>通联 数据字典 </h2>
    <ol>
      <li>
        <strong>在线平台登录：</strong>
        <ul>
          <li>数据字典使用平台：<a href="https://datadic.datayes.com/" target="_blank">https:https://datadic.datayes.com/</a></li>
          <li>输入账户密码</li>
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
        { username: '18909905069', password: 'Boke12345' },
      ]
    };
  }
};
</script>

<style>
button {
  padding: 10px 20px;
  margin: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
button:hover {
  background-color: #0056b3;
}
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
