*** Settings ***
Library    SeleniumLibrary
Documentation    This is a Robot File 
...              that runs some Admin 
...              system tests.    
Resource    admin_resource.robot
Resource    ../resource.robot

Test Setup    Launch Browser

*** Test Cases ***
Signing up & Logging in
    Sign Up    ${FNAME}    ${LNAME}    ${USER}    ${PWD}    Administrator
    Sign Up    ${USERFNAME}    ${USERLNAME}    ${USERUSER}    ${USERPWD}    User
    Login to ConnectIn    ${USER}    ${PWD}
    Sign Out    Administrator
    Login to ConnectIn    ${USERUSER}    ${USERPWD}
    Sign Out & Close    User

Connection Adding & Messaging
    Login to ConnectIn    ${USER}    ${PWD}
    Search and add Users    no    ${USERFNAME}
    Sign Out    Administrator
    Login to ConnectIn    ${USERUSER}    ${USERPWD}
    Adding new connection
    Message A User    Hi!    User
    Sign Out & Close    User

DM Reporting & Banning
    Login to ConnectIn    ${USER}    ${PWD}
    Message A User    This is a test message    Administrator
    Report a DM
    Go Back
    View DM Reports
    Accept DM Report
    Sign Out & Close    Administrator

Logging in As a Banned User
    Log in as banned user    ${USERUSER}    ${USERPWD}
    Close Browser

Unbanning a User
    Login to ConnectIn    ${USER}    ${PWD}
    View Manage Accounts
    Unban User From Manage Accounts Page
    Sign Out    Administrator
    Login to ConnectIn    ${USERUSER}    ${USERPWD}
    Sign Out & Close    User