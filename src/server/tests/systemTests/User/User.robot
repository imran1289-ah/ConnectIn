*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File that runs 
...              some user system tests.
Resource    user_resource.robot
Resource    ../resource.robot
Test Setup    Launch Browser

*** Test Cases ***
Signing up & Logging in
    Sign Up    ${FNAME1}    ${LNAME1}    ${USER1}    ${PWD1}    User
    Sign Up    ${FNAME2}    ${LNAME2}    ${USER2}    ${PWD2}    User
    Login to ConnectIn    ${USER1}    ${PWD1}
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Sign Out & Close    User

Creating a Timeline Post
    Login to ConnectIn    ${USER1}    ${PWD1}
    Create A Post    This is a test
    Sign Out & Close    User

Searching for Users
    Login to ConnectIn    ${USER1}    ${PWD1}
    Search for Users
    Sign Out & Close    User

Edit My Profile
    Login to ConnectIn    ${USER1}    ${PWD1}
    Go to Profile Page    User
    Edit the User Profile    
    ...    This is a bio test    
    ...    Software Tester @ ConnectIn    
    ...    Software Engineering - ConU    
    ...    Word    
    ...    English
    Sign Out & Close    User

Change Job Preferences & Check Notifications
    Login to ConnectIn    ${USER1}    ${PWD1}
    Go to Job Listing Page
    Change Job Preferences    Part-Time    Montreal    Hybrid
    Go Back
    Check Notifications
    Sign Out & Close    User

Connection Adding & Messaging
    Login to ConnectIn    ${USER1}    ${PWD1}
    Search and add Users    no    ${FNAME2}
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Adding new connection
    Go Back
    Search and add Users    yes    ${FNAME1}
    Message A User    Hi!    User
    Sign Out & Close    User

DM Reporting & Removing Connection
    Login to ConnectIn    ${USER1}    ${PWD1}
    Message A User    Hello!    User
    Report A DM
    Go Back
    Removing a connection
    Sign Out & Close   User

Applying for a Job
    Login to ConnectIn    ${USER1}    ${PWD1}
    Apply for a Job    ${FNAME1}    ${LNAME1}    ${USER1}
    Sign Out & Close    User

Rejecting a connection request
    Login to ConnectIn    ${USER1}    ${PWD1}
    Search and add Users    no    ${FNAME2}
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Rejecting a new connection
    Sign Out & Close   User