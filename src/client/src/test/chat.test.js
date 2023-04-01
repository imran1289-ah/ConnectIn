import React from "react";
import renderer from 'react-test-renderer'
import { screen, render } from "@testing-library/react";
import mockio, { io } from "socket.io-client";
import UserSession from "../UserSession";
import '@testing-library/jest-dom';
import Chat from '../components/Chat'
import { BrowserRouter, MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import Contacts from "../components/Contacts";
import ChatContainer from "../components/ChatContainer";
import SocketMock from 'socket.io-mock';


beforeAll(() => {
    // mock.reset();
    sessionStorage.setItem("userID", '63ffcb1818750c7838b46a7c');
    sessionStorage.setItem("firstname", 'admin');
    sessionStorage.setItem("lastname", 'admin');
    sessionStorage.setItem("role", 'Administrator');
})

let mock = new MockAdapter(axios)

describe('validate whether or not the front-end of the chat page renders correctly', () => {

    const uID = sessionStorage.getItem('userID')
    mock.onGet(`/users/profile/${uID}`).reply(201, {
        connections: [{
            userID: '63ffca4118750c7838b46a68',
            firstname: 'Test',
            lastname: 'lastName',
        }]
    })

    const connection = [
        {
            "userID": '63ffca4118750c7838b46a68',
            "firstname": 'Test',
            "lastname": 'lastName',
        },
        {
            "userID": '63ffca4118750c7838b46a62',
            "firstname": 'John',
            "lastname": 'Doe',
        }
    ]

    it('renders static elements correctly', () => {
        const tree = renderer.create(
        <UserSession>
            <MemoryRouter>
                <Chat />
            </MemoryRouter>
        </UserSession>)
        .toJSON();

        expect(tree).toMatchSnapshot();
    })

    it('renders dynamic components correctly', () => {
        const chatPage = render(
            <UserSession>
                <MemoryRouter>
                    <Contacts connections={connection}/>
                </MemoryRouter>
            </UserSession>
        );

        const contact1 = screen.getByText(/Test/i);

        expect(contact1).toBeInTheDocument();
        // const contacts = screen.getByTestId('contacts-container');
        // expect(contacts).toBeInTheDocument();
    })
    it('renders chatContainer correctly', () => {
        const chat = {
            "userID": '63ffca4118750c7838b46a68',
            "firstname": 'Test',
            "lastname": 'lastName',
        }
        const socket = new SocketMock();

        socket.on('sendMessage', (data) => {
            expect(data).toEqual('Hello World');
        });

        socket.on("receiveMessage", (data) => {
            expect(data).toEqual('Hello World');
        })

        socket.socketClient.emit('sendMessage', 'Hello World');
        socket.socketClient.emit('receiveMessage', 'Hello World');
        console.log(socket);

        const chatPage = render(
            <UserSession>
                <MemoryRouter>
                    <ChatContainer socket={socket} currentChat={chat}/>
                </MemoryRouter>
            </UserSession>
        );

        // const contacts = screen.getByTestId('contacts-container');
        // expect(contacts).toBeInTheDocument();
    })

    

})

afterAll(() => {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('firstName');
    sessionStorage.removeItem('lastName');
    sessionStorage.removeItem('role');
    mock.reset();
});  