import express from "express"
import { getTasks,createNewTask,getTaskById,deleteTaskById,updateTaskById } from "../controllers/taskControllers.js"
import { protectRoute } from "../middleware/protectRoute.js";   


const router=express.Router()

router.use(protectRoute);
router.get('/',getTasks);
router.post('/',createNewTask);
router.get('/:id',getTaskById);
router.patch('/:id',updateTaskById);
router.delete('/:id',deleteTaskById)

export default router;