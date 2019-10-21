# Lift Log

An Interactive journal to track all your workouts and monitor your progress with dynamic charts.

## Getting Started

*  Install dependencies.  
  > `$ cd LL2`
  > `$ npm install`
* Make sure you have a database.
  * If this is the first time running this project, load the schema.
    > `$ mysql -u root < server/schema.sql` 
  * Start the MySQL instance
    > `$ mysql.server start`
* Start the server.
  $ `npm run server-dev`
* Start react client.
  $ `npm start`

The application is now proxied via webpack-dev-server on port 3000. Navigate to`localhost:3000` in your browser.

## Development

Hot reloading is enabled

### Stack

* Client
  * ReactJS
  * Material UI
* Server
  * Express
* Database
  * MySQL