# Live Market Data

This project aims to develop a website that provides live stock market data to users. It will serve as a platform where users can access real-time information about stocks and crypto, including current prices, price changes, market capitalization, and other relevant data.

## Getting Started

1. Clone the repository:

git clone https://github.com/DishaGup/pink_purple_palace.git

2. Install dependencies:

### Backend


npm install

### Frontend

cd view <br>
npm install

3. Set up environment variables:

### Backend

Create a `.env` file in the root directory and provide the necessary environment variables:
PORT=8080
MONGODB_URL=your_mongodb_url

4. Start the server:

### Backend - npm run server

### Frontend - npm run start

<hr/>

The frontend server will start running on http://localhost:3000.

The backend server will start running on http://localhost:8080.

## API Endpoints

### <u>User Registration and Login</u>

<ul>
  <li>
    <h3>Register a User</h3>
    <ul>
      <li><strong>Method:</strong> <code>POST</code></li>
      <li><strong>URL:</strong> <code>/users/register</code></li>
      <li>
        <h4>Request Body</h4>
        <pre>
{
  "email": "dummy@example.com",
  "password": "dummy",
  "name": "dummy",
  "username": "dummy12"
}
        </pre>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201 Created</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "message": "Account created successfully"
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Login</h3>
    <ul>
      <li><strong>Method:</strong> <code>POST</code></li>
      <li><strong>URL:</strong> <code>/users/login</code></li>
      <li>
        <h4>Request Body</h4>
        <pre>
{
  "email": "dummy@gmail.com",
  "password": "dummy"
}
        </pre>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "message": "Login Successful",
  "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI"
},
 "userD": [
       {
      "_id": "6489c982c4690f217cd44d66",
      "name": "sara",
      "username": "sara23",
      "email": "sara@gmail.com",
      "password": "$2b$04$h8HeyK3ExagumMlGlSDMNuMUg8Byqo3DG8MUGhoQKERb7O5MKNnRK"
    }

]
</pre>
</li>
</ul>
</li>
</ul>

  </li>

 <li>
    <h3>Get All Users Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/users</code></li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201</code></li>
          <li>
            <h5>Body</h5>
            <pre>
  {
      "_id": "6489c982c4690f217cd44d66",
      "name": "sara",
      "username": "sara23",
      "email": "sara@gmail.com",
      "password": "$2b$04$h8HeyK3ExagumMlGlSDMNuMUg8Byqo3DG8MUGhoQKERb7O5MKNnRK"
    },
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<br/>
<hr/>

<br/>

### <u>User Data -endpoints for the `userDataRouter`</u>

<ul>
  <li>
    <h3>Get User Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/data/user</code></li>
     
  <li>
    <h4>Headers</h4>
    <pre>
    {
      Authorization: Bearer [token]
      // Other headers
    }
    </pre>
  </li>

   <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "users": [
     {
      "bookmarked": false,
      "_id": "6489ca781183bcb2ad1a8c7e",
      "userName": "sara",
      "userId": "6489c982c4690f217cd44d66",
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB",
    //some other key
    },
  ]
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Add User Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>POST</code></li>
      <li><strong>URL:</strong> <code>/data/user/add</code></li>
       <li>
        <h4>Request Body</h4>
        <pre>
 {
    userName: { type: String, required: true },
    userId: { type: String, require: true },
   // some other keys
  },
        </pre>
      </li>

 <li>
    <h4>Headers</h4>
    <pre>
    {
      Authorization: Bearer [token]
      // Other headers
    }
    </pre>
  </li>

  <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "users": 
    {
      "bookmarked": false,
      "_id": "6489ca781183bcb2ad1a8c7e",
      "userName": "sara",
      "userId": "6489c982c4690f217cd44d66",
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB",
    //some other key
    },
    ...
  
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Delete User Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>DELETE</code></li>
      <li><strong>URL:</strong> <code>/data/user/delete/:id</code></li>
      <li>
        <h4>URL Parameters</h4>
        <ul>
          <li><strong>id:</strong> The ID of the user data to be deleted</li>
        </ul>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201 Created</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "message": "Deleted Successfully"
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Get Particular data from User's Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/data/user/single/:id</code></li>
      <li>
        <h4>URL Parameters</h4>
        <ul>
          <li><strong>id:</strong> The ID of the user data to retrieve</li>
        </ul>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>201 Created</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "searchList": 
   {
      "bookmarked": false,
      "_id": "6489ca781183bcb2ad1a8c7e",
      "userName": "sara",
      "userId": "6489c982c4690f217cd44d66",
      "id": "binancecoin",
      "symbol": "bnb",
      "name": "BNB",
    //some other key
    },
    ...
  
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
  <li>
    <h3>Search User Data</h3>
    <ul>
      <li><strong>Method:</strong> <code>GET</code></li>
      <li><strong>URL:</strong> <code>/data/user/search</code></li>
      <li>
        <h4>Query Parameters</h4>
        <ul>
          <li><strong>name:</strong> Search for user data by name (optional)</li>
        </ul>
      </li>
      <li>
        <h4>Response</h4>
        <ul>
          <li><strong>Status:</strong> <code>200 OK</code></li>
          <li>
            <h5>Body</h5>
            <pre>
{
  "searchList": [
    {
      "field1": "value1",
      "field2": "value2",
      ...
    },
    ...
  ]
}
            </pre>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>

