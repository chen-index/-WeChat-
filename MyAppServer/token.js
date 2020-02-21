const jwt = require('jsonwebtoken')

const key = 'fdsfsadasdsafsfsa'

let user = {
    name: 'zhang san'
}

let token = jwt.sign(user, key)
console.log(token)

const obj = jwt.verify(token, key)
console.log(obj)
