const buildingRouter = require('express').Router();
const { Building, Appartment } = require('../../db/models');
const checkId = require('../middlewares/checkId');

buildingRouter.route('/').get(async (req, res) => {
  try {
    const buildings = await Building.findAll();
    res.json(buildings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});
buildingRouter.route('/:id')
  .get(checkId, async (req, res) => {
    try {
      const { id } = req.params;
      console.log(id);
      const building = await Building.findByPk(id);
      res.json(building);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })

module.exports = buildingRouter;
