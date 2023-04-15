*** Settings ***
Documentation    A resource file
...    for reusable components
...    for system tests
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Edge
${FNAME}    John
${LNAME}    Doe
${USER}    j.d@email.com
${PWD}    test123