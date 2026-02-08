const asyncWrapper = require("../../../pizza-react-node-mongodb/backend/middleware/async");
const Step = require("../models/step");

const getAllSteps = asyncWrapper(async (requestAnimationFrame, res) => {
  const steps = await Step.find({});
  res.status(200).json({ steps });
});

const createStep = asyncWrapper(async (req, res) => {
  console.log("createStep req ", req);
  const step = await Step.create(req.body);
  res.status(201).json({ step });
});

const getStep = asyncWrapper(async (req, res, next) => {
  const { id: stepID } = req.params;
  const step = await Step.findOne({ _id: stepID });
  if (!step) {
    return next(createCustomError(`No step with id: ${stepID}`));
  }
  res.status(200).json({ step });
});

const deleteStep = asyncWrapper(async (req, res, next) => {
  const { id: stepID } = req.params;
  const step = await Step.findOneAndDelete({ _id: stepID });
  if (!step) {
    return next(createCustomError(`No step with id: ${stepID}`));
  }
});

const updateStep = asyncWrapper(async (req, res, next) => {
  const { id: stepID } = req.params;
  const step = await Step.findOneAndUpdate({ _id: stepID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!step) {
    return next(createCustomError(`No step with id: ${stepID}`, 404));
  }
  res.status(200).json({ step });
});

module.exports = {
  getAllSteps,
  createStep,
  getStep,
  updateStep,
  deleteStep,
};
