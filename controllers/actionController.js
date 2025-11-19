const axios = require("axios");
const Action = require("../models/actionModel");
const { isValidURL, isValidMethod } = require("../utils/validator");

exports.createAction = (req, res) => {
  const { name, url, method } = req.body;

  if (!name || !url || !method) {
    return res.status(400).json({ error: "name, url, and method are required" });
  }

  if (!isValidURL(url)) {
    return res.status(400).json({ error: "Invalid or unsafe URL" });
  }

  if (!isValidMethod(method)) {
    return res.status(400).json({ error: "Invalid HTTP method" });
  }

  const id = Action.createAction({ name, url, method });
  return res.status(201).json({ message: "Action created", id });
};

exports.getActions = (req, res) => {
  return res.json(Action.getAllActions());
};

exports.executeAction = async (req, res) => {
  const { id } = req.params;

  const action = Action.getActionById(id);
  if (!action) return res.status(404).json({ error: "Action not found" });

  try {
    const response = await axios({
      method: action.method.toLowerCase(),
      url: action.url,
      timeout: 3000, 
      validateStatus: () => true 
    });

    Action.updateStatus(id, "SUCCESS");

    return res.json({
      status: "SUCCESS",
      http_status: response.status
    });

  } catch (error) {
    Action.updateStatus(id, "FAILED");
    return res.json({
      status: "FAILED",
      error: error.message
    });
  }
};

exports.patchAction = (req, res) => {
  const { id } = req.params;
  const update = req.body;

  const existing = Action.getActionById(id);
  if (!existing) return res.status(404).json({ error: "Action not found" });

  if (update.url && !isValidURL(update.url)) {
    return res.status(400).json({ error: "Invalid or unsafe URL" });
  }

  if (update.method && !isValidMethod(update.method)) {
    return res.status(400).json({ error: "Invalid HTTP method" });
  }

  Action.patchAction(id, update);
  return res.json({ message: "Action updated" });
};
