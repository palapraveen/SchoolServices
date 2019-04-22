import {StudentController} from "./controller/StudentController";
import {TeacherController} from "./controller/TeacherController";
export const Routes = [
{
    method: "post",
    route: "/api/student",
    controller: StudentController,
    action: "addStudent"
},{
    method: "post",
    route: "/api/teacher",
    controller: TeacherController,
    action: "addTeacher"
},{
    method: "post",
    route: "/api/register",
    controller: TeacherController,
    action: "register"
},
{
    method: "get",
    route: "/api/commonStudents",
    controller: TeacherController,
    action: "getcommonStudents"
},
{
    method: "post",
    route: "/api/suspend",
    controller: TeacherController,
    action: "suspend"
},
{
    method: "post",
    route: "/api/retrievefornotifications",
    controller: TeacherController,
    action: "retrieveNotifications"
}];
