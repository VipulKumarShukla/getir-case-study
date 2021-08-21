const request = require("supertest");

const httpStatus = require("http-status");
const app = require("../../../../app");
const {
  ERROR_MSG,
} = require("../../../../utilities/error/constants");

const mockGetRecordsFromDB = jest.fn();

jest.mock("../../../../services/records.js", () => ({
  fetchRecords: () => mockGetRecordsFromDB(),
}));

jest.mock("../../../../plugins/logger.js", () => ({
  log: {
    info: () => jest.fn(),
    error: () => jest.fn(),
  },
}));

describe("get records lists unit test cases", () => {
  afterAll(async () => {
    await new Promise(resolve => setTimeout(() => resolve(), 500)); // avoid jest open handle error
  });

  test("Should Handle error internal server erorr from service", async () => {
    mockGetRecordsFromDB.mockRejectedValueOnce("Mongo Error!");
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": 3000,
        "maxCount": 4000
      });

    expect(res.statusCode).toEqual(httpStatus.INTERNAL_SERVER_ERROR);
    expect(res.body.code).toBe(500);
    expect(res.body.msg).toBe(ERROR_MSG.INTERNAL_SERVER_ERROR);
  });

  test("Should Throw Error for invalid route", async () => {
    const res = await request(app)
      .post("/getir/invalidRoute")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": 3000,
        "maxCount": 4000
      });
    expect(res.statusCode).toEqual(httpStatus.NOT_FOUND);
  });

  test("Should handle invalid request body", async () => {
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "20-06-21",
        "endDate": "2021-06-21",
        "minCount": 8000,
        "maxCount": 9000
      });
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(400);
    expect(res.body.error).toBe('"startDate" must be in YYYY-MM-DD format');
  });

  test("Should perform validations on minCount and maxCount", async () => {
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": 40000,
        "maxCount": 5000
      });
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(400);
    expect(res.body.error).toBe('"maxCount" must be greater than ref:minCount');
  });

  test("Should check if minCount or maxCount are number", async () => {
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": "6000",
        "maxCount": "5000"
      });
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(400);
    expect(res.body.error).toBe('"minCount" must be a number');
  });


  test("Should perform validations on startDate and endDate", async () => {
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-06-21",
        "endDate": "2021-04-21",
        "minCount": 3000,
        "maxCount": 4000
      }); // here startDate is Greater than endDate
    expect(res.statusCode).toEqual(httpStatus.BAD_REQUEST);
    expect(res.body.code).toBe(400);
    expect(res.body.error).toBe(
      '"endDate" must be greater than "ref:startDate"'
    );
  });

  test("Should return empty records if data does not exists", async () => {
    mockGetRecordsFromDB.mockResolvedValue();
    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": 3000,
        "maxCount": 4000
      });

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(0);
    expect(res.body.msg).toBe(ERROR_MSG.SUCCESS);
    expect(res.body.records).toStrictEqual([]);
  });

  test("Should return the records based on defined filters", async () => {
    mockGetRecordsFromDB.mockResolvedValue([
      {
        "key": "ibfRLaFT",
        "createdAt": "2015-12-30T04:51:57.295Z",
        "totalCount": 4001
      },
      {
        "key": "XCiSazeS",
        "createdAt": "2015-12-29T23:43:32.214Z",
        "totalCount": 4002
      },
      {
        "key": "XCiSazeS",
        "createdAt": "2015-12-29T23:43:32.214Z",
        "totalCount": 4003
      }
    ]);

    const res = await request(app)
      .post("/getir/v1/get-records")
      .send({
        "startDate": "2021-01-21",
        "endDate": "2021-04-21",
        "minCount": 3000,
        "maxCount": 4000
      });

    expect(res.statusCode).toEqual(httpStatus.OK);
    expect(res.body.code).toBe(0);
    expect(res.body.msg).toBe(ERROR_MSG.SUCCESS);
    expect(res.body.records).toStrictEqual([
      {
        "key": "ibfRLaFT",
        "createdAt": "2015-12-30T04:51:57.295Z",
        "totalCount": 4001
      },
      {
        "key": "XCiSazeS",
        "createdAt": "2015-12-29T23:43:32.214Z",
        "totalCount": 4002
      },
      {
        "key": "XCiSazeS",
        "createdAt": "2015-12-29T23:43:32.214Z",
        "totalCount": 4003
      }
    ]);
  });

});
