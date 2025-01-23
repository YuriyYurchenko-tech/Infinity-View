const appartmentsRouter = require('express').Router();
const fs = require('fs/promises');
const sharp = require('sharp');
const { Op } = require('sequelize');
const { Appartment } = require('../../db/models');
const checkId = require('../middlewares/checkId');
const upload = require('../middlewares/multer');

appartmentsRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const appartment = await Appartment.findAll();
      res.json(appartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .post(upload.single('file'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: 'Нет файла' });
      }
      const name = `${Date.now()}.webp`;
      const outputBuffer = await sharp(req.file.buffer).webp().toBuffer();
      await fs.writeFile(`./public/img/${name}`, outputBuffer);
      const {
        square, floor, roomsQuantity, deadline, price, buildingId,
      } = req.body;
      console.log(req.body);

      if (
        !square
        || !floor
        || !roomsQuantity
        || !deadline
        || !price
        || !buildingId
      ) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }
      const appartment = await Appartment.create({
        square,
        floor,
        roomsQuantity,
        deadline,
        price,
        buildingId,
        img: name,
      });
      res.json(appartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .patch(async (req, res) => {
    try {
      const { price } = req.body;
      if (!price) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }
      
      await Appartment.update(
        { price },
        { where: { buildingId: { [Op.ne]: 1 } } }, // Используем оператор "не равен" (ne)
      );

      const updatedAppartments = await Appartment.findAll();
      res.json(updatedAppartments);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  }); appartmentsRouter
  .route('/:id')
  .get(checkId, async (req, res) => {
    try {
      const { id } = req.params;
      const appartment = await Appartment.findByPk(id);
      res.json(appartment);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .delete(checkId, async (req, res) => {
    try {
      const { id } = res.locals;
      await Appartment.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .put(async (req, res) => {
    try {
      const { id } = req.params;
      const {
        square,
        floor,
        roomsQuantity,
        deadline,
        price,
        reservation,
      } = req.body;
      if (!square || !floor || !roomsQuantity || !deadline || !price) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }
      await Appartment.update(
        {
          square,
          floor,
          roomsQuantity,
          deadline,
          price,
          reservation,
        },
        { where: { id } },
      );
      const appartament = await Appartment.findByPk(id);
      res.json(appartament);
    } catch (error) {
      console.error(error);
      res.sendStatus(500).json({ message: 'Ошибка сервера' });
    }
  });

module.exports = appartmentsRouter;
