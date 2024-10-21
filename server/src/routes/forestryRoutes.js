import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Forestry_24 from "../model/Forestry_24.js";
import Forestry_1 from "../model/Forestry_1.js";
import Forestry_2 from "../model/Forestry_2.js";
import Forestry_3 from "../model/Forestry_3.js";
import Forestry_4 from "../model/Forestry_4.js";
import Forestry_5 from "../model/Forestry_5.js";

const forestry_1_controller = createCRUDController(Forestry_1);
const forestry_2_controller = createCRUDController(Forestry_2);
const forestry_3_controller = createCRUDController(Forestry_3);
const forestry_4_controller = createCRUDController(Forestry_4);
const forestry_5_controller = createCRUDController(Forestry_5);

const forestry_24_controller = createCRUDController(Forestry_24);

const router = express.Router();

router.get("/forestry_1", forestry_1_controller.getAll);
router.post("/forestry_1", forestry_1_controller.create);
router.put("/forestry_1", forestry_1_controller.update);
router.delete("/forestry_1/:id", forestry_1_controller.delete);
router.post("/forestry_1/save-many", forestry_1_controller.saveMany);

router.get("/forestry_2", forestry_2_controller.getAll);
router.post("/forestry_2", forestry_2_controller.create);
router.put("/forestry_2", forestry_2_controller.update);
router.delete("/forestry_2/:id", forestry_2_controller.delete);
router.post("/forestry_2/save-many", forestry_2_controller.saveMany);

router.get("/forestry_3", forestry_3_controller.getAll);
router.post("/forestry_3", forestry_3_controller.create);
router.put("/forestry_3", forestry_3_controller.update);
router.delete("/forestry_3/:id", forestry_3_controller.delete);
router.post("/forestry_3/save-many", forestry_3_controller.saveMany);

router.get("/forestry_4", forestry_4_controller.getAll);
router.post("/forestry_4", forestry_4_controller.create);
router.put("/forestry_4", forestry_4_controller.update);
router.delete("/forestry_4/:id", forestry_4_controller.delete);
router.post("/forestry_4/save-many", forestry_4_controller.saveMany);

router.get("/forestry_5", forestry_5_controller.getAll);
router.post("/forestry_5", forestry_5_controller.create);
router.put("/forestry_5", forestry_5_controller.update);
router.delete("/forestry_5/:id", forestry_5_controller.delete);
router.post("/forestry_5/save-many", forestry_5_controller.saveMany);



router.get("/forestry_24", forestry_24_controller.getAll);
router.post("/forestry_24", forestry_24_controller.create);
router.put("/forestry_24", forestry_24_controller.update);
router.delete("/forestry_24/:id", forestry_24_controller.delete);
router.post("/forestry_24/save-many", forestry_24_controller.saveMany);

export default router;