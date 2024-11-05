import http from 'k6/http';
import { check, sleep } from 'k6';
import userData from '../data/userData.js';
import { returnError } from '../utils/common.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createNewUser(url) {
    let [localPart, domainPart] = userData.email.split("@");
    let [domain, extension] = domainPart.split(".");
    domain = domain + randomString(5);
    let userEmail = localPart+"@"+domain+"."+extension;
    
    let data = {
        username: userData.username + "-" + randomString(8), 
        first_name: userData.firstname, 
        lastname: userData.lastname, 
        email: userEmail, 
        password: userData.password
    }

    let res = http.post( (url+'/user/register/'), data );

    let result = check(res, {
        'The status is 201': (r) => res.status === 201,
        'Status message is "201 Created"': (r) => r.status_text === "201 Created",
        'Username is saved correctly': (r) => (r.body).includes(userData.username)
    });

    returnError(result, res);

    sleep(1);
}

export function createExistingUser(url){
    let data = {
        username: "Dariyank", 
        first_name: "Test", 
        lastname: "Test", 
        email: "example@test.com", 
        password: "123456"
    }

    let res = http.post( (url+'/user/register/'), data );

    let result = check(res, {
        "Unable to create": (r) => r.status === 400,
        "The Username already exist message appears": (r) => (r.body).includes("A user with that username already exists."),
        "The Email already exist message appears": (r) => (r.body).includes("User with this email already exists!")
    });

    returnError(result, res);

    sleep(1);
}

export function loginToAccount(url){
    
}
