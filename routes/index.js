let express = require('express');
let router = express.Router();
const models = require('../models')
const decrypt = require('../helpers/hasher')


router.get('/', (req, res)=>{ 
    if(req.session.hasLogin) {
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
          let hash = decrypt(req.body.password, user[0].salt)
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

router.post('/registeruser', (req, res)=>{
    if(req.body.register_username && req.body.register_password !== '') {
        req.session.regerr = false
        models.User.create({
            username: `${req.body.register_username}`,
            password: `${req.body.register_password}`,
            role: `${req.body.register_role}`,
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

router.get('/logout', (req, res) => {
    req.session.destroy()
    res.redirect('/')
})

module.exports = router
