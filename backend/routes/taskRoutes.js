import express from "express"
import { getTasks,createNewTask,getTaskById,deleteTaskById,updateTaskById } from "../controllers/taskControllers.js"

const router=express.Router()

router.get('/',getTasks);
router.post('/',createNewTask);
router.get('/:id',getTaskById);
router.patch('/:id',updateTaskById);
router.delete('/:id',deleteTaskById)

export default router;