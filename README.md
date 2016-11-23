Big 2
------

##Goal
Make a multiplayer online version of the card game Big 2.

Reach for the moon: robust card game app that you can create custom card games for!

##Development
- Use airbnb's eslint for styling
- Testing with Mocha/Chai/Enzyme
- [Deployed with Heroku](https://big2cards.herokuapp.com/)
- Handle game server side for game/user validation of plays
- Responsive design

TODO:
----
[big2 issues](https://github.com/jon-is-learning/big2/issues)

##Notes
If you would like to create a card game of your own using this code, that would be rad!

Configuration of webpack will also minify code and switch React into production mode when deployed to Heroku

If using webpack-dev-server (`npm run dev:hot`), the resources are served up at [http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/). You will still need to run `npm run dev:back` separately because it's configured to work properly with socket.io (NOTE: hot reloading page WILL disconnect socket from server and from game room.)
