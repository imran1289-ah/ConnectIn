*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File 
...              that runs some Admin 
...              system tests.    
Resource    admin_resource.robot
Resource    ../resource.robot

Test Setup    Launch Browser

*** Test Cases ***
Some Tests
    Sign Up    ${FNAME}    ${LNAME}    ${USER}    ${PWD}    Administrator
    Sign Up    ${USERFNAME}    ${USERLNAME}    ${USERUSER}    ${USERPWD}    User
    Login to ConnectIn    ${USER}    ${PWD}
    Message A User    This is a test message    Administrator
    Report a DM
    Go Back
    View DM Reports
    Accept DM Report
    Sign Out    Administrator
    Log in as banned user    ${USERUSER}    ${USERPWD}
    Reload Page
    Sleep    2s
    Login to ConnectIn    ${USER}    ${PWD}
    View Manage Accounts
    Unban User From Manage Accounts Page
    Sign Out    Administrator
    Login to ConnectIn    ${USERUSER}    ${USERPWD}
    Sign Out & Close    User