*** Settings ***
Documentation    A resource file
...    for reusable components
...    for system tests
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Chrome
${FNAME}    John
${LNAME}    Doe
${USER}    j.d@email.com
${PWD}    test123

${USER1}    jb@gmail.com
${PWD1}    jb
${USER2}    aj@gmail.com
${PWD2}    aj