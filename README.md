# sample-gameAPI
A sample of the leaderboard based game's Backend API.


## Tech used

The tech stack used here is:

* [node.js](https://nodejs.org/) - evented I/O for the backend
* [Express](https://expressjs.com/) - fast node.js network app framework
* [MongoDb](https://www.mongodb.com/) - NoSQL Document database with scalability and flexibility.



## Installation

Project requires [Node.js](https://nodejs.org/) and [MongoDb](https://www.mongodb.com/) on system to run.

* Clone the repository

        `git clone repoLink`

* Install dependencies and dev dependencies

        `npm install`

* Change configs while deployment in src/configs/systemConfig.json

* Goto repository directory

        `cd sample-gameAPI`

* Start the Server

        `npm start`



## API Information

* Get Server Time

URL: /now

Request method: GET 

Authorisation: not required 

Response: timestamp:number (current server time) 

Description: using this method user is able to get current server time

* Register Player

URL: /register

Request method: POST

Authorisation: not required

Request body: – name:string (user's name) 

Response: – token: string (user's bearer token, which will be used to authorise user) 

Description: using this method user can be registered in the system provided
name (name should be unique) and get authorisation token. This token will be used to
access API endpoints which require authorisation

* Get Own Profile

URL: /me 

Request method: GET 

Authorisation: Bearer token 

Response: – name: string
(user's name) – points: number (user's points)

Description: using this method user can get
information about himself (name and amount of points)

* Play Game

URL: /game/play 

Request method: POST 

Authorisation: Bearer token 

Response: - points_added: number (amount of points added to the user's balance) – 
points_total: number (total amount of points of the current user) 

Description: Using this method user is able to add random number of points (from 1 to 100, generated on server) to his balance.
During every hour (e.g. from 11:00 until 12:00 server time) user can play no more than 5
times. For example: First request at 11:05 – OK Second request at 11:06 – OK Third request
at 11:20 – OK Forth request at 11:40 – OK Fifth request at 11:41 – OK All following requests
until 12:00 – ERROR Sixth request at 12:00 – OK and so on...

* Claim Bonus API

URL /game/claim_bonus 

Request method: POST 

Authorisation: Bearer token 

Response: – points_added: number (amount of points added to the user's balance) – points_total:
number (total amount of points of the current user) 

Description: for every minute after date of registration or date of the last bonus claim user has ability to get 10 extra points.
Maximum amount of points which user can get for 1 claim request is limited by 100.

* Get Leaderbaord

URL /leaderboard 

Request method: GET 

Authorisation: not required 

Response: – leaders: [{
name: "Leader", place: 1, points: 100500 }, { name: "Second user", place: 2, points: 1000 },
...] (10 best players with name, place and amount of points) – current_user_place: 42
(OPTIONALLY and only if bearer token provided) 

Description: Using this method user has
ability to get 10 best players (with most amount of points). OPTIONALLY: If bearer token
provided server also should return current user's place in the ranking