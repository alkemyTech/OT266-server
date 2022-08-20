'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('News', [{
      name: 'Killer burritos',
      content: 'A hundred people died because of chile burritos in bad shape, they were using putrid ghost peppers. All of them exploded with diarrhea',
      image: 'https://www.paulinacocina.net/wp-content/uploads/2022/01/burritos.jpg',
      categoryId: 10,
      softDeleted: false
    }], {});
  },
  
  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
