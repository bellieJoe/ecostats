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
import Biodiversity_12 from "../model/Biodiversity_12.js";
import Biodiversity_15 from "../model/Biodiversity_15.js";
import Biodiversity_16 from "../model/Biodiversity_16.js";
import Biodiversity_17 from "../model/Biodiversity_17.js";
import Biodiversity_19 from "../model/Biodiversity_19.js";
import Biodiversity_20 from "../model/Biodiversity_20.js";
import Biodiversity_21 from "../model/Biodiversity_21.js";
import Biodiversity_22 from "../model/Biodiversity_22.js";
import Biodiversity_23 from "../model/Biodiversity_23.js";
import Biodiversity_24 from "../model/Biodiversity_24.js";
import Biodiversity_25 from "../model/Biodiversity_25.js";
import Biodiversity_26 from "../model/Biodiversity_26.js";
import Biodiversity_27 from "../model/Biodiversity_27.js";
import Biodiversity_28 from "../model/Biodiversity_28.js";
import Biodiversity_29 from "../model/Biodiversity_29.js";
import Biodiversity_30 from "../model/Biodiversity_30.js";
import Biodiversity_31 from "../model/Biodiversity_31.js";
import Biodiversity_32 from "../model/Biodiversity_32.js";
import Biodiversity_33 from "../model/Biodiversity_33.js";

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
const biodiversity_12_controller = createCRUDController(Biodiversity_12);

const biodiversity_15_controller = createCRUDController(Biodiversity_15);
const biodiversity_16_controller = createCRUDController(Biodiversity_16);
const biodiversity_17_controller = createCRUDController(Biodiversity_17);

const biodiversity_19_controller = createCRUDController(Biodiversity_19);
const biodiversity_20_controller = createCRUDController(Biodiversity_20);
const biodiversity_21_controller = createCRUDController(Biodiversity_21);
const biodiversity_22_controller = createCRUDController(Biodiversity_22);
const biodiversity_23_controller = createCRUDController(Biodiversity_23);
const biodiversity_24_controller = createCRUDController(Biodiversity_24);
const biodiversity_25_controller = createCRUDController(Biodiversity_25);
const biodiversity_26_controller = createCRUDController(Biodiversity_26);
const biodiversity_27_controller = createCRUDController(Biodiversity_27);
const biodiversity_28_controller = createCRUDController(Biodiversity_28);
const biodiversity_29_controller = createCRUDController(Biodiversity_29);
const biodiversity_30_controller = createCRUDController(Biodiversity_30);
const biodiversity_31_controller = createCRUDController(Biodiversity_31);
const biodiversity_32_controller = createCRUDController(Biodiversity_32);
const biodiversity_33_controller = createCRUDController(Biodiversity_33);

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

router.get("/biodiversity_12", biodiversity_12_controller.getAll);
router.post("/biodiversity_12", biodiversity_12_controller.create);
router.put("/biodiversity_12", biodiversity_12_controller.update);
router.delete("/biodiversity_12/:id", biodiversity_12_controller.delete);
router.post("/biodiversity_12/save-many", biodiversity_12_controller.saveMany);
router.get("/biodiversity_12/by-query", biodiversity_12_controller.getByQuery);

router.get("/biodiversity_15", biodiversity_15_controller.getAll);
router.post("/biodiversity_15", biodiversity_15_controller.create);
router.put("/biodiversity_15", biodiversity_15_controller.update);
router.delete("/biodiversity_15/:id", biodiversity_15_controller.delete);
router.post("/biodiversity_15/save-many", biodiversity_15_controller.saveMany);
router.get("/biodiversity_15/by-query", biodiversity_15_controller.getByQuery);

router.get("/biodiversity_16", biodiversity_16_controller.getAll);
router.post("/biodiversity_16", biodiversity_16_controller.create);
router.put("/biodiversity_16", biodiversity_16_controller.update);
router.delete("/biodiversity_16/:id", biodiversity_16_controller.delete);
router.post("/biodiversity_16/save-many", biodiversity_16_controller.saveMany);
router.get("/biodiversity_16/by-query", biodiversity_16_controller.getByQuery);

router.get("/biodiversity_17", biodiversity_17_controller.getAll);
router.post("/biodiversity_17", biodiversity_17_controller.create);
router.put("/biodiversity_17", biodiversity_17_controller.update);
router.delete("/biodiversity_17/:id", biodiversity_17_controller.delete);
router.post("/biodiversity_17/save-many", biodiversity_17_controller.saveMany);
router.get("/biodiversity_17/by-query", biodiversity_17_controller.getByQuery);

router.get("/biodiversity_19", biodiversity_19_controller.getAll);
router.post("/biodiversity_19", biodiversity_19_controller.create);
router.put("/biodiversity_19", biodiversity_19_controller.update);
router.delete("/biodiversity_19/:id", biodiversity_19_controller.delete);
router.post("/biodiversity_19/save-many", biodiversity_19_controller.saveMany);
router.get("/biodiversity_19/by-query", biodiversity_19_controller.getByQuery);

router.get("/biodiversity_20", biodiversity_20_controller.getAll);
router.post("/biodiversity_20", biodiversity_20_controller.create);
router.put("/biodiversity_20", biodiversity_20_controller.update);
router.delete("/biodiversity_20/:id", biodiversity_20_controller.delete);
router.post("/biodiversity_20/save-many", biodiversity_20_controller.saveMany);
router.get("/biodiversity_20/by-query", biodiversity_20_controller.getByQuery);

router.get("/biodiversity_21", biodiversity_21_controller.getAll);
router.post("/biodiversity_21", biodiversity_21_controller.create);
router.put("/biodiversity_21", biodiversity_21_controller.update);
router.delete("/biodiversity_21/:id", biodiversity_21_controller.delete);
router.post("/biodiversity_21/save-many", biodiversity_21_controller.saveMany);
router.get("/biodiversity_21/by-query", biodiversity_21_controller.getByQuery);

