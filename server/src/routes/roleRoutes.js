import express from "express"
import { getRolesByUserId, getRoles } from "../controller/roleController.js";
const router = express.Router()

router.get('/user/:id', getRolesByUserId);

router.get('/', getRoles);

export default router;
