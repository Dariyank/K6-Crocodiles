import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";
import { createNewUser, createExistingUser, loginToAccount } from '../objects/loginObjects.js';
import { group } from 'k6';

const baseURL = "https://test-api.k6.io";

export const options = {
	thresholds: {
		http_req_duration: ['p(95) < 4000'],
	},
	scenarios: {
    Login: {
      exec: 'loginFlow',
      executor: 'constant-vus',
      vus: 4,
      duration: "30s",
    },
    crocodileEdit: {
      exec: 'crocodileTests',
      executor: 'constant-vus',
      vus: 10,
      duration: "70s",
    },
  },
} 

let data, token;

export function loginFlow(){

	group("Creating a new user", () => {
		data = createNewUser(baseURL);
	});

	group("Create new user with existing info", () => {
		createExistingUser(baseURL);
	});
	
	group("login with an existing user", () => {
		token = loginToAccount(baseURL, data);
	});
}

export function crocodileTests(){
	group("create a new crocodile", () => {
		
	});
}

export function handleSummary(data) {
	let time = Date.now()
	return {
		"stdout": textSummary(data, { indent: " ", enableColors: true }),
		[`reports/summary${time}.html`]: htmlReport(data)
	};
}