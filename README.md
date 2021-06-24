# BlogPostAppNodeJs
This is a simple node js web application that perform kinda CRUD operations

## What is the app about?
Users can view blog posts posted by other users on the main page

Any user can post blog posts --> go to "My Posts" on the nav bar
In "My Posts" sections, you can manage your posts Create, Update, Delete and Read
"My Posts" is only available to signed in users


## Requirements to run
Requires #Node and #MongoDB

This node js App used MongoDB for storing documents.
Run mongo db server at port: 27017
Or change it in constants file in root directory.

Run mongod server and mongo through cmd
(and dont forget to have 'data/db' directory under C:/)

To add some dummy data start the app and, hit the url: /admin 'once', more times you do, you get more dummy data but repeated

### To start
use -- npm start (DEBUG mode)
use -- npm run no_debug_start

To get to the root, hit http://localhost:4000 , set your own port in package.json file

## Thank you

