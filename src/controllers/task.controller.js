//get all the task
//get a task
//create a task
//update a task
//delete a task
import {Task} from "../models/task.model.js"
import asyncHandler from "../utils/asyncHandler.js"
import ApiError from "../utils/ApiError.js"
import ApiResponse from "../utils/ApiResponse.js"


const getAllTasks = asyncHandler(async(req ,res)=>{

const tasks  = await Task.find({owner : req.user._id});

if(!tasks) throw new ApiError(404 , "No tasks found");

res.status(200).json(new ApiResponse(200 , "tasks fetched successfully", tasks));
});


const getTask = asyncHandler(async (req , res)=>{
    const {taskId} = req.params;
    const {userId} = req.user._id;

    if(!taskId) throw new ApiError(400 , "Please provide task id")

    const task = await Task.find({$and : [{owner : userId}, {_id : taskId}]});

    if(!task) throw new ApiError(404 , "No task found ");

    res.status(200).json(new ApiResponse(200 , "Task fetched successfully", task));
})

const createTask  = asyncHandler(async ( req, res)=>{
    const {description} = req.body;

    if(!description) throw new ApiError(400 , "Please provide description")

    const task = await Task.create({description , owner : req.user._id});

    if(!task) throw new ApiError(500 , "Unable to create task");

    res.status(201).json(new ApiResponse(201, "task created successfully", task));
})

const updateTask = asyncHandler(async (req, res)=>{
    const {taskId} = req.params;
    const {description } = req.body;

    if(!description) throw new ApiError(400 , "Please provide description")

    const task = await Task.findOneAndUpdate({$and : [{owner : req.user._id}, {_id : taskId}]} , {$set : {description} } , {new : true});

    if(!task) throw new ApiError(500 , "Unable to update the task")

    res.status(200).json(new ApiResponse(200 , "Task updated", task));
})

const deleteTask = asyncHandler(async(req, res)=>{
    const {taskId} = req.params;

    if(!taskId) throw new ApiError(400 , "Please provide task id");

    await Task.findOneAndDelete({$and : [{_id : taskId},{owner : req.user._id}]});

    res.status(200).json(new ApiResponse(200 , "Task deleted"));
})



export {createTask , getAllTasks , getTask , updateTask , deleteTask}