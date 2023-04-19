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
    Search for Users
    # Message A User    Hello!
    # Report A DM
    # Create A Post    This is a test
    Sign Out & Close    User
    
Connection adding removing and rejecting test 
    Login to ConnectIn    ${USER1}    ${PWD1}
    Search and add Users
    Sign Out    User
    Login to ConnectIn    ${USER2}    ${PWD2}
    Adding new connection
    Sign Out    Recruiter
    Login to ConnectIn    ${USER2}    ${PWD2}
    Removing a connection
    Sign Out & Close   Recruiter