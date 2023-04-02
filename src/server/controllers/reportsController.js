const Reports = require('../models/Reports');

const createReport = async (req, res) => {
  try {
    const {sender, receiver, reportedDM, justification} = req.body;
    const report = {sender, receiver, reportedDM, justification};
    const newReport = await Reports.create(report);
    res.status(201).json({message:`Report successfully created: ${newReport}`, id: newReport._id});
  }
  catch (err) {
    res.status(400).json("Error creating Report");
  }  
}

const getReports = async (req, res) => {
  try {
    const allReports = await Reports.find();
    res.status(201).json(allReports);
  }
  catch (err) {
    res.status(400).json("Error retrieving all reports")
  }  
}

const deleteReport = async (req, res) => {
  try {
    const { id } = req.body;
    console.log("Report ID is equal to: " + id);
    const report = await Reports.findByIdAndDelete(id);
    res.status(201).json(`Successfully deleted report: ${report}`)
  }
  catch (err) {
    res.status(400).json("Error deleting report")
  }
}
module.exports = {
  createReport,
  getReports,
  deleteReport
}