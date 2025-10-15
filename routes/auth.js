const express = require('express');
const router = express.Router();
const path = require('path');
const User = require('../user_model/user');

// Página de login
router.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

// Registro
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).send('Faltan datos');

  try {
    const existing = await User.findByUsernameOrEmail(username);
    if (existing) return res.status(400).send('Usuario o email ya existe');

    await User.create(username, email, password);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno');
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) return res.status(400).send('Faltan datos');

  try {
    const user = await User.findByUsernameOrEmail(username);
    if (!user) return res.status(401).send('Usuario no encontrado');

    const valid = await User.validatePassword(password, user.password);
    if (!valid) return res.status(401).send('Credenciales incorrectas');

    req.session.userId = user.id;
    res.redirect('/dashboard.html');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno');
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.session.destroy(err => {
    if (err) console.error(err);
    res.clearCookie('connect.sid');
    res.redirect('/');
  });
});

module.exports = router;
