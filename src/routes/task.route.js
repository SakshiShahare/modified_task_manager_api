
import express from "express"
import {createTask, getAllTasks , getTask , updateTask, deleteTask} from "../controllers/task.controller.js"
const router = express.Router();

router.route('/').post(createTask).get(getAllTasks);
router.route('/:taskId').get(getTask).patch(updateTask).delete(deleteTask)

export {router};

