//*******hum jo bhi data bhejte hain frontend se back end main vo request ki body k andar pra hot hai *//////
const express=require("express");
const cookieParser=require('cookie-parser');
// const cors = require('cors')

const app =express();
//express.json is a middleware which converts data from frontend to json format

app.use(express.json());
app.listen(3000);
app.use(cookieParser());

// const corsOptions = {
//     credentials: 'include'
// }

// app.use(cors(corsOptions))
const userRouter=require('./router/userRouter');
const authRouter=require('./router/authRouter');
const planRouter=require('./router/planRouter');
const reviewRouter=require('./router/reviewRouter');
const bookingRouter=require('./router/bookingRouter')
//base router ,router to use
app.use('/api/users',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/plans',planRouter);
app.use('/api/review',reviewRouter);
app.use('/api/booking',bookingRouter);
const planModel=require('./.vscode/models/planModel');