import React from 'react';
import './App.css';
import Table from './components/table-component';
import LoadingPanel from './components/loading-panel';
import useGetPostsList from './api-hooks';

const endPoint = 'https://jsonplaceholder.typicode.com/comments';

function App() {

  const postsList = useGetPostsList(endPoint);

  return (
    <div className="App">
      <div className="heading">
        <h3>Generic Table Component</h3>
      </div>

      {
        postsList.length ? <Table postsList={postsList} /> : <LoadingPanel />
      }

    </div>
  );

}

export default App;
