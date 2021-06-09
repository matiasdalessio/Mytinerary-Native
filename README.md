# Mytinerary-Native

## Introducing our Web App for users who want to find their perfect trip, designed by insiders who know and love their cities!

### Landing Page

Entering our App, you can find an intuitive interface that gives the options of navigation and a "not logged" avatar up and right with the logo of our brand on the left.

Moving down in this page we have a direct access to the available cities. Below, the user can watch an ilustrative carousel with some of our popular MyTineraries. If you click any of this images, the user will be redirected to the cities page.

### Cities Page

The cities page has a list of the available cities with a short description of each one when the user do a mouse over action and a searcher that helps to find your preferred city introducing the name literally. If no results where founded, the App will let you know with a message.

Entering Any of the available cities, the user will found a representative picture of the city and some cards (if available) with the itineraries information. Pressing the button "View More", unfolds the Itinerary activities that the user recommends to do. The user can, if it's logged, like it (clicking in the empty heart icon) and leave a comment if they want.

### Sign Up / Log In

By clicking the "not logged" avatar or in the bottom of the page, the user will find the "Sign Up" and "Log In" options.
To Sign Up, the user needs to complete the fields with the requirements and add a URL image to their profile. If all the provided information is ok, the user will be logged instantly and be able to like and comment any Itinerary.
To Sign In, the user needs to complete the E-mail and password fields with the provided information in the Sign Up. 
In both cases, the user has the option to log in o sign up with their Google account.
To Log Out, the user can click the avatar and inside, the option to log out.

## Let's talk about our API.

### Objective:

Obtain, create or modify Cities, Itineraries or Activities generally or specifically.

## Endpoints
URL: https://localhost:4000/

| Method | Endpoint | Description |
| ------ | ------ | ------ |
| GET | /api/cities | Get all Cities |
| GET | /api/city/:id | Get single City replacing ":id" with the ID of the City|
| GET | /api/city/itineraries/:id | Get all available Itineraries in a single City replacing ":id" with the ID of the City |
| GET | /api/itineraries | Get all available Itineraries populated with the City and it's information |
| GET | /api/itinerary/:id | Get a single Itinerary populated with the City and it's information replacing ":id" with the ID of the Itinerary|
| GET | /api/itineraries/activities/:id | Get all available Activities in a specific Itinerary replacing ":id" with the ID of the Itinerary |
| GET | /api/activities | Get all available Activities populated with the Itinerary and it's information |
| GET | /api/activity/:id | Get a specific Activity replacing ":id" with the ID of the Activity|
| POST | /api/cities | Add one City with the required fields  < ***see required fields and format at the end of table*** > |
| POST | /api/itineraries |  Add one Itinerary with the required fields  <***see required fields and format at the end of table***> |
| POST | /api/activities | Add one Activity with the required fields  < ***see required fields and format at the end of table*** > |
| DELETE | /api/city/:id | Delete one City replacing ":id" with the ID of the City|
| DELETE | /api/itinerary/:id | Delete one Itinerary replacing ":id" with the ID of the Itinerary |
| DELETE | /api/activity/:id | Delete one Activity replacing ":id" with the ID of the Activity |
| PUT | /api/city/:id | Modify one City replacing ":id" with the ID of the City and sending the field with the information to change  <***see required fields and format at the end of table***>  |
| PUT | /api/itinerary/:id | Modify one Itinerary replacing ":id" with the ID of the Itinerary and sending the field with the information to change  <***see required fields and format at the end of table***> |
| PUT | /api/activity/:id | Modify one Activity replacing ":id" with the ID of the Activity and sending the field with the information to change  <***see required fields and format at the end of table***> |


## Responses

_Every GET request, response with a JSON object with two properties: the state of the request on boolean and the response with the object or array of objets (depends of the quantity) required. for example:_

### Requesting all Cities (/api/cities) :

```javascript
{
  "success": true,
  "respuesta": [
    {
      "_id": "607a2f28745e5322941e0016",
      "name": "Baku",
      "country": "Azerbaijan",
      "img": "Baku.jpg",
      "info": "Capital and largest city of Azerbaijan, as well as the largest city on the Caspian Sea and of the Caucasus region. Baku is located 28 metres (92 ft) below sea level, which makes it the lowest lying national capital in the world and also the largest city in the world located below sea level. Click here to see all the possible Itineraries!",
      "__v": 0
    },
    ...
 ```


