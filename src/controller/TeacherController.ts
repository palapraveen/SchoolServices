import { getManager, getRepository, getConnection, In, Equal } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Teacher } from "../entity/Teacher";
import { Student } from "../entity/Student";
import getORMConnection from '../connection';

export class TeacherController {

    private teacherRepository = getRepository(Teacher);
    private studentRepository = getRepository(Student);

    // API for addTeacher  through post method
    // requestbody:{"email": "TeacherEmailID","name":"TeacherName"}

    async addTeacher(request: Request, response: Response, next: NextFunction) {
        const { email, name } = request.body
        const connection = await getORMConnection()
        if(email!==''){
            const result = await connection.manager.save(connection.manager.create(Teacher, {
                email,
                name
            }));
            response.status(204).send({ 'message': 'Successfully Added Teacher' });
        }else{
            response.status(400).send({ 'message': 'Email is mandatory' });
        }
    }

    // API for Suspend student  through post method
    // requestbody:{"student" : "studentEmailID"}

    async suspend(request: Request, response: Response, next: NextFunction) {
        const { student: email } = request.body;
        if(email !=''){
            let student = await this.studentRepository.findOne(email);
            let result;
            if(student){
            let checkActive = false;
            // if the student is already suspended throw error or suspened successfully 
            student['status'] == 'Suspended' ? response.status(404).send({ 'message': student['email'] + ' is already suspended' }) : checkActive = true;
                if (checkActive) {
                    student['status'] = 'Suspended';
                    result = await this.studentRepository.save(student);
                    response.status(204).send({ 'message': student['email'] + 'succesfully suspended' });
                }
            }else {
                response.status(404).send({ 'message': 'student ID is not exist in data base' });
            }
        }else{
           response.status(400).send({ 'message': 'bad Request' });
        }
    }

    // API for register student or students  through post method
    // requestbody:{"teacher": "teacherEmailID","students":[<StudentsEmailID's seperated by commmas>]};

    async register(request: Request, response: Response, next: NextFunction) {
        const { teacher: email, students } = request.body;
        if(email !=='' && students.length !=0){
            let teacher = await this.teacherRepository.findOne(email);
            let result
            // find the teacher object and assign the students to it 
            if (teacher) {
                const studentEntities = await this.studentRepository.find({
                    email: In(students)
                });
                teacher['students'] = studentEntities
                if(studentEntities.length>0){
                    result = await this.teacherRepository.save(teacher);
                    response.status(204).send({ 'message': 'Student Successfully registered to the teacher' });
                }else{
                    response.status(404).send({ 'message': 'Studnet Id  not exist in database' });
                }
            } else {
                response.status(404).send({ 'message': 'Teacher Id is not exist in database' });
            }
     } else{
           response.status(400).send({ 'message': 'bad Request' });
      }
    }

    //API to get the common students by get method
    // query params: commonstudents?teacher=teacherID
    // if there is more than one teacher then we need  to give Query params as commonstudents?teacher=teachermailID1&teacher=teachermailID2

    async getcommonStudents(request: Request, response: Response, next: NextFunction) {
        let { teacher: emails } = request.query
        if (!Array.isArray(emails)) {
            emails = [emails]
        }
        let teachers = await this.teacherRepository
            .find({
                relations: ['students'],
                where: {
                    email: In(emails)
                }
            })
        let students = [];

        // if there is no  teacher exist

        if (teachers.length < 1) {
            response.status(404).send({ 'message': 'teacherData ID is not exist in data base' });
        }
        students = teachers.map(teacher => teacher['students'])

        // if there is one teacher  and has data 

        let result = students.splice(0, 1)[0];

        if (students.length < 1) {
            if(result.length>0){
              response.status(200).send({ 'students': result.map(x => x.email) });
            }else{
              response.status(404).send({ 'students': 'No Common Student Exists for the teacher' });
            }
        }

        // if there is more than one teacher  and has data 

        const data = students.reduce((accumulator, currentValue) => {
            let list = accumulator.filter(x => {
                return currentValue.some(student => {
                    return student.email === x.email
                })
            }
            );
            return list
        }, result)
        
        if(data.length>0){
          response.status(200).send({ 'students': data.map(x => x.email) });
        }else{
           response.status(404).send({ 'students': 'No Common Student Exists for the teacher' });
        }
    }


    //API to get the retrieveNotifications  by post method
    // request body: {"teacher": "teacherEmailID","notification": <any text or mailID seperated using @>}

        async retrieveNotifications(request: Request, response: Response, next: NextFunction) {
         let { teacher: email, notification } = request.body;
         if(email!==''){
            // find the teacher object with students list by giving teacher email id
            let teacherData = await this.teacherRepository
                .find({ relations: ['students'], where: { email: email } });
            let studentList = [];
            if (teacherData.length !== 0) {
                for (const value of teacherData) {
                    for (const list of value['students']) {
                        if (list.status !== 'Suspended') {
                            studentList.push(list.email);
                        }
                    }
                }
                let NotificationArr = request.body['notification'].split(" ");
                if (NotificationArr.length > 0) {
                    for (let value of NotificationArr) {
                        if (value[0] == '@') {
                            const getemailNotification = value.toString().substring(1);
                            let checkNotoifictionEmailID = await this.studentRepository.find({
                                where:
                                    { email: getemailNotification }
                            });
                            if (checkNotoifictionEmailID.length !== 0) {
                                for (let value of checkNotoifictionEmailID) {
                                    if (value['status'] === 'Active') {
                                        studentList.push(value['email']);
                                    }
                                }
                            } else {
                                studentList.push(getemailNotification);
                            }
                        }
                    }
                }

                // remove duplicates  

                let uniqueList = [];
                for (let value of studentList) {
                    if (uniqueList.indexOf(value) == -1) {
                        uniqueList.push(value);
                    }
                }
                response.status(200).send({ 'recipients': uniqueList });
            } else {
                response.status(404).send({ 'message': 'teacherData ID is not exist in data base' });
            }
         }else{
              response.status(400).send({ 'message': 'bad Request' });
         }
     }

}