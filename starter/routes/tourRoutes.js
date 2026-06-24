const express= require('express');
const tourControllers=require('./../controllers/tourController')
//const {getALLTours,createTour,getTour,...}=require('./../controllers/tourController') then we could have used same name of the function no need to use tourcontrollers
const router=express.Router();

router.param('id',(req,res,next,val)=>{
    console.log(`tour id is:${val}`);
    next();
})

router
.route('/')
.get(tourControllers.getALLTours)
.post(tourControllers.createTour); 

router
.route('/:id')
.get(tourControllers.getTour)
.delete(tourControllers.deleteTour)
.patch(tourControllers.updateTour);

module.exports= router;