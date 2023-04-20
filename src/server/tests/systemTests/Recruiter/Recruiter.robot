*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File 
...              that runs some Recruiter 
...              system tests.
Resource    recruiter_resource.robot
Resource    ../resource.robot
Test Setup    Launch Browser

*** Test Cases ***
Some Tests
    # Sign Up    ${FNAME}    ${LNAME}    ${USER}    ${PWD}    Recruiter
    Login to ConnectIn    ${USER}    ${PWD}
    View Applicants
    Go Back
    Sleep    1s
    Check Pending Connections
    Go Back
    Go to Profile Page    Administrator
    Edit the User Profile    
    ...    This is a bio test    
    ...    Software Tester @ ConnectIn    
    ...    Software Engineering - ConU    
    ...    Word    
    ...    English
    # Post a Job
    # Edit A Job
    # Delete A Job
    Sign Out & Close    Recruiter