let express = require('express');
let router = express.Router();
const models = require('../models')

router.use((req,res,next) => {
  if(req.session.hasLogin && req.session.user.role !== 'teacher') {
    next()
  } else {
    res.render('accessDenied', {title: 'ACCES DENIED'})
  }
})

router.get('/', (req, res)=>{
  models.Teacher.findAll({
    include: [{model: models.Subjects}]
    })
    .then(data_teachers => {
      // res.send({data_teachers : data_teachers})
      res.render('teacher/teachers',{data_teachers : data_teachers, title: "Halaman Teacher",head: "Teacher", session: req.session})
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/add', (req, res)=>{
  models.Subjects.findAll({
    })
    .then(subjects => {
      res.render('teacher/teacher_add', {data_subjects: subjects, title: "Halaman Add Teacher", head: "Add Teachers", session: req.session}) // form
    })
    .catch(err => {
      console.log(err);
    })

})

router.post('/add', (req, res)=>{
  models.Teacher.create({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`.toLowerCase(),
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(teachers => {
    res.redirect('/teachers')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id/', (req, res) => {
  models.Teacher.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then((row_deleted) => {
      console.log('DELETE SUCCESS');
      res.redirect('/teachers')
  })
  .catch(err => {
    console.log(err);

  })
})

// edit
router.get('/edit/:id/', (req, res) => {
  models.Teacher.findAll({
    // attributes: { exclude: ['SubjectId','TeacherId'] },
    where: {
      id: `${req.params.id}`
    }
  })
  .then( teacher => {
    models.Subjects.findAll({
        // attributes: { exclude: ['SubjectId','TeacherId'] }
      })
      .then(subjects => {
        res.render('teacher/teacher_edit', {teacher: teacher, data_subjects: subjects, title: "Halaman Edit Teacher",head: "Edit Teachers", session: req.session}) // form
      })
      .catch(err => {
        console.log(err);
      })
  })
  .catch(err => {
    console.log(err);
  })

})

router.post('/edit/:id', (req, res) => {
  models.Teacher.update({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`.toLowerCase(),
    SubjectId: req.body.SubjectId,
    createdAt: new Date(),
    updatedAt: new Date()
  }, {
    where: {id: `${req.params.id}`}

  })
  .then(teacher => {
    res.redirect('/teachers')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect('/login')
})

module.exports = router
