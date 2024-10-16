import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Forestry_24 from "../model/Forestry_24.js";
import Forestry_1 from "../model/Forestry_1.js";
import Forestry_2 from "../model/Forestry_2.js";

const forestry_1_controller = createCRUDController(Forestry_1);
const forestry_2_controller = createCRUDController(Forestry_2);

const forestry_24_controller = createCRUDController(Forestry_24);

const router = express.Router();

router.get("/forestry_1", forestry_1_controller.getAll);
router.post("/forestry_1", forestry_1_controller.create);
router.put("/forestry_1", forestry_1_controller.update);
router.delete("/forestry_1/:id", forestry_1_controller.delete);

router.get("/forestry_2", forestry_2_controller.getAll);
router.post("/forestry_2", forestry_2_controller.create);
router.put("/forestry_2", forestry_2_controller.update);
router.delete("/forestry_2/:id", forestry_2_controller.delete);

router.get("/forestry_24", forestry_24_controller.getAll);
router.post("/forestry_24", forestry_24_controller.create);
router.put("/forestry_24", forestry_24_controller.update);
router.delete("/forestry_24/:id", forestry_24_controller.delete);

export default router;