# run tracking personal project

CRUD: Users will have the ability to Post a run, Edit/Put a previous run post(either based on the date ran or id), Allow for users to delete runs within a specific Run Model. Users will have the ability to Set/Post Goals specific distance, Edit/Put Goals per specific distance, as well as delete goals from specifc Goal Model. The Goals model will have the ability to interact with that specifc Run(Run model) based upon UserID Strech Goal is for a user to choose a specific training plan (5k,10k,half, full marathon) then give them a templeted training plan.

AUTH: Only signed in users will have access to the ability to Runs/Goals/Training plans. Signed in users will only have access to their runs and goals. All users will have access to the same training plans however only admin users will have the ability to post/edit/delete.

APIs: For the backend API I will be using RunSignUp(https://runsignup.com/Api/races/GET), which will allow users to see races in their local area based on the address zipcode they provide in their Users model and their running goals. For the frontend I intend to used bootstrap for styling purposes and Weather API (https://www.weatherapi.com/) to allow users to see what the weather was like for each specific run as well as the current weather.

Pitch: You've heard of strava and Nike Run Club, but what ability do those programs not allow you to do(I think)? They don't give you the ability to see all the local races being held in your area that you may be interested in based upon your current running goals. Now you will have the ability to plan races ahead of time and mold your current or new(if stretch goal is complete) training plan to a specific race all in one place while seeing your progress towards that target time.

#App templete layout from tldraw/ with user stories

![Alt Text](./Resources/shapes.png)

#Database design and layout 

![Alt Text](./Resources/drawSQL-run-app-personal-project-export-2023-08-08.png)