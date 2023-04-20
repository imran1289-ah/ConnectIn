*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File 
...              that runs some Recruiter 
...              system tests.
Resource    recruiter_resource.robot
Resource    ../resource.robot
Test Setup    Launch Browser

*** Test Cases ***
Signing up & Logging in
    Sign Up    ${FNAME}    ${LNAME}    ${USER}    ${PWD}    Recruiter
    Login to ConnectIn    ${USER}    ${PWD}
    Sign Out & Close    Recruiter

Edit My Profile
    Login to ConnectIn    ${USER}    ${PWD}
    Go to Profile Page    Recruiter
    Edit the User Profile    
    ...    This is a bio test    
    ...    Software Tester @ ConnectIn    
    ...    Software Engineering - ConU    
    ...    Word    
    ...    French
    Sign Out & Close    Recruiter

Job Posting
    Login to ConnectIn    ${USER}    ${PWD}
    View Applicants
    Go Back
    Sleep    1s
    Post a Job
    Edit A Job
    Delete A Job
    Sign Out & Close    Recruiter