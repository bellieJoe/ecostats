import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Land_1 from "../model/Land_1.js"
import Land_2 from "../model/Land_2.js";
import Land_3 from "../model/Land_3.js";
import Land_4 from "../model/Land_4.js";
import Land_6 from "../model/Land_6.js";
import Land_5 from "../model/Land_5.js";
import Land_7 from "../model/Land_7.js";

const land_1_controller = createCRUDController(Land_1);
const land_2_controller = createCRUDController(Land_2);
const land_3_controller = createCRUDController(Land_3);
const land_4_controller = createCRUDController(Land_4);
const land_5_controller = createCRUDController(Land_5);
const land_6_controller = createCRUDController(Land_6);
const land_7_controller = createCRUDController(Land_7);

const router = express.Router();

router.get("/land_1", land_1_controller.getAll);
router.post("/land_1", land_1_controller.create);
router.put("/land_1", land_1_controller.update);
router.delete("/land_1/:id", land_1_controller.delete);
router.post("/land_1/save-many", land_1_controller.saveMany);
router.get("/land_1/by-query", land_1_controller.getByQuery);

router.get("/land_2", land_2_controller.getAll);
router.post("/land_2", land_2_controller.create);
router.put("/land_2", land_2_controller.update);
router.delete("/land_2/:id", land_2_controller.delete);
router.post("/land_2/save-many", land_2_controller.saveMany);
router.get("/land_2/by-query", land_2_controller.getByQuery);

router.get("/land_3", land_3_controller.getAll);
router.post("/land_3", land_3_controller.create);
router.put("/land_3", land_3_controller.update);
router.delete("/land_3/:id", land_3_controller.delete);
router.post("/land_3/save-many", land_3_controller.saveMany);
router.get("/land_3/by-query", land_3_controller.getByQuery);

router.get("/land_4", land_4_controller.getAll);
router.post("/land_4", land_4_controller.create);
router.put("/land_4", land_4_controller.update);
router.delete("/land_4/:id", land_4_controller.delete);
router.post("/land_4/save-many", land_4_controller.saveMany);
router.get("/land_4/by-query", land_4_controller.getByQuery);

router.get("/land_5", land_5_controller.getAll);
router.post("/land_5", land_5_controller.create);
router.put("/land_5", land_5_controller.update);
router.delete("/land_5/:id", land_5_controller.delete);
router.post("/land_5/save-many", land_5_controller.saveMany);
router.get("/land_2/by-query", land_2_controller.getByQuery);

router.get("/land_6", land_6_controller.getAll);
router.post("/land_6", land_6_controller.create);
router.put("/land_6", land_6_controller.update);
router.delete("/land_6/:id", land_6_controller.delete);
router.post("/land_6/save-many", land_6_controller.saveMany);
router.get("/land_6/by-query", land_6_controller.getByQuery);

router.get("/land_7", land_7_controller.getAll);
router.post("/land_7", land_7_controller.create);
router.put("/land_7", land_7_controller.update);
router.delete("/land_7/:id", land_7_controller.delete);
router.post("/land_7/save-many", land_7_controller.saveMany);
router.get("/land_7/by-query", land_7_controller.getByQuery);

export default router;