const express = require('express');
const bcrypt = require('bcrypt');
const { Admin } = require('../../db/models');
const generateTokens = require('../utils/generateTokens');
const cookiesConfig = require('../configs/cookiesConfig');

const accountRouter = express.Router();

accountRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Заполни все поля' });
  }

  const targetUser = await Admin.findOne({ where: { email } });
  if (!targetUser) return res.status(400).json({ message: 'Ошибка входа' });

  const isPasswordValid = await bcrypt.compare(password, targetUser.password);
  if (!isPasswordValid) {
    return res.status(400).json({ message: 'Ошибка входа' });
  }

  const user = targetUser.get();
  delete user.password;
  delete user.email;
  delete user.createdAt;

  const { accessToken, refreshToken } = generateTokens({ user });
  res
    .cookie('refreshToken', refreshToken, cookiesConfig)
    .json({ user, accessToken });
});

accountRouter.get('/logout', (req, res) => {
  res.clearCookie('refreshToken').sendStatus(200);
});

module.exports = accountRouter;
