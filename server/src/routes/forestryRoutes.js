import express from "express"
import { createCRUDController } from "../controller/forms/formController.js";
import Forestry_24 from "../model/Forestry_24.js";
import Forestry_1 from "../model/Forestry_1.js";
import Forestry_2 from "../model/Forestry_2.js";
import Forestry_3 from "../model/Forestry_3.js";
import Forestry_4 from "../model/Forestry_4.js";
import Forestry_5 from "../model/Forestry_5.js";
import Forestry_6 from "../model/Forestry_6.js";
import Forestry_7 from "../model/Forestry_7.js";
import Forestry_8 from "../model/Forestry_8.js";
import Forestry_9 from "../model/Forestry_9.js";
import Forestry_10 from "../model/Forestry_10.js";
import Forestry_11 from "../model/Forestry_11.js";
import Forestry_12 from "../model/Forestry_12.js";
import Forestry_13 from "../model/Forestry_13.js";
import Forestry_14 from "../model/Forestry_14.js";
import Forestry_15 from "../model/Forestry_15.js";
import Forestry_16 from "../model/Forestry_16.js";
import Forestry_17 from "../model/Forestry_17.js";
import Forestry_18 from "../model/Forestry_18.js";
import Forestry_19 from "../model/Forestry_19.js";

const forestry_1_controller = createCRUDController(Forestry_1);
const forestry_2_controller = createCRUDController(Forestry_2);
const forestry_3_controller = createCRUDController(Forestry_3);
const forestry_4_controller = createCRUDController(Forestry_4);
const forestry_5_controller = createCRUDController(Forestry_5);
const forestry_6_controller = createCRUDController(Forestry_6);
const forestry_7_controller = createCRUDController(Forestry_7);
const forestry_8_controller = createCRUDController(Forestry_8);
const forestry_9_controller = createCRUDController(Forestry_9);
const forestry_10_controller = createCRUDController(Forestry_10);
const forestry_11_controller = createCRUDController(Forestry_11);
const forestry_12_controller = createCRUDController(Forestry_12);
const forestry_13_controller = createCRUDController(Forestry_13);
const forestry_14_controller = createCRUDController(Forestry_14);
const forestry_15_controller = createCRUDController(Forestry_15);
const forestry_16_controller = createCRUDController(Forestry_16);
const forestry_17_controller = createCRUDController(Forestry_17);
const forestry_18_controller = createCRUDController(Forestry_18);
const forestry_19_controller = createCRUDController(Forestry_19);


const forestry_24_controller = createCRUDController(Forestry_24);

const router = express.Router();

router.get("/forestry_1", forestry_1_controller.getAll);
router.post("/forestry_1", forestry_1_controller.create);
router.put("/forestry_1", forestry_1_controller.update);
router.delete("/forestry_1/:id", forestry_1_controller.delete);
router.post("/forestry_1/save-many", forestry_1_controller.saveMany);
router.get("/forestry_1/by-query", forestry_1_controller.getByQuery);

router.get("/forestry_2", forestry_2_controller.getAll);
router.post("/forestry_2", forestry_2_controller.create);
router.put("/forestry_2", forestry_2_controller.update);
router.delete("/forestry_2/:id", forestry_2_controller.delete);
router.post("/forestry_2/save-many", forestry_2_controller.saveMany);
router.get("/forestry_2/by-query", forestry_2_controller.getByQuery);

router.get("/forestry_3", forestry_3_controller.getAll);
router.post("/forestry_3", forestry_3_controller.create);
router.put("/forestry_3", forestry_3_controller.update);
router.delete("/forestry_3/:id", forestry_3_controller.delete);
router.post("/forestry_3/save-many", forestry_3_controller.saveMany);
router.get("/forestry_3/by-query", forestry_3_controller.getByQuery);

router.get("/forestry_4", forestry_4_controller.getAll);
router.post("/forestry_4", forestry_4_controller.create);
router.put("/forestry_4", forestry_4_controller.update);
router.delete("/forestry_4/:id", forestry_4_controller.delete);
router.post("/forestry_4/save-many", forestry_4_controller.saveMany);
router.get("/forestry_4/by-query", forestry_4_controller.getByQuery);

router.get("/forestry_5", forestry_5_controller.getAll);
router.post("/forestry_5", forestry_5_controller.create);
router.put("/forestry_5", forestry_5_controller.update);
router.delete("/forestry_5/:id", forestry_5_controller.delete);
router.post("/forestry_5/save-many", forestry_5_controller.saveMany);
router.get("/forestry_5/by-query", forestry_5_controller.getByQuery);

router.get("/forestry_6", forestry_6_controller.getAll);
router.post("/forestry_6", forestry_6_controller.create);
router.put("/forestry_6", forestry_6_controller.update);
router.delete("/forestry_6/:id", forestry_6_controller.delete);
router.post("/forestry_6/save-many", forestry_6_controller.saveMany);
router.get("/forestry_6/by-query", forestry_6_controller.getByQuery);


router.get("/forestry_7", forestry_7_controller.getAll);
router.post("/forestry_7", forestry_7_controller.create);
router.put("/forestry_7", forestry_7_controller.update);
router.delete("/forestry_7/:id", forestry_7_controller.delete);
router.post("/forestry_7/save-many", forestry_7_controller.saveMany);
router.get("/forestry_7/by-query", forestry_7_controller.getByQuery);

