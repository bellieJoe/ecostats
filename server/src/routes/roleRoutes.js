import express from "express"
import { getRoleByUserId, getRoles } from "../controller/roleController.js";
const router = express.Router()

router.get('/user/:id', getRoleByUserId);

router.get('/', getRoles);

export default router;
