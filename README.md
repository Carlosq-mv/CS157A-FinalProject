# Student Center: A Student Management System 

# Getting Started
### Prerequisites 
Before starting, ensure you have the following installed on your system:

1. **[MySQL Server](https://dev.mysql.com/downloads/mysql/):**
   - Required for database management and handling backend data storage.
   - [Installation Guide for MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html).

2. **[Java Development Kit (JDK)](https://www.oracle.com/java/technologies/downloads/):**
   - Necessary for running Java-based applications and tools.
   - Recommended version: JDK 17 or above.
   - [Installation Guide for Java](https://docs.oracle.com/en/java/javase/17/install/overview-jdk-installation.html).
3. **[Node.js](https://nodejs.org/):**
   - Required for building and running the React frontend.
   - Recommended version: LTS (Long-Term Support) version.
   - [Installation Guide for Node.js](https://nodejs.org/en/download/).



### Next Steps
#### Clone Repo
- Once all the prerequisites are installed, clone this repository:
```shell
    git clone https://github.com/Carlosq-mv/CS157A-FinalProject.git
```

#### Database Setup
- **NOTE**: In our Spring Boot application, the `application.properties` file contains hardcoded `username` and `password` set to `root` and `3000`. Feel free to change these values as per your requirements.
- Log into your MySQL server: `mysql -u root -p`
- Create the database: `create database StudentManagementSyst`
- **Note**: The schema is automatically initialized when the project is run. The above below is optional if you prefer to manually set up the database
- **Optional**: To create the schema and prepopulate the database, run the following commands in a terminal window at the root of this project:
```shell
    # create the schema
    $ mysql -u root -p StudentManagementSyst  < create_schema.sql  

    # populate the tables
    $ mysql -u root -p StudentManagementSyst  < initialize_data.sql
``` 
#### Running Backend
- Open a new terminal window
```shell
    # Navigate to the root of the server folder
    $ cd server/backend

    # Run the Spring Boot project
    $ ./mvnw spring-boot:run 
```
- **Alternatively**, if you are using an IDE run the program directly from the BackendApplication file by selecting the Run option.

#### Running Frontend
- Open a new terminal window
```shell
    # Navigate to the client folder
    $ cd client

    # Install all necessary dependencies
    $ npm install

    # Run the React application
    $ npm run dev
```
- Open your favorite browser and navigate to: `localhost:5173` or `http://localhost:5173/`

# Final Notes
- Once both the backend and frontend servers are running, the application will be fully functional and accessible for use.
