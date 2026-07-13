// Assert // Act // test 

import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import DataBase from "../../db/db.connection.js";

beforeAll(async () => {
    await DataBase.connectDB();
});

afterAll(async () => {
    await mongoose.connection.close();
});


describe("POST /api/v1/auth/login", () => {

    test("should login successfully", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "superUser770@gmail.com",
                password: ""
            });

        
            console.log(response.status);
            console.log(response.body);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty("accessToken");

        expect(response.body.data).toHaveProperty("refreshToken");

    });

});
/**
 * @RESULT
 * 2026-07-13T13:03:35.582Z: info: {"method":"POST","url":"/api/v1/auth/login","status":"200","responseTime":"118.716"}
  console.log
    200

      at Object.log (src/tests/UnitTesting/auth.test.js:33:21)

  console.log
    {
      statusCode: 200,
      data: {
        user: {
          _id: '6a267bd910b5d5e933b22eab',
          avatar: [Object],
          username: 'super user',
          role: 'admin'
        },
        accessToken:  XXXXXXXX
        refreshToken: XXXXXXXX
      },
      success: true
    }

      at Object.log (src/tests/UnitTesting/auth.test.js:34:21)

 PASS  src/tests/UnitTesting/auth.test.js
  POST /api/v1/auth/login
    √ should login successfully (152 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.216 s, estimated 7 s
Ran all test suites.

 */