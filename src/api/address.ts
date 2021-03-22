var express=require('express')
var router=express.Router()
import db=require('../configuration/sequelize')
var datetime=new Date()

// Display API Using Async And Await :- Vruk patel (18_03_21)
router.get("/getAddressBookByID/:user_id",async(req, res)=> {
    try {
        // Find Address For User_id
        const result= await db.address_model.findAll({
                where: {
                    user_id: req.params.user_id,
                    is_deleted: 0
                },
            })
            
            // Address details is match then if condition is true 
            if (result.length > 0) {
                res.json({ 'res': '0','msg': 'successfully display','data': result});
            }
             // Output  
            /* 
                {
                    "res": "0",
                    "data": [
                    {
                        "address_id": 4,
                        "name": "vruk patel",
                        "email": "user.admin@gmail.com",
                        "contact_number": "9157445662",
                        "is_active": "1",
                        "create_date": "2021-02-15T18:30:00.000Z",
                        "user_id": 1,
                        "is_deleted": 0,
                        "user": {
                            "user_id": 1,
                            "email": "user.user@gmail.com",
                            "password": "12345",
                            "external_id": 1,
                            "create_date": "2021-02-16"
                        }
                    }
                    ],
                    "msg": "successfully display"
                    }
            */
                
            // Address details is not match then else condition is true 
            else {
                res.json({ 'res': '0', 'msg': 'user is not match','data': result});
            }
              // Output  
            /* 
               {
                    "res": "1",
                    "msg": "user is not match"
                }
            */
         } 
         catch (error) {
            res.json({'res':'1','error':error.message})
        }
});

// Add Address API Using Async And Await :- Vruk patel (18_03_21)
router.post('/createAddressBook', async(req, res)=> {

    try {
        // Object destructure
        const {name,email,contact_number,is_active,user_id}=req.body
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        var a = is_active == true ? 1 : 0;
        
        // Add new address details using create method
        const result=await db.address_model.create({
                name,
                email,
                contact_number,
                is_active:a,
                create_date: date,
                user_id,
                is_deleted:0
            })

            if (result) {
                var address_id = result.address_id;
                res.json({ 'res': '0', 'msg': 'Successfully insert', 'addressid': address_id, 'data': result });
            }
            // Output  
            /* 
                {
                    "res": "0",
                    "msg": "Successfully insert",
                    "addressid": 5,
                    "data": {
                        "address_id": 5,
                        "name": "vruk",
                        "email": "user.user@gmail.com",
                        "contact_number": "9157445689",
                        "is_active": 1,
                        "create_date": "2021-02-15T18:30:00.000Z",
                        "is_deleted": 0
                    }
                }
            */
            else {
                res.json({ 'res':'1','msg':'Insert Error','data':result});
            }
            
    } catch (error) {
        res.json({'res':'1','error':error.message})
    }
});

// Update Address API Using Async And Await :- Vruk patel (18_03_21)
router.put("/updateAddressBook/:userid/:addressid", async(req, res)=>{
    try {
        var date = datetime.getFullYear() + "/" + datetime.getMonth() + "/" + datetime.getDate();
        
        // Object destructure
        const {name,email,contact_number,is_active}=req.body

        // is_active=="true" then a=1 else a=0 (check is_active true or false)
        var a = is_active == "true" ? 1 : 0;

        // Update address 
        await db.address_model.update({
            name,
            email,
            contact_number,
            is_active:a,
            create_date: date,
            is_deleted:0
        },{
            where: { 
                    address_id: req.params.addressid,
                    user_id: req.params.userid
                   }
        }).then((data)=>{
            if (data == "") {
                res.json({ 'res':'1','msg':'Update Error','data': data});
            }
            else {
                // findAll address 
                db.address_model.findAll({
                    where: { address_id: req.params.addressid }
                }).then((data)=> {
                    res.json({ 'res': '0', 'msg': 'Successfully update', 'data': data });
                });
            }
            // Output  
                /* 
                    {
                        "res": "0",
                        "msg": "Successfully update",
                        "data": [
                            {
                                "address_id": 4,
                                "name": "vruk patel",
                                "email": "user.admin@gmail.com",
                                "contact_number": "9157445662",
                                "is_active": "1",
                                "create_date": "2021-02-15T18:30:00.000Z",
                                "user_id": 1,
                                "is_deleted": 0
                            }
                        ]
                    }
                */
        });
        
    } catch (error) {
        res.json({'res':'1','error':error.message})
    }
});


//Delete Address API Using Async And Await :- Vruk patel (18_03_21)
router.delete("/removeAddressBook/:userid/:addressid",async(req, res)=>{
try {
     // Soft delete address details
     const result= await db.address_model.update({
            is_deleted: 1
        }, {
            where: { address_id: req.params.addressid,
                user_id: req.params.userid
            }
        })
        if(result){
            res.json({ 'res': '0', 'msg': "successfully delete",'data': result});
        }
        // Output  
                /* 
                    {
                        "res": "0",
                        "msg": "successfully delete"
                    }
                */
        else{
            res.json({ 'res':'1','msg':'delete Error','data': result});
        }
  
    }catch (error) {
        res.json({'res':'1','error':error.message})
    }
});   
    
export=router
