Avatars

```javascript

[
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b01" },
    "avatarUrl": "/images/choose-avatar/girl_11.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b02" },
    "avatarUrl": "/images/choose-avatar/boy_16.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b03" },
    "avatarUrl": "/images/choose-avatar/girl_13.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b04" },
    "avatarUrl": "/images/choose-avatar/Boy_17.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b05" },
    "avatarUrl": "/images/choose-avatar/girl_14.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b06" },
    "avatarUrl": "/images/choose-avatar/girl_15.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b07" },
    "avatarUrl": "/images/choose-avatar/boy_13.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b08" },
    "avatarUrl": "/images/choose-avatar/Girl_08.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b09" },
    "avatarUrl": "/images/choose-avatar/Boy_01.png"
  },
  {
    "_id": { "$oid": "67db50d3eab6e0b97ffe1b10" },
    "avatarUrl": "/images/choose-avatar/boy_11.png"
  }
]

```

LEVELS

```javascript
[
  {
    "_id": {
      "$oid": "67db50d3eab6e0b97ffe1bff"
    },
    "level": 1,
    "price": 23,
    "difficulty":"Facile",
    "image": "images/payment/level_1.png"
  },
  {
    "_id": {
      "$oid": "67db517feab6e0b97ffe1c00"
    },
    "level": 2,
    "price": 33,
    "difficulty":"Difficile",
    "image": "images/payment/level_2.png"
  }
]
```

Subject

```javascript

[
  {
    "_id": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "levelId": {
      "$oid": "67db50d3eab6e0b97ffe1bff"
    },
    "name": "Mathématique"
  },
  {
    "_id": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "levelId": {
      "$oid": "67db50d3eab6e0b97ffe1bff"
    },
    "name": "Français"
  },
  {
    "_id": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "levelId": {
      "$oid": "67db517feab6e0b97ffe1c00"
    },
    "name": "Mathématique"
  },
  {
    "_id": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "levelId": {
      "$oid": "67db517feab6e0b97ffe1c00"
    },
    "name": "Français"
  }
]
```

Topics

```javascript

[
  {
    "_id": {
      "$oid": "67dbf508679048bb0e38d0c1"
    },
    "subjectId": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "topicName": "Arithmétique"
  },
  {
    "_id": {
      "$oid": "67dbf508679048bb0e38d0c2"
    },
    "subjectId": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "topicName": "Géométrie"
  },
  {
    "_id": {
      "$oid": "67dbf508679048bb0e38d0c3"
    },
    "subjectId": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "topicName": "Mesure"
  },
  {
    "_id": {
      "$oid": "67dbf508679048bb0e38d0c4"
    },
    "subjectId": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "topicName": "Statistique"
  },
  {
    "_id": {
      "$oid": "67dbf508679048bb0e38d0c5"
    },
    "subjectId": {
      "$oid": "67db51bfeab6e0b97ffe1c02"
    },
    "topicName": "Probabilité"
  },
  {
    "_id": {
      "$oid": "67db51c9eab6e0b97ffe1c06"
    },
    "subjectId": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "topicName": "Lexique"
  },
  {
    "_id": {
      "$oid": "67db51c9eab6e0b97ffe1c07"
    },
    "subjectId": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "topicName": "Orthographe"
  },
  {
    "_id": {
      "$oid": "67db51c9eab6e0b97ffe1c08"
    },
    "subjectId": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "topicName": "Conjugaison"
  },
  {
    "_id": {
      "$oid": "67db51c9eab6e0b97ffe1c09"
    },
    "subjectId": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "topicName": "Accords"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0ce"
    },
    "subjectId": {
      "$oid": "67db51c9eab6e0b97ffe1c03"
    },
    "topicName": "Syntaxe et ponctuation"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c1"
    },
    "subjectId": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "topicName": "Arithmétique"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c2"
    },
    "subjectId": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "topicName": "Géométrie"
  },
  {
    "_id": {
      "$oid": "67dbf6ec679048bb0e38d0cf"
    },
    "subjectId": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "topicName": "Mesure"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c3"
    },
    "subjectId": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "topicName": "Statistique"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c4"
    },
    "subjectId": {
      "$oid": "67db5225eab6e0b97ffe1c04"
    },
    "topicName": "Probabilité"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c5"
    },
    "subjectId": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "topicName": "Lexique"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c6"
    },
    "subjectId": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "topicName": "Orthographe"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c7"
    },
    "subjectId": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "topicName": "Conjugaison"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c8"
    },
    "subjectId": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "topicName": "Accords"
  },
  {
    "_id": {
      "$oid": "67dbf65a679048bb0e38d0c9"
    },
    "subjectId": {
      "$oid": "67db5234eab6e0b97ffe1c05"
    },
    "topicName": "Syntaxe et ponctuation"
  }
]

```

