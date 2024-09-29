import React from 'react'
import Layout from '../components/Layout'
import { Button, Col, Form, Input, Row, TimePicker } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { hideLoading, showLoading } from '../redux/alertsSlice'
import axios from 'axios'

const ApplyDoctors = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector(state => state.user)

  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(`${server}/api/user/apply-doctor-account`, {
        ...values, userId: user._id
      },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem('token')
          }
        });
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  }

  return (
    <Layout>
      <h1 className='page-title'>Apply Doctor Account</h1>
      <hr />

      <Form layout='vertical' onFinish={onFinish}>
        <Row gutter={20}>

          {/* gutter is used to give space between the columns */}

          <Col span={8} xs={24} sm={24} lg={8} >
            <Form.Item required label='First Name' name='firstName' rules={[{ required: 'true' }]}>
              <Input placeholder='First Name' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Last Name' name='lastName' rules={[{ required: 'true' }]}>
              <Input placeholder='Last Name' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Email' name='email' rules={[{ required: 'true' }]}>
              <Input placeholder='Email' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label='Phone Number' name='phoneNumber' rules={[{ required: 'true' }]}>
              <Input placeholder='Phone Number' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8} className='horizontal'>
            <Form.Item required label='Website' name='website' rules={[{ required: 'true' }]}>
              <Input placeholder='Website' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8} className='horizontal'>
            <Form.Item required label='Address' name='address' rules={[{ required: 'true' }]}>
              <Input placeholder='Address' />
            </Form.Item>
          </Col>
        </Row>
        <hr className='horizontal' />
        <Row gutter={20}>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Specialization" name='specialization' rules={[{ required: 'true' }]} >
              <Input placeholder='Specialization' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Experience" name='experience' rules={[{ required: 'true' }]} >
              <Input placeholder='Experience' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8}>
            <Form.Item required label="Fee Per Cunsultation" name='feePerCunsultation' rules={[{ required: 'true' }]} >
              <Input placeholder='Fee Per Cunsultation' />
            </Form.Item>
          </Col>
          <Col span={8} xs={24} sm={24} lg={8} className='horizontal'>
            <Form.Item required label="Timings" name='timings' rules={[{ required: 'true' }]} >
              <TimePicker.RangePicker format="HH:mm" />
            </Form.Item>
          </Col>

        </Row>

        <div className="d-flex justify-content-end">
          <Button className='primary-button' htmlType='submit'>SUBMIT</Button>
        </div>
      </Form>
    </Layout>

  )
}

export default ApplyDoctors
