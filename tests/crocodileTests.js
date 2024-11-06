import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { createNewUser, createExistingUser, loginToAccount, loginToInvalidAccount } from '../objects/loginObjects.js';
import { createNewCrocodile, getNewCrocodiles, getNewCrocodile } from '../objects/editCrocodileObjects.js';
import { group } from 'k6';

const baseURL = "https://test-api.k6.io";

export const options = {
	thresholds: {
		http_req_duration: ['p(95) < 3000'],
	},
	scenarios: {
    Login: {
      exec: 'loginFlow',
      executor: 'constant-vus',
      vus: 1,
      duration: "8s",
    },
    crocodileEdit: {
      exec: 'crocodileTests',
      executor: 'constant-vus',
      vus: 1,
      duration: "20s",
	  	startTime: '9s'
    },
  },
} 

export function loginFlow(){

	let data;

	group("Login - Working with valid user", () => {
		data = createNewUser(baseURL);
		loginToAccount(baseURL, data);
	});

	group("Login - Working with invalid user", () => {
		createExistingUser(baseURL);
		loginToInvalidAccount(baseURL, {username: "false", password: "false"});
	});
}

export function crocodileTests(){

	let data, token, newCroco;
	
	group("Edition - Create a new crocodile", () => {
		data = createNewUser(baseURL);
		token = loginToAccount(baseURL, data);
		newCroco = createNewCrocodile(baseURL, token);
	});

	group("Edition - Get all crocodiles", () => {
		data = createNewUser(baseURL);
		token = loginToAccount(baseURL, data);
		for (let crocoIndex = 0; crocoIndex < 5; crocoIndex++) {
			newCroco = createNewCrocodile(baseURL, token);
		}
		getNewCrocodiles(baseURL, token);
	});

	group("Edition - Get a Crocodile crocodile", () => {
		data = createNewUser(baseURL);
		token = loginToAccount(baseURL, data);
		newCroco = createNewCrocodile(baseURL, token);
		getNewCrocodile(baseURL, token, newCroco);
	});
}

export function handleSummary(data) {
	let time = Date.now()
	return {
		"stdout": textSummary(data, { indent: " ", enableColors: true }),
		[`reports/summary${time}.html`]: htmlReport(data)
	};
}