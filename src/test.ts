"use strict";

//Require the dev-dependencies

let chai = require('chai');
let chaiHttp = require('chai-http');

// let server = require('../server');
let should = chai.should();

//var chai = require('chai');  
var expect = require('chai').expect;
let assert = chai.assert;

//var chaiHttp = require('chai-http');
let app = require('express');
var Student = '../entity/student';
var Teacher = '../entity/teacher';

chai.use(chaiHttp);

describe("API Test cases for both Student and teacher controllers", () => {

    let Url = 'http://localhost:3000/api';

    it('should add the students successfull scenerio', async () => {
        const req = {
            'email': 'student1@school.com',
            'name': 'abc1'
        }
        try {
            const res = await chai.request(app).post(Url + '/student').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(204)
                    expect(res.body).to.be.equal('Successfully Added Student')
                })

        }
        catch (err) {

        }
    });

    it('when we try to add student with empty email', async () => {
        const req = {
            'email': '',
            'name': 'abc1'
        }
        try {
            const res = await chai.request(app).post(Url + '/student').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(400)
                    expect(res.body).to.be.equal('Email is mandatory')
                })

        }
        catch (err) {

        }
    });

     it('should add the teacher in successfull scenerio', async () => {
        const req = {
            'email': 'teacher1@school.com',
            'name': 'teacher1'
        }
        try {
            const res = await chai.request(app).post(Url + '/teacher').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(204)
                    expect(res.body).to.be.equal('Successfully Added teacher')
                })

        }
        catch (err) {

        }
    });

     it('should register student in successfull scenerio', async () => {
        const req = {
                 "teacher": "teacher1@school.com",
                 "students":
                  [
                    "student1@school.com"
                  ]
              }
        try {
            const res = await chai.request(app).post(Url + '/register').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(204)
                    expect(res.body).to.be.equal('Student Successfully registered to the teacher ')
                })

        }
        catch (err) {

        }
    });

     it('get commmon students in successfull scenerio', async () => {
        try {
            const res = await chai.request(app).post(Url + '/commonstudents?teacher=teacher1@school.com').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.equal(' Successfully got commmon students ')
                })

        }
        catch (err) {

        }
    });
  
    it('get notifications in successfull scenerio', async () => {
        const req = {
                  "teacher": "teacher1@school.com",
                  "notification": "Hello students! @student1@school.com @student2@school.com"
                }
        try {
            const res = await chai.request(app).post(Url + '/retrievefornotifications').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(200)
                    expect(res.body).to.be.equal(' Successfully sent notifications ')
                })

        }
        catch (err) {

        }
    });

    it('suspend the student successfull scenerio', async () => {
        const req = {
                    "student" : "student1@school.com"
                  }
        try {
            const res = await chai.request(app).post(Url + '/suspend').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(204)
                    expect(res.body).to.be.equal(' Successfully suspend the student ')
                })

        }
        catch (err) {

        }
    });

    it('when student is not found in database when we hit suspend  ', async () => {
        const req = {
                    "student" : "student1@school.com"
                  }
        try {
            const res = await chai.request(app).post(Url + '/suspend').
                set({ 'content-Type': 'application/json; charset=utf-8' })
                .send((req) => {
                    expect(res).to.be.json
                    expect(res).to.have.status(404)
                    expect(res.body).to.be.equal('student ID is not exist in data base ')
                })

        }
        catch (err) {

        }
    });

});