import { getRepository, getManager, createConnection } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Student } from "../entity/Student";
import { Teacher } from "../entity/Teacher";
import getORMConnection from '../connection';
export class StudentController {

    private studentRepository = getRepository(Student);
    private teacherRepository = getRepository(Teacher);

    // API for addStudent through post method
    // requestbody:{"email": "studentEmailID","name":"StudentName"}
    async addStudent(request: Request, response: Response, next: NextFunction) {
        const { email, name } = request.body
        const connection = await getORMConnection()
        if(email!==''){
            const result = await connection.manager.save(connection.manager.create(Student, {
                email,
                name
            }));
            response.status(204).send({'message':'Successfully Added Student'});
        }else{
            response.status(400).send({'message':'Email is mandatory'});
        }
    }
   
}