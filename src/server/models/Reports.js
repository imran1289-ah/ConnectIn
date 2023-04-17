const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true,
    },
    receiver: {
        type: String,
        required: true
    },
    reportedDM: {
        type: Object,
        required: true
    },
    justification: {
        type: String,
    }
});

const Reports = mongoose.model("Reports", ReportSchema);


module.exports = Reports;