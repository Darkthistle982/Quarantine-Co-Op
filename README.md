# Quarantine-Co-Op
A Co-op for sharing various types of physical media among folks stuck at home. 

## Description
The idea is to create an online media sharing app that users can contribute to as well as check out items to share with other bored folks who are stuck at home. It is designed with simple authentication and logins to remember users and store data in a sql db for use in the site. 

## Table of Contents
* Application Rules/Operation
* Application Functionality
* Tech Used
* Details of the Application
* Desired Improvements for future versions
* Links to live application

## Application Rules/Operation
This project had simple requirements, asking us to use one technology we have not used before as well as leveraging our current breadth of knowledge and skills aquired in class thus far. We needed to create an application full stack, including web server, data storage in a DB of our choosing and front end interface for the user. 

## Application Functionality

The application functions using a node.js server and passport.js and express.js to create the back end. Users arrive at a login page and have the option to either be directed to a sign up page, or login if they already have an account. Upon a successful login they are directed to the main page which contains a full listing of all of the current items in the Co-op, listed as checked in and checked out. They can review all the items, submit their own items to the Co-Op for borrowing, and request to check out items. They can also choose to return items that are currently checked out. 

The Navbar also has a Log out function, and and about us page to describe what the site is for and how it works. 

## Tech Use

* HTML
* CSS
* Bootstrap
* Javascript
* JQuery
* Google Fonts
* Font Awesome
* MySQL
* Express.js
* Node.js
* Sequelize NPM
* Passport.js
* ESLINT

## Details of the Application
Currently, the application can create new users, authenticate existing users, and allow user to check existing items in and out. It also allows them to submit new items to store in the Database. The application utilizes Passport.js to manage all authentication. The rendering is all done with Javascript/JQuery to direct HTML, which proved to be rather tricky in the end. In hindsight, using handlebars would have been much easier in the long run, but by the time an attempt to convert to handlebars was made we were in too far to make a simple conversion. 

## Desired Improvements for future versions

* Have a forum for users to connect and talk with one another. 
* Have a secondary page for checking out items: 
    * include a credit card auth so if users do not return items, they are charged for them.
* Have and store shipping info so users can arrange to send items to one another or for local pick up drop off.
* Have the user name who checked out an item display in the checkout out column.
* Add in a Filter button to allow users to sort out and search for items by Media Type.
* Add in a Search functionality for users to look for items specifically.
* Add in a link to reviews for each product on external sites using an API call.
* Add a description field that would populate in a mouseover tooltip.
* Have the items display in a small title only list, and allow the user to click on the itme to expand and show all details. 

### Link to the live deployed application: 
