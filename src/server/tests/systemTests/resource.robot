*** Settings ***
Documentation    This resource file is to be
...    used in test files that share
...    the same functions
Library    SeleniumLibrary

*** Keywords ***
Launch Browser
    [Documentation]    Launches MS Edge and opens the sign in page.
    Open Browser    http://localhost:3000/signin    Edge
    Sleep    3s
    Maximize Browser Window

Check Pending Connections
    [Documentation]    Checks the pending connections
    ...                of the user.
    Click Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[2])
    Wait Until Page Contains    Pending connections requests

Sign Up
    [Documentation]    Create an account of the application.
    ...                Works with any type of user.
    [Arguments]    ${fname}    ${lastname}    ${email}    ${pwd}    ${USER_TYPE}
    Click Element    xpath:(//*/a)
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[1]/input)    ${FNAME}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[2]/input)    ${lastname}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[3]/input)    ${email}
    Input Password      xpath:(//*[@id="root"]/div/div[2]/div[1]/form/label[4]/input)    ${pwd}
    Click Element    id:select
    IF    "${USER_TYPE}" == "User"
        Wait Until Element Is Visible    xpath:(//*/ul/li[1])
        Click Element    xpath:(//*/ul/li[1])
    ELSE IF    "${USER_TYPE}" == "Recruiter"
        Wait Until Element Is Visible    xpath:(//*/ul/li[2])
        Click Element    xpath:(//*/ul/li[2])
    ELSE IF    "${USER_TYPE}" == "Administrator"
        Wait Until Element Is Visible    xpath:(//*/ul/li[3])
        Click Element    xpath:(//*/ul/li[3])
    ELSE
        Fail    "Invalid User Type"
    END
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/form/button)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Successfully created an account!
    Sleep    3s

Login to ConnectIn
    [Documentation]    Signs in as a user of the application.
    ...                Works with any type of user.
    [Arguments]    ${USER}    ${PWD}
    # Title Should Be    ConnectIn - Log In
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[1])    ${USER}
    Input Text      xpath:(//*[@id="root"]/div/div[2]/div/form/div/input[2])  ${PWD}
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div/form/button)
    Sleep    5s


Search for Users
    [Documentation]    Searches for a specific user of the application.
    ...                If no argument is passed through, all users will
    ...                be searched.
    [Arguments]    ${user}=nothing
    Page Should Contain Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/button)
    IF    "${user}" != "nothing"
        Input Text    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/input)    ${user}
    END
    Click Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[2]/p/button)
    Sleep    2s
    Page Should Contain Element    class:singleUser

Search and add Users
    [Documentation]    Searches for 2 users named andrew. 
    ...                If both are present, sends both of them connection requests.
    [Arguments]    ${is_already_connected}    ${user}=adrew
    Search for Users    ${user}
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div[1]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    IF  "${is_already_connected}" == "no"
        Wait Until Element Contains    class:swal-text    You have successfully sent connection request!
    ELSE
        Wait Until Element Contains    class:swal-text    You are already connected
    END
    Sleep    3s

Adding new connection
    [Documentation]    Adds waiting connection to connections  list.
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[2])
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div/div/div/table/tr/td[3]/button[1])
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Updated waiting connections!
    Sleep    3s

Rejecting a new connection
    [Documentation]    Rejects a user from waiting connections.
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[2])
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div/div/div/table/tr/td[3]/button[2])
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Updated waiting connections!
    Sleep    3s

Removing a connection
    [Documentation]    Removes a connection
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[3]/div/l1/div/span/button)
    Click Button    xpath:(/html/body/div[2]/div/div[4]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s
 
Sign Out
    [Documentation]    Signs out from the application.
    [Arguments]    ${USER_TYPE}
    Click Button    xpath:(//*/header/div/div[3]/button[1])
    IF    "${USER_TYPE}" == "User"
        Click Element   xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[7])
    ELSE IF    "${USER_TYPE}" == "Recruiter" or "${USER_TYPE}" == "Administrator"
        Click Element   xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[10])
    ELSE
        Fail    "Invalid User Type"
    END
    Sleep    3s
    
