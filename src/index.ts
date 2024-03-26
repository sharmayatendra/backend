import * as dotenv from "dotenv";

import { app } from "./app";
import { connectDB } from "./db/index";

dotenv.config();

connectDB()
  .then(() =>
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.PORT}`);
    })
  )
  .catch((err) => console.log("❌❌❌MONGODB connection failed: ", err));

// routes import

import userRouter from "./routes/user.routes";

// routes declaration
app.use("/api/v1/users", userRouter);
