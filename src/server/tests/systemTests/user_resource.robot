*** Settings ***
Documentation    A resource file
...    for reusable components
...    and functions. 
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Edge
${FNAME}    John
${LNAME}    Doe
${USER}    j.d@email.com
${PWD}    test123

*** Keywords ***
Launch Browser
    Open Browser    http://localhost:3000/signin    Edge
    Sleep    3s
    Maximize Browser Window
   
Login to ConnectIn
    Input Text      xpath:(//*[@class='LoginInput'])[1]    ${USER}
    Input Text      xpath:(//*[@class='LoginInput'])[2]    ${PWD}
    Click Button    xpath:(//*[@class='LoginButton'])
    Sleep    5s

Sign Up to ConnectIn as a user
    Click Element    xpath:(//*/a)
    Input Text      xpath:(//*[@class='Input'])[1]    ${FNAME}
    Input Text      xpath:(//*[@class='Input'])[2]    ${LNAME}
    Input Text      xpath:(//*[@class='Input'])[3]    ${USER}
    Input Password      xpath:(//*[@class='Input'])[4]    ${PWD}
    Click Element    id:select
    Wait Until Element Is Visible    xpath:(//*/ul/li[1])
    Click Element    xpath:(//*/ul/li[1])
    Click Button    class:SignupButton
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Successfully created an account!

Sign Out & Close
    Click Element   xpath://html/body/div/div[1]/header/div/div[3]/button[7]
    sleep    3s
    Close Browser

Create A Post
    Click Element    xpath:(/html/body/div/div[1]/header/div/div[3]/button[1])
    Page Should Contain Textfield    xpath:(//*[@id="outlined-basic"])
    Input Text    xpath:(//*[@id="outlined-basic"])    Post Test.
    Click Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s
    Page Should Contain    Post Test.

Search for All Users
    Page Should Contain Element    xpath:(/html/body/div/div[1]/header/div/div[2]/p/button)
    Click Element    xpath:(/html/body/div/div[1]/header/div/div[2]/p/button)
    Sleep    2s
    Page Should Contain Element    class:singleUser

Message A User
    Page Should Contain Element    xpath:(//*/div/div[3]/button[5])
    Click Button    xpath:(//*/div/div[3]/button[5])
    Sleep    3s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/div[1]/div/div[2]/div)
    Page Should Contain Element    xpath:(//*/form/input)
    Input Text    xpath:(//*/form/input)    Message Test.
    Click Button    xpath:(//*/form/button)
    Sleep    2s
    Page Should Contain    Message Test.

Report A DM
    Page Should Contain Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Mouse Over    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Click Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    Wait Until Page Contains    Chat Report
    Click Element    xpath:(//html/body/div[4]/div[3]/div/div/div)
    Wait Until Element Is Visible    xpath:(//*/ul/li[1])
    Click Element    xpath:(//*/ul/li[1])
    Click Button    xpath:(//html/body/div[4]/div[3]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s

Check Pending Connections
    Click Element    xpath:/html/body/div/div[1]/header/div/div[3]/button[2]
    Wait Until Page Contains    Pending connection requests