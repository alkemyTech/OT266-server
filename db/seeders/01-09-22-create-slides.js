'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('Slides', [{
            imageURL: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            text: 'Primer slide',
            order: 1,
            organizationId: 1,
            createdAt: new Date,
            updatedAt: new Date
        },
        {
            imageURL: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            text: 'Segundo Slide',
            order: 2,
            organizationId: 1,
            createdAt: new Date,
            updatedAt: new Date
        },
        {
            imageURL: 'https://www.designevo.com/res/templates/thumb_small/colorful-hand-and-warm-community.png',
            text: 'Tercer Slide',
            order: 3,
            organizationId: 1,
            createdAt: new Date,
            updatedAt: new Date
        }], {});
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         */
        return queryInterface.bulkDelete('Slides', null, {});
    }
};