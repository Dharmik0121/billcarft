import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Register from './pages/Register'
import Home from './pages/Home'
import Login from './pages/Login'
import OTP from './pages/OTP'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from './store/slices/authSlice'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import { getMyProducts } from './store/slices/productSlice'

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getMyProducts());
  }, [dispatch]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/otp-verification/:email" element={<OTP />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<ResetPassword />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
