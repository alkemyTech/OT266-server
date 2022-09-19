'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        user_id: 1,
        body: 'Comentario de prueba 1 del user 1 al News 1',
        news_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 10,
        body: 'Comentario de prueba 2 del user 10 al News 1',
        news_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 1,
        body: 'Comentario de prueba 3 del user 1 al News 1',
        news_id: 1,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 10,
        body: 'Comentario de prueba 4 del user 1 al News 2',
        news_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 1,
        body: 'Comentario de prueba 5 del user 1 al News 2',
        news_id: 2,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 10,
        body: 'Comentario de prueba 6 del user 10 al News 3',
        news_id: 3,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 1,
        body: 'Comentario de prueba 6 del user 1 al News 3',
        news_id: 3,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 10,
        body: 'Comentario de prueba 7 del user 10 al News 4',
        news_id: 4,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 1,
        body: 'Comentario de prueba 8 del user 1 al News 4',
        news_id: 4,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 1,
        body: 'Comentario de prueba 9 del user 1 al News 5',
        news_id: 5,
        createdAt: new Date,
        updatedAt: new Date
      },
      {
        user_id: 10,
        body: 'Comentario de prueba 10 del user 10 al News 6',
        news_id: 6,
        createdAt: new Date,
        updatedAt: new Date
      }
    ],{});

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
