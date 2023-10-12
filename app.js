const { Sequelize, DataTypes } = require('sequelize');
const config = require('./config/config.js'); 

const sequelize = new Sequelize(config.development); 

// Conexão com o MySQL 
async function conectarAoMySQL() {
  try {
    await sequelize.authenticate(); // Tenta estabelecer a conexão

    console.log('Conexão com o MySQL bem-sucedida');

    // Se a conexão foi bem-sucedida, continua:

    // Criação de um produto:
    const Produto = require('./models/produtosModel');
    const produtoCriado = await Produto.create({
      nome: 'Produto A',
      preco: 19.99,
      descricao: 'Descrição do produto A',
    });
    console.log('Produto Criado: ', produtoCriado.toJSON());

    // Leitura de produtos:
    const produtos = await Produto.findAll();
    console.log('Produtos cadastrados: ', produtos.map(p => p.toJSON()));

    // Atualização de um produto:
    const produtoAtualizado = await Produto.update(
      { preco: 29.99 },
      { where: { id: produtoCriado.id } }
    );
    console.log(
      'Produto Atualizado:',
      produtoAtualizado[0] > 0 ? 'Atualizado com Sucesso' : 'Produto não encontrado'
    );

    // Remoção de um produto:
    const produtoRemovido = await Produto.destroy({ where: { id: produtoCriado.id } });
    console.log(
      'Produto Removido:',
      produtoRemovido > 0 ? 'Removido com Sucesso' : 'Produto não encontrado'
    );

    await sequelize.close(); // Feche a conexão com o banco de dados ao final do script
  } catch (error) { // Caso a conexão dê algum erro:
    console.error('Erro ao conectar ao MySQL:', error.message);
  }
}

conectarAoMySQL();