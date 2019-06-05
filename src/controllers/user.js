import db from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { compareHashedPassword, generateHash } from "../helpers";
import validation from "../middleware/validations";
import secret from "../config/secretKey.js";
import jwtpassport from "../config/passport";
import { cloudinaryConfig, uploader } from "../config/cloudinaryConfig";
import cloud from "../helpers/clouds";
import {check,validationResult} from 'express-validator/check';

const secretKey = secret.secretKey;
const { User } = db;
class Users {

  static async createUser(req, res) {
    // throwing error if express-validator found invalid value in route
    
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(422).send({ errors: errors.array() });
      }

      const userFind = await User.findOne({ where: { email:req.body.email } });
      if (userFind) {
        return res.status(400).send({
          status: 400,
          errorMessage: "The User with that email exists"
        });
      }
      const links = await cloud(req.files);
      const encryptedPassword = await generateHash(req.body.password);
      const userSave = await User.create({
        ...req.body,
        password:encryptedPassword,
        image: links[0]
      });
      if (userSave) {
        return res.status(201).send({
          status: res.statusCode,
          message: "User has been created",
          userSave
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).send({
        
      });
    }
  }
  // function that do login operationscompareHashedPassword

  static async auth(req, res) {
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
    } catch (err) {
      res.status(203).send({
        message: err
      });
    }
  }
  // delete user
  static async deleteUser(req,res){
    try{
      
    }catch(err){
      res.status(500).send({
        status:res.statusCode,
        error:'something went wrong!'
      })
    }
  }

}

export default Users;
