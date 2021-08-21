# getir-casestudy

## Server :

- host: https://getir-case-study-vipul.herokuapp.com

## Database :

- Database - `getir-case-study`
- Uri - `mongodb+srv://challengeUser:WUMglwNBaydH8Yvu@challenge-xzwqd.mongodb.net/getir-case-study?retryWrites=true`
- Collection - `records`

## COMMANDS :

- Start - `npm start`
- Test - `npm test`

## API

- POST `https://getir-case-study-vipul.herokuapp.com/getir/v1/get-records`

  Payload Below:

  ```
  {
  "startDate": "2016-01-26",
  "endDate": "2018-02-02",
  "minCount": 2700,
  "maxCount": 3000
  }
  ```

## Input Validation - Joi

- we have used Joi library to validate the given input as middleware

## Data Exchange Format -

- consumes = application/json
- produces = application/json

## SUGGESTIONS -

- We can use redis to cache data for sometime if payload is same for request, it will help in performance optimisation
- We can use swagger for the API Documentation

### API TEST COVERAGE

- We have used JEST to test our api and written few test cases.
- you can find test cases at- controller/v1/test

## Error Codes

| Error Code  | Explanation  |
| ------------- | -----------
| 0  | Success |
| 400  | Validation Error | 
| 500  | Internal Server Error | 
| 404 | Not Found |

### RUN LOCALLY

- `git clone https://github.com/VipulKumarShukla/getir-case-study.git`
- `npm start`
- use domain as `localhost:3000` to run api
