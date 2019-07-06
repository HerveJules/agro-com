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
    // // console.log(validationResult);
    console.log(req.body.email);
    
    try {
      const userFind = await User.findOne({ where: { email:req.body.email } });
      if (userFind) {
        return res.redirect('/register');
      }
      // const links = await cloud(req.files);
      const encryptedPassword = await generateHash(req.body.password);
      const userSave = await User.create({
        ...req.body,
        password:encryptedPassword,
      });
      if (userSave) {
        return res.redirect('/login');
      }
    } catch (err) {
      
      res.redirect('/500');
    }
  }
  // function that do login operationscompareHashedPassword

  static async auth(req, res) {
    const {email,password} = req.body;

    try{
      const userfindOne = await User.findOne({where:{email}});
        if (userfindOne) {

          if (compareHashedPassword(password,userfindOne.password) && userfindOne.role == 'Eax') {
            const user = {
              id:userfindOne.id,
            }
            const token = jwt.sign(user,secretKey);
            await res.cookie('Authorization',token);
            return res.redirect('/api/v1/user/index');
          } else if (compareHashedPassword(password,userfindOne.password) && userfindOne.role == 'Coop'){
            // redirect to coop dashboard
            return res.send({
              message:'cooperative board'
            });
          }else if (compareHashedPassword(password,userfindOne.password) && userfindOne.role == 'Coop'){
            // redirect to bidder
            return res.send({
              message:'cooperative board'
            });
          }else{
            // incorrect password
            return res.redirect('/login');
          }
          
        }else{
          // if no user found by email report incorrect email
          return res.redirect('/register');
        }
    } catch (err) {
      // internal errors
      res.redirect('/500');
    }
  }
  // delete user
  static async deleteUser(req,res){
    try{
      const findOne = await User.findOne({where:{email:req.body.email},include:[{model:Coop},
        {model:Bidder}]});
      
      if (findOne.Coop !=null | findOne.Bidder != null) {
        return res.render('del-user',{
          status:res.statusCode,
          message:'Not allowed to delete user heading third party members'
        })
      }
      const destroy = await findOne.destroy();
      if (destroy) {
        return res.render('del-user',{
          message:'User has been deleted successfully!'
        })
      }
    }catch(err){
      return res.redirect('/500');
    }
  }
  //update user
  static async updateUser(req,res){
    try{
      // condition
      if (!req.files) {
        console.log(...req.body)
        const update = await User.update({...req.body},{where:req.params});
        if (update) {
          return res.render('all-users',{
            findOne:update,
          })
        }
      } else {
        console.log(req.files)
        const coudinary_links = await cloud(req.files);
        const update = await User.update({...req.body,image:coudinary_links[0]},{where:req.params});
        if (update) {
          return res.render('all-users',{
            findOne:update,
          })
        } else {}
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
  // get all users
  static async getAllUsers(req,res){
    try{
      // find all
      const findAll = await User.findAll({
        attributes:['id','firstname','lastname','email','tel','jobtitle','role','image']
      });
      if (findAll) {
        res.render('all-users',{
          findAll,
          user:req.user.userFind
        });
      } else {
        res.render('all-users',{
          message:'There is no user registered yet!',
          user:req.user.userFind
        })
      }
    }catch(err){
      return res.redirect('/500');
    }
  }
  // select info to edit
  static async getInfoEdit(req,res){
    try{
      const findOne = await User.findOne({where:req.params});
      if (findOne) {
        return res.render('edit-user',{
          findOne:findOne,
          user:req.user.userFind
        })
      } else {
        return 0;
      }
    }catch(err){
      console.log(err);
      return res.redirect('/500');
    }
  }
  // select info to edit by email
  static async getInfoEditByEmail(req,res){
    try{
      const findOne = await User.findOne({where:{...req.body}});
      if (findOne) {
        return res.render('edit-user',{
          findOne,
          user:req.user.userFind
        })
      } else {
        return res.render('edit-user',{
          message:'There is no user with this email'
        })
      }
    }catch(err){
      return res.redirect('/500');
    }
  }
  // select info to delete by email
  static async getInfoDelByEmail(req,res){
    try{
      const findOne = await User.findOne({where:{...req.body}});
      if (findOne) {
        return res.render('del-user',{
          findOne,
          user:req.user.userFind
        })
      } 
    }catch(err){
      return res.redirect('/500');
    }
  }

}

export default Users;