### Requesting all available Itineraries in a single City (/api/city/itineraries/6081cbacb3e2822148f6b6e6) :

```javascript
{
  "success": true,
  "respuesta": [
    {
      "author": {
        "userName": "Athan Travis",
        "imageURL": "https://images.generated.photos/rQ3NjmDfVvwNFBNJFGBq5U1lc3nWWywi7v8gKzSv7KQ/rs:fit:512:512/Z3M6Ly9nZW5lcmF0/ZWQtcGhvdG9zLzAy/NjExNjQuanBn.jpg"
      },
      "like": 0,
      "hashtags": [
        "#Health",
        "#Beauty",
        "#Nature",
        "#FunTrip!"
      ],
      "comments": [],
      "usersLiked": [],
      "_id": "6081cbacb3e2822148f6b6e6",
      "itineraryName": "Mountain Trip",
      "price": 2,
      "duration": 5,
      "cityID": "607a2f28745e5322941e0016",
      "__v": 0
    },
    {
      "author": {
        "userName": "Jhon Waititi",
        "imageURL": "https://uifaces.co/our-content/donated/VxDQx_gA.jpg"
      },
      "like": 0,
      "hashtags": [
        "#Ocean",
        "#Boats",
        "#BlurredSkyline",
        "#NightLife"
      ],
      "comments": [],
      "usersLiked": [],
      "_id": "60821e325c72a216fce09629",
      "itineraryName": "Night walk through the City",
      "price": 3,
      "duration": 3,
      "cityID": "607a2f28745e5322941e0016",
      "__v": 0
    }
  ]
}
```

_Every PUT, POST and DELETE request, response with a JSON object with two properties: the state of the request on boolean and the response with the object added, modified o deleted. for example:_

### POST a City (/api/cities) :

```javascript
{
  "success": true,
  "respuesta": {
    "_id": "60837a4da486990ba81ddea4",
    "name": "Baku",
    "country": "Azerbaijan",
    "img": "Baku.jpg",
    "info": "Capital and largest city of Azerbaijan, as well as the largest city on the Caspian Sea and of the Caucasus region. Baku is located 28 metres (92 ft) below sea level, which makes it the lowest lying national capital in the world and also the largest city in the world located below sea level. Click here to see all the possible Itineraries!",
    "__v": 0
  }
}
```

### DELETE an Itinerary and update an Itinerary with PUT(/api/itinerary/6083784da486990ba81ddea1) :

```javascript
{
  "success": true,
  "respuesta": {
    "author": {
      "userName": "post test",
      "imageURL": "https://www.testimage.jpg"
    },
    "like": 0,
    "hashtags": [
      "#test",
      "#test",
      "#test",
      "#test!"
    ],
    "comments": [],
    "usersLiked": [],
    "_id": "6083784da486990ba81ddea1",
    "itineraryName": "test title",
    "price": 1,
    "duration": 5,
    "cityID": "607a2f2c745e5322941e0017",
    "__v": 0
  }
}
```

## Required fields and format to POST request:

### For Cities:

| Field | Format | Specificity | Required |
| ------ | ------ | ------ | ------ |
| name | String | ------  | Required |
| country | String | ------ | Required |
| img | String | ------  | Required |
| info | String | ------  | Required |

### For Itineraries:

| Field | Format | Specificity | Required |
| ------ | ------ | ------ | ------ |
| itineraryName | String | ------  | Required |
| author | array of objects with String format | 2 Properties: userName and imageURL in String format. | Required |
| price | Number | Value between 1 and 5.  | Required |
| duration | Number | Value between 1 and 5 . | Required |
| like | String | ------ | ------ |
| hashtags | array of objects with String format| At least 3 and max 5 Hashtags, separated with a "," .  | Required |
| cityID | String | Must be a existent City ID. if you don't know it, send a GET request to obtain it. | Required |

### For Activities:

| Field | Format | Specificity | Required |
| ------ | ------ | ------ | ------ |
| activityName | String | ------  | Required |
| activityImage | String | ------ | Required |
| itineraryId | String | Must be a existent Itinerary ID. if you don't know it, send a GET request to obtain it.  | Required |



_ If you find issues or BUGS, please contact us at matidaless@gmail.com._
