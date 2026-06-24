const express =require('express');
const userControllers=require('./../controllers/userController')

const router=express.Router();
//ROUTERS


router
.route('/')
.get(userControllers.getAllUsers)
.post(userControllers.createUsers)

router
.route('/:id')
.get(userControllers.getUser)
.patch(userControllers.updateUser)
.delete(userControllers.deleteUser)

module.exports=router;