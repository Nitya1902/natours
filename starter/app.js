//npm start = noemon server.js this we had done by going to package.json
//we have not downloaded nodemon as dev dependency but it is still working as we have downloaded it globally 


const express = require('express');
const morgan= require('morgan');

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

const tourRouter=require('./routes/tourRoutes')
const userRouter=require('./routes/userRoutes')
const app= express();

//middleware

app.use(express.json());
app.use(express.static(`${__dirname}/public`))//we pass the directory from which we need to pass the static file
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





// app.get('/api/v1/tours',getALLTours);
// app.get('/api/v1/tours/:id',getTour);
// // app.post('/api/v1/tours',createTour);
// app.patch('/api/v1/tours/:id',updateTour);
// app.delete('/api/v1/tours/:id',deleteTour);



//mounting of routers
app.use('/api/v1/tours',tourRouter);
app.use('/api/v1/users',userRouter);

module.exports=app;