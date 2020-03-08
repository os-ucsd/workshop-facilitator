# workshop-facilitator
A tool for student orgs to facilitate workshops

# Get started
1. Create a cluster on MongoDB Atlas and connect your local copy of Workshop Facilitator to the cluster by copy-pasting the given connection string into a config.js file you'll create in /backend  
```
export default {ATLAS_URI: "{your connection string here}"};
```  
Don't forget to replace the password in your connection string with the actual password of the user you created.  
2. Open two terminals and run ```npm install``` in order to install all required dependencies for the frontend then run ```npm start``` in /workshop-facilitator to start the React development server on localhost:3000 in one.  
3. In the other terminal, run ```npm install``` to install all required dependencies for the backend then ```nodemon index.js``` in /backend to start the backend server on localhost:5000.
