const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());
app.use(session({
  secret: 'kitfox-2017',
  cookie: {}
}))
app.use( express.static( "uploads" ) );
// app.use(express.static('public'))
let index = require('./routes/index.js')
let teachers = require('./routes/teachers.js')
let subjects = require('./routes/subjects.js')
let students = require('./routes/students.js')

// ===================== routing =================================//
app.use('/',index)
app.use('/teachers', teachers);
app.use('/subjects', subjects)
app.use('/students', students)
// =================== end of routing  ========================== //

//=========================================
app.listen(process.env.PORT || 3000, () => {
  console.log('app start on port 3000');
})
