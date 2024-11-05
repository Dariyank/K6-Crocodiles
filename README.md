# K6 Performe Test-  Personal Project

This project is a performance testing example using the [Grafana K6 demo site](https://test-api.k6.io/). It includes [number of tests] tests, covering actions from creating a new user to verifying and creating crocodiles.

## Setting up environment

### Dependencies

1. Should have installed the following
- [node](https://nodejs.org/en/)
- [K6](https://grafana.com/docs/k6/latest/set-up/install-k6/)

2. Libaries used
- [Faker](https://cdnjs.com/libraries/Faker/3.1.0)
- [HTML Report Exporter V2](https://medium.com/@updeshkumar1991/generate-awesome-html-performance-testing-report-with-grafana-k6-5221ee52ee52)

NOTE:

You can find the documentation of [Faker](https://fakerjs.dev/) here.

### Running

To run the script of the K6 crocodiles web page, execute the following

```bash
npm run test
```

**Report**

To verify the test result on the report UI open the HTML file created on the reports/ file on your browser

---

## Naming Conventions

- Use `lowerCameCase` for variables, properties, object files and folder names.
- Use prefix like `is`, `are`, `has` for bool variables.
- Use self explanatory names for variables, E.g `let data`.
- Always start a function with a verb and the entity being affected by it, E.g `createNewUser`.