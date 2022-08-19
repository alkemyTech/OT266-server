'use strict';
module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.createTable('Activity', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            content: {
                allowNull: false,
                type: Sequelize.STRING
            },
            image: {
                allowNull: false,
                type: Sequelize.STRING
            },
            deletedAt: {
                type: Sequelize.DATE
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            softDeletes: {
                type: Sequelize.BOOLEAN,
                default: false
            },
            //   roleId: {
            //     type: Sequelize.INTEGER,
            //     references: {
            //       model: 'Roles',
            //       key: 'id',
            //     },
            //     onUpdate: 'CASCADE',
            //     onDelete: 'SET NULL'
            //   },
        });
    },
    down: async(queryInterface, Sequelize) => {
        await queryInterface.dropTable('Activity');
    }
};