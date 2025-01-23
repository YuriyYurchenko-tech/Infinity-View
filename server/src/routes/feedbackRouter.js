const feedbackRouter = require('express').Router();
const { Feedback } = require('../../db/models');
const checkId = require('../middlewares/checkId');

feedbackRouter
  .route('/')
  .get(async (req, res) => {
    try {
      const feedbacks = await Feedback.findAll();
      res.json(feedbacks);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .post(async (req, res) => {
    try {
      const {
        name, email, phone, message,
      } = req.body;
      if (!name || !email || !phone || !message) {
        return res.status(400).json({ message: 'Заполните все поля' });
      }
      const feedback = await Feedback.create({
        name,
        email,
        phone,
        message,
      });
      res.json(feedback);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

feedbackRouter
  .route('/:id')
  .delete(checkId, async (req, res) => {
    try {
      const { id } = res.locals;
      await Feedback.destroy({ where: { id } });
      res.sendStatus(204);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .put(checkId, async (req, res) => {
    try {
      const { id } = res.locals;
      const { status } = req.body;
      if (!status) {
        return res.status(400).json({ message: 'Некорректные данные' });
      }
      await Feedback.update(
        {
          status,
        },
        { where: { id } },
      );
      const feedback = await Feedback.findByPk(id);
      res.json(feedback);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  })
  .get(checkId, async (req, res) => {
    try {
      const { id } = req.params;
      const feedback = await Feedback.findByPk(id);
      res.json(feedback);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: 'Ошибка сервера' });
    }
  });

module.exports = feedbackRouter;