<br/>

## Error Handling
Errors are handled by returning appropriate status codes and error messages. The API provides meaningful error messages and status codes to help identify and resolve issues.

## Authentication/Authorization
The API uses token-based authentication. Users must provide an access token in the request headers to access protected routes. To include the access token in API requests, include an `Authorization` header with the value `Bearer {access_token}`. Replace `{access_token}` with the actual access token obtained during the login process.

Example of including the access token in the header:

<pre>
 axios
    .post(`${url}/data/user/add`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
</pre>



---

<br/>

## Features

- User Registration: Allows users to create a new account.
- User Login: Authenticates users and provides access tokens for authorization.
- Display Stock Market Data: Fetches and displays live stock market data from the backend API.
- Error Handling: Provides meaningful error messages for better user experience.
- User Can save The stock in WatchList


## Dependencies

- **@chakra-ui/react**: UI component library based on the Chakra UI system.
- **axios**: Promise-based HTTP client for making API requests.
- **react**: JavaScript library for building user interfaces.
- **react-dom**: Provides DOM-specific methods for React.
- **react-icons**: Icon library for React applications.
- **react-redux**: Official React bindings for Redux state management.
- **react-router-dom**: Declarative routing for React applications.
- **redux**: Predictable state container for JavaScript apps.
- **redux-thunk**: Middleware for Redux to handle asynchronous actions.

## Project Structure

cd view

The project follows a specific folder structure:

- **src**: Contains the source code files.
  - **components**: Contains reusable React components.
  - **pages**: Contains the main page components.
  - **customHook**: Contains utility/helper functions.
  - **redux**: Contains Redux-related files.
    - **action**: Contains action creators and functions for making API requests.
    - **reducers**: Contains Redux reducers.
    - **store**: Contains the Redux store configuration.
    - **actiontype**: Contains type of action.
  - **routes**: Contains Redux-related files.
    - **Allroute**: Contains routes.
    - **Private route**: Function to prevent unauthorized authentication.


# Snapshots 

## Login Page
![login](https://github.com/DishaGup/pink_purple_palace/assets/115460391/504c6552-a985-4743-ab8e-8b9e530f1446)


---

## Registeration Page 

![registeration](https://github.com/DishaGup/pink_purple_palace/assets/115460391/4d9fea62-19bf-4898-81b3-df6aec6f9916)


---


## Homepage

- User is Not Logged In

![user-not-logged-in](https://github.com/DishaGup/pink_purple_palace/assets/115460391/937903e2-c073-41d9-820d-8d4f1a1ed6e9)

- User is Logged In

![user-logged-in](https://github.com/DishaGup/pink_purple_palace/assets/115460391/f56f2ecf-2a38-4baf-bd19-2836639e8aaa)

- Search bar
  
![searchbar](https://github.com/DishaGup/pink_purple_palace/assets/115460391/5f963af5-91e6-4e1f-ac97-f6f609a95e0c)

---

## Single Stock Page

![single-stock-page](https://github.com/DishaGup/pink_purple_palace/assets/115460391/7a5b638a-eb5a-4bfd-a6bb-71d1d8aa1598)
