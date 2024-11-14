import React, { useState } from 'react';
// import FileUpload from './components/FileUploads';
import Navbar from "./components/Navbar"
import Sidebar from './components/Sidebar';
import AllRoutes from './components/AllRoutes';

const App = () => {

  const [isopen, setisopen] = useState(false);
  const toggle = () => {
    setisopen(!isopen);
  };

  return (
    <div className="App">
      <Navbar toggle={toggle}/>
      <AllRoutes/>
      <Sidebar isopen={isopen} toggle={toggle} />
      {/* <h1>Media Upload</h1>
      <FileUpload /> */}
    </div>
  );
};

export default App;