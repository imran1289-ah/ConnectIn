const request = require("supertest");
const app = require("../index");
const { getSessionInfo, destroySession } = require("../controllers/sessionController");
const mongoose = require("mongoose");

beforeAll(async() => {
    // Connects to the DB
    mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await mongoose.disconnect();
    app.close();
});

describe("getSessionInfo", () => {
    test("returns user info when user is logged in", async() => {
        const mockUser = { username: "testuser", email: "testuser@example.com" };
        const mockReq = { session: { user: mockUser } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await getSessionInfo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ user_info: mockUser });
    });

    test("returns error message when user is not logged in", async() => {
        const mockReq = { session: {} };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await getSessionInfo(mockReq, mockRes);

        expect(mockRes.status).toHaveBeenCalledWith(401);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "user not autenticated" });
    });
});

describe("destroySession", () => {
    test("logs out user and returns success message", async() => {
        const mockReq = { session: { destroy: jest.fn() } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await destroySession(mockReq, mockRes);

        expect(mockReq.session.destroy).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "User logged out" });
    });

    test("returns error message when log out fails", async() => {
        const mockReq = { session: { destroy: jest.fn(() => { throw new Error("Failed to log out") }) } };
        const mockRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };

        await destroySession(mockReq, mockRes);

        expect(mockReq.session.destroy).toHaveBeenCalled();
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.json).toHaveBeenCalledWith({ message: "Failed to log out" });
    });
});