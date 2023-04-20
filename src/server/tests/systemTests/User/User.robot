*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File that runs 
...              some user system tests.
Resource    user_resource.robot
Resource    ../resource.robot
Test Setup    Launch Browser

*** Test Cases ***
Some Tests
    # Sign Up    ${FNAME}    ${LNAME}    ${USER}    ${PWD}    User
    Login to ConnectIn    ${USER}    ${PWD}
    # Search for Users    Timothy
    # Message A User    Hello!
    # Report A DM
    # Create A Post    This is a test
    Check Notifications
    # Apply for a Job    ${FNAME}    ${LNAME}    ${USER}
    Sign Out & Close    User

Edit My Profile
    Login to ConnectIn    ${USER}    ${PWD}
    Go to Profile Page    User
    Edit the User Profile    
    ...    This is a bio test    
    ...    Software Tester @ ConnectIn    
    ...    Software Engineering - ConU    
    ...    Word    
    ...    English
    Sign Out & Close    User

Change Job Preferences
    Login to ConnectIn    ${USER}    ${PWD}
    Go to Job Listing Page
    Change Job Preferences    Part-Time    Montreal    Hybrid
    Sign Out & Close    User

Connection adding and removing test 
    Login to ConnectIn    ${USER1}    ${PWD1}
    Search and add Users
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Adding new connection
    Sign Out    Recruiter
    Login to ConnectIn    ${USER2}    ${PWD2}
    Removing a connection
    Sign Out & Close   Recruiter

Rejecting a connection request
   Login to ConnectIn    ${USER1}    ${PWD1}
    Search and add Users
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Rejecting a new connection
    Sign Out & Close   Recruiter