# AddressBook.NodeExpress

## Overview
This repository contains **Address Book** application for NodeExpress that shows design & coding practices followed by **[Differenz System](http://www.differenzsystem.com/)**.

The app does the following:
1. **Login:** User can login via email/password. 
2. **Home:** It will list all the save contacts, having the option to add a new contact on the top right.
3. **Create new contact:** User can add a new contact to his address book by filling details here.

## Pre-requisites
- [Visual Studio code](https://code.visualstudio.com/)
-[ Node js ](https://nodejs.org/en/)
-[ TypeScript ](http://typescript.org/)
-[ Sequelize ](http://docs.sequelizejs.com/)


## Getting Started
1. [Install Visual Studio code](https://code.visualstudio.com/)
2. Clone this sample repository
3. Open Terminal, go to location of the repo
4. Enter command "npm install" (make sure to go inside project first)
5. Enter command "npm start node".


## Key Tools & Technologies
- **Database:** MYSQL(sequelize)
- **Authentication:** login
- **API/Service calls:** fetch API
- **IDE:**  VSCode
- **Framework:** Node js

## Troubleshooting
### (VS Code)While running command (npm start node), you are expected to have given error: "launchPackager.command" can't be opened.
To resolve this you can attempt given steps:

Go to package.json->Script :"start":"./server.js"



## API
###
Registration:
http://192.168.1.142:8800/registration
req:
     {
	
     "email":"jb@gmail.com",
      "password":"jb"

      }
res:{
      "res":"0",
       "msg":"successfully insert"
        }

###
login:
http://192.168.1.142:8800/login
req:
    {
        "email":"123@gmail.com",
        "password":"123"
    }
res:
    {
    "res": "0",
    "msg": "Login User",
    "user_id": 13
    }
    {
    "res": "1",
    "msg": "Incorreact Email or password"
    }
###
Display addressbook:
http://192.168.1.142:8800/display/:user_id

res:
    {
    "res": "0",
    "msg": [
            {
                "address_id": 3,
                "name": "jb",
                "email": "jb@gmail.com",
                "contact_number": "7788445566",
                "is_active": 0,
                "create_date": "2018-07-30T18:30:00.000Z",
                "user_id": 6,
                "is_deleted": 0,
            },
            {
                "address_id": 5,
                "name": "hello world",
                "email": "jjb@gmail.com",
                "contact_number": "9988557788",
                "is_active": 1,
                "create_date": "2018-07-30T18:30:00.000Z",
                "user_id": 6,
                "is_deleted": 0
            }
        ]
    }
###
Add Address
http://localhost:8800/addaddress/:user_id
req:
    {
	"name":"sai",
	"email":"sai@gmail.com",
	"contact_number":"7878985845",
	"active":true
    }
res:
{
    "res": "0",
    "msg": "Successfully insert",
    "": {
            "address_id": 5,
            "name": "hello world",
            "email": "jjb@gmail.com",
            "contact_number": "9988557788",
            "is_active": 1,
            "create_date": "2018-07-30T18:30:00.000Z",
            "user_id": 6,
            "is_deleted": 0
        }
}
###
Update Address
http://192.168.1.142:8800/update/:user_id/addressid/:address_id
req:
   {
	
   "name":"JJB",
	
   "email":"jjb@gmail.com",

   "contact_number":"9977884455",
	   "is_active":true

     }
res:	
     {
    "res": "0",
    "msg": "Successfully update",
    "data": [
        {
            "address_id": 55,
            "name": "JJB",
            "email": "jjb@gmail.com",
            "contact_number": "9977884455",
            "is_active": 0,
            "create_date": "2018-08-09",
            "user_id": 71,
            "is_deleted": 0
        }
    ]
    }
###
Delete Address
http://localhost:8800/delete/:user_id/address_id
res {
    {
    "res": "0",
    "msg": "successfully delete"
     }



## Support
If you've found an error in this sample, please [report an issue](https://github.com/differenz-system/AddressBook.NodeExpress). You can also send your feedback and suggestions at info@differenzsystem.com

Happy coding!