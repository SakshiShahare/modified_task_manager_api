
import express from "express"
import {createTask, getAllTasks , getTask , updateTask, deleteTask} from "../controllers/task.controller.js"
import { verifyToken } from "../middlewares/auth.middleware.js";
const taskRouter = express.Router();
//login is required 
taskRouter.use(verifyToken);
taskRouter.route('/').post(createTask).get(getAllTasks);
taskRouter.route('/:taskId').get(getTask).patch(updateTask).delete(deleteTask)

export {taskRouter};

