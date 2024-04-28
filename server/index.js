import express from "express";
import monggose from "mongoose";
import cors from "cors";
import 'dotenv/config';
import feedbackRoutes from './routes/feedbackRoutes.js';
const PORT = process.env.PORT || 3500;

const app = express();
app.use(cors());
app.use(express.json());

app.use('/feedbacks',feedbackRoutes);

const mongoDBUrl = process.env.MONGODB_URL;

monggose.connect(mongoDBUrl, {})
    .then(() => {
        console.log("App connected to the database");

        app.listen(PORT, () => {
            console.log(`App is listening to port : ${PORT}`);
        })
    })
    .catch(err => console.log(err))
