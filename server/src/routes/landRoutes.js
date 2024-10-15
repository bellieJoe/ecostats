import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Land_1 from "../model/Land_1.js"
import Land_2 from "../model/Land_2.js";

const land_1_controller = createCRUDController(Land_1)
const land_2_controller = createCRUDController(Land_2)

const router = express.Router();

router.get("/land_1", land_1_controller.getAll);
router.post("/land_1", land_1_controller.create);
router.put("/land_1", land_1_controller.update);
router.delete("/land_1/:id", land_1_controller.delete);

router.get("/land_2", land_2_controller.getAll);
router.post("/land_2", land_2_controller.create);
router.put("/land_2", land_2_controller.update);
router.delete("/land_2/:id", land_2_controller.delete);

export default router;