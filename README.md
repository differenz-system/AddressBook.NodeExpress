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
http://localhost:8800/registration

**Request:**
```
     {
	
        "email":"user.admin@gmail.com",
        "password":"12345"

     }
 ```
**Response:**
```
	{
        "res": "1",
        "msg": "This email is already exists "
    }
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
```

###
login:
http://localhost:8800/login

**Request:**
```
    {
         "email":"user.admin@gmail.com",
         "password":"12345"
    }
```
**Response:**
```
    {
        "res": "0",
        "msg": "Login User",
        "user_id": 16
    }
    {
        "res": "1",
        "msg": "Enter proper email and password"
    }
```
###
Display addressbook:
http://localhost:8800/getAddressBookByID/:user_id

**Response:**
```
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
```
###
Add Address
http://localhost:8800/createAddressBook

**Request:**
```
    {
    "name":"abc",
    "email":"abc.abc@gmail.com",
    "contact_number":"8956231245",
    "is_active":"true",
    "user_id":"6"
   }
```
**Response:**
```
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
```
###
Update Address
http://localhost:8800/updateAddressBook/:userid/:addressid

**Request:**
```
    {
    "name":"abc patel",
    "email":"abc.patel@gmail.com",
    "contact_number":"6548785231",
    "is_active":"true"
   }  
```
**Response:**
```	
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
```
###
Delete Address
http://localhost:8800/removeAddressBook/:userid/:addressid
**Response:**
 ```
    {
        "res": "0",
        "msg": "successfully delete"
    }
```


## Support
If you've found an error in this sample, please [report an issue](https://github.com/differenz-system/AddressBook.NodeExpress). You can also send your feedback and suggestions at info@differenzsystem.com

Happy coding!
