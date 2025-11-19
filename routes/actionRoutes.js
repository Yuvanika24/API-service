const express = require("express");
const router = express.Router();
const controller = require("../controllers/actionController");

router.post("/actions", controller.createAction);

router.get("/actions", controller.getActions);

router.post("/actions/:id/execute", controller.executeAction);

router.patch("/actions/:id", controller.patchAction);

module.exports = router;
