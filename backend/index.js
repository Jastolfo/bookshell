import express, { response } from "express";
import { PORT, mongoDB_URL } from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS policy
// Option 1: Allow All Origins with Default of cors(*)
app.use(cors());
// Option 2: Allow Custom Origins
// app.use(
//   cors({
//     origin: 'http://localhost:3000',
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Cntent-Type'],
//   })
// )

// Welcome page
app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome to MERN stack app');
});

// Use book routes
app.use('/books', booksRoute);

// Connect server to database
mongoose
  .connect(mongoDB_URL)
  .then(() => {
    app.listen(PORT, ()  => {
      console.log('Listening to port: ', PORT);
    });
    console.log('Connected to database');
  })
  .catch ((error) => {
    console.log(error);
  });
