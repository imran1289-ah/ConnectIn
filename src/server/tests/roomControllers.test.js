// jest.setTimeout(20000);
const request = require('supertest');
const app = require('../index');
const mongoose = require("mongoose");
const room = require('../models/Room');
const User = require('../models/user');


// Connects to the DB
beforeAll(async() => {
    mongoose.connect(process.env.DATABASE);

    mongoose.connect(process.env.DATABASE);
    // const user1 = await User.create({ firstname: 'Alice', role: 'user' });
    // const user2 = await User.create({ firstname: 'Bob', role: 'user' });

    // userID1 = user1._id;
    // userID2 = user2._id;

    // fromUser = user1._id.toString();
    // toUser = user2._id.toString();
})

// Closing the DB connection allows Jest to exit successfully.

afterAll((done) => {
    mongoose.disconnect();
    done();
    app.close();
});

// afterAll(async() => {
//     // Delete test data

//     await User.findByIdAndDelete(userID1);
//     await User.findByIdAndDelete(userID2);





// });

it("Get room using POST Request", async() => {

    const getRoom = await request(app)
        .post("/rooms")
        .send({
            userID_1: "640d40d6efc5d0167295f2ea",
            userID_2: "640d411640fea78f40b4a4f0"
        })
        .expect(201)

})


it("Create room using POST Request", async() => {

    const createRoom = await request(app)
        .post("/rooms/addRoom")
        .send({
            userID_1: "640d40d6efc5d0167295f2ea",
            userID_2: "640d411640fea78f40b4a4f0"
        })
        .expect(200)
});
it("should delete the room successfully", async() => {

    let userID_1 = "640d40d6efc5d0167295f2ea",
        userID_2 = "640d411640fea78f40b4a4f0"
    const createRoom = await request(app)
        .post("/rooms/addRoom")
        .send({
            userID_1: "640d40d6efc5d0167295f2ea",
            userID_2: "640d411640fea78f40b4a4f0"
        })
        .expect(200)
    const res = await request(app)
        .delete(`/rooms/deleteRoom/${userID_1}/${userID_2}`)
        .expect(200);

    expect(res.body.message).toBe("Successfully removed room.");
});