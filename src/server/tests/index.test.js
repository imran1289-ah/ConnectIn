const request = require('supertest');
const app = require('../index');
const io = require('socket.io-client');
const assert = require('assert');
const mongoose = require("mongoose");

beforeAll(async() => {
    // Connects to the DB
    mongoose.connect(process.env.DATABASE);
});

afterAll(async() => {
    await mongoose.disconnect();
    app.close();
});
describe('GET /', () => {
    it('responds with "Hello World!"', async() => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Hello World!');
    });
});

describe('Socket tests', () => {
    let client1, client2;

    beforeAll((done) => {
        // Connect two clients to the server
        client1 = io.connect('http://localhost:9000', {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
            query: { token: 'client1' }
        });
        client2 = io.connect('http://localhost:9000', {
            reconnectionDelay: 0,
            forceNew: true,
            transports: ['websocket'],
            query: { token: 'client2' }
        });
        client1.on('connect', () => {
            client2.on('connect', () => {
                done();
            });
        });
    });

    afterAll(() => {
        // Disconnect the clients from the server
        client1.disconnect();
        client2.disconnect();
    });

    it('should emit a "receiveMessage" event when "sendMessage" is called', (done) => {
        const room = 'test-room';
        const message = 'Hello, world!';

        // Listen for the "receiveMessage" event on client1
        client1.on('receiveMessage', (data) => {
            expect(data.room).toBe(room);
            expect(data.message).toBe(message);
            done();
        });

        // Join the same room on both clients
        client1.emit('joinRoom', room);
        client2.emit('joinRoom', room);

        // Emit the "sendMessage" event from client2
        client2.emit('sendMessage', { room, message });
    });
});