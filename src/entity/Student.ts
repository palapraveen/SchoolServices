import { Entity, Column,PrimaryColumn, ManyToMany } from "typeorm";
import { Teacher } from "./Teacher";

export type StudentStatus = 'Active' | 'Suspended';
 
@Entity()
export class Student {
    @PrimaryColumn()
    email: string;
    
    @Column()
    name:string;
    @Column({
        type:'enum',
        enum:['Active','Suspended'],
        default:'Active'
    })
    status: StudentStatus;

    @ManyToMany(type => Teacher, teacher => teacher.students)
    teachers: Teacher[];
}

