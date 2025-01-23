/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Buildings', [
      { name: 'Блок А1', img: 'А1.jpg', floorQuantity: 17 },
      { name: 'Блок А2', img: 'А2.jpg', floorQuantity: 12 },
      { name: 'Блок Б1', img: 'Б1.jpg', floorQuantity: 10 },
      { name: 'Блок Б2', img: 'Б2.jpg', floorQuantity: 11 },
      { name: 'Блок Б3', img: 'Б3.jpg', floorQuantity: 12 },
      { name: 'Блок Г1', img: 'Г1.jpg', floorQuantity: 11 },
      { name: 'Блок Г2', img: 'Г2.jpg', floorQuantity: 12 },
      { name: 'Блок Г3', img: 'Г3.jpg', floorQuantity: 10 },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
