import mongoose from "mongoose";

const TaskShema=new mongoose.Schema({
    title:{type:String,required:true,trim:true},
    description:{type:String},
    status:{type:String,enum:["done","in-progress","to-do"],default:"done"},
    priority:{type:String,enum:["high","medium","low"],default:"medium"},
},
    {
    timestamps: true
    }
)

const Task=mongoose.model("Task",TaskShema);
export default Task;