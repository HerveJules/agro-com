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
            firstname, lastname, email, password, role, 
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
              password:encryptedPassword,role,adress,tel, jobtitle, ID,image:links[0]});
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


  // upload file

  static uploadFile(req,res){
     

    if(req.file) {

      const file = dataUri(req).content;

        return uploader.upload(file).then((result) => {

          const image = result.url;

          return res.status(200).json({

            messge: 'Your image has been uploded successfully to cloudinary',

            data: {

              image

            }

          })

        }).catch((err) => res.status(400).json({

            messge: 'someting went wrong while processing your request',

            data: {

              err

            }

        }))
    }
  }
}

export default Users;
