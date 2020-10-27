// Chamando o arquivo bdtcc do BANCO DE DADOS
const bd = require('./bd')

// ********* Criando MODELS referência da tabela dentro do sequelize - Vídeo 18 **********
// MODEL 1 - Calendario
const Calendario = bd.sequelize.define('calendarios',
{
  id: { type: bd.Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
  ano: { type: bd.Sequelize.STRING(4) },
  semestre: { type: bd.Sequelize.ENUM('1', '2') }
})

// ********** GERAR tabelas novas **********
// Calendario.sync({force: true})

// ********** INSERT INTO TABLE calendarios **********
//  INSERT 01 
/* Calendario.create(
{
  id: "12",
  ano: "1990",
  semestre: "1",
}) */  

module.exports = Calendario 