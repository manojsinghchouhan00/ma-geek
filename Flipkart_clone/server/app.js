import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import route from './routes/route.js';
import paymentRoute from './controller/payment.js';

const app = express();

const Port=5500;
const hostName='localhost';
const corsOption={
    origin: 'http://localhost:3000',
    methods:"GET, POST, PUT, DELETE, PATCH",
    credentials: true,
    optionSuccessStatus: 200,
    allowedHeaders: "X-Requested-With,content-type, x-token, Access-Control-Allow-Credentials"
}

dotenv.config();
app.use(express.json());
app.use(cors(corsOption));
app.options("*",cors());
// app.use(bodyParser.json({extended:true}));
// app.use(bodyParser.urlencoded({extended:true}));

app.use("/",route);
app.use('/api/payment',paymentRoute);

const username=process.env.DB_USERNAME;
const password= process.env.DB_PASSWORD;

const URL=`mongodb+srv://${username}:${password}@cluster0.t4dlhjh.mongodb.net/Flipkart_clone?retryWrites=true&w=majority&appName=Cluster0`;

try{
    mongoose.connect(URL,{
        useUnifiedTopology: true, 
        useNewUrlParser: true
    })
    console.log('Database Connected Succesfully');

}
catch(error){
    console.log('Database connection Error: ', error);
}

app.listen(Port,hostName,()=>{
    console.log(`server is running on ${hostName} ${Port}`);
})