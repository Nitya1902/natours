const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const fs= require('fs');
const express = require('express');
const morgan= require('morgan');
const app= express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use((req,res,next)=>{
    console.log('hello from middleware');
    next();
});

app.use((req,res,next)=>{
    req.requestTime =new Date().toISOString();
    next();
});

// app.get('/',(req,res)=>{
//     res.status(200).json({message:'hello from server side', app:'natours'});
// });
// app.post('/',(req,res)=>{
//     res.send('you can post to this endpoint');
    
// })

//route handlers
const tours =JSON.parse(
    fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
); 
const getALLTours=(req,res)=>{
    console.log(req.requestTime)
    res.status(200).json({
        status:'success',
        results:tours.length,
        data:{
            tours
        }
    })
};

const getTour=(req,res)=>{
    console.log(req.params);
    const id=req.params.id*1 //for conversion ooof strong to int ,whrn multiplied with int automatic conversion
   

    const tour =tours.find(el=> el.id===id)//only the element whose id== params will be stored in tour
    //if tour id=23 no such tour id exist then we need to show fail and make status 404
    if(!tour){
        return res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:tour
        }
    })
};

const createTour=(req,res)=>{
    // console.log(req.body);
    const newId =tours[tours.length-1].id+1;
    const newTour =Object.assign({id:newId},req.body);
    tours.push(newTour);
    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`,JSON.stringify(tours),err=>{
        res.status(201).JSON({
            status:"success",
            data:{
                tour:newTour
            }
        })
    });
};

const updateTour=(req,res)=>{
    if(req.params.id*1>tours.lenth){
        return res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        });
    }
    res.status(200).json({
        status:'success',
        data:{
            tour:'updated tour'
        }
    })
};

const deleteTour=(req,res)=>{
    if(req.params.id*1>tours.lenth){
        return res.status(404).json({
            status:"fail",
            message:"Invalid Id"
        });
    }
    res.status(204).json({
        status:'success',
        data:null
    });
};

// app.get('/api/v1/tours',getALLTours);
// app.get('/api/v1/tours/:id',getTour);
// // app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);

app.route('/api/v1/tours')
.get(getALLTours)
.post(createTour); 

app.route('/api/v1/tours/:id')
.get(getTour)
.delete(deleteTour)
.patch(updateTour);

app.route('/api/v1/users')
.get(getAllUsers)
.post(createUsers)

//start server
const port =3000;
app.listen(port,()=>{
    console.log('app is runing');
});
 