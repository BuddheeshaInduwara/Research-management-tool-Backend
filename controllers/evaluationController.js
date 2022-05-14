const Evaluation = require('../models/Evaluation')
const MarkScheme = require('../models/markScheme')
const { StatusCodes } = require('http-status-codes')
// const CustomError = require('../errors')

//! CREATE EVALUATION CONTROLLER
const createEvaluation = async (req, res) => {
  const { groupId, evaluationType, schema, totalMark, evaluateBy } = req.body
  let evaluation = await Evaluation.findOne({ groupId, evaluationType })

  if (evaluation) {
    evaluation.schema = schema
    evaluation.totalMark = totalMark
    evaluation.evaluateBy = evaluateBy

    await evaluation.save()
  } else {
    evaluation = await Evaluation.create(req.body)
  }

  res.status(StatusCodes.CREATED).json({ ...evaluation })
}

//! GET EVALUATION CONTROLLER
const getEvaluation = async (req, res) => {
  const { id: groupId, evaluationType } = req.params

  let evaluation = await Evaluation.findOne({ groupId, evaluationType })
  if (!evaluation) {
    evaluation = await MarkScheme.findOne({ evaluationType })
  }
  res.status(StatusCodes.OK).json({ ...evaluation })
}

module.exports = {
  createEvaluation,
  getEvaluation,
}
