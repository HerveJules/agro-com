import db from "../models";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { compareHashedPassword, generateHash } from "../helpers";
import validation from "../middleware/validations";
import secret from "../config/secretKey.js";
import jwtpassport from "../config/passport";
import { cloudinaryConfig, uploader } from "../config/cloudinaryConfig";
import cloud from "../helpers/clouds";
import {validationResult} from 'express-validator/check';

const secretKey = secret.secretKey;
const { User,Coop, Bidder, Store, Auction } = db;
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
        status:res.statusCode,
        message: 'Something went wrong on server'
      });
    }
  }
  // delete user
  static async deleteUser(req,res){
    try{
      const findOne = await User.findOne({where:{email:req.body.email},include:[{model:Coop},
        {model:Bidder}]});
      
      if (findOne.Coop !=null | findOne.Bidder != null) {
        return res.status(403).send({
          status:res.statusCode,
          message:'Not allowed to delete user heading third party members'
        })
      }
      const destroy = await findOne.destroy();
      if (destroy) {
        return res.status(200).send({
          status:res.statusCode,
          message:'User has been deleted successfully!'
        })
      }
    }catch(err){
      res.status(500).send({
        status:res.statusCode,
        error:'Something went wrong!'
      })
    }
  }
  //update user
  static async updateUser(req,res){
    try{
      // condition
      const update = await User.update({...req.body},{where:{id:req.user.id}});
      if (update) {
        return res.status(200).send({
          status:res.statusCode,
          message:'user has been updated successfully!'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        error:'Something went wrong!'
      })
    }
  } 
  // delete user heading cooperative with all related information of the cooperative
  static async deleteUserCoop(req,res){
    try{
      // find user heading cooperative by email
      const findOne = await User.findOne({where:{email:req.body.email},include:[Coop]});
      if (findOne.Coop) {
        await findOne.Coop.destroy().then(()=>{
          findOne.destroy().then(()=>{
            return res.status(200).send({
              status:res.statusCode,
              message:'user has been deleted successfully!'
            })
          })
        })
      }else{
        return res.status(400).send({
          status:res.statusCode,
          message:'user have no associated cooperative'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        error:'Something went wrong!'
      })
    }
  }
  // delete user heading bidding company with all related information of the bidder
  static async deleteUserBidder(req,res){
    try{
      // find user heading bidding company
      const findOne = await User.findOne({where:{email:req.body.email},include:[Bidder]});
      if (findOne.Bidder) {
        // first destroy the company and then destroy the user
        await findOne.Bidder.destroy().then(()=>{
          findOne.destroy().then(()=>{
            return res.status(200).send({
              status:res.statusCode,
              message:'user has been deleted successfully!'
            })
          })
        })
      }else{
        return res.status(400).send({
          status:res.statusCode,
          message:'user has no associated bidding company!'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        error:'Something went wrong!'
      })
    }
  }
  // verifying account to be able to navigate to sensitive routes
  static async verify(req,res){
    try{
      // find user by email
      const findOne = await User.findOne({where:{email:req.body.email}});
      if (findOne) {
        await findOne.update({isverified:true,where:{email:req.body.email}})
        .then(user => {
          return res.status(200).send({
            status:res.statusCode,
            message:'User has been verified successfully!'
          })
        });
      }else{
        return res.status(400).send({
          status:res.statusCode,
          message:'User not found in database!'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        message:'Something went wrong!'
      })
    }
  }

  // grant administrator privilege

  static async GrantAdmin(req,res){
    try{
      // find user by email
      const findOne = await User.findOne({where:{email:req.body.email}});
      if (findOne) {
        await findOne.update({isadmin:true,where:{email:req.body.email}})
        .then(user => {
          return res.status(200).send({
            status:res.statusCode,
            message:'Administrator privilege granted successfully!'
          })
        });
      }else{
        return res.status(400).send({
          status:res.statusCode,
          message:'User not found in database!'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        message:'Something went wrong!'
      })
    }
  }


  // get user heading cooperative full information
  static async getUserCoopInfo(req,res){
    try{
      const findOne = await User.findOne({where:{email:req.body.email},include:[{model:Coop,include:[{model:Store,include:[Auction]}]}]});
      if (findOne) {
        return res.status(200).send({
          status:res.statusCode,
          findOne
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        message:'Something went wrong'
      }) 
    }
  }
  // get user heading bidding company full information
  static async getUserBidderInfo(req,res){
    try{
      const findOne = await User.findOne({where:{email:req.body.email},include:[Bidder]});
      if (findOne.Bidder) {
        return res.status(200).send({
          status:res.statusCode,
          findOne
        })
      }else{
        return res.status(400).send({
          status:res.statusCode,
          message:'user has no associated bidding company'
        })
      }
    }catch(err){
      return res.status(500).send({
        status:res.statusCode,
        error:'Something went wrong!'
      })
    }
  }

}

export default Users;
