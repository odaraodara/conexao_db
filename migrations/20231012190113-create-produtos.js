module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "produtos",
      {
        id: {
          type: Sequelize.INTEGER,
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
        },
        nome: {
          type: Sequelize.STRING(100),
          allowNull: false,
        },
        preco: {
          type: Sequelize.DOUBLE,
          allowNull: false,
        },
        descricao: {
          type: Sequelize.STRING(250),
          allowNull: false,
        },
      },
      { timestamps: false }
    );
  },

  async down(queryInterface, Sequelize) {
 await queryInterface.dropTable('produtos');
  },
};