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

/**LOGIN TEST
 describe("POST /api/v1/auth/login", () => {

    test("should login successfully", async () => {

        const response = await request(app)
            .post("/api/v1/auth/login")
            .send({
                email: "superUser770@gmail.com",
                password: "029super9901"
            });

        
            console.log(response.status);
            console.log(response.body);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);

        expect(response.body.data).toHaveProperty("accessToken");

        expect(response.body.data).toHaveProperty("refreshToken");

    });

});
*/


/**LOGIN_TEST_RESULT
 * @LOGINRESULT
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




/**LOGOUT USER 
describe("POST /api/v1/auth/logout" , () => {
    test("Should logout Successfully" , async () => {
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2YTI2N2JkOTEwYjVkNWU5MzNiMjJlYWIiLCJlbWFpbCI6InN1cGVydXNlcjc3MEBnbWFpbC5jb20iLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3ODM5NDkzMTgsImV4cCI6MTc4Mzk1MDIxOH0.fvIJUUCl2d_cV9Vd1rcS5fd-1PLjkUsoY_LY2WR262A"
        const response = await request(app)
                .post("/api/v1/auth/logout")
                 .set("Authorization", `Bearer ${token}`);

        expect(response.statusCode).toBe(200);

        expect(response.body.success).toBe(true);
    })
}) 
 */

/**LOGOUT-USER-RESPONSE
 *@LOGOUT
 * 2026-07-13T13:29:41.089Z: info: {"method":"POST","url":"/api/v1/auth/logout","status":"200","responseTime":"22.208"}
 PASS  src/tests/UnitTesting/auth.test.js
  POST /api/v1/auth/logout
    √ Should logout Successfully (56 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        2.162 s
Ran all test suites.
 */



