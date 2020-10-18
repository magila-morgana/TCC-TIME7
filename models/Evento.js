// Chamando o arquivo bdtcc do BANCO DE DADOS
const bd = require('./bd')

// ********* Criando MODELS referência da tabela dentro do sequelize - Vídeo 18 **********
// MODEL 2 - Evento
const Evento = bd.sequelize.define('eventos',
{
    data: {type: bd.Sequelize.DATEONLY},
    descrição: {type: bd.Sequelize.STRING},
})

// ********** GERAR tabelas novas **********
// Evento.sync({force: true})

/********** INSERT INTO TABLE eventos **********
  INSERT 01
Evento.create(
{
    data: "2020-09-20",
    descrição: "LETIVO - apresentação musical",
}) */

module.exports = Evento 
