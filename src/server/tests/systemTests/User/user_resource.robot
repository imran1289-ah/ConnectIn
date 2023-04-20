*** Settings ***
Documentation    A resource file
...    for reusable components
...    for system tests
Library    SeleniumLibrary

*** Variables ***
${WEBPAGE}    http://localhost:3000/signin
${BROWSER}    Chrome

${USER1}    jb@gmail.com
${FNAME1}    John
${LNAME1}    Molson
${PWD1}    jb

${USER2}    aj@gmail.com
${FNAME2}    Adam
${LNAME2}    Johns
${PWD2}    aj