'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('News', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                type: Sequelize.STRING
            },
            content: {
                type: Sequelize.TEXT
            },
            image: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            categoryId: {
                type: Sequelize.INTEGER
            },
            softDeleted: {
                type: Sequelize.BOOLEAN
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('News');
    }
};