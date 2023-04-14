*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File that runs some tests.
Resource    user_resource.robot
Test Setup    Launch Browser

*** Test Cases ***
Some Tests
    Login to ConnectIn
    Search for All Users
    Message A User
    Report A DM
    Create A Post
    Sign Out & Close

Valid Sign Up
    Sign Up to ConnectIn as a user
    Sleep    3s
    Close Browser

Searching All Users
    Login to ConnectIn
    Search for All Users
    Sign Out & Close