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
import Biodiversity_10 from "../model/Biodiversity_10.js";
import Biodiversity_11 from "../model/Biodiversity_11.js";

const biodiversity_2_controller = createCRUDController(Biodiversity_2);
const biodiversity_3_controller = createCRUDController(Biodiversity_3);
const biodiversity_4_controller = createCRUDController(Biodiversity_4);
const biodiversity_5_controller = createCRUDController(Biodiversity_5);
const biodiversity_6_controller = createCRUDController(Biodiversity_6);
const biodiversity_7_controller = createCRUDController(Biodiversity_7);
const biodiversity_8_controller = createCRUDController(Biodiversity_8);
const biodiversity_9_controller = createCRUDController(Biodiversity_9);
const biodiversity_10_controller = createCRUDController(Biodiversity_10);
const biodiversity_11_controller = createCRUDController(Biodiversity_11);

const router = express.Router();

router.get("/biodiversity_2", biodiversity_2_controller.getAll);
router.post("/biodiversity_2", biodiversity_2_controller.create);
router.put("/biodiversity_2", biodiversity_2_controller.update);
router.delete("/biodiversity_2/:id", biodiversity_2_controller.delete);
router.post("/biodiversity_2/save-many", biodiversity_2_controller.saveMany);
router.get("/biodiversity_2/by-query", biodiversity_2_controller.getByQuery);

router.get("/biodiversity_3", biodiversity_3_controller.getAll);
router.post("/biodiversity_3", biodiversity_3_controller.create);
router.put("/biodiversity_3", biodiversity_3_controller.update);
router.delete("/biodiversity_3/:id", biodiversity_3_controller.delete);
router.post("/biodiversity_3/save-many", biodiversity_3_controller.saveMany);
router.get("/biodiversity_3/by-query", biodiversity_3_controller.getByQuery);

router.get("/biodiversity_4", biodiversity_4_controller.getAll);
router.post("/biodiversity_4", biodiversity_4_controller.create);
router.put("/biodiversity_4", biodiversity_4_controller.update);
router.delete("/biodiversity_4/:id", biodiversity_4_controller.delete);
router.post("/biodiversity_4/save-many", biodiversity_4_controller.saveMany);
router.get("/biodiversity_4/by-query", biodiversity_4_controller.getByQuery);

router.get("/biodiversity_5", biodiversity_5_controller.getAll);
router.post("/biodiversity_5", biodiversity_5_controller.create);
router.put("/biodiversity_5", biodiversity_5_controller.update);
router.delete("/biodiversity_5/:id", biodiversity_5_controller.delete);
router.post("/biodiversity_5/save-many", biodiversity_5_controller.saveMany);
router.get("/biodiversity_5/by-query", biodiversity_5_controller.getByQuery);

router.get("/biodiversity_6", biodiversity_6_controller.getAll);
router.post("/biodiversity_6", biodiversity_6_controller.create);
router.put("/biodiversity_6", biodiversity_6_controller.update);
router.delete("/biodiversity_6/:id", biodiversity_6_controller.delete);
router.post("/biodiversity_6/save-many", biodiversity_6_controller.saveMany);
router.get("/biodiversity_6/by-query", biodiversity_6_controller.getByQuery);

router.get("/biodiversity_7", biodiversity_7_controller.getAll);
router.post("/biodiversity_7", biodiversity_7_controller.create);
router.put("/biodiversity_7", biodiversity_7_controller.update);
router.delete("/biodiversity_7/:id", biodiversity_7_controller.delete);
router.post("/biodiversity_7/save-many", biodiversity_7_controller.saveMany);
router.get("/biodiversity_7/by-query", biodiversity_7_controller.getByQuery);

router.get("/biodiversity_8", biodiversity_8_controller.getAll);
router.post("/biodiversity_8", biodiversity_8_controller.create);
router.put("/biodiversity_8", biodiversity_8_controller.update);
router.delete("/biodiversity_8/:id", biodiversity_8_controller.delete);
router.post("/biodiversity_8/save-many", biodiversity_8_controller.saveMany);
router.get("/biodiversity_8/by-query", biodiversity_8_controller.getByQuery);

router.get("/biodiversity_9", biodiversity_9_controller.getAll);
router.post("/biodiversity_9", biodiversity_9_controller.create);
router.put("/biodiversity_9", biodiversity_9_controller.update);
router.delete("/biodiversity_9/:id", biodiversity_9_controller.delete);
router.post("/biodiversity_9/save-many", biodiversity_9_controller.saveMany);
router.get("/biodiversity_9/by-query", biodiversity_9_controller.getByQuery);

router.get("/biodiversity_10", biodiversity_10_controller.getAll);
router.post("/biodiversity_10", biodiversity_10_controller.create);
router.put("/biodiversity_10", biodiversity_10_controller.update);
router.delete("/biodiversity_10/:id", biodiversity_10_controller.delete);
router.post("/biodiversity_10/save-many", biodiversity_10_controller.saveMany);
router.get("/biodiversity_10/by-query", biodiversity_10_controller.getByQuery);

router.get("/biodiversity_11", biodiversity_11_controller.getAll);
router.post("/biodiversity_11", biodiversity_11_controller.create);
router.put("/biodiversity_11", biodiversity_11_controller.update);
router.delete("/biodiversity_11/:id", biodiversity_11_controller.delete);
router.post("/biodiversity_11/save-many", biodiversity_11_controller.saveMany);
router.get("/biodiversity_11/by-query", biodiversity_11_controller.getByQuery);

export default router;