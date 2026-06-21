const express = require('express');
const app = express();
app.use(express.json());

// In-memory user store
const users = [
  { id: 1, name: 'Sarowar Alam', email: 'sarowar@example.com', role: 'admin', createdAt: '2025-01-01' },
  { id: 2, name: 'Maria Rahman', email: 'maria@example.com', role: 'developer', createdAt: '2025-01-15' },
  { id: 3, name: 'Tanvir Hossain', email: 'tanvir@example.com', role: 'developer', createdAt: '2025-02-01' }
];
let nextId = 4;

app.get('/', (req, res) => res.json({ service: 'user-service', version: '1.0.0', status: 'ok' }));

app.get('/users', (req, res) => res.json(users));

app.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'User not found' });
  res.json(user);
});

app.post('/users', (req, res) => {
  const { name, email, role } = req.body;
  if (!name || !email) return res.status(400).json({ error: 'name and email required' });
  const user = { id: nextId++, name, email, role: role || 'developer', createdAt: new Date().toISOString().split('T')[0] };
  users.push(user);
  res.status(201).json(user);
});

app.delete('/users/:id', (req, res) => {
  const idx = users.findIndex(u => u.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ error: 'User not found' });
  users.splice(idx, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`user-service on port ${PORT}`));
