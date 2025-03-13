const express = require('express');
const mongoose = require('mongoose');
const app = express();

// 连接MongoDB（注意：mongo是Docker Compose中的服务名）
mongoose.connect('mongodb://mongo:27017/todo', { useNewUrlParser: true });

// 定义数据模型
const Todo = mongoose.model('Todo', { title: String });

// 允许跨域和JSON解析
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

// 获取所有待办事项
app.get('/api/todos', async (req, res) => {
  const todos = await Todo.find();
  res.send(todos);
});

// 创建新待办事项
app.post('/api/todos', async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.send(todo);
});

app.listen(3000, () => console.log('Backend running on port 3000'));