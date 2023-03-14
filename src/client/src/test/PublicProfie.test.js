import React from "react";
import PublicUserProfile from "../components/PublicUserProfile";
import { screen, render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import UserSession from "../UserSession";

beforeAll(() => {
  sessionStorage.setItem("userID", '6410a8bd165eca75f68ba375');
  sessionStorage.setItem("firstname", 'John');
  sessionStorage.setItem("lastname", 'Doe');
  sessionStorage.setItem("role", 'User');
})

//Test to check if public profile page is being rendered correctly
test("test if text is rendered correctly in the profile page", () => {
  render(<UserSession>
          <BrowserRouter initialEntries={['/user/6410a8d1165eca75f68ba37c']}>
            <PublicUserProfile />
          </BrowserRouter>
          </UserSession>
  );
  const subTitleBio = screen.getByText(/Bio/i);
  const subTitleExperience = screen.getByText(/Experience/i);
  const subTitleEducation = screen.getByText(/Education/i);
  const subTitleSkills = screen.getByText(/Skills/i);
  const subTitleLanguages = screen.getByText(/Languages/i);
  const subTitleVolunteering = screen.getByText(/Volunteering/i);
  expect(subTitleBio).toBeInTheDocument();
  expect(subTitleExperience).toBeInTheDocument();
  expect(subTitleEducation).toBeInTheDocument();
  expect(subTitleSkills).toBeInTheDocument();
  expect(subTitleLanguages).toBeInTheDocument();
  expect(subTitleVolunteering).toBeInTheDocument();
});

afterAll(() => {
  sessionStorage.removeItem('userID');
  sessionStorage.removeItem('firstName');
  sessionStorage.removeItem('lastName');
  sessionStorage.removeItem('role');
});
