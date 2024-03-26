import mongoose  , {Schema} from "mongoose"

const taskSchema = new Schema({
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    }
});

export const Task = mongoose.model("Task", taskSchema);