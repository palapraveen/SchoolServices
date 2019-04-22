import { Entity, Column,PrimaryColumn, ManyToMany, JoinTable } from "typeorm";
import { Student } from "./Student";

@Entity()
export class Teacher { 
    @PrimaryColumn()
    email: string;

    @Column()
    name:string;
    
    @ManyToMany(type => Student, student => student.teachers)
    @JoinTable()
    students: Student[];
}