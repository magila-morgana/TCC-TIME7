// importar o express, body-parser, handlebars e sequelize
const express = require('express')
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars'), { alowInsecurePrototypeAccess, allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser')
const Calendario = require('./models/Calendario')
const Evento = require('./models/Evento')
const Login = require('./models/Login')

// inicializar o express
const app = express();

// Template handlebars
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', 'handlebars')
app.use(express.static('public'))

// configurar o bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// ************************************************* GERAL *************************************************
// Rota - Tela HOME (front-end: escolhe calendário curso)
app.get('/', (req, res) => {
  res.render('home')
})

// ************************************************* ADMIN *************************************************
// Rota - Tela ADMIN (front-end: login)
app.get('/adm', (req, res) => {
  res.render('adm')
})

// Rota - cadastro LOGIN (back-end: cadastra os dados das inputs no BD e redireciona: LOGIN ou HOME (front-end)) 
app.post('/cadastro', (req, res) => {
  Login.create({
    RM: req.body.RM,
    senha: req.body.senha
  }).then(() => {
    //      (front-end: redirecionando para LOGIN)
    const { senha } = req.body
    if (senha === '2020') {
      res.redirect('cadastrados')
    } else {
      //          (front-end: redirecionando para HOME)
      res.redirect('/')
    }
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// Rota - (front-end: retorna os dados do BD para o navegador)
app.get('/logins', (req, res) => {
  Login.findAll({ order: [['id', 'DESC']] }).then((logins) => {
    res.render('logins', { logins: logins })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// Rota - (back-end: deleta cadastros do BD)
app.get('/del/:id', (req, res) => {
  Login.destroy({ where: { 'id': req.params.id } }).then(() => {
    Login.findAll({ order: [['id', 'DESC']] }).then((logins) => {
      res.render('logins', { logins: logins })
    }).catch((erro) => {
      res.send("Houve um erro: " + erro)
    })
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
  })
})

// ************************************************ USUÁRIO ************************************************
// Rota - Tela CALENDÁRIO (front-end: visualiza calendário geral)
app.get('/calendar', (req, res) => {
  res.render('calendar')
})

// Rota - (front-end: retorna os dados do BD para o navegador)
app.get('/cadastrados', (req, res) => {
  Calendario.findAll({ order: [['id', 'ASC']] }).then((calendarios) => {
    res.render('cadastrados', { calendarios: calendarios })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// Rota - EDITAR Eventos (front-end: altera dados dos calendarios cadastrados no BD)
app.get('/edit/:ano:id', (req, res) => {
  Calendario.update({ where: { 'id': req.params.id } }).then(() => {
    Login.findAll({ order: [[ 'ano', 'id', 'ASC']] }).then((calendarios) => {
      res.render('cadastrados', { calendarios: calendarios })
    }).catch((erro) => {
      res.send("Houve um erro: " + erro)
    })
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
  })
}) 


// Rota - cadastrar CALENDÁRIO (front-end: cadastrar calendários)
app.get('/cadastrar', (req, res) => {
  const dados = ['FERIADO']
  res.render('cadastrar', {dados})
})

// Rota - cadastro CALENDARIO (back-end: cadastra os dados das inputs no BD e redireciona: CADASTRADOS (front-end)) 
app.post('/cadastrando', (req, res) => {
  Calendario.create({
    id: req.body.ano.ano,
    ano: req.body.ano,
    semestre: req.body.semestre
  }).then(() => {
    //  (front-end: redirecionando para CADASTRADOS)
    res.redirect('cadastrados')
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// ******************************************************************
// ouvir uma porta
app.listen(8080)

// **************************** Configurando o GitHub

// git config --global user.name "magila-morgana"
// git config --global user.email "magilamorganasf@gmail.com"

// **************************** Salvar no GitHub

// git add . 
// git commit -m "Criação do formulário de imagem" 
// git push origin main 