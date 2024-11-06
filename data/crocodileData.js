import faker from "https://cdnjs.cloudflare.com/ajax/libs/Faker/3.1.0/faker.min.js"

const gender = Math.random() < 0.5 ? "M" : "F";

const start = new Date("2023-01-01").getTime();
const end = new Date(new Date()).getTime();
const randomTime = start + Math.random() * (end - start);

const randomDate = new Date(randomTime);
let birthDate = randomDate.toISOString().split('T')[0];

let crocoData = {
    name: faker.name.firstName(),
    sex: gender,
    date_of_birth: birthDate
}

export default crocoData;
