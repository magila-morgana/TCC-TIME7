// Chamando o arquivo bdtcc do BANCO DE DADOS
const bd = require('./bd')

// ********* Criando MODELS referência da tabela dentro do sequelize - Vídeo 18 **********
// MODEL 2 - Adcevento
const Adcevento = bd.sequelize.define('adceventos', {
    id: { type: bd.Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
    data: { type: bd.Sequelize.DATEONLY },
    descricao: { type: bd.Sequelize.TEXT }
})

// ********** GERAR tabelas novas **********
// Adcevento.sync({ force: true })

/********** INSERT INTO TABLE eventos **********
  INSERT 01  
Evento.create(
{
    data: "0000-00-00",
    descrição: "HOJE 22/11/2020",
}) */

module.exports = Adcevento