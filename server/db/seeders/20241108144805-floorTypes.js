/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('FloorTypes', [
      {
        img: 'ТЦ.png',
        img2: 'ТЦ-colored.jpg',
        floorDiapason: '1 - 3',
        building: 'А1',
      },
      {
        img: 'А1.jpg',
        img2: 'ТЦ-colored.jpg',
        floorDiapason: '4 - 17',
        building: 'А1',
      },
      {
        img: 'А2Commercy.png',
        img2: 'А2-colored.jpg',
        floorDiapason: '1',
        building: 'А2',
      },
      {
        img: 'Б1Commercy.png',
        img2: 'Б1-colored.jpg',
        floorDiapason: '1',
        building: 'Б1',
      },
      {
        img: 'Б2Commercy.png',
        img2: 'Б2-colored.jpg',
        floorDiapason: '1',
        building: 'Б2',
      },
      {
        img: 'Б3Commercy.png',
        img2: 'Б3-colored.jpg',
        floorDiapason: '1',
        building: 'Б3',
      },
      {
        img: 'Г1Commercy.png',
        img2: 'Г1-colored.jpg',
        floorDiapason: '1',
        building: 'Г1',
      },
      {
        img: 'Г2Commercy.png',
        img2: 'Г2-colored.jpg',
        floorDiapason: '1',
        building: 'Г2',
      },
      {
        img: 'Г3Commercy.png',
        img2: 'Г3-colored.jpg',
        floorDiapason: '1',
        building: 'Г3',
      },

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
