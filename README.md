
## Frontend

1. Navigate to the frontend directory (cd ../frontend)
2. Install dependencies (npm install)
3. create folder under src  name it environment
4. under it create a file name it environment.ts and inside it write

    export const environment = {
  production: false,
  apiUrl: 'https://igdb-game-explorer.onrender.com',
  clientId: '0oahrr9tqq4ez9uc2170n9pgvhk8v1',
  MultiQuery_URL: 'https://api.igdb.com/v4/multiquery',
  Games_URL: 'https://igdb-game-explorer.onrender.com/games',
};

6. create another file on enviroment folder and name it environment.prod.ts and inside it write
   export const environment = {
  production: true,
  apiUrl: 'https://igdb-game-explorer.onrender.com',
  Games_URL: 'https://igdb-game-explorer.onrender.com/games',
  clientId: '0oahrr9tqq4ez9uc2170n9pgvhk8v1',
  MultiQuery_URL: 'https://igdb-game-explorer.onrender.com/multiquery'
}; 

8. Run the Frontend Server (npm start)


## Access the Application

Open your web browser and go to  http://localhost:4200/ to view the application.
