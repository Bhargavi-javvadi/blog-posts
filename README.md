Blog Application
A simple blog application built with Node.js, Express, and MongoDB for the backend, and a basic frontend for displaying blog posts.
Installation
BACKEND
1.Clone the Repository:
    git clone https://github.com/your-username/blog-app.git
    cd blog-app
    
2.Install Backend Dependencies:
Run the following command to install the required Node.js packages:
     npm install

3.Set Up MongoDB:
Ensure MongoDB is installed and running on your local machine. The application connects to a local MongoDB instance by default.

4.Start the Server:
Use the following command to start the Node.js server:
     node server.js
The server will run on http://localhost:5000.

FRONTEND

1.Navigate to the Frontend Directory:
If the frontend is in a separate directory (e.g., frontend), navigate to it:
     cd frontend

2.Install Frontend Dependencies:
Run the following command to install the required packages:
      npm install

3.Start the Frontend Application:
Use the following command to start the frontend development server:
   npm start
The frontend will be served on http://localhost:3000Running the Application


Frontend: Navigate to http://localhost:3000 in your web browser to view the blog posts and interact with the application.
Backend: Ensure the backend server is running at http://localhost:5000 to handle API requests from the frontend. (or another port if configured differently).

OVERVIEW:
Frontend: The HTML, CSS, and JavaScript files handle the presentation and user interactions of the blog application. The frontend communicates with the backend through API calls to fetch and display blog posts.
Backend: The Node.js and Express server provides API endpoints for managing blog posts and connects to a MongoDB database.
The application allows users to view a list of blog posts and add new ones. The frontend fetches data from the backend API and displays it in the browser.
