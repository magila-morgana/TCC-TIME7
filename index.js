// importar o express, body-parser, handlebars e sequelize
const express = require('express')
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars'),
  { alowInsecurePrototypeAccess, allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const bodyParser = require('body-parser')
const path = require('path');
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
app.use(express.static(path.join(__dirname, 'public')));

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

// Rota - Tela ADMIN (front-end: login)
app.get('/edit/:id', (req, res) => {
  res.render('eventos')
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

// Rota - deletar LOGINS (back-end: deleta cadastros do BD)
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

// Rota - deletar CALENDÁRIOS (back-end: deleta cadastros do BD)
app.get('/delet/:id', (req, res) => {
  Calendario.destroy({ where: { 'id': req.params.id } }).then(() => {
    res.redirect('/cadastrados')
  }).catch((erro) => {
    res.send("Esta postagem não existe!")
  })
})

// Rota - (front-end: retorna os dados do BD para o navegador)
app.get('/cadastrados', (req, res) => {
  Calendario.findAll({
    order: [
      ['id', 'ASC']
    ]
  }).then((calendarios) => {
    res.render('cadastrados', { calendarios: calendarios })
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// Rota - chama o template cadastrar CALENDÁRIO (front-end: cadastrar calendários)
app.get('/cadastrar', (req, res) => {
  res.render('cadastrar')
})

// Rota - cadastra o CALENDARIO (back-end: cadastra os dados das inputs no BD e redireciona: CADASTRADOS (front-end)) 
app.post('/cadastrando', (req, res) => {
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

// Rota - cadastra o EVENTO (back-end: cadastra os dados das inputs no BD e redireciona: CALENDAR2 (front-end)) 
app.post('/cadastrandoevento', (req, res) => {
  Evento.create({
    data: req.body.data,
    descricao: req.body.descricao
  }).then(() => {
    //  (front-end: redirecionando para CADASTRADOS)
    res.redirect('calendar2')
  }).catch((erro) => {
    res.send("Houve um erro: " + erro)
  })
})

// ************************************************ USUÁRIO ************************************************
// Rota - Tela CALENDÁRIO (front-end: visualiza calendário geral)
app.get('/calendar', (req, res) => {
  res.render('calendar')
})

// Rota - Tela CALENDÁRIO (front-end: visualiza calendário 1)
app.get('/calendar1', (req, res) => {
  res.render('calendar1')
})

// Rota - Tela CALENDÁRIO (front-end: visualiza calendário 2)
app.get('/calendar2', (req, res) => {
  Evento.findAll({
  }).then((eventos) => {
    console.log(eventos)
    res.render('calendar2', { eventos: eventos })
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
// git commit -m "Rotas cadastrando e cadastrados" 
// git push origin main



