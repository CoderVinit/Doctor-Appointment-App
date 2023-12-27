import axios from 'axios'
import React, { useEffect } from 'react'
import Layout from "../components/Layout.js"

const Home = () => {

  const getData = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/user/get-user-info-by-id", {}, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem('token')
        }
      });
    } catch (error) {

    }
  }

  useEffect(() => {
    getData();

  }, [])


  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  )
}

export default Home
