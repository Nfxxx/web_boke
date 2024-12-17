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
    <h2>朝阳永续 数据字典 </h2>
    <ol>
      <li>
        <strong>在线平台登录：</strong>
        <ul>
          <li>数据字典使用平台：<a href="https://datamall.go-goal.cn/home" target="_blank">https://datamall.go-goal.cn/home</a></li>
          <li>输入账户密码</li>
        </ul>
      </li>
      <li>
        <strong>PDF下载：</strong>
        <ul>
          <li>盈利预测基础数据库2.0：<button @click="downloadPdf('盈利预测基础数据库.pdf')">下载 PDF</button></li>
          <li>盈利预测衍生数据库2.0：<button @click="downloadPdf('盈利预测衍生数据库.pdf')">下载 PDF</button></li>
        </ul>
      </li>
    </ol>
  </div>
</template>

<script>
export default {
  methods: {
      downloadPdf(fileName) {
        try {
          // 动态生成 PDF 文件的路径
          const pdfUrl = require(`/C:/Users/niefanxiang/Desktop/ms-oms-web/pdf/${fileName}`); // 假设 PDF 文件在 `src/assets/pdf/` 目录下
          console.log('PDF URL:', pdfUrl); // 调试信息

          // 创建一个 <a> 标签
          const link = document.createElement('a');
          link.href = pdfUrl;
          link.download = fileName; // 下载文件的名称
          document.body.appendChild(link);

          // 触发点击事件
          link.click();

          // 移除 <a> 标签
          document.body.removeChild(link);
        } catch (error) {
          console.error('下载 PDF 失败:', error);
        }
      }
  },
  data() {
    return {
      accounts: [
        { username: 'E000104591', password: 'RkeHch' },
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
