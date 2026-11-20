import mongoose from "mongoose";
import Task from "../models/Task.js";


export const getTasks=async(req,res,next)=>{
        try{
            const owner=req.user.id;
            if(!owner){
                return res.status(401).json({success:false,message:"Unauthorized"})
            }
            const allTask=await Task.find({owner:owner});
            res.status(200).json({"success":true,"message":"Tasks retrieved successfully",data:allTask});
        }catch(error){
            next(error);
        }
}

export const createNewTask=async (req,res,next)=>{
    try {
        const {title,description,status,priority}=req.body;
        const owner=req.user.id
        if(!owner){
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }
        const newTask=new Task({owner,title,description,status,priority});
        
        await newTask.save()
        res.status(201).json({"success": true,"message": "Task created successfully","data": newTask});
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ success:false,message: error.message });
        }
        next(error)
        }
}

export const getTaskById=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const owner=req.user.id
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success:false,message:"Invalid task ID "})
        }
        const task=await Task.findOne({_id:id,owner:owner});
        if(!task){
            return res.status(404).json({success:false,message:"Task not found"});
        }
        res.status(200).json({"success": true,"message": "Task retrieved successfully","data":task})
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ success:false,message: error.message });
        }

        next(error)
    }
}


// ---------------------------------------------------------------

export const updateTaskById=async (req,res,next)=>{
    try{
        const {title,description,status,priority}=req.body;
        const {id}=req.params;
        const updateData={};
        const owner=req.user.id;
        if(title !== undefined ) updateData.title=title;
        if(description !== undefined) updateData.description=description;
        if(status !== undefined) updateData.status=status;
        if(priority !== undefined) updateData.priority=priority;

        if (Object.keys(updateData).length === 0) {
        return res.status(400).json({
            success:false,message: "No valid fields provided for update"
        });
        }
        
        if(!mongoose.Types.ObjectId.isValid(id)){
                return res.status(400).json({success:false,message:"Invalid task ID "})
        }
        const updatedTasks=await Task.findOneAndUpdate({_id:id,owner},updateData,{new:true,runValidators:true})
        if(!updatedTasks){
            return res.status(404).json({success:false,message:"Task not found"})
        }
        return res.status(200).json({"success": true,"message": "Task updated successfully","data": updatedTasks})
    }catch(error){
        if (error.name === "ValidationError") {
        return res.status(400).json({success:false, message: error.message });
        }
        next(error)
    }
}





// ---------------------------------------------------------------

export const deleteTaskById=async(req,res,next)=>{
    try {
        const {id}=req.params;
        const owner=req.user.id;
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(400).json({success:false,message:"Invalid ID"});
        }
        const deleteTask=await Task.findOneAndDelete({_id:id,owner});
        if(!deleteTask){
            return res.status(404).json({success:false,message:"Task not found"})
        }
        res.status(200).json({"success": true,"message": "Task deleted successfully",data: deleteTask})
        
    } catch (error) {
        if (error.name === "ValidationError") {
            return res.status(400).json({ success:false,message: error.message });
        }

        next(error)
    }    
}