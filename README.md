For this exercise, you’ll be coding a small React application live during the interview.
To speed things along, please prepare a basic site with the functionality described below, using your preferred mechanism, and have it ready before the interview begins (you can create a private Github project and add invite your Noom interviewer to it at the start of the call).
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
