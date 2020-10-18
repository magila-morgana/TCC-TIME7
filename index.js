// importar o express, body-parser, handlebars e sequelize
const express = require('express')
const Handlebars = require('handlebars');
const expressHandlebars = require('express-handlebars'), {alowInsecurePrototypeAccess, allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
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
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// Rota - Tela HOME (front-end: escolhe calendário curso)
app.get('/', (req,res) => {
    res.render('home')
}) 

// Rota - Tela ADMIN (front-end: altera calendário)
app.get('/adm', (req,res) => {
    res.render('adm')
})

// Rota - Tela CALENDÁRIO (front-end: visualiza calendário geral)
app.get('/calendar', (req,res) => {
    res.render('calendar')
})

// Rota - cadastra CALENDÁRIO (back-end: criar e editar calendário do semestre)
app.get('/selecao', (req,res) => {
    res.render('selecao')
})

// Rota - Tela SEMESTRE 1 (front-end: visualiza calendar 1)
app.get('/calendar1', (req,res) => {
    res.render('calendar1')
})

// Rota - Tela SEMESTRE 2 (front-end: visualiza calendar 2)
app.get('/calendar2', (req,res) => {
    res.render('calendar2')
})

// Rota - cadastro LOGIN (back-end: cadastra os dados das inputs no BD e redireciona: LOGIN ou HOME (front-end)) 
app.post('/cadastro', (req,res) => 
{   
    Login.create({
        RM: req.body.RM,
        senha: req.body.senha
    }).then(() => 
    {
//      (front-end: redirecionando para LOGIN)
        const {senha} = req.body
        if (senha === '2020') {
            res.redirect('logins')
        } else {
//          (front-end: redirecionando para HOME)
            res.redirect('/')
        }
    }).catch((erro) => 
    {
        res.send("Houve um erro: " +erro)
    }) 
}) 

// Rota - (front-end: retorna os dados do BD para o navegador)
app.get('/logins', (req,res) => 
{
    Login.findAll({order: [['id', 'DESC']]}).then((logins) => 
    {
        res.render('logins', {logins: logins})
    }).catch((erro) => 
    {
        res.send("Houve um erro: " +erro)
    })
    
})

// Rota - (back-end: deleta cadastros do BD)
app.get('/del/:id', (req, res) => 
{
    Login.destroy({where: {'id': req.params.id}}).then(() =>
    {
        Login.findAll({order: [['id', 'DESC']]}).then((logins) => 
        {
            res.render('logins', {logins: logins})
        }).catch((erro) => 
        {
            res.send("Houve um erro: " +erro)
        })
    }).catch((erro) =>
    {
        res.send("Esta postagem não existe!")
    })
})

// Rota - salva os CALENDARIOS 1 e 2 semestre (back-end: cadastra os dados das inputs no BD e redireciona: calendário cadastrado (front-end)) 
app.post('/selecao', (req,res) => 
{   
    Calendario.create({
        ano: req.body.ano,
        semestre: req.body.semestre
    }).then(() =>
    {   
//      (front-end: redirecionando para calendários) 
        res.redirect('selecao')
    }).catch((erro) => 
    {
        res.send("Houve um erro: " +erro)    
    }) 
}) 

// ouvir uma porta
app.listen(8080)

// **************************** Configurando o GitHub

// git config --global user.name "magila-morgana"
// git config --global user.email "magilamorganasf@gmail.com"

// **************************** Salvar no GitHub

// git add . 
// git commit -m "Criação do formulário de imagem" 
// git push origin main 