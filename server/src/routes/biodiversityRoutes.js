import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Biodiversity_2 from "../model/Biodiversity_2.js";
import Biodiversity_3 from "../model/Biodiversity_3.js";
import Biodiversity_4 from "../model/Biodiversity_4.js";
import Biodiversity_5 from "../model/Biodiversity_5.js";
import Biodiversity_6 from "../model/Biodiversity_6.js";
import Biodiversity_7 from "../model/Biodiversity_7.js";
import Biodiversity_8 from "../model/Biodiversity_8.js";
import Biodiversity_9 from "../model/Biodiversity_9.js";

const biodiversity_2_controller = createCRUDController(Biodiversity_2);
const biodiversity_3_controller = createCRUDController(Biodiversity_3);
const biodiversity_4_controller = createCRUDController(Biodiversity_4);
const biodiversity_5_controller = createCRUDController(Biodiversity_5);
const biodiversity_6_controller = createCRUDController(Biodiversity_6);
const biodiversity_7_controller = createCRUDController(Biodiversity_7);
const biodiversity_8_controller = createCRUDController(Biodiversity_8);
const biodiversity_9_controller = createCRUDController(Biodiversity_9);

const router = express.Router();

router.get("/biodiversity_2", biodiversity_2_controller.getAll);
router.post("/biodiversity_2", biodiversity_2_controller.create);
router.put("/biodiversity_2", biodiversity_2_controller.update);
router.delete("/biodiversity_2/:id", biodiversity_2_controller.delete);

router.get("/biodiversity_3", biodiversity_3_controller.getAll);
router.post("/biodiversity_3", biodiversity_3_controller.create);
router.put("/biodiversity_3", biodiversity_3_controller.update);
router.delete("/biodiversity_3/:id", biodiversity_3_controller.delete);

router.get("/biodiversity_4", biodiversity_4_controller.getAll);
router.post("/biodiversity_4", biodiversity_4_controller.create);
router.put("/biodiversity_4", biodiversity_4_controller.update);
router.delete("/biodiversity_4/:id", biodiversity_4_controller.delete);

router.get("/biodiversity_5", biodiversity_5_controller.getAll);
router.post("/biodiversity_5", biodiversity_5_controller.create);
router.put("/biodiversity_5", biodiversity_5_controller.update);
router.delete("/biodiversity_5/:id", biodiversity_5_controller.delete);

router.get("/biodiversity_6", biodiversity_6_controller.getAll);
router.post("/biodiversity_6", biodiversity_6_controller.create);
router.put("/biodiversity_6", biodiversity_6_controller.update);
router.delete("/biodiversity_6/:id", biodiversity_6_controller.delete);

router.get("/biodiversity_7", biodiversity_7_controller.getAll);
router.post("/biodiversity_7", biodiversity_7_controller.create);
router.put("/biodiversity_7", biodiversity_7_controller.update);
router.delete("/biodiversity_7/:id", biodiversity_7_controller.delete);

router.get("/biodiversity_8", biodiversity_8_controller.getAll);
router.post("/biodiversity_8", biodiversity_8_controller.create);
router.put("/biodiversity_8", biodiversity_8_controller.update);
router.delete("/biodiversity_8/:id", biodiversity_8_controller.delete);

router.get("/biodiversity_9", biodiversity_9_controller.getAll);
router.post("/biodiversity_9", biodiversity_9_controller.create);
router.put("/biodiversity_9", biodiversity_9_controller.update);
router.delete("/biodiversity_9/:id", biodiversity_9_controller.delete);

export default router;