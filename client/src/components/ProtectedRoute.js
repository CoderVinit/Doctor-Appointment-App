import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../redux/userSlice'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import { server } from '../constant/config'

const ProtectedRoute = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  const getUser = async () => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${server}/api/user/get-user-info-by-id`, { token: localStorage.getItem('token') }, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
      dispatch(hideLoading());
      if (response.data.success) {
        dispatch(setUser(response.data.data));
      }
      else {
        localStorage.clear()
        navigate('/login');
      }
    } catch (error) {
      dispatch(hideLoading());
      localStorage.clear()
      navigate('/login');
    }
  }

  useEffect(() => {
    if (!user) {
      getUser()
    }
  }, [user])


  if (localStorage.getItem('token')) {
    return props.children;
  }
  else {
    return <Navigate to="/login" />
  }
}

export default ProtectedRoute;
