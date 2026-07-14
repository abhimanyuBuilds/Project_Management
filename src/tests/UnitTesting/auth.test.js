// Assert // Act // test 

import request from "supertest";
import mongoose from "mongoose";
import app from "../../app.js";
import DataBase from "../../db/db.connection.js";
import user from "../../models/user.model.js"
import crypto from "crypto"
import { time } from "console";

beforeAll(async () => {
    await DataBase.connectDB();
});

afterEach(async () => {
    await user.deleteOne({});
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

/**
 * @PASS {POST} verify-email/:verificationToken
 */


describe("Verify Email", () => {
    test("Should verify email successfully", async () => {

        const timestamp = Date.now();
        const verificationToken = "mytoken-yo-token";

        const hashedToken = crypto
            .createHash("sha256")
            .update(verificationToken)
            .digest("hex");

        const createdUser = await  user.create({
            email: `superuser770@gmail.com${timestamp}`,
            username: `super user${timestamp}`,
            password: "8190103",
            role: "admin",
            isEmailVerified: false,
            emailVerificationToken: hashedToken,
            emailVerificationExpiry: Date.now() + 10 * 60 * 1000
        });

        const response = await request(app)
            .post(`/api/v1/auth/verify-email/${verificationToken}`  );

        console.log(response.statusCode);
        console.log(response.body);

        const dbUser = await user.findById(createdUser._id);


        expect(response.statusCode).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.data.isEmailVerified).toBe(true);

        const updatedUser = await user.findById(createdUser._id);

        expect(updatedUser.isEmailVerified).toBe(true);
        expect(updatedUser.emailVerificationToken).toBeFalsy();
        expect(updatedUser.emailVerificationExpiry).toBeFalsy();
    });

    test("Should return 400 if token is missing" , async() => {

         const timestamp = Date.now();
        const verificationToken = "mytoken-yo-token";


        const response = await request(app)
            .post(`/api/v1/auth/verify-email/${verificationToken}`);


            
        expect(response.statusCode).toBe(400);
        expect(response.body.success).toBeUndefined()

    })
});






/**verify-email test case {output} pass
 * (Use `node --trace-warnings ...` to show where the warning was created)
  console.log
    MongoDB connected successfully✅

      at DataBase.log [as connectDB] (src/db/db.connection.js:35:21)

  console.log
    Generated hasehd 530021b40478e82e14990e15201d80a89ede138ff862b0618f0c88e9c1ed36e8

      at log (src/controllers/auth.controller.js:216:13)

  console.log
    Received token : mytoken-yo-token

      at log (src/controllers/auth.controller.js:217:13)

  console.log
    User found with id  {
      _id: new ObjectId('6a5628bf86fb2daaf17e2736'),
      avatar: {
        url: 'https://placehold.co/200x200',
        localPath: '',
        _id: new ObjectId('6a5628bf86fb2daaf17e2735')
      },
      username: 'super user1784031423865',
      email: 'superuser770@gmail.com1784031423865',
      password: '$2b$10$LR6eZ/WZEEm9eiIXdwPIveBdiiMJKYeyHt39fz5gObu9NA2Ry6AMa',
      role: 'admin',
      isEmailVerified: false,
      emailVerificationToken: '530021b40478e82e14990e15201d80a89ede138ff862b0618f0c88e9c1ed36e8',
      emailVerificationExpiry: 2026-07-14T12:27:03.865Z,
      createdAt: 2026-07-14T12:17:03.878Z,
      updatedAt: 2026-07-14T12:17:03.878Z,
      __v: 0
    }

      at log (src/controllers/auth.controller.js:228:13)

2026-07-14T12:17:04.052Z: info: {"method":"POST","url":"/api/v1/auth/verify-email/mytoken-yo-token","status":"200","responseTime":"49.209"}
  console.log
    200

      at Object.log (src/tests/UnitTesting/auth.test.js:265:17)

  console.log
    { statusCode: 200, data: { isEmailVerified: true }, success: true }

      at Object.log (src/tests/UnitTesting/auth.test.js:266:17)

 PASS  src/tests/UnitTesting/auth.test.js
  Verify Email
    √ Should verify email successfully (211 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        3.128 s
Ran all test suites.

============================  Should return 400 if token is missing ================================



2026-07-14T12:33:34.414Z: info: {"method":"POST","url":"/api/v1/auth/verify-email/mytoken-yo-token","status":"200","responseTime":"34.043"}
  console.log
    200

      at Object.log (src/tests/UnitTesting/auth.test.js:209:17)

  console.log
    { statusCode: 200, data: { isEmailVerified: true }, success: true }

      at Object.log (src/tests/UnitTesting/auth.test.js:210:17)

  console.log
    Generated hasehd 530021b40478e82e14990e15201d80a89ede138ff862b0618f0c88e9c1ed36e8

      at log (src/controllers/auth.controller.js:216:13)

  console.log
    Received token : mytoken-yo-token

      at log (src/controllers/auth.controller.js:217:13)

  console.log
    User found with id  null

      at log (src/controllers/auth.controller.js:228:13)

2026-07-14T12:33:34.463Z: info: {"method":"POST","url":"/api/v1/auth/verify-email/mytoken-yo-token","status":"400","responseTime":"17.011"}
 PASS  src/tests/UnitTesting/auth.test.js
  Verify Email
    √ Should verify email successfully (184 ms)
    √ Should return 400 if token is missing (28 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        3.256 s, estimated 4 s
Ran all test suites.

 * 
 */