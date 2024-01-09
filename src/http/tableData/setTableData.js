const tableDataList = require('./tableData')
const express = require('express')
const cors = require("cors")
const app = express()
app.use(cors())
app.get('/tableData', (req, res) => {
    // 获取分页参数
    const page = parseInt(req.query.page) || 1; // 默认为1
    const limit = parseInt(req.query.limit) || 10; // 默认为10

    const { name } = req.query
    let data = tableDataList
    if (name) {
        data = data.filter(item => item.name == name)
    }
    const startIndex = (page - 1) * limit; // 计算起始索引
    const endIndex = page * limit; // 计算结束索引
    const totalItems = data.length;

    // 创建一个包含分页信息和当前页面的数据的对象
    const paginatedData = {
        total: totalItems,
        items: data.slice(startIndex, endIndex), // 获取当前页的数据
    };
    res.send(paginatedData); // 发送分页后的数据
})
app.listen("8081", () => {
    console.log("服务启动了");
})