Sign Out & Close
    [Documentation]    Signs out from the application and closes browser.
    [Arguments]    ${USER_TYPE}
    Sign Out    ${USER_TYPE}
    Close Browser

Create A Post
    [Arguments]    ${post_message}
    [Documentation]    Creates a post on the timeline page.
    Click Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[1])
    Page Should Contain Textfield    xpath:(//*[@id="outlined-basic"])
    Input Text    xpath:(//*[@id="outlined-basic"])    ${post_message}
    Click Element    xpath:(//*[@id="root"]/div/div[2]/div[2]/div[2]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s
    Page Should Contain    ${post_message}

Report a DM
    [Documentation]    Create a DM report of the first 
    ...                message sent by the receiving user.
    # Page Should Contain Element    xpath:(//html/body/div/div[2]/div/div[2]/div[2]/div[5]/div/button)
    
    Mouse Over    xpath:(//*[@id="root"]/div[2]/div/div[2]/div[2]/div[1]/div)
    Sleep    1s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/div[2]/div[2]/div[1]/div/button)
    Wait Until Page Contains    Chat Report
    Click Element    xpath:(/html/body/div[2]/div[3]/div/div/div)
    Wait Until Element Is Visible    xpath:(//*/ul/li[1])
    Click Element    xpath:(//*/ul/li[1])
    Click Button    xpath:(/html/body/div[2]/div[3]/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s

Message A User
    [Documentation]    Messages the first user in the contacts list.
    [Arguments]    ${message}    ${USER_TYPE}
     IF    "${USER_TYPE}" == "User"
        Wait Until Element Is Visible    xpath:(//*/div/div[3]/button[5])
        Click Element    xpath:(//*/div/div[3]/button[5])
    ELSE IF    "${USER_TYPE}" == "Recruiter"
        Wait Until Element Is Visible    xpath:(//*/div/div[3]/button[8])
        Click Element    xpath:(//*/div/div[3]/button[8])
    ELSE IF    "${USER_TYPE}" == "Administrator"
        Wait Until Element Is Visible    xpath:(//*/div/div[3]/button[8])
        Click Element    xpath:(//*/div/div[3]/button[8])
    ELSE
        Fail    "Invalid User Type"
    END
    Sleep    3s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/div[1]/div/div[2]/div)
    Page Should Contain Element    xpath:(//*/form/input)
    Input Text    xpath:(//*/form/input)    ${message}
    Click Button    xpath:(//*/form/button)
    Sleep    2s
    Page Should Contain    ${message}

Apply for a Job
    [Documentation]    Applies for the first job in the job lists page
    [Arguments]    ${FNAME}    ${LNAME}    ${EMAIL}    ${PHONE}="1234567890"
    Page Should Contain Element    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[3])
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[3])
    Page Should Contain    Apply
    Click Element    xpath:(//*[@id="root"]/div[2]/div/div[2]/div[2]/div/div[1]/div/div[2]/label/a)
    Sleep    1s
    Input Text    xpath:(//*[@id="fname"])    ${FNAME}
    Input Text    xpath:(//*[@id="lname"])    ${LNAME}
    Input Text    xpath:(//*[@id="email"])    ${EMAIL}
    Input Text    xpath:(//*[@id="phoneNumber"])    ${PHONE}
    Choose File    xpath:(//*[@id="root"]/div[2]/div[2]/form/label[1]/input)    ${CURDIR}/files/test.pdf
    Choose File    xpath:(//*[@id="root"]/div[2]/div[2]/form/label[2]/input)    ${CURDIR}/files/test.pdf
    Click Element    xpath:(//*[@id="root"]/div[2]/div[2]/label)
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    You've successfully applied for this job!
    Sleep    1s
    Click Button    class:swal-button
    Sleep    2s
    Page Should Contain    Job Posts

Go to Profile Page
    [Documentation]    From the home page, redirects the user
    ...                to the profile page.
    [Arguments]    ${USER_TYPE}
    Page Should Contain    Profile
    IF    "${USER_TYPE}" == "User"
        Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[6])
    ELSE IF    ("${USER_TYPE}" == "Recruiter") or ("${USER_TYPE}" == "Administrator")
        Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[9])
    ELSE
        Fail    "Invalid User Type"
    END
    Wait Until Page Contains    Edit Profile Page

Go to Job Listing Page
    [Documentation]    Redirects the user to the job listing page
    Page Should Contain    Jobs
    Click Button    xpath:(//*[@id="root"]/div/div[1]/header/div/div[3]/button[3])
    Wait Until Page Contains    Job Posts

Change Job Preferences
    [Documentation]    Changes job preferences of the user
    [Arguments]    ${category}    ${location}    ${work_type} 
    Select From List By Value    xpath:(//*[@id="root"]/div[2]/div/div[1]/form/label[1]/select)    ${category}
    Input Text    xpath:(//*[@id="root"]/div[2]/div/div[1]/form/label[2]/input)    ${location}
    Select From List By Value    xpath:(//*[@id="root"]/div[2]/div/div[1]/form/label[3]/select)    ${work_type}
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div[1]/form/button)
    Sleep    4s
    Wait Until Page Contains    ${category}

Edit the User Profile
    [Documentation]    Edits the user profile.
    [Arguments]    ${BIO}    ${WORK_EXP}    ${EDUCATION}    ${SKILLS}    ${LANGUAGES}
    Page Should Contain Element    xpath:(//*[@id="root"]/div[2]/div/div[1]/div[1]/div/div/div/a/button)
    Click Button    xpath:(//*[@id="root"]/div[2]/div/div[1]/div[1]/div/div/div/a/button)
    Wait Until Page Contains Element    class:edit-profile-title
    
    Click Element    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[2]/textarea)
    Press Keys    None    CTRL+a+BACKSPACE
    Input Text    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[2]/textarea)    ${BIO}
    
    Click Element    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[3]/input)
    Press Keys    None    CTRL+a+BACKSPACE
    Input Text    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[3]/input)    ${WORK_EXP}
    Click Button    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/div[1]/button)
    Wait Until Page Contains    ${WORK_EXP}

    Click Element    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[4]/input)
    Press Keys    None    CTRL+a+BACKSPACE
    Input Text    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/label[4]/input)    ${EDUCATION}
    Click Button    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[1]/div[3]/button)
    Wait Until Page Contains    ${EDUCATION}

    Click Element    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/label[1]/input)
    Press Keys    None    CTRL+a+BACKSPACE
    Input Text    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/label[1]/input)    ${SKILLS}
    Click Button    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/div[1]/button)
    Wait Until Page Contains    ${SKILLS}

    Click Element    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/label[2]/input)
    Press Keys    None    CTRL+a+BACKSPACE
    Input Text    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/label[2]/input)    ${LANGUAGES}
    Click Button    xpath:(//*[@id="root"]/div[2]/form/div[1]/div[2]/div[3]/button)
    Wait Until Page Contains    ${LANGUAGES}

    Press Keys    None    PAGE_DOWN
    Sleep    2s
    
    Click Button    xpath:(//*[@id="root"]/div[2]/form/div[2]/button)
    Sleep    1s

    Page Should Contain    ${BIO}
    Page Should Contain    ${WORK_EXP}
    Page Should Contain    ${EDUCATION}
    Page Should Contain    ${SKILLS}
    Page Should Contain    ${LANGUAGES}

Check Notifications
    Page Should Contain    Job Alert
    Click Button    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button)
    Wait Until Page Contains Element    xpath:(//*[@id="root"]/div/div[2]/div[1]/span[2]/button/div/div)
    Sleep    10s