Free Questions

```javascript

[
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c1"
    },
    "topicId": {
      "$oid": "67dbf508679048bb0e38d0c1"
    },
    "question": "What comes after 2 and before 4?",
    "image": "/images/quiz/question.png",
    "options": ["Zero", "Three", "One"],
    "correct": "Three",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c2"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c1"
    },
    "question": "What is 5 + 3?",
    "options": ["6", "8", "10"],
    "correct": "8",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c3"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c2"
    },
    "question": "What is the capital of France?",
    "options": ["London", "Berlin", "Paris"],
    "correct": "Paris",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c4"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c3"
    },
    "question": "Solve: 12 ÷ 4",
    "options": ["2", "3", "4"],
    "correct": "3",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c5"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c5"
    },
    "question": "What is 7 x 6?",
    "options": ["42", "36", "48"],
    "correct": "42",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c6"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c6"
    },
    "question": "Translate 'Bonjour' to English",
    "options": ["Hello", "Goodbye", "Thank you"],
    "correct": "Hello",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c7"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c7"
    },
    "question": "Solve: 15 - 7",
    "options": ["9", "8", "7"],
    "correct": "8",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c8"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c8"
    },
    "question": "What is 20 ÷ 5?",
    "options": ["2", "4", "5"],
    "correct": "4",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf2fc679048bb0e38d0c9"
    },
    "topicId": {
      "$oid": "67dbf2fc679048bb0e38d0c9"
    },
    "question": "Translate 'Merci' to English",
    "options": ["Sorry", "Thanks", "Please"],
    "correct": "Thanks",
    "simulatorType": "free"
  },
  {
    "_id": {
      "$oid": "67dbf396679048bb0e38d0c5"
    },
    "topicId": {
      "$oid": "67dbf65a679048bb0e38d0ce"
    },
    "question": "What is 9 + 6?",
    "options": ["15", "16", "17"],
    "correct": "15",
    "simulatorType": "free"
  }
]

```

Paid Questions 

