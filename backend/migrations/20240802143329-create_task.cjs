'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('task', { 
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},
			name: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			description: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: false,
			},
			status: {
				type: Sequelize.STRING,
				defaultValue: "pending",
			},
			owner: {
				type: Sequelize.INTEGER,
				references: {
				  model: 'User', // 'Users' refers to table name
				  key: 'id',
				  onUpdate: 'CASCADE',
				  onDelete: 'CASCADE'
				},
				allowNull: false
			},
			createdAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
				
			},
			updatedAt: {
				type: Sequelize.DATE,
				defaultValue: Sequelize.NOW
			}
		});
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.dropTable('task');
	}
};
