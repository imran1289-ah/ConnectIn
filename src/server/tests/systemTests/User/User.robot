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
    Sign Out & Close    User