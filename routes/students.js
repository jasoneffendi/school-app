let express = require('express');
let router = express.Router();
const models = require('../models')

router.use((req,res,next) => {
  if(req.session.hasLogin && req.session.user.role !== 'teacher') {
    next()
  } else {
    res.redirect('/login')
  }
})

router.get('/', (req, res)=>{
  models.Student.findAll({
    order: [
      ['first_name', 'ASC']
    ]
  })
    .then(data_students => {
      res.render('students', {data_students: data_students, title: "Halaman Students",head: "Students", session: req.session})
    })
    .catch(err => {
      console.log(err);
    })
})

// router.get('/', (req, res)=>{
//   res.render('students')
// })

router.get('/add', (req, res)=>{
  res.render('student_add', {title: "Halaman Tambah Siswa", head: "ADD STUDENTS", session: req.session}) // form
})

router.post('/add', (req, res)=>{
  models.Student.create({
    first_name: `${req.body.first_name}`,
    last_name: `${req.body.last_name}`,
    email: `${req.body.email}`.toLowerCase(),
    createdAt: new Date(),
    updatedAt: new Date()
  })
  .then(student => {
    res.redirect('/students')
  })
  .catch(err => {
    console.log(err);
  })
})

router.get('/delete/:id/', (req, res) => {
  models.Student.destroy({
    where: {
      id: `${req.params.id}`
    }
  })
  .then((row_deleted) => {
      console.log('DELETE SUCCESS');
      res.redirect('/students')
  })
  .catch(err => {
    console.log(err);

  })
})


// edit
router.get('/edit/:id/', (req, res) => {
  models.Student.findAll({
    where: {
      id: `${req.params.id}`
    }
  })
  .then( student => {
    res.render('student_edit',{student: student,err:false, title: "Halaman Edit Students", head: "EDIT STUDENTS", session: req.session})
    // res.send(student)
  })
  .catch(err => {
    console.log(err);
  })

})

router.post('/edit/:id', (req, res) => {
  // let modelstudent = new models.Student();
  // dapetin data emailnya
  var email_lama = ''
  // Project.findById(123).then(project
  models.Student.findById(req.params.id)
    .then(student => {
      email_lama = student.email
      // ubah email ke null
      models.Student.update({
        email: null,
        updatedAt: new Date()
      }, {
        where: {id: `${req.params.id}`}

      })
      .then(student_object => {
        //update dengan data baru
        models.Student.update({
          first_name: `${req.body.first_name}`,
          last_name: `${req.body.last_name}`,
          email: `${req.body.email}`.toLowerCase(),
          full_name: `${req.body.first_name}` + ' ' +`${req.body.last_name}`,
          createdAt: new Date(),
          updatedAt: new Date()

        }, {
          where: {id: `${req.params.id}`}

        })
        .then(student => {
          res.redirect('/students')
        })
        .catch(err => {
          // error duplicate dengan email id lain / format salah
          console.log('eror 1 '+err);
          // balikin email ke alamat awal
          // res.send(err)
          models.Student.update({
            email: email_lama.toLowerCase(),
            updatedAt: new Date()
          }, {
            where: {id: `${req.params.id}`}
          })
          .then(student => {
            let data_temporary = [{
              id: `${req.params.id}`,
              first_name: `${req.body.first_name}`,
              last_name: `${req.body.last_name}`,
              email: email_lama.toLowerCase(),
              createdAt: new Date(),
              updatedAt: new Date()
            }]
            res.render('student_edit',{student: data_temporary, data_error: true,err: true, title: "Halaman Edit Students", head: "EDIT STUDENTS", session: req.session})
          })
          .catch(err => {console.log('err 2' + err)})
        })
      })
      .catch(err => {
        // error ketika update email ke null
        console.log('err 3'+err);
      })
    })
})

  router.get('/:id/addsubject', (req, res) => {
    // ambil data 1 student, kemudian ambil data all subject untuk pilihan dropdown
    models.Student.findAll({
      where: {
        id: `${req.params.id}`
      }
    })
    .then(student => {
      models.Subjects.findAll()
       .then(subjects => {
         res.render('student_add_subject', {data_student: student, data_subjects: subjects, title: "Halaman Add Subject To Student", head: "ADD SUBJECT TO STUDENT", session: req.session})
         // res.send({data_student: student, options_subject: subjects})
       })
       .catch(err => {
         console.log(err);
       })
    })
    .catch(err => {
 
    })
 
  })
 
  router.post('/:id/addsubject', (req, res) => {
    models.SubjectStudent.create({
      StudentId: `${req.params.id}`,
      SubjectId: `${req.body.SubjectId}`,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(student => {
      res.redirect('/students')
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
