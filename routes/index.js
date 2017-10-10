let express = require('express');
let router = express.Router();
const models = require('../models')
const decrypt = require('../helpers/hasher')
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });



router.get('/', (req, res)=>{ 
    if(req.session.hasLogin) {
        // res.send(req.session)
        res.render('index', {title: 'Index', session: req.session, head: 'SCHOOL INTERFACE'})
    } else {
        res.redirect('/login')
    }
})

router.get('/login', (req, res)=>{
    res.render('login', {title: 'login',err:req.session.err})
})



router.post('/login', (req, res)=>{
    if(req.body.username && req.body.password !== '') {
        req.session.err = false
        models.User.findAll({
            where: {
                username: `${req.body.username}`
            }
        })
        .then(user => {
            console.log(user[0], 'user')
          let hash = decrypt(req.body.password, user[0].salt)
          console.log(hash, 'hash')
          if(req.body.username === user[0].username && hash === user[0].password) {
              req.session.hasLogin = true;
              req.session.user = {
                  username: user[0].username,
                  role: user[0].role,
                  loginTime: new Date()
              }
              res.redirect('/')
          }
        })
        .catch(err => {
          console.log(err);
          redirect('/login')
        })
    } else {
        req.session.err = true
        res.redirect('/login')
    }
 
})

router.get('/register', (req, res)=>{
    res.render('register', {title: 'register', err:req.session.regerr})
})

router.post('/registeruser', upload.single('userFile'), (req, res)=>{
    console.log(req.file)
    if(req.body.register_username && req.body.register_password !== '' && JSON.stringify(req.file) !== undefined) {
        req.session.regerr = false
        models.User.create({
            username: `${req.body.register_username}`,
            password: `${req.body.register_password}`,
            role: `${req.body.register_role}`,
            avatar: `${req.file.filename}`,
            createdAt: new Date(),
            updatedAt: new Date()
          })
          .then(student => {
            res.render('registerSuccess')
          })
          .catch(err => {
            console.log(err);
          })
    } else {
        req.session.regerr = true
        res.redirect('/register')
    }
   
  })

router.get('/user', (req,res) => {
    models.User.findAll()
    .then(dataUser => {
        console.log(dataUser)
        res.render('user', {data: dataUser, title: 'User', head: 'User'})
        // res.send(dataUser)
    })
})

router.get('/useredit/:username', (req,res) => {
    models.User.findOne({ where: {username: req.params.username}})
    .then(data => {
        console.log(data)
        res.render('useredit', {row: data, title: 'User', head: 'User', session: req.session})
    })
})

router.post('/useredit/:id',upload.single('userFile'), (req,res) => {
    models.User.update({
        username: `${req.body.register_username}`,
        password: `${req.body.register_password}`,
        role: `${req.body.register_role}`,
        avatar: `${req.file.filename}`,
        salt: '',
        createdAt: new Date(),
        updatedAt: new Date()
    }, {
        where: {id: `${req.params.id}`}
    })
    .then(() => {
        // console.log(req)
        res.redirect('/user')
    })
})

router.get('/delete/:id', (req,res) => {
    models.User.destroy({
        where: {
            id: `${req.params.id}`
        }
    })
    .then(() => {
        res.redirect('/user')
    })
    .catch(err => {
        console.log(err)
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
