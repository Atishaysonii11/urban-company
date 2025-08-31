Setup of the project

->components folder->here we have the components like navbar 

->pages folder- here all the main pages are there

->global_css -  here i have written the css for all the pages , and have also used inline css to show my understanding of both the css , would have used tailwind css also 

->layout folder- in this folder we have the layout like navbar will be visible on all the pages and have outlet which is our main screen of the projects, which  will be changed using react router dom once the route changes

->router foler - here routing is done using react router dom only, all the routes which i am suing are defined here, react router dom uses window for managing the routes

-> utils folder- have api_fetcher file in this , as i am using axios so these are the basic file to use the axios

-> api folder- have 2 folders in this one in which my backend api endpoints are there and the other is where i am calling the api using axios which is the api_calls file

-> .env - > here my base url of backend exists which allows me to hit the backend endpoints

extra library used : 

1.React router dom
2.axios
3.lucid icons

project explanation and approach:

route "/" -> this route is where all the services are visible , and user can select the service which the user wants , i am getting the services and amount from the backend api , when we select any service then a modal gets open in which multiple carpenters or electrician comes 