import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {compareHashedPassword, generateHash} from '../helpers';
import validation from '../middleware/validations';
import secret from '../config/secretKey.js';
import jwtpassport from '../config/passport'
const secretKey = secret.secretKey
const { users } = db;
const {sessionData} = jwtpassport;
class Users {

    static async createUser(req, res) {
        const {
            email, password, jobtitle, tin
        } = req.body                
        try {
            const userFind = await users.findOne({ where: { email}})
            if(userFind) {
              return res.status(400).send({
                status:400,
                errorMessage: 'The User with that email exists'
              })
            }

            const encryptedPassword = await generateHash(password);
            const userSave = await users.create({ email, password:encryptedPassword, jobtitle, tin});
            if(userSave) {
              return res.status(201).send({
                status:201,
                message: 'User has been created',
                user: {
                  email: userSave.email,
                  jobtitle: userSave.jobtitle,
                  tin: userSave.tin
                }
              })
            }
        }
        catch(err) {
          console.log(err);
        }
    }






  // function that do login operationscompareHashedPassword

  static async auth(req,res) {
    // body...
    const {email,password} = req.body;


    try{
      const userfindOne = await users.findOne({where:{email}});
        if (userfindOne) {
          
          if (compareHashedPassword(password,userfindOne.password)) {
            const user = {
              id:userfindOne.id,
              tin:userfindOne.tin
            }
            const token = jwt.sign(user,secretKey);
            return res.status(201).send({
              status:201,
              message:'You have successfully logged in',
              token
            })
          } else {
            return res.status(401).send({
              status:401,
              message:'incorrect password'
            })
          }
          
        }else{
          // if no user found by email report incorrect email
          return res.status(400).send({
            status:400,
            message:'User does not exists'
          })
        }
    }catch(err){
      res.status(203).send({
        message:err
      })
    }
    
  }




  static secret (req,res) {
    return res.send({
      message:'authorized'
    })
  }

}

export default Users;