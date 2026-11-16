import mongoose from "mongoose";

const TaskShema=new mongoose.Schema({
    title:{type:String,required:true,trim:true,minlength:3,maxlength:100},
    description:{type:String,maxlength:500},
    status:{type:String,enum:["done","in-progress","to-do"],default:"to-do"},
    priority:{type:String,enum:["high","medium","low"],default:"medium"},
},
    {
    timestamps: true
    }
)

const Task=mongoose.model("Task",TaskShema);
export default Task;