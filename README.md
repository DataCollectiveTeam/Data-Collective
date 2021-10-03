# Data Collective

Data Collective is a citizen science platform for anyone to participate in scientific research and observation. Data Collective users can create projects tracking topics they care about, gather relevant data, and create accessible visualizations to share their findings.

[Deployed App](#)

[Backend Repository](https://github.com/DataCollectiveTeam/Data-Collective-Backend)

## Why Citizen Science Matters

Citizen Science expands the capacity of the scientific research community by encouraging non-professionals to engage in research and observation. Public involvement in a research initiative allows for a larger scale of data collection and encourages the grassroots support of more localized projects.

Citizen Science projects also expand public understanding of the scientific research process through participation. Incorporating citizen science into schools’ curriculum supports authentic, project-based exposure to core science practices. Community-based Citizen Science initiatives encourage life-long science learning outside of the classroom and foster investment in local ecosystems.

## Features List
* Users can create a password-protected profile and log in and out of their accounts
* Users can view active projects, including data, discussion posts, and visualizations
* Users can search for projects by title, description, or creator
* Users can create new projects open to public contribution.
* Project creators can create labeled forms, which format the data entries for each project
* Project contributors can submit data entries for any active project
* Project creators can create visualizations using bar, line, and pie charts to help users to interpret project data
* Creators and contributors can post discussion topics on a project page
* Creators can pin important discussions to the discussion board or delete off-topic posts

## Features Demonstrations
### Users can create a password-protected profile and log in and out of their accounts
![login](https://github.com/DataCollectiveTeam/Data-Collective/blob/master/public/gifs/login.gif)
### Users can create new projects open to public contribution.
![new project](https://github.com/DataCollectiveTeam/Data-Collective/blob/master/public/gifs/new_project.gif)
### Project contributors can submit data entries for any active project
![data entry](https://github.com/DataCollectiveTeam/Data-Collective/blob/master/public/gifs/data_entry%20.gif)
### Project creators can create visualizations using bar, line, and pie charts to help users to interpret project data
![data visualization](https://github.com/DataCollectiveTeam/Data-Collective/blob/master/public/gifs/data_vis.gif)

## Technologies Used:
* [React.js:](https://reactjs.org/) Frontend
* [Django REST Framework:](https://www.django-rest-framework.org/) Backend
* [Heroku:](https://dashboard.heroku.com/) Web hosting

## Dependencies:
* Axios: Promise-based HTTP client
* React-router-dom: Document object bindings for React router
* React-google-charts: React wrapper for dynamic visualizations

## Development Team
Michael Dunn-O’Connor - [GitHub](https://github.com/dunnoconnor) - [LinkedIn](https://www.linkedin.com/in/michael-dunn-o-connor/)

Cole Rener - [GitHub](https://github.com/dishbin) - [LinkedIn](https://www.linkedin.com/in/cole-rener/)

## Project Planning and Workflow
We used GitHub project pages for planning and managing our workflow.  We identified that creating users, projects, forms, and data entries were all crucial to our MVP so we began by developing backend models for each of these, with associated urls and views.  On the front end, we developed the react components and axios calls to interact with each database model.  When we had full CRUD functionality, we added data visualizations and discussion boards.  For each additional feature, we divided tasks and tracked progress on the project board.  This minimized merge conflicts and allowed us to focus on rapidly completing features.  For the final sprint, we used daily end-of-day checklists to plan backward from our launch date and ensure features would be completed on time.
![project plan](https://user-images.githubusercontent.com/37776449/135728176-50d12dce-2667-4a27-a95d-43a5f849736b.png)

## Initial Project Wireframes
![component heirarchy](https://user-images.githubusercontent.com/37776449/135728250-950e1021-70cb-4886-a557-1cc59d587b46.jpg)
![home feed](https://user-images.githubusercontent.com/37776449/135728254-86da3c85-8417-43d0-b437-e4bf9aa2a9ba.jpg)
![user profile view](https://user-images.githubusercontent.com/37776449/135728263-2147af88-fee4-4037-99ca-bd295ffee87c.jpg)
![project view](https://user-images.githubusercontent.com/37776449/135728275-13973ffd-5660-4674-aeb9-b4e451849901.jpg)
![form creation](https://user-images.githubusercontent.com/37776449/135728282-8099ef62-089f-4c77-8422-ef505e27ab89.jpg)
![data entry form](https://user-images.githubusercontent.com/37776449/135728286-ecd3e7a1-f5fd-4bff-a406-9c2a2d143189.jpg)

### Local Installation Instructions
Fork and clone this repository along with the [Data-Collective-Backend](https://github.com/DataCollectiveTeam/Data-Collective-Backend) repository.

Run the following in your terminal for the frontend:
* `npm i` to install relevant dependencies
* `npm start` to run the app in development mode.

Run the following in a python virtual environment for the backend:
* `python3 manage.py makemigrations`
* `python3 manage.py migrate`
* `python3 manage.py runserver`

### How to Contribute
To make suggestions, create a new issue or pull request on this repo.