router.get("/forestry_8", forestry_8_controller.getAll);
router.post("/forestry_8", forestry_8_controller.create);
router.put("/forestry_8", forestry_8_controller.update);
router.delete("/forestry_8/:id", forestry_8_controller.delete);
router.post("/forestry_8/save-many", forestry_8_controller.saveMany);
router.get("/forestry_8/by-query", forestry_8_controller.getByQuery);

router.get("/forestry_9", forestry_9_controller.getAll);
router.post("/forestry_9", forestry_9_controller.create);
router.put("/forestry_9", forestry_9_controller.update);
router.delete("/forestry_9/:id", forestry_9_controller.delete);
router.post("/forestry_9/save-many", forestry_9_controller.saveMany);
router.get("/forestry_9/by-query", forestry_9_controller.getByQuery);

router.get("/forestry_10", forestry_10_controller.getAll);
router.post("/forestry_10", forestry_10_controller.create);
router.put("/forestry_10", forestry_10_controller.update);
router.delete("/forestry_10/:id", forestry_10_controller.delete);
router.post("/forestry_10/save-many", forestry_10_controller.saveMany);
router.get("/forestry_10/by-query", forestry_10_controller.getByQuery);

router.get("/forestry_11", forestry_11_controller.getAll);
router.post("/forestry_11", forestry_11_controller.create);
router.put("/forestry_11", forestry_11_controller.update);
router.delete("/forestry_11/:id", forestry_11_controller.delete);
router.post("/forestry_11/save-many", forestry_11_controller.saveMany);
router.get("/forestry_11/by-query", forestry_11_controller.getByQuery);

router.get("/forestry_12", forestry_12_controller.getAll);
router.post("/forestry_12", forestry_12_controller.create);
router.put("/forestry_12", forestry_12_controller.update);
router.delete("/forestry_12/:id", forestry_12_controller.delete);
router.post("/forestry_12/save-many", forestry_12_controller.saveMany);
router.get("/forestry_12/by-query", forestry_12_controller.getByQuery);

router.get("/forestry_13", forestry_13_controller.getAll);
router.post("/forestry_13", forestry_13_controller.create);
router.put("/forestry_13", forestry_13_controller.update);
router.delete("/forestry_13/:id", forestry_13_controller.delete);
router.post("/forestry_13/save-many", forestry_13_controller.saveMany);
router.get("/forestry_13/by-query", forestry_13_controller.getByQuery);

router.get("/forestry_14", forestry_14_controller.getAll);
router.post("/forestry_14", forestry_14_controller.create);
router.put("/forestry_14", forestry_14_controller.update);
router.delete("/forestry_14/:id", forestry_14_controller.delete);
router.post("/forestry_14/save-many", forestry_14_controller.saveMany);
router.get("/forestry_14/by-query", forestry_14_controller.getByQuery);

router.get("/forestry_15", forestry_15_controller.getAll);
router.post("/forestry_15", forestry_15_controller.create);
router.put("/forestry_15", forestry_15_controller.update);
router.delete("/forestry_15/:id", forestry_15_controller.delete);
router.post("/forestry_15/save-many", forestry_15_controller.saveMany);
router.get("/forestry_15/by-query", forestry_15_controller.getByQuery);

router.get("/forestry_16", forestry_16_controller.getAll);
router.post("/forestry_16", forestry_16_controller.create);
router.put("/forestry_16", forestry_16_controller.update);
router.delete("/forestry_16/:id", forestry_16_controller.delete);
router.post("/forestry_16/save-many", forestry_16_controller.saveMany);
router.get("/forestry_16/by-query", forestry_16_controller.getByQuery);

router.get("/forestry_17", forestry_17_controller.getAll);
router.post("/forestry_17", forestry_17_controller.create);
router.put("/forestry_17", forestry_17_controller.update);
router.delete("/forestry_17/:id", forestry_17_controller.delete);
router.post("/forestry_17/save-many", forestry_17_controller.saveMany);
router.get("/forestry_17/by-query", forestry_17_controller.getByQuery);

router.get("/forestry_18", forestry_18_controller.getAll);
router.post("/forestry_18", forestry_18_controller.create);
router.put("/forestry_18", forestry_18_controller.update);
router.delete("/forestry_18/:id", forestry_18_controller.delete);
router.post("/forestry_18/save-many", forestry_18_controller.saveMany);
router.get("/forestry_18/by-query", forestry_18_controller.getByQuery);

router.get("/forestry_19", forestry_19_controller.getAll);
router.post("/forestry_19", forestry_19_controller.create);
router.put("/forestry_19", forestry_19_controller.update);
router.delete("/forestry_19/:id", forestry_19_controller.delete);
router.post("/forestry_19/save-many", forestry_19_controller.saveMany);
router.get("/forestry_19/by-query", forestry_19_controller.getByQuery);



router.get("/forestry_24", forestry_24_controller.getAll);
router.post("/forestry_24", forestry_24_controller.create);
router.put("/forestry_24", forestry_24_controller.update);
router.delete("/forestry_24/:id", forestry_24_controller.delete);
router.post("/forestry_24/save-many", forestry_24_controller.saveMany);
router.get("/forestry_24/by-query", forestry_24_controller.getByQuery);

export default router;