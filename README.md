These instructions assume you are running Windows. For not Windows users the path format will be different but most of the process remains constant.

## Set up you development environment
1. Install node.js
2. Install mongodb
3. Install git
4. Update PATH environmental variable (your values may be different)
	- For NodeJs add C:\Program Files\nodejs to your path
	- For MongoDB add C:\Program Files\MongoDB 2.6 Standard\bin to your path
	- For GIT add C:\Program Files (x86)\Git\bin to your path
5. Create a directory in your root called 'data' and create a directory inside 'data' called 'db'
6. Install yeoman 
	- npm install -g yo
7. Install angular-generator
	- npm install -g generator-angular
	
### Double check that
1. node is in your PATH
2. mongod is in your PATH
2. git is in your PATH
3. The directory C:\data\db exists

## Install application dependencies
1. Execute npm install
	- This should install all the dependencies listed in package.json

## Initializing and running the server
1. Start MongoDB 
	- mongod
2. Run the server
	- grunt serve

