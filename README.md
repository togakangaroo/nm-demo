# Start

For the fastest way to run this you'll need [Docker](https://www.docker.com) installed and nothing running on port 3000. From any system that supports bash

```
./first-start.sh
```

Will launch the docker container and run the application on [http://localhost:3000](http://localhost:3000).

You should also be able to `npm install` and `npm start` if you don't want to deal with Docker, but I haven't tested that and it makes some assumptions about what version of node you'd be running.https://www.docker.com


# Interview Prompt:

For this exercise, you’ll be coding a small React application live during the interview.
To speed things along, please prepare a basic site with the functionality described below, using your preferred mechanism, and have it ready before the interview begins (you can create a private Github project and add invite your interviewer to it at the start of the call).
The application to prepare is a basic meal logger.

* Users can add an arbitrary number of food items to each meal.
* Food items are given in an array. Each item conforms to the following schema:
  ```
  {id: String, name: String, calories: int, portion: int}
  ```
  `calories` is number of calories per 100g.
  `portion` is size of a single portion in grams.
* For each meal, calculate the total number of calories based on the number of portions logged for each food item.
* We don’t care about the prototype looking good in a browser. We want to see how you organize your code, how you consider corner cases, and how aware you are of browser limitations.
* During the interview you will add functionality to this meal logger. The interview lasts between 30 and 60 minutes.
