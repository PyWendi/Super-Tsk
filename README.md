﻿# Super-TASK

Super-TASK is a task management web application that provides robust functionalities for managing tasks. This project uses Node.js (Express) for the backend with Sequelize as the ORM and Quasar for the frontend.

## Table of Contents

- [Installation](#installation)
  - [Backend](#backend)
  - [Frontend](#frontend)
- [Usage](#usage)
- [Contact](#contact)

## Installation

### Backend

1. **Clone the Repository:**
   ```sh
   git clone https://github.com/PyWendi/Super-Tsk.git
   cd <repository_directory>

2. **Naviagate to the Backend directory:**
   ```sh
    cd backend

3. **Create the Database:**
   
   Create a database named taskscheduler using your preferred method (e.g., MySQL Workbench, CLI).
   
4. **Install nodemon globally:**
    Nodemon is used to run the backend app constantly while waiting for changes in project files
   ```sh
    npm install -g nodemon

5. **Install Dependencies:**
   ```sh
    npm install

6. **Create a `.env` file:**
   ```sh
    DB_NAME=taskscheduler //db name by default for the project
    DB_USER=root 
    DB_PASSWORD=root // if there's a password
    DB_HOST=127.0.0.1
    DB_PORT=3306
    PORT=8000
    SECRET=admin1234

7. **Run migrations:**
   ```sh
    npx sequelize db:migrate
    or
    sequelize db:migrate // with sequelize-cli globally installed
    
8. **Create two users, one admin and one a simple user:**
   Use postman or a similar tool to create the user using the api :)

9. **Run the backend application**
   ```sh
   nodemon src/index.js
   

### Frontend

1. **Navigate to the client:**
   ```sh
   cd client

2. **Install Quasar CLI globally:**
   ```sh
    npm install -g @quasar/cli
    
3. **Install Dependencies:**
   ```sh
    npm install

4. **Create a `.env` file with the following content:**
   ```sh
    API_URL='http://127.0.0.1:8000/api/' // backend url
    
5. **Start the frontend Application:**
   ```sh
    quasar dev
    
    
## Usage
To use Super-TASK, navigate to the backend and frontend URLs in your web browser. The backend server will be running at http://127.0.0.1:8000, and the frontend will be accessible as specified by Quasar CLI output.


## Contact
If you have any questions or need further assistance, feel free to contact me at:
rakotondranaivogilbert21@gmail.com


Feel free to customize the content further according to your specific requirements and preferences.
