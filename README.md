1) Pre-requisites
	Node,
	MySQL,
	SqlAdmin tool,
	Git, 
	Postman client for chrome,
	Visual studio code .
	
2) under repository name  .click clone or download ,then copy the url and clone the code by using the command
   git clone https://github.com/palapraveen/SchoolServices.git

3) CD SchoolServices

4) npm install

5) please refer db related setting in ormconfig.json. ( db name is : schooldb )

6)  Open the SQLAdmin tool and create a database called 'schooldb'
 
7) To run the application, goto command prompt..
   D:\school>npm  start

API codes used:
200 -> successful process of API purpose and retrieve the resposne 
200 -> successful process of API purpose but no retrieve of response
404 -> Invalid request/not found records situation
400 -> bad request


NOTE: 

1) Please add students, teacher through api's to the database then you can do operations on students and teacher.

2)change the request parameter values as needed, for all POST methods, content-type is 'applicaton/json'

1) add Student to database 
http://localhost:3000/api/student
method: POST
ex: request body:
{
	"email" : "student1@school.com",
	"name"  : "student1"
}

2) add Teacher to database 
http://localhost:3000/api/teacher
method: POST
ex: request body:
{
	"email" : "teacher1@school.com",
	"name"  : "teacher"
}

3) register student 
http://localhost:3000/api/register
method: POST
ex: request body:
 {
"teacher": "teacher1@school.com",
 "students":
    [
    "student1@school.com"
   ]
 }

4) retrieve common students 
http://localhost:3000/api/commonstudents?teacher=teacher1@school.com
method: get

5) suspend student 
http://localhost:3000/api/suspend
method: POST
ex: request body:
 {
 "student" : "student1@school.com"
 }

6) retrieve notifications 
http://localhost:3000/api/retrievefornotifications
method: POST
ex: request body:
 {
    "teacher": "teacher1@school.com",
    "notification": "Hello students! @student1@school.com @student2@school.com"
}
