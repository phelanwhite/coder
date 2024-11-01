import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectMongoDB } from "./configs/connectDB.js";
import taskRouter from "./routers/task.js";
import env from "./configs/env.js";

await connectMongoDB();

const app = express();
app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`); // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port number. 12345 in this case.  // replace with your port
});
app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:5173`], // replace with your origin url. '*' for development.
  })
);
app.use(bodyParser.json());
app.use(cookieParser());

app.use(`/api/task`, taskRouter);

app.use((error, req, res, next) => {
  const status = error.status || 500;
  const message = error.message;

  return res.status(status).json({
    status: status,
    message: message,
  });
});
