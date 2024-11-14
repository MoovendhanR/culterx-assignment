import { Route, Routes} from 'react-router-dom';
import Register from '../pages/Register';
import Login from '../pages/Login';
import HomePage from '../pages/HomePage';
import ProtectedRoute from './ProtectedRoute';


const AllRoutes = () => {
  return (
    <> 
      <Routes >
      <Route path="/" element={
        <ProtectedRoute>
         <HomePage/>
        </ProtectedRoute>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} /> 
     </Routes>
    </>
  )
}

export default AllRoutes