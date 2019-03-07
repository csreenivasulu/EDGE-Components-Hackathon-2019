# Generic Table Component

This is dynamic table component, automatically can be populated table header and body based on the given data.

## Live demo

* [Demo link](https://generic-table-component-demo.herokuapp.com)

## Dependancies

* This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
* Material UI
* Lodash

## How to local setup.

* Clone the repository
* Run `npm install` or `yarn install`
* Run `npm start`

## How to change API endpoint

* Go to `App.js` file.

```javascript

// End point is dynamic with get method. Based on the response, tabel will be populated automatically.
const endPoint = 'https://jsonplaceholder.typicode.com/comments';

function App() {

  const postsList = useGetPostsList(endPoint);

```
Node: API endpoint should return `JSON` data.
