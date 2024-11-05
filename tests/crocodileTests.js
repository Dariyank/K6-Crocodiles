import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";
import { createNewUser, createExistingUser } from '../objects/loginObjects.js';
import { group } from 'k6';

const baseURL = "https://test-api.k6.io";

export const options = {
    vus: 4,
    duration: "15s"
} 

export default function(){
    group("Creating a new user", () => {
        createNewUser(baseURL);
    });

    group("Create new user with existing info", () => {
        createExistingUser(baseURL);
    })
}

export function handleSummary(data) {
    let time = Date.now()
    return {
      [`reports/summary${time}.html`]: htmlReport(data),
    };
  }