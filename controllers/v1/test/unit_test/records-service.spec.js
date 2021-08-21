const mockingoose = require("mockingoose");

const Record = require("../../../../models/records");
const { fetchRecords } = require("../../../../services/records");

describe("Record Service", () => {
  
  it("should return records from service", async () => {
    mockingoose(Record).toReturn([
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
    ], "aggregate");

    const records = await fetchRecords({
      "startDate": "2021-01-21",
      "endDate": "2021-04-21",
      "minCount": 3000,
      "maxCount": 4000
    });
    expect(records).toStrictEqual([
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

  it("should return error from db", async () => {
    mockingoose(Record).toReturn(
      Promise.reject(new Error("Error")),
      "aggregate"
    );
    expect(async () => fetchRecords({
      "startDate": "2021-01-21",
      "endDate": "2021-04-21",
      "minCount": 3000,
      "maxCount": 4000
    })).rejects.toThrow();
  });
});
