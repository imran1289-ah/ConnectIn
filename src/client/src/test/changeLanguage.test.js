import React from 'react'
import i18n from './i18nextTest'
import {render, screen} from '@testing-library/react'
import UserTimeline from "../components/UserTimeline";
import UserSession from "../UserSession";
import { I18nextProvider } from 'react-i18next';
import { BrowserRouter } from "react-router-dom";
test('Checks if the page is transalted properly', () => {
    const userID = 12345;
    const login = true;
    const {homePage} = render(
      <I18nextProvider i18n={i18n}>
         <UserSession >
         <BrowserRouter>
            <UserTimeline login={true} userID={'12345'}></UserTimeline>
            </BrowserRouter>
         </UserSession>
      </I18nextProvider>
    );
   
    expect(screen.getByText(i18n.getDataByLanguage('fr').translation["Please login to your account"])).toBeDefined(); 
  
});
