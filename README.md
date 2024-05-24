# Kari-Antti Seppälä santa-app Documentation

client = React Ui
server = backend api

! NOTICE !
I DEVELOPED THIS COMPLETELY LOCALLY, NOT SURE IF GLITCH SUPPORTS 2 TERMINALS FOR THE SAME PAGE

run client with 'npm start' under app/client
run server with 'npm start' under app/server

I updated the express to ES6 to allow importing and typescript.
This took way longer than I thought, about 2-3 hours.
First time working with js backend for couple of years, was fun though.
I think I'm going to check some React backend framework next, I think

I've been in a front end heavy role for the last 1,5 years at Nomura so I think I put more effort on that side aside from styling.
I do have interest in full stack development, but doing assignment during work week with family meant that I had to cut some corners.

# Things I would improve in UI in no particular order

1. Proper authentication, now only username is used.
2. proper form validation and error messages
3. styling in general
4. protected paths for login / register, currently already logged in user can register a new user and try to log in again
5. Handling errors is completely TODO
6. Instead of redirecting to error pages, maybe I would popup a toast
7. Fix login page, no error if username is not found

# Things I would improve in Server in no particular order

1. Come up with some kind of authentication thats managed by server, jwt token of some kind.
2. Generally returning responses from the api, I think the approach I took was not the best. Backend is not my strongest suit.
3. Just DB or similar solution in general, now all data are saved to arrays. Faced issues with racing conditions when refetching data etc.
   Feel like I had to come up with tricks and hacks just to make it work, would have preferred DB but ran out of time.
4. Handling santa message related errors could be better.

# How my changes achieve affected the objective

Due to my changes in the ui, some of the objectives cannot be completed IN A WAY THEY WERE REQUESTED IN OBJECTS OVERVIEW
I made sure that the functionality matches the objective though.

# FROM OBJECTIVE:

The webapp should display a form for children to enter their id and a free text message to santa.
When submitting the form, the server should check:

1.  that the child is registered
2.  that the child is less than 10 years old.
    To this purpose, the server can fetch user and profiles data in JSON format from:

- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

# MY CHANGES RELATED TO THE OBJECTIVE

1. User cannot send message to santa without registering or logging in.
   I felt like that under 10 years old would not want to remember id that is in form of: "730b0804-72c7-11e9-a923-1681be663d3e"
   So user has to register and input:
   Username, Birthday and Address
   After inputting username availability is checked, it has to be unique.
   After registering successfully user is logged in automatically.

   If user has already account, he/she can login with just username. Proper authentication with password is yet to be implemented.

   So due to these changes:
   Santa message form has field only for the message, username is taken from the logged in user.
   In the backend user is fetched from the users array and his / her age is checked.
   If user is over 10, user is redirected to error page.
   If user is under 10, the message is saved.

# Libraries I installed and why

Client

1. React Router - allows routing for different urls
2. react-hook-form - good library for creating forms quickly
3. react-datepicker - installed react-datepicker so I dont have to deal with html datepicker, usually I would use whatever ui frameworks date picker I have access to
4. tanstack/react-query - used this assignment as a possibility to learn new library
5. axios - used to communicate with server

Server

1. uuid to create unique ids
2. luxon, dealing with timezones and dates is painful without a library
3. nodemailer - used to send the emails, taken straight from https://ethereal.email/

# IMPORTANT! READ before starting

By default for anonymous users (non logged in), your code and app will only remain on glitch.com for 5 days.
In order to not lose your challenge, please create a glitch.com account and log in to glitch.com before proceeding.

The following README contains instructions to guide you through the coding challenge, please read them carefully.

# JS coding challenge:

## How to create and submit your app using glitch

1. **Login to glitch**: make sure you are logged in to glitch.com

2. **Clone**: Go to this URL: https://glitch.com/~js-santa-app and click the `Remix your own` button to clone the code. This will copy all the code to a new, randomly generated URL (e.g. https://glitch.com/edit/#!/capable-toothpaste). This is your URL to code on, no other candidates will have this URL.

3. **Code**: You can edit the code directly in the Glitch editor or use your editor of choice (VSCode, Sublime, etc) and copy paste the files into Glitch. Git import and export is also available in the Tools menu on the bottom left. How you edit the code is entirely up to you, so long as your finished work is viewable at the URL created in the previous step.

> **NOTE**: Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.

4. **Turn in**: When you finish coding, send your URL to us so we can review your code.

## Objectives overview:

The webapp should display a form for children to enter their id and a free text message to santa.

When submitting the form, the server should check:

1.  that the child is registered
2.  that the child is less than 10 years old.
    To this purpose, the server can fetch user and profiles data in JSON format from:

- https://raw.githubusercontent.com/alj-devops/santa-data/master/userProfiles.json
- https://raw.githubusercontent.com/alj-devops/santa-data/master/users.json

If the child is not registered (no match for the user id) or more than 10years old, the webapp should display a basic error page with an error message explaining the problem.\
If the child is registered and less than 10 years old, the server should show a page indicating that the request has been received.

Every 15seconds, the server should send an email with information on all pending (not yet sent) requests including:

- child username (eg. charlie.brown)
- child's address (eg. 219-1130, Ikanikeisaiganaibaai, Musashino-shi, Tokyo)
- request free text as was input in the form

Email sender should be set as do_not_reply@northpole.com, and sent to santa@northpole.com

## Tips and detailed instructions:

- Somebody started to work on the app, but left it unfinished and did not use any modern technology. We added React for you to have a clean base but feel free to use any other technology you might prefer.
- The UI and UX of the application for this challenge is not the priority. The pages/email do not need to look good, as long as they convey the information effectively.
- You should fetch the JSON data at every form submission (consider it as an API).
- For the sake of the challenge, you can keep the requests in-memory only.
- You are encouraged to select and use npm packages as needed (you can add packages by editing package.json, or using `npm install` from the glitch console).
- To get an smtp server for emails, go to https://ethereal.email/ and click "Create Ethereal Account".\
  This will give you an account (take note of your username and pwd if you need to re-logon later) and smtp server (actual emails do not get delivered).\
  Go to https://ethereal.email/messages to see the emails that have been received by the smtp server.

## Some things we will look for in your submission

- Code quality (readability, use of modern syntax...)
- Does the app work as designed (cf. objectives overview)
- App architecture (folder structure, configuration management...)
- Documentation (why did you choose to change or add a package...)

## Tips on usage of glitch

Click `Show` in the header to see your app live. Updates to your code will instantly deploy and update live.
When your app is running, you can access logs and console using the "Tools" button at the bottom left.
