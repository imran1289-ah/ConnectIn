*** Settings ***
Documentation    A resource file
...    for reusable components
...    and functions for the recruiter
...    system tests 
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Edge
${FNAME}    Timothy
${LNAME}    Adams
${USER}    tim.ad@email.com
${PWD}    timothy123

*** Keywords ***

View Applicants
    Page Should Contain    Applicants
    # Clicks Applicants Button from the navbar.
    Click Button    xpath:(//*/header/div/div[3]/button[5])
    Page Should Contain    Applicants Summary

Post a Job
    Page Should Contain    Post Job
    Click Button    xpath:(//*/header/div/div[3]/button[6])
    Page Should Contain    Job Posting Page
    Input Text    id:job_title    Software Tester
    Input Text    id:company_name    ConnectIn
    Input Text    id:job_description    This is a software job posting test. Do NOT apply!
    Input Text    id:salary    95000
    Input Text    id:location    Montreal
    Scroll Element Into View    xpath:(//*[@id="root"]/div[2]/button)
    Sleep    2s
    Click Element    id:category
    Wait Until Element Is Visible    xpath:(//*/div[1]/select/option[2])
    Click Element    xpath:(//*/div[1]/select/option[2])

    Click Element    id:work_type
    Wait Until Element Is Visible    xpath:(//*/div[2]/select/option[2])
    Click Element    xpath:(//*/div[2]/select/option[2])
    Scroll Element Into View    xpath:(//*[@id="root"]/div[2]/button)
    Sleep    2s
    Click Button    xpath:(//*[@id="root"]/div[2]/button)
    Sleep    2s

Edit A Job
    Page Should Contain    Edit/Delete Job
    Click Button    xpath:(//*/header/div/div[3]/button[7])
    Page Should Contain    Job Postings Summary
    Sleep    2s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/table/tbody/tr/td[7]/button[1])
    Page Should Contain    EDIT YOUR POSTING
    Sleep    2s
    Click Element    id:job_title
    Press Keys    id:job_title    CTRL+a+BACKSPACE
    Input Text    id:job_title    Modified Title
    Click Element    id:job_description
    Press Keys    id:job_description    CTRL+a+BACKSPACE
    Input Text    id:job_description    Never Gonna Give You Up!
    Scroll Element Into View    xpath:(//*[@id="editPostcontainer"]/div/div/div/form/div/button)
    Sleep    2s
    Click Button    xpath:(//*[@id="editPostcontainer"]/div/div/div/form/div/button)
    Wait Until Page Contains Element    class:swal-modal
    Sleep    3s

Delete A Job
    Page Should Contain    Edit/Delete Job
    Click Button    xpath:(//*/header/div/div[3]/button[7])
    Page Should Contain    Job Postings Summary
    Sleep    2s
    Click Element    xpath:(//*[@id="root"]/div[2]/div/table/tbody/tr/td[7]/button[2])
    Wait Until Page Contains Element    class:swal-modal
    Wait Until Element Contains    class:swal-text    Job successfully deleted!
    Click Button    xpath:(/html/body/div[2]/div/div[2]/div/button)