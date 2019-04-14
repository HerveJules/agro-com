// const pool = require ('../config');
// 
// const Pool = require('pg').Pool;
// const pool = new Pool({
//     host:'localhost',
//     user:'acrole',
//     database:'acroledb',
//     password:'123',
//     port:5432
// })
if (process.env.NODE_ENV === 'production'){
  // production db definitions
  module.exports = {
    host:process.env.host || "",
    database:process.env.database
  }
}else{
  // development db definitions
  module.exports = require('./development.json');
  
}

//it may change considering code structure

const getUserById = (req, res, next) => {
  const id = parseInt(req.params.id)

  pool.query('SELECT * FROM users', (error, results) => {
    if (error) {
      throw error
    }
    res.status(200).json(results.rows)
  })
}
const createUser = (req, res, next) => {
  const { name, email } = req.body

  pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
    if (error) {
      throw error
    }
    res.status(201).send(`User added with ID: ${results.insertId}`)
  })
}

const deleteUser = (req, res,next) => {
  let id = parseInt(req.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    res.send(`User deleted with ID:`,id);
  })
}

const updateUser = (req, res,next) => {
  const id = parseInt(req.params.id)
  const { name, email } = req.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      res.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

module.exports ={
  fetch:getUserById,
  push:createUser,
  rm:deleteUser,
  mv:updateUser
}
