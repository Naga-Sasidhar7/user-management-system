const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working' });
});
app.get('/', (req, res) => {
  res.send('User Management System Backend');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;
