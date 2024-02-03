const dotenv = require("dotenv").config();

import { connectDB } from "./db/index";

// dotenv.config({
//   path: "./env",
// });

connectDB();

// console.log("From index.ts file!!!");
