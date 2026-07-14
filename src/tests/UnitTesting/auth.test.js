// Assert // Act // test 

import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import DataBase from "../../db/db.connection.js";
import user  from "../../models/user.model.js"

beforeAll(async () => {
    await DataBase.connectDB();
});

afterEach(async () => {
    await user.deleteMany({});
});


afterAll(async () => {
    await mongoose.connection.close();
});





/**@REGISTER TEST CASE
 * @REGISTER 
   describe("POST /api/v1/auth/reigster",() => {
    test("Should successfully register user" ,async () => {

        const timestamp =  await Date.now()

       const response = await request(app)
            .post("/api/v1/auth/register")
            .send({
                email: `abhimanyu${timestamp}@gmail.com`,
                username: `abhimanyu${timestamp}`,
                password: "221122@@@@",
                role: "admin"
            });

            console.log(response.status);

        expect(response.statusCode).toBe(201);

        expect(response.body.success).toBe(true);
        expect(response.body.data.user.email).toBe(`abhimanyu${timestamp}@gmail.com`);
       
    })
}) 
 */




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





=================================== @OUTPUT ====================================

2026-07-14T09:52:34.004Z: info: {"method":"POST","url":"/api/v1/auth/register","status":"201","responseTime":"3515.639"}
  console.log
    201

      at Object.log (src/tests/UnitTesting/auth.test.js:36:21)

 PASS  src/tests/UnitTesting/auth.test.js (5.446 s)
  POST /api/v1/auth/reigster
    √ Should successfully register user (3551 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        5.523 s, estimated 6 s
Ran all test suites.
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



