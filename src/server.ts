import dotenv from 'dotenv';
import mongoose from 'mongoose';

import app from './app';

dotenv.config();

const DB_CONNECTION = process.env.DB_URL;
const DB_PORT = process.env.DB_PORT || 6000;

if (typeof (DB_CONNECTION) !== "undefined")
  mongoose
    .connect(DB_CONNECTION)
    .then(() =>
      app.listen(DB_PORT, () =>
        console.log(`MongoDB Server is running @ : http://localhost:${DB_PORT}`)
      )
    )
    .catch((error: any) => console.error(error as string));

app.listen(process.env.PORT || process.env.SERVER_PORT, () => console.log(`Node.js Server running on port ${process.env.SERVER_PORT}`));