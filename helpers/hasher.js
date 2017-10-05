const crypto = require('crypto')

function encrypt (password, salt) {
   const hash = crypto.createHmac('sha256', salt).update(password).digest('hex')
   return hash
}


module.exports = encrypt