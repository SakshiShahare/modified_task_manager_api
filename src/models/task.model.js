import mongoose  , {Schema} from "mongoose"

const taskSchema = new Schema({
    description : {
        type : String,
        required : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    owner : {
        type : Schema.Types.ObjectId,
        ref : "User"
    }
});

export const Task = mongoose.model("Task", taskSchema);