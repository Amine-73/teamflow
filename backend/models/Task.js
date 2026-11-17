import mongoose from "mongoose";

const TaskSchema=new mongoose.Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"user"
    },
    title:{type:String,required:true,trim:true,minlength:3,maxlength:100},
    description:{type:String,maxlength:500},
    status:{type:String,enum:["done","in-progress","to-do"],default:"to-do"},
    priority:{type:String,enum:["high","medium","low"],default:"medium"},
},
    {
    timestamps: true
    }
)

const Task=mongoose.model("Task",TaskSchema);
export default Task;