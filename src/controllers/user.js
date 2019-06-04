import db from '../models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import {compareHashedPassword, generateHash} from '../helpers';
import validation from '../middleware/validations';
import secret from '../config/secretKey.js';
import jwtpassport from '../config/passport';
import {cloudinaryConfig, uploader } from '../config/cloudinaryConfig';
import cloud from '../helpers/clouds';


const secretKey = secret.secretKey
const { User } = db;
const {sessionData} = jwtpassport;
class Users {

    static async createUser(req, res) {
        const {
            firstname, lastname, email, password,
            adress, tel, ID, jobtitle, image  
        } = req.body                
        try {
            const userFind = await User.findOne({ where: { email}})
            if(userFind) {
              return res.status(400).send({
                status:400,
                errorMessage: 'The User with that email exists'
              })
            }
            const links = await cloud(req.files);
            const encryptedPassword = await generateHash(password);
            const userSave = await User.create({ firstname,lastname,email, 
              password:encryptedPassword,adress,tel, jobtitle, ID,image:links[0]});
            if(userSave) {
              return res.status(201).send({
                status:res.statusCode,
                message: 'User has been created',
                user: {
                  email: userSave.email,
                  jobtitle: userSave.jobtitle
                }
              })
            }
        }
        catch(err) {
          res.status(500).send({
            status:res.statusCode,
            message:err
          })
        }
    }
  // function that do login operationscompareHashedPassword

  static async auth(req,res) {
    // body...
    const {email,password} = req.body;

    try{
      const userfindOne = await User.findOne({where:{email}});
        if (userfindOne) {

          if (compareHashedPassword(password,userfindOne.password)) {
            const user = {
              id:userfindOne.id,
            }
            const token = jwt.sign(user,secretKey);
            return res.status(201).send({
              status:res.statusCode,
              message:'You have successfully logged in',
              userfindOne,
              token
            })
          } else {
            return res.status(401).send({
              status:res.statusCode,
              message:'incorrect password'
            })
          }
          
        }else{
          // if no user found by email report incorrect email
          return res.status(400).send({
            status:res.statusCode,
            message:'User does not exists'
          })
        }
    }catch(err){
      res.status(203).send({
        message:err
      })
    }
    
  }
}

export default Users;
