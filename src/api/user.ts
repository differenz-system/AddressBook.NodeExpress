var express=require('express')
var router=express.Router()
var {Op}=require('sequelize')
import db=require('../configuration/sequelize')
var datetime=new Date()

// User Login API using async and await :- Vruk patel (18_03_21)
router.post('/login',async(req,res)=>{
    try {
        // Object destructure
        const {email,password}=req.body
        
         // if (typeof email=="undefined" || email == "") {
        if (!email) {
            throw new Error("Please enter Email")
        }
        else if (!password) {
            throw new Error("Please enter Password")
        }else {

        // FindOne data and check email and password is match or not
        const result=await db.user_model.findOne({
            where: {
                email,
                password
            }
        })

        // User details is not match then if condition is true  
        if (!result) {
            res.json({ 'res': '1', 'msg': 'Enter proper email and password' });
        }
        // Output  
            /* 
                {
                    "res": "1",
                    "msg": "Enter proper email and password"
                }
            */

        // User details is match then else condition is true 
        else {
            res.json({ 'res': '0', 'msg': 'Login User', 'data': result });
        }
        // Output 
            /* 
                {
                    {
                    "res": "0",
                    "msg": "Login User",
                    "user_id": 16
                    }
                }
            */
            }
        } catch (error) {
        res.json({'res':'1','error':error.message})
    }
})

// User Registration API using async and await :- Vruk patel (18_03_21)
router.post('/registration',async(req,res)=>{
    try {
        // Add '/' on date fomate ex:- 2021/03/16
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();

        // Object destructure
        const {email,password}=req.body

        // Email is already exists or not
        const verifyEmail= await db.user_model.findOne({
            where:{
                email
            }
        })
        // Output  
            /* 
               {
                    "res": "1",
                    "msg": "This email is already exists "
                }
            */

        if (verifyEmail) {
            res.json({ 'res': '1', 'msg': 'This email is already exists '});
        } else {
            // Add new user details using create method
            const result=await db.user_model.create({
                email,
                password,
                create_date:date
            })
    
            // Create method is unsuccess after catch block is call
            if(!result){
                res.json({ 'res': '1', 'msg': 'Error in registration'});
            }
            // Create method is success after show msg with userData
            else{
                var id = result.user_id;
                res.json({ 'res': '0', 'msg': 'Successfully registration', 'data':result });
            }
             // Output  
                    /* 
                        {
                            "res": "0",
                            "msg": "Successfully registration",
                            "info": {
                                "user_id": 16,
                                "email": "admin.admin@gmail.com",
                                "password": "12345",
                                "external_id": "1",
                                "create_date": "2021-02-16"
                            }
                        }
                    */
        }
    } catch (error) {
        res.json({'res':'1','error':error.message})
    }
})

// User delete API using async and await :- Vruk patel (20_03_21)
router.delete('/user/delete',async(req,res)=>{
    try {
        const {create_date}=req.body
    
        if (!req.body.create_date) {
            res.json({'res':1,'msg':'create_data is require'})
        } else {
            // FindOne record by create_date  
            const result=await db.user_model.findOne({
                where:{
                    create_date	: create_date
                }
            })
            // Create_date is match or not
            if (result) {
                const result1=await db.user_model.destroy({
                    where:{
                        create_date	: create_date
                    }
                })
                if (result1) {
                    res.json({'res':0,'msg':'sucess delete','data':result1})
                } else {
                    res.json({'res':1,'msg':'no data delete','data':result1})
                }
            } else {
                res.json({'res':1,'msg':'your date is not match'})
            }
        }
        
    } catch (error) {
        res.json({'res':1,'msg':error.message})
    }
})

// Search by email and password
router.get('/search/:email/:password',async(req,res)=>{
    try {
        const result= await db.user_model.findAll({
            where:{
               [Op.or]:[{
                    email:{
                        [Op.substring]:req.params.email
                    }
               },{
                password:{
                    [Op.substring]:req.params.password
                }
               }]
            }
        })
        if (result.length > 0) {
            res.json({'res': 0,'msg':'search record','data':result})
        } else {
            res.json({'res': 1,'msg':'not record','data':result})
        }
        
    } catch (error) {
        res.json({'res':'1','msg':error.message})
    }

})

export=router

