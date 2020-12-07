// importar o express, body-parser, handlebars e sequelize
const express = require('express')
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars'),
  { alowInsecurePrototypeAccess, allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser')
const path = require('path');
const Calendario = require('./models/Calendario');
const Evento = require('./models/Evento');
const Login = require('./models/Login');

// inicializar o express
const app = express();

// Template handlebars
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname, 'public')));

// configurar o bodyParser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ***************************************** GERAL - FRONT-END *************************************************
// ---------- HOME ----------
app.get('/', (req, res) => {
  res.render('home')
})

// ---------- CALENDAR ----------
app.get('/calendar', (req, res) => {
  res.render('calendar')
})

// ---------- CALENDAR1 ----------
app.get('/calendar1', (req, res) => {
  res.render('calendar1')
})

// ************************************************* ADMIN *************************************************
// ******************************************** FRONT-END TELAS ********************************************

// ---------- LOGIN ----------
app.get('/adm', (req, res) => {
  res.render('adm')
})

// ---------- CADASTRADOS ----------
app.get('/cadastrados', (req, res) => {
  Calendario.findAll({
    order: [
      ['ano', 'ASC'],
      ['semestre', 'ASC']
    ]
  }).then((calendarios) => {
    res.render('cadastrados', { calendarios: calendarios })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// ---------- CADASTRAR ----------
app.get('/cadastrar', (req, res) => {
  res.render('cadastrar')
})

// ---------- ADDEVENTO ----------
app.get('/addevento', (req, res) => {
  res.render('addevento')
})


// **************************************** BACK-END CREATE TABLE ******************************************

// ---------- CREATE LOGINS ----------
app.post('/cadastrandologin', (req, res) => {
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

// ---------- CREATE CALENDARIOS ----------
app.post('/cadastrandocalendario', (req, res) => {
  Calendario.create({
    ano: req.body.ano,
    semestre: req.body.semestre
  }).then(() => {
    //  (front-end: redirecionando para CADASTRADOS)
    res.redirect('cadastrados')
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// ---------- CREATE EVENTOS ----------
app.post('/cadastrandoevento', (req, res) => {
  Evento.create({
    data: req.body.data,
    descricao: req.body.descricao
  }).then(() => {
    //  (front-end: redirecionando para CADASTRADOS)
    res.redirect('/add/:id/:ano')
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})



// **************************************** BACK-END SELECT TABLE ******************************************

// ---------- SELECT LOGINS-ID ----------
app.get('/logins', (req, res) => {
  Login.findAll({
    order: [
      ['id', 'DESC']
    ]
  }).then((logins) => {
    res.render('logins', { logins: logins })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// ---------- SELECT CALENDÁRIO-ID-ANO ----------
app.get('/add/:id/:ano', (req, res) => {
  Evento.findAll({
    where: { 
      data: req.body },
    order: [
      ['data', 'ASC']
    ],
  }).then((eventos) => {
    res.render('addevento', { eventos: eventos })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})



// ---------- SELECT EVENTO-ID-ANO ---------------------------------------------------------------------- AQUI







// **************************************** BACK-END DELETE INSERT ******************************************

// ---------- DELETE LOGINS ----------
app.get('/del/:id', (req, res) => {
  Login.destroy({ where: { 'id': req.params.id } }).then(() => {
    Login.findAll({
      order: [
        ['id', 'DESC']
      ]
    }).then((logins) => {
      res.render('logins', { logins: logins })
    }).catch((erro) => {
      res.send("Houve um erro: " + erro)
    })
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
  })
})

// ---------- DELETE CALENDÁRIOS ----------
app.get('/delet/:id/:ano', (req, res) => {
  Calendario.destroy({ where: { 'id': req.params.id } }).then(() => {
    res.redirect('/cadastrados')
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
  })
})

// ---------- DELETE EVENTOS ----------
app.get('/delevento/:data', (req, res) => {
  Evento.destroy({ where: { 'data': req.params.data = { data } } }).then(() => {
    res.redirect('/addevento')
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
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
// git commit -m "Rotas cadastrando e cadastrados" 
// git push origin main



