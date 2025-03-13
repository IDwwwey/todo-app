import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');

  // 获取所有待办事项
  useEffect(() => {
    fetch('http://<EC2_PUBLIC_IP>:3000/api/todos')
      .then(res => res.json())
      .then(data => setTodos(data));
  }, []);

  // 提交新待办事项
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://<EC2_PUBLIC_IP>:3000/api/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    }).then(() => window.location.reload());
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button>Add Todo</button>
      </form>
      <ul>
        {todos.map(todo => (
          <li key={todo._id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;