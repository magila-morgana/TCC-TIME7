// Chamando o arquivo bdtcc do BANCO DE DADOS
const bd = require('./bd')

// ********* Criando MODELS referência da tabela dentro do sequelize - Vídeo 18 **********
// MODEL 3 - Login
const Login = bd.sequelize.define('logins', {
    RM: { type: bd.Sequelize.TEXT },
    senha: { type: bd.Sequelize.INTEGER },
})

// ********** GERAR tabelas novas **********
// Login.sync({ force: true })

/********** INSERT INTO TABLE logins **********
//  INSERT 01
Login.create(
{
  RM: "19051993",
  senha: '2020'  
}) */

module.exports = Login