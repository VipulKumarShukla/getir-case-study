require("dotenv").config();
const request = require("supertest");
const httpStatus = require("http-status");
const app = require("../../../../app");
const {
  ERROR_MSG,
} = require("../../../../utilities/error/constants");

const {
  mongoose: { url, options },
} = require("../../../../config");

const mongoose = require("../../../../plugins/mongo");

describe("Get Records Unit Tests", () => {
  beforeAll(async () => {
    await mongoose.connect(url, options);
  });

  afterAll(async () => {
    await mongoose.disconnect()
  })

  test("Should return the records depending on filters", async () => {
    const res = await request(app).post("/getir/v1/get-records").send({
      startDate: "2021-01-21",
      endDate: "2021-04-21",
      minCount: 3000,
      maxCount: 4000,
    });

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(0);
    expect(res.body.msg).toBe(ERROR_MSG.SUCCESS);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });
});
