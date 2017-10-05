let express = require('express');
let router = express.Router();
const models = require('../models')
const score_letter = require('../helpers/score_letter.js')


router.use((req,res,next) => {
  if(req.session.hasLogin && req.session.user.role !== 'teacher') {
    next()
  } else {
    res.render('accessDenied', {title: 'ACCES DENIED'})
  }
})

router.get('/', (req, res)=>{
  models.Subjects.findAll({
    include :[{model: models.Teacher}]
  })
    .then(data_subjects => {
      res.render('subjects', {data_subjects: data_subjects, title: "Halaman Subjects", head: "Subjects", session: req.session})  
    })
})

router.get('/:id/enrolledstudents', (req, res) => {
  
    models.Subjects.findAll({
        where: {
          id: `${req.params.id}`
        },
        include: [
          {model: models.Student}
        ],
      })
      .then(data_subjects => {
        if(data_subjects[0].Students.length > 0) {
          let count = 0;
          data_subjects[0].Students.map( student => {
            student.score_letter = score_letter(student.SubjectStudent.score)
            count++
            if(count >= data_subjects[0].Students.length){
              res.render('subject_enrolled_student', {data_subjects: data_subjects[0], title: "Enrolled Students", session: req.session, head: "Enrolled Students"})
            }
          })
        } else {
          res.redirect('/subjects')
        }
      })
      .catch(err => {
        console.log(err);
      })
  
  })

router.get('/:id/givescore', (req, res) => {
  models.SubjectStudent.findAll({
      where: {
        id: `${req.params.id}`
      },
      include: [
        {model: models.Student},
        {model: models.Subjects}
      ]
    })
    .then(data_SubjectStudent => {
      res.render('give_score',{data_SubjectStudent: data_SubjectStudent, title: "Halaman Memberi Nilai",head: "GIVE SCORE", session: req.session})
    })
    .catch(err => {
      console.log(err);
    })
})

router.post('/:id/givescore', (req, res) => {
  models.SubjectStudent.update({
      score: `${req.body.score}`
    },
    {
      where: {id: `${req.params.id}`}
  })
  .then(data_SubjectStudent => {
    res.redirect('/subjects')
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
