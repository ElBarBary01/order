import express from "express";
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv'; 
import orders from "./routes/orders.js";

const app = express();
dotenv.config();

app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());

app.use('/api/order', orders)

const PORT = process.env.PORT || 5001;

const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const handleServerStartup = () => {
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
}

await mongoose.connect(process.env.CONNECTION_URL, mongooseOptions, handleServerStartup)
