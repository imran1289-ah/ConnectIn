const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");
const Reports = require("../models/Reports");

let reportId;
let newReportId;

beforeAll(() => {
  mongoose.connect(process.env.DATABASE)
})

afterAll(async() => {

  // Delete the report from the database after running all the tests
  await Reports.findByIdAndDelete(reportId);
  // Closing the DB connection allows Jest to exit successfully.
  console.log(reportId)
  mongoose.disconnect();
  app.close();
})

describe('GET /reports', function() {
  it("successfully gets all DM reports", async() => {
    await request(app)
      .get("/reports")
      .expect(201);
  })
});

describe('POST /reports/create', () => {
  it("successfully creates a DM report", async() => {
    const response = await request(app)
      .post("/reports/create")
      .send({
        sender: "randomSender",
        receiver: "randomReceiver",
        reportedDM: "Random message",
        justification: "Spam"
      })
      .expect(201);
    reportId = response.body.id;
    console.log(reportId)
  });

  it("should not create DM report if missing fields", async() => {
    await request(app)
    .post("/reports/create")
    .send({
      sender: "randomSender",
      reportedDM: "Random message",
        justification: "Spam"
    })
    .expect(400)
  })

  console.log(reportId)
});

console.log(reportId)
describe('DELETE /delete/:reportId', () => {
  dummyReport = {
    sender: "dummySender",
    receiver: "dummyReceiver",
    reportedDM: "dummyDM",
    justification: "dummyJustification"
  }

  it("successfully deletes DM report", async() => {
    const newReport = await Reports.create(dummyReport);
    const newReportId = String(newReport._id);
    console.log(newReportId);
    await request(app)
    .delete(`/reports/delete`)
    .send({
        "id": newReportId
    })
    .expect(201)
  });
});

