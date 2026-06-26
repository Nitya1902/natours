const fs= require('fs');

const tours =JSON.parse(
    fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
); 

exports.checkID=(req,res,next,val)=>{
    //if tour id=23 no such tour id exist then we need to show fail and make status 404
    //this return statement is important so that the function return this response and stop and never call next otherwise there will be multiple responses
    console.log(`tour id is${val}`);
    if(req.params.id*1>tours.length){
        return res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        });
    }
    next();
}
exports.checkBody=(req,res,next)=>{
    if(!req.body.name||!req.body.price){
        return res.status(400).json({
            status:'fail',
            message:'bad request'
        })
    }
    next();
}

exports.getALLTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })
};

exports.getTour=(req,res)=>{
    console.log(req.params);
    const id=req.params.id*1 //for conversion ooof strong to int ,whrn multiplied with int automatic conversion
   

    const tour =tours.find(el=> el.id===id)//only the element whose id== params will be stored in tour
    
    res.status(200).json({
        status:'success',
        data:{
            tour:tour
        }
    })
};

exports.createTour=(req,res)=>{
    // console.log(req.body);
    const newId =tours[tours.length-1].id+1;
    const newTour =Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).json({
            status:"success",
            data:{
                tour:newTour
            }
        })
    });
};

exports.updateTour=(req,res)=>{
   
    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour'
        }
    })
};

exports.deleteTour=(req,res)=>{
    
    res.status(204).json({
        status:'success',
        data:null
    });
};
