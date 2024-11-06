import http from 'k6/http';
import { check, sleep } from 'k6';
import crocoData from '../data/crocodileData.js';
import { returnError } from '../utils/common.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createNewCrocodile(url, token){
	let croData = {
		name: crocoData.name + randomString(5),
		sex: crocoData.sex,
		date_of_birth: crocoData.date_of_birth
	}

	let res = http.post(
		`${url}/my/crocodiles/`,
		croData,
		{
			headers: {
				Authorization: 'Bearer ' + token
			}
		}
	)

	let result = check(res, {
		'Crocodile was created correctly': (r) => r.status === 201,
	});
    
	returnError(result, res);

  sleep(1);

	let newCrocodileInfo = {
		id: res.json().id,
		name: res.json().name,
		sex: res.json().sex,
		date_of_birth: res.json().date_of_birth,
	}

	return newCrocodileInfo;
}

export function getNewCrocodiles(url, token){
	let res = http.get(
		`${url}/my/crocodiles/`,
		{
			headers: {
				Authorization: 'Bearer ' + token 
			}
		}
	);

	let result = check(res, {
		'Status is 200': (r) => r.status === 200,
        'Each crocodile has an id': (r) => JSON.parse(r.body).every(croc => croc.id !== undefined),
        'Each crocodile has a name': (r) => JSON.parse(r.body).every(croc => croc.name !== undefined),
        'Each crocodile has a birth date': (r) => JSON.parse(r.body).every(croc => croc.date_of_birth !== undefined),
	});

	returnError(result, res);
}

export function getNewCrocodile(url, token, crocodileInfo){
	let crocoID = crocodileInfo.id;
	let res = http.get(
		`${url}/my/crocodiles/${crocoID}`,
		{
			headers: {
				Authorization: 'Bearer ' + token 
			}, tags:{
				getOne: "get One Crocodile"
			}
		}
	);

	let result = check(res, {
		'Status is 200': (r) => r.status === 200,
		'The crocodile sex is': (r) => r.json().id === crocodileInfo.id,
		'The crocodile name is this': (r) => r.json().name === crocodileInfo.name,
		'The crocodile birthday is': (r) => r.json().date_of_birth === crocodileInfo.date_of_birth,
	});

	returnError(result, res);
}

export function editCrocodile(url, token, id){
	let res = http.get(
		`${url}/my/crocodiles/`,
		{
			headers: {
				Authorization: 'Bearer ' + token 
			}
		}
	);

	let result = check(res, {
		'Status is 200': (r) => r.status === 200,
		'The crocodile sex is': (r) => r.json()[0].id === crocodileInfo.id,
		'The crocodile name is this': (r) => r.json()[0].name === crocodileInfo.name,
		'The crocodile birthday is': (r) => r.json()[0].date_of_birth === crocodileInfo.date_of_birth,
	});

	returnError(result, res);
}
