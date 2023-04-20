*** Settings ***
Documentation    A resource file
...    for reusable components
...    and functions for the admin
...    system tests 
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Edge
${FNAME}    Steve
${LNAME}    MC
${USER}    steve.mc@email.com
${PWD}    notch123
${USERFNAME}    Jane
${USERLNAME}    Doe
${USERUSER}    jane.doe@email.com
${USERPWD}    test123


*** Keywords ***

View DM Reports
    [Documentation]    Opens the DM reports page
    ...                to check the reports that
    ...                that were made by users.
    Page Should Contain Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button[3])
    # Clicks Applicants Button from the navbar.
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button[3])
    Page Should Contain    DM Reports

Accept DM Report
    [Documentation]    Clicks the accept button to
    ...                ban the reported user from
    ...                ConnectIn.
    Page Should Contain Element    xpath:(//*[@id="root"]/div[2]/div/div[2]/div)
    Click Button   xpath:(//*[@id="root"]/div[2]/div/div[2]/div/div/button[1]) 
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    You have successfully resolved the report!
    Sleep    3s
  
# Reject DM Report
#     [Documentation]    Clicks the reject button to
#     ...                ignore the report
#     Page Should Contain    xpath:(//*[@id="root"]/div[2]/div/div[2]/div[1])
#     Click Button   xpath:(//*[@id="root"]/div[2]/div/div[2]/div[1]/div/button[2])
#     Wait Until Page Contains Element    class:swal-modal
#     Wait Until Element Contains    class:swal-text    You have successfully resolved the report!
#     Sleep    3s

View Manage Accounts
    [Documentation]    Opens the View Manage accounts page.
    Page Should Contain Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button[2])
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button[2])
    Sleep    1s

Unban User From Manage Accounts Page
    Press Keys    None    PAGE_DOWN
    Wait Until Page Contains    ${USERUSER}
    Click Button    xpath:(//*[@id="root"]/div[2]/div/table/tbody/tr/td[4]/button)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Successfully updated the user
    Sleep    3s

Log in as banned user
    [Documentation]    Signs in as a banned user of the application.
    ...                Works with any type of user.
    [Arguments]    ${USERUSER}    ${USERPWD}
    # Title Should Be    ConnectIn - Log In
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[1])    ${USERUSER}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[2])  ${USERPWD}
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div/form/button)
    Sleep    2s
    Wait Until Page Contains    You are banned from ConnectIn
    
    
