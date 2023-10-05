To start server in nodemon: `npm run dev`
To start server and listen for updates: `node --watch index.js`

## Example graphql queries

##### user creation

`mutation {
  createUser (
    username: "mluukkai"
  ) {
    username
    id
  }
}`

##### logging in

`mutation {
  login (
    username: "mluukkai"
    password: "secret"
  ) {
    value
  }
}`

once user is logged in, all queries need to have the `authorization Bearer ...` added.
The value for the Bearer is returned from the login mutation
![Login](images/login.png 'Login example')
![Bearer example](images/bearer.png 'Bearer example')

##### returning the current logged in user

`query {
  me {
    username
    id
    friends {
      name
    }
  }
}`

##### returning the user's friends list

`query {
  me {
    username
    friends{
      name
      phone
    }
  }
}`

![Friends list example](images/friends-list.png 'Friends list example')
