import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { createNewUser, createExistingUser, loginToAccount, loginToInvalidAccount } from '../objects/loginObjects.js';
import { createNewcrocodile } from '../objects/editCrocodileObjects.js';
import { group } from 'k6';

const baseURL = "https://test-api.k6.io";

export const options = {
	thresholds: {
		http_req_duration: ['p(95) < 6000'],
	},
	scenarios: {
    Login: {
      exec: 'loginFlow',
      executor: 'constant-vus',
      vus: 4,
      duration: "40s",
    },
    // crocodileEdit: {
    //   exec: 'crocodileTests',
    //   executor: 'constant-vus',
    //   vus: 5,
    //   duration: "70s",
    // },
  },
} 

export function loginFlow(){

	let data;

	group("Working with valid user", () => {
		data = createNewUser(baseURL);
		loginToAccount(baseURL, data);
	});

	group("Working with invalid user", () => {
		createExistingUser(baseURL);
		loginToInvalidAccount(baseURL, {username: "false", password: "false"});
	});
}

export function crocodileTests(){

	let data, token, newCroco;

	group("Create a new Crocodile", () => {
		data = createNewUser(baseURL);
		token = loginToAccount(baseURL, data);
		newCroco = createNewcrocodile(baseURL, token);
	});

	group("Edit existing crocodilec", () => {
		
	});
}

export function handleSummary(data) {
	let time = Date.now()
	return {
		"stdout": textSummary(data, { indent: " ", enableColors: true }),
		[`reports/summary${time}.html`]: htmlReport(data)
	};
}