``` javascript
[
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c1" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 2 + 2?",
    "options": ["3", "4", "5"],
    "correct": "4",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c2" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 10 - 7?",
    "options": ["2", "3", "4"],
    "correct": "3",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c3" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 5 × 6?",
    "options": ["30", "31", "32"],
    "correct": "30",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c4" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 20 ÷ 4?",
    "options": ["4", "5", "6"],
    "correct": "5",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c5" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is the square root of 16?",
    "options": ["2", "4", "5"],
    "correct": "4",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c6" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 3 × 9?",
    "options": ["26", "27", "28"],
    "correct": "27",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c7" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 7 + 8?",
    "options": ["14", "15", "16"],
    "correct": "15",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c8" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 9 ÷ 3?",
    "options": ["2", "3", "4"],
    "correct": "3",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0c9" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 8 × 8?",
    "options": ["62", "63", "64"],
    "correct": "64",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ca" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c1" },
    "question": "What is 12 ÷ 2?",
    "options": ["6", "5", "4"],
    "correct": "6",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0cb" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of a square with side length 4?",
    "options": ["16", "14", "12"],
    "correct": "16",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0cc" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the perimeter of a triangle with sides 3, 4, and 5?",
    "options": ["12", "11", "10"],
    "correct": "12",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0cd" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the circumference of a circle with radius 7?",
    "options": ["43.98", "44.98", "45.98"],
    "correct": "43.98",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ce" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of a circle with radius 5?",
    "options": ["78.5", "80.5", "75.5"],
    "correct": "78.5",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0cf" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the volume of a cube with side length 3?",
    "options": ["27", "25", "30"],
    "correct": "27",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d0" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of a right-angled triangle with base 4 and height 5?",
    "options": ["20", "18", "22"],
    "correct": "10",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d1" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the length of the hypotenuse in a right-angled triangle with sides 6 and 8?",
    "options": ["9", "10", "12"],
    "correct": "10",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d2" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of a rectangle with length 8 and width 6?",
    "options": ["46", "48", "50"],
    "correct": "48",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d3" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of an equilateral triangle with side length 6?",
    "options": ["15.5", "16.5", "17.5"],
    "correct": "15.5",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d4" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c2" },
    "question": "What is the area of a parallelogram with base 7 and height 4?",
    "options": ["26", "28", "30"],
    "correct": "28",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d5" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c3" },
    "question": "What is the perimeter of a rectangle with length 8 and width 5?",
    "options": ["30", "26", "40"],
    "correct": "26",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d6" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c3" },
    "question": "What is the area of a rectangle with length 6 and width 3?",
    "options": ["18", "20", "22"],
    "correct": "18",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d7" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c3" },
    "question": "What is the volume of a cube with a side of 4?",
    "options": ["48", "64", "80"],
    "correct": "64",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d8" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c3" },
    "question": "What is the weight of 3 kilograms of apples?",
    "options": ["3 kg", "5 kg", "6 kg"],
    "correct": "3 kg",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0d9" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c3" },
    "question": "How many milliliters are in 3 liters?",
    "options": ["1000 mL", "2000 mL", "3000 mL"],
    "correct": "3000 mL",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0da" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c4" },
    "question": "What is the mean of the following numbers: 3, 5, 7, 9, 11?",
    "options": ["7", "8", "9"],
    "correct": "7",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0db" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c4" },
    "question": "What is the median of the following set of numbers: 1, 3, 4, 8, 10?",
    "options": ["4", "5", "6"],
    "correct": "4",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0dc" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c4" },
    "question": "What is the mode of the numbers: 2, 3, 3, 4, 5?",
    "options": ["2", "3", "5"],
    "correct": "3",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0dd" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c4" },
    "question": "What is the range of the numbers: 1, 2, 3, 4, 5?",
    "options": ["4", "5", "6"],
    "correct": "4",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0de" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0c4" },
    "question": "What is the standard deviation of the following numbers: 1, 2, 3, 4, 5?",
    "options": ["1.41", "1.5", "1.8"],
    "correct": "1.41",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0df" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0d5" },
    "question": "What is the probability of rolling a 3 on a fair 6-sided die?",
    "options": ["1/6", "1/2", "1/4"],
    "correct": "1/6",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e0" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0d5" },
    "question": "If you have 3 red balls and 2 blue balls, what is the probability of picking a red ball?",
    "options": ["3/5", "2/5", "1/5"],
    "correct": "3/5",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e1" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0d5" },
    "question": "What is the probability of flipping a coin and getting heads?",
    "options": ["1/2", "1/3", "1/4"],
    "correct": "1/2",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e2" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0d5" },
    "question": "What is the probability of drawing an ace from a deck of 52 cards?",
    "options": ["4/52", "1/13", "1/52"],
    "correct": "4/52",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e3" },
    "topicId": { "$oid": "67dbf508679048bb0e38d0d5" },
    "question": "What is the probability of getting an even number when rolling a 6-sided die?",
    "options": ["1/2", "1/3", "1/6"],
    "correct": "1/2",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e4" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c06" },
    "question": "What does 'ubiquitous' mean?",
    "options": ["Rare", "Everywhere", "Silent"],
    "correct": "Everywhere",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e5" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c06" },
    "question": "What is the meaning of 'ephemeral'?",
    "options": ["Short-lived", "Eternal", "Visible"],
    "correct": "Short-lived",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e6" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c06" },
    "question": "What is the meaning of 'melancholy'?",
    "options": ["Sad", "Happy", "Excited"],
    "correct": "Sad",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e7" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c06" },
    "question": "What does 'benevolent' mean?",
    "options": ["Evil", "Kind", "Silent"],
    "correct": "Kind",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e8" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c06" },
    "question": "What does 'cacophony' mean?",
    "options": ["Harmony", "Noise", "Calm"],
    "correct": "Noise",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0e9" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c07" },
    "question": "Which spelling is correct?",
    "options": ["Receive", "Recieve", "Reiceve"],
    "correct": "Receive",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ea" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c07" },
    "question": "Which of these is spelled correctly?",
    "options": ["Acommodate", "Accommodate", "Accomadate"],
    "correct": "Accommodate",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0eb" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c07" },
    "question": "Which spelling is correct?",
    "options": ["Miniscule", "Miniscull", "Minuscule"],
    "correct": "Minuscule",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ec" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c07" },
    "question": "Which is the correct spelling?",
    "options": ["Occasionally", "Occaisionally", "Occassionally"],
    "correct": "Occasionally",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ed" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c07" },
    "question": "Which spelling is correct?",
    "options": ["Separate", "Seperate", "Seperrate"],
    "correct": "Separate",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ee" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c08" },
    "question": "Which is the correct conjugation of 'être' in the present tense for 'nous'?",
    "options": ["Nous sommes", "Nous être", "Nous est"],
    "correct": "Nous sommes",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0ef" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c08" },
    "question": "Which is the correct form of 'avoir' for 'ils' in the past tense?",
    "options": ["Ils ont", "Ils avons", "Ils est"],
    "correct": "Ils ont",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0f0" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c08" },
    "question": "Which form of 'aller' is correct for 'tu' in the future tense?",
    "options": ["Tu iras", "Tu allez", "Tu allées"],
    "correct": "Tu iras",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0f1" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c08" },
    "question": "Which is the correct conjugation for 'faire' in the past tense for 'nous'?",
    "options": ["Nous fait", "Nous faisions", "Nous faire"],
    "correct": "Nous faisions",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "77dbf2fc679048bb0e38d0f2" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c08" },
    "question": "Which is the correct form of 'manger' for 'elle' in the present tense?",
    "options": ["Elle mange", "Elle mangée", "Elle manger"],
    "correct": "Elle mange",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f3" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c09" },
    "question": "Which of these sentences is grammatically correct?",
    "options": ["Les enfants mangent des pommes", "Les enfants mangent des pomme", "Les enfants mangent une pomme"],
    "correct": "Les enfants mangent des pommes",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f4" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c09" },
    "question": "Which is the correct form of the verb in this sentence?",
    "options": ["Nous sommes partis", "Nous sommes partient", "Nous est parti"],
    "correct": "Nous sommes partis",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f5" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c09" },
    "question": "Which sentence is correct?",
    "options": ["Les filles sont parties", "Les filles est partis", "Les filles partent"],
    "correct": "Les filles sont parties",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f6" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c09" },
    "question": "Which of the following is correct?",
    "options": ["Elle est allée", "Elle aller", "Elle allé"],
    "correct": "Elle est allée",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f7" },
    "topicId": { "$oid": "67db51c9eab6e0b97ffe1c09" },
    "question": "Which is correct?",
    "options": ["Je suis venu", "Je suis venues", "Je est venu"],
    "correct": "Je suis venu",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f8" },
    "topicId": { "$oid": "67dbf65a679048bb0e38d0ce" },
    "question": "Which sentence is punctuated correctly?",
    "image": "/images/quiz/question.png",
    "options": ["Hello, how are you?", "Hello how are you?", "Hello how, are you?"],
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0f9" },
    "topicId": { "$oid": "67dbf65a679048bb0e38d0ce" },
    "question": "Which sentence is correct?",
    "options": ["The dog runs fast.", "The dog, runs fast.", "The dog runs, fast."],
    "correct": "The dog runs fast.",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0fa" },
    "topicId": { "$oid": "67dbf65a679048bb0e38d0ce" },
    "question": "Which sentence is correct?",
    "options": ["He is the best at soccer.", "He is the best, at soccer.", "He is, the best at soccer."],
    "correct": "He is the best at soccer.",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0fb" },
    "topicId": { "$oid": "67dbf65a679048bb0e38d0ce" },
    "question": "Which is the correct punctuation?",
    "options": ["Can I go?", "Can I go.", "Can I, go?"],
    "correct": "Can I go?",
    "simulatorType": "paid"
  },
  {
    "_id": { "$oid": "67dbf2fc679048bb0e38d0fc" },
    "topicId": { "$oid": "67dbf65a679048bb0e38d0ce" },
    "question": "Which sentence is punctuated correctly?",
    "options": ["She is great at tennis.", "She is, great at tennis.", "She, is great at tennis."],
    "correct": "She is great at tennis.",
    "simulatorType": "paid"
  }
]
```

