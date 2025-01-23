const filterRouter = require('express').Router();
const { Op } = require('sequelize');
const { Appartment } = require('../../db/models');

filterRouter.get('/', async (req, res) => {
  const { filter } = req.query;
  try {
    const appartmentArr = await Appartment.findAll({
      where: { title: { [Op.iLike]: `%${filter}%` } },
    });
    res.json(appartmentArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
module.exports = filterRouter;
