import express from "express"
import cors from "cors"
import {taskRouter} from "./routes/task.route.js"
import cookieParser from "cookie-parser";
import {userRouter} from "./routes/user.route.js"


const app = express();

//to make specific frontend talk to the backend
app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

//to parse json data
app.use(express.json({limit : "16kb"}))

//to parse url data
app.use(express.urlencoded({extended : true , limit : "16kb"}))

//to use static assests 
app.use(express.static("public"))

//to parse the cookies
app.use(cookieParser())

//import router
app.use('/api/v1/users', userRouter);
 app.use('/api/v1/users/tasks' , taskRouter);


export default app;