router.get("/biodiversity_22", biodiversity_22_controller.getAll);
router.post("/biodiversity_22", biodiversity_22_controller.create);
router.put("/biodiversity_22", biodiversity_22_controller.update);
router.delete("/biodiversity_22/:id", biodiversity_22_controller.delete);
router.post("/biodiversity_22/save-many", biodiversity_22_controller.saveMany);
router.get("/biodiversity_22/by-query", biodiversity_22_controller.getByQuery);

router.get("/biodiversity_23", biodiversity_23_controller.getAll);
router.post("/biodiversity_23", biodiversity_23_controller.create);
router.put("/biodiversity_23", biodiversity_23_controller.update);
router.delete("/biodiversity_23/:id", biodiversity_23_controller.delete);
router.post("/biodiversity_23/save-many", biodiversity_23_controller.saveMany);
router.get("/biodiversity_23/by-query", biodiversity_23_controller.getByQuery);

router.get("/biodiversity_24", biodiversity_24_controller.getAll);
router.post("/biodiversity_24", biodiversity_24_controller.create);
router.put("/biodiversity_24", biodiversity_24_controller.update);
router.delete("/biodiversity_24/:id", biodiversity_24_controller.delete);
router.post("/biodiversity_24/save-many", biodiversity_24_controller.saveMany);
router.get("/biodiversity_24/by-query", biodiversity_24_controller.getByQuery);

router.get("/biodiversity_25", biodiversity_25_controller.getAll);
router.post("/biodiversity_25", biodiversity_25_controller.create);
router.put("/biodiversity_25", biodiversity_25_controller.update);
router.delete("/biodiversity_25/:id", biodiversity_25_controller.delete);
router.post("/biodiversity_25/save-many", biodiversity_25_controller.saveMany);
router.get("/biodiversity_25/by-query", biodiversity_25_controller.getByQuery);

router.get("/biodiversity_26", biodiversity_26_controller.getAll);
router.post("/biodiversity_26", biodiversity_26_controller.create);
router.put("/biodiversity_26", biodiversity_26_controller.update);
router.delete("/biodiversity_26/:id", biodiversity_26_controller.delete);
router.post("/biodiversity_26/save-many", biodiversity_26_controller.saveMany);
router.get("/biodiversity_26/by-query", biodiversity_26_controller.getByQuery);

router.get("/biodiversity_27", biodiversity_27_controller.getAll);
router.post("/biodiversity_27", biodiversity_27_controller.create);
router.put("/biodiversity_27", biodiversity_27_controller.update);
router.delete("/biodiversity_27/:id", biodiversity_27_controller.delete);
router.post("/biodiversity_27/save-many", biodiversity_27_controller.saveMany);
router.get("/biodiversity_27/by-query", biodiversity_27_controller.getByQuery);

router.get("/biodiversity_28", biodiversity_28_controller.getAll);
router.post("/biodiversity_28", biodiversity_28_controller.create);
router.put("/biodiversity_28", biodiversity_28_controller.update);
router.delete("/biodiversity_28/:id", biodiversity_28_controller.delete);
router.post("/biodiversity_28/save-many", biodiversity_28_controller.saveMany);
router.get("/biodiversity_28/by-query", biodiversity_28_controller.getByQuery);

router.get("/biodiversity_29", biodiversity_29_controller.getAll);
router.post("/biodiversity_29", biodiversity_29_controller.create);
router.put("/biodiversity_29", biodiversity_29_controller.update);
router.delete("/biodiversity_29/:id", biodiversity_29_controller.delete);
router.post("/biodiversity_29/save-many", biodiversity_29_controller.saveMany);
router.get("/biodiversity_29/by-query", biodiversity_29_controller.getByQuery);

router.get("/biodiversity_30", biodiversity_30_controller.getAll);
router.post("/biodiversity_30", biodiversity_30_controller.create);
router.put("/biodiversity_30", biodiversity_30_controller.update);
router.delete("/biodiversity_30/:id", biodiversity_30_controller.delete);
router.post("/biodiversity_30/save-many", biodiversity_30_controller.saveMany);
router.get("/biodiversity_30/by-query", biodiversity_30_controller.getByQuery);

router.get("/biodiversity_31", biodiversity_31_controller.getAll);
router.post("/biodiversity_31", biodiversity_31_controller.create);
router.put("/biodiversity_31", biodiversity_31_controller.update);
router.delete("/biodiversity_31/:id", biodiversity_31_controller.delete);
router.post("/biodiversity_31/save-many", biodiversity_31_controller.saveMany);
router.get("/biodiversity_31/by-query", biodiversity_31_controller.getByQuery);

router.get("/biodiversity_32", biodiversity_32_controller.getAll);
router.post("/biodiversity_32", biodiversity_32_controller.create);
router.put("/biodiversity_32", biodiversity_32_controller.update);
router.delete("/biodiversity_32/:id", biodiversity_32_controller.delete);
router.post("/biodiversity_32/save-many", biodiversity_32_controller.saveMany);
router.get("/biodiversity_32/by-query", biodiversity_32_controller.getByQuery);

router.get("/biodiversity_33", biodiversity_33_controller.getAll);
router.post("/biodiversity_33", biodiversity_33_controller.create);
router.put("/biodiversity_33", biodiversity_33_controller.update);
router.delete("/biodiversity_33/:id", biodiversity_33_controller.delete);
router.post("/biodiversity_33/save-many", biodiversity_33_controller.saveMany);
router.get("/biodiversity_33/by-query", biodiversity_33_controller.getByQuery);

export default router;