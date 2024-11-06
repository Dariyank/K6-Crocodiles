import http from 'k6/http';
import { check, sleep } from 'k6';
import crocoData from '../data/crocodileData.js';
import { returnError } from '../utils/common.js'
import { randomString } from 'https://jslib.k6.io/k6-utils/1.2.0/index.js';

export function createNewcrocodile(url, token){
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
		name: res.json().id,
		sex: res.json().name,
		date_of_birth: res.json().age,
	}

	return newCrocodileInfo;

}
