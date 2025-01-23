const floorTypeRouter = require('express').Router();
const { FloorType } = require('../../db/models');

floorTypeRouter.get('/', async (req, res) => {
  const { filter } = req.query;
  try {
    const floorTypeArr = await FloorType.findAll({
    });
    res.json(floorTypeArr);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
module.exports = floorTypeRouter;
