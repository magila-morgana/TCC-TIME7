// ********* INSTALANDO E CONFIGURANDO o SEQUELIZE para a aplicação - Vídeo 16 **********
const Sequelize = require('sequelize')
const sequelize = new Sequelize('bd', 'root', '2020', 
{
    host: "localhost",
    dialect: 'mysql'
})

/********* CONECTANDO a aplicação AO BANCO DE DADOS com a autenticação do SEQUELIZE - Vídeo 17 **********
sequelize.authenticate().then(function()
{
    console.log("Conectado com sucesso!!!")
}).catch(function(erro)
{
    console.log("Falha ao se conectar: " +erro)
}) */  

// Exportando o SEQUELIZE
module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
} 

