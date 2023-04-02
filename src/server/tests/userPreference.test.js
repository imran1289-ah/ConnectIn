const request = require('supertest');
const app = require('../index');
const User = require('../models/user');
const mongoose = require("mongoose");

beforeAll(async() => {
    await mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await mongoose.disconnect();
    app.close();
});

describe('User Controller', () => {
    describe('POST /users/:id/preferences', () => {
        let user;
        beforeEach(async() => {
            // Create a user to use in the test
            user = new User({
                firstname: 'Test',
                lastname: 'User',
                email: 'test@example.com',
                password: 'password',
                preferences: {
                    category: 'Test Category',
                    location: 'Test Location',
                    work_type: 'Test Work Type',
                },
                role: "User"
            });
            await user.save();
        });


        it('should update the user preferences', async() => {
            const res = await request(app)
                .post(`/users/${user._id}/preferences`)
                .send({
                    category: 'New Category',
                    location: 'New Location',
                    work_type: 'New Work Type',
                });

            expect(res.status).toBe(200);
            expect(res.body.preferences.category).toBe('New Category');
            expect(res.body.preferences.location).toBe('New Location');
            expect(res.body.preferences.work_type).toBe('New Work Type');
        });

        it('should return an error if the user is not found', async() => {
            const res = await request(app)
                .post('/users/invalid-id/preferences')
                .send({
                    category: 'New Category',
                    location: 'New Location',
                    work_type: 'New Work Type',
                });

            expect(res.status).toBe(500);

        });
    });

    describe('getUserInfo', () => {
        let user;

        beforeAll(async() => {

            await mongoose.connect(process.env.DATABASE, {
                useNewUrlParser: true,
                useCreateIndex: true,
                useFindAndModify: false,
                useUnifiedTopology: true,
            });

            // Create a user for testing
            user = new User({
                firstname: 'John',
                lastname: 'Doe',
                email: 'john.doe@example.com',
                password: 'password123',
                role: 'User',
                preferences: {
                    category: 'Test Category',
                    location: 'Test Location',
                    work_type: 'Test Work Type',
                },
            });
            await user.save();
        });

        afterAll(async() => {
            // Remove test user and disconnect from database
            await User.findByIdAndRemove(user._id);
            await mongoose.disconnect();
        });

        it('should return the user info for a valid user id', async() => {
            const response = await request(app).get(`/users/profile/${user._id}`);
            expect(response.status).toBe(200);
            expect(response.body.firstname).toBe(user.firstname);
            expect(response.body.lastname).toBe(user.lastname);
            expect(response.body.email).toBe(user.email);
        });

        it('should return an error message for an invalid user id', async() => {
            const response = await request(app).get('/users/profile/');
            expect(response.status).toBe(500);

        });
    });
});