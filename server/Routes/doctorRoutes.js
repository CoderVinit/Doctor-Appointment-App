import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import doctorModel from '../models/doctorModels.js';

const router = express.Router();

// get single goc info
router.post("/getDoctorInfo", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ userId: req.body.userId });
    res.status(200).send({ success: true, message: "Doctor Data", data: doctor })
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, message: "Error occurs during fetching the doctor data", error })
  }
})


router.post("/updateProfile", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOneAndUpdate({ userId: req.body.userId }, req.body);
    res.status(200).send({ success: true, message: "Updated doctor data", data: doctor });
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, message: "Error occurs during updating the doctor data", error })
  }
})

// get single docInfo
router.post("/getDoctorById", authMiddleware, async (req, res) => {
  try {
    const doctor = await doctorModel.findOne({ _id: req.body.doctorId })
    res.status(200).send({ success: true, message: "Doctor details ", data: doctor })
  } catch (error) {
    console.log(error)
    res.status(400).send({ success: false, message: "error while fetching the doctor info by id", error })
  }
})




export default router;