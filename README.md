Football(American) Pickem React Web Application

This app allows a group of people to participate in a weekly and season long competition picking winners of football games. Each user can easily create an account and choose a username, then pick winners for each of the current week’s games. Scores are tallied after game results come in.

Once logged in, a user can go to the “Make Picks” page for their league. A “Standings” page gives the user the chance to look at current and past weeks with their and other group member’s results. Cumulative and weekly scores are displayed here.

The application uses:
-React, javascript, css

-React hooks including useState, useEffect, useRef, useContext

-react-router

-react-bootstrap to assist with some of the styling. Much is customized with CSS, including tables, buttons, and loading animation.

-Firebase is used for authentication and database. This app uses the firebase firestore database.

-user must be logged in to view the site content. Firebase permissions are also set to not allow access until a user is logged in. This logic is handled in the useEffect hooks with a “currentUser” dependency.

Currently the current week settings can be updated by inputting the week number and deadline in firebase. No need to redeploy the site.

Improvements may include a realtime API that automatically updates game results. This is currently not included in the proof of concept as there are fees. The app has been enjoyed by two small groups of real users for the current NFL season. The design is mobile first as the current users are accessing the site on mobile devices from a chat application. Additional improvements could focus on ease of creating additional leagues.

Created with npx create-react-app

Live version of the app here: https://football-pickem-45896.web.app/

Kyle from Webdevsimplified youtube channel has this video that was a great help in teaching me and getting me started with authentication on firebase: https://www.youtube.com/watch?v=PKwu15ldZ7k
![image](https://user-images.githubusercontent.com/59461870/147615794-831d558e-30de-4dca-a9a4-1601a864fbed.png)

MIT License

Copyright (c) 2021 Gregory Schoenberg

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


