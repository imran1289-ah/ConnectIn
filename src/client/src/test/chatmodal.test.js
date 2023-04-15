import React from "react";
import '@testing-library/jest-dom';
import ChatReportModal from '../components/ChatReportModal';
import { MemoryRouter } from "react-router-dom";
import UserSession from "../UserSession";
import axios from "axios";
import { screen, render, fireEvent, getByTestId, within, getByRole } from "@testing-library/react";

beforeAll(() => {
    // mock.reset();
    sessionStorage.setItem("userID", '63ffcb1818750c7838b46a7c');
    sessionStorage.setItem("firstname", 'admin');
    sessionStorage.setItem("lastname", 'admin');
    sessionStorage.setItem("role", 'Administrator');
})

jest.mock("axios");

describe('Validate if the component renders correctly.', () => {

    const receiver = sessionStorage.getItem('userID');
    const sender = '910839021jalksdj109u213io'
    const message = 'Yolo';

    axios.post.mockImplementation(() =>
        Promise.resolve({data: {message: "Report successfully created"}})
    );

    it('should render the components successfully.', () => {
        render(
            <UserSession>
                <MemoryRouter>
                    <ChatReportModal sender={sender} 
                    receiver={receiver} open={true} message={message}/>
                </MemoryRouter>
            </UserSession>
        );

        const selectReason = screen.getByTestId('select')
        const dropdownButton = within(selectReason).getByRole('button')

        expect(selectReason).toBeInTheDocument();
        expect(dropdownButton).toBeInTheDocument();
        fireEvent.mouseDown(dropdownButton);

        const listbox = within(screen.getByRole('presentation')).getByRole(
            'listbox'
        );

        const options = within(listbox).getAllByRole('option');

        fireEvent.click(options[0]);

        const button = screen.getByText(/Send Report/i)

        fireEvent.click(button);
        
        expect(axios.post).toHaveBeenCalledWith(
            "http://localhost:9000/reports/create", {
                sender: sender,
                receiver: receiver,
                reportedDM: message,
                justification: "Hate Speech"
            }
        )
    })
})