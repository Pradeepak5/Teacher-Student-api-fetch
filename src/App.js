import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import AddStudent from './AddStudent';
import EditStudent from './EditStudent';
import AddTeacher from './AddTeacher';
import EditTeacher from './EditTeacher';

function App() {
  const [studentData,setStudentData] =  useState([]);
  const [teacherData,setTeacherData] = useState([]);
  return (
    <div>
      <Routes>
        <Route path='/' element={<Student studentData={studentData} setStudentData={setStudentData}/>} />
        <Route path='/createstudent' element={<AddStudent studentData={studentData} setStudentData={setStudentData} />}/>
        <Route path='/editstudent/:idx' element={<EditStudent studentData={studentData} setStudentData={setStudentData}/>} />
        <Route path='/teacher' element={<Teacher teacherData={teacherData} setTeacherData={setTeacherData}/>}/>
        <Route path='/createteacher' element={<AddTeacher teacherData={teacherData} setTeacherData={setTeacherData}/>}/>
        <Route path='/editteacher/:idx' element={<EditTeacher teacherData={teacherData}/>}/>
      </Routes>
    </div>
  );
}

function Teacher({teacherData,setTeacherData}){
  const histroy = useNavigate();
  const handleDelete = async(idx)=>{
    try{
      const res = await fetch(`https://641d15e5b556e431a87baff2.mockapi.io/Teacher/${idx}`,{
        method:"DELETE"
      })
      const data = await res.json();
      const alterTeacherData = teacherData.filter(stu=>stu.id !== idx);
      setTeacherData(alterTeacherData);
    }catch(err){
      console.log(err);
    }
  }
  useEffect(()=>{
    const getTeacherDetail = async()=>{
      try{
        const res = await fetch("https://641d15e5b556e431a87baff2.mockapi.io/Teacher",{
          method:"GET"
          })
          const data =await res.json();
          setTeacherData(data);
      }catch(err){
        console.log(err);
      }
    }
    getTeacherDetail();
  },[]);

  return (
    <div>
      <Navbar /> 
        <div style={{margin:'5rem'}}>
        <h1 style={{color:'red',marginLeft:'35%',marginBottom:'30px'}}>Teachers Data</h1>
        <Table striped bordered hover size='lg'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Subject</th>
                    <th>Address</th>
                    <th>Date of Join</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        teacherData && teacherData.length > 0 ?
                        teacherData.map((e,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.subject}</td>
                                    <td>{e.address}</td>
                                    <td>{e.doj}</td>
                                    <td>{e.phone}</td>
                                    <td>
                                        <Button onClick={()=>histroy(`/editteacher/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button onClick={()=>handleDelete(e.id)}>Delete</Button>
                                    </td>                                    
                                </tr>
                            )
                        })
                        :"No data available"
                    }
            </tbody>
        </Table>
        <Link className='d-grid gap-2' to="/createteacher"><Button>Create</Button></Link>
      </div>
    </div>
  )
}


function Student({studentData,setStudentData}){

  const histroy = useNavigate();

  const deleteStudent = async(idx)=>{
    try{
      const res = await fetch(`https://641d15e5b556e431a87baff2.mockapi.io/Student/${idx}`,{
        method:"DELETE"
      })
      const data = await res.json();
      const alterStudentData = studentData.filter(stu=>stu.id !== idx);
      setStudentData(alterStudentData);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    const getStudentDetail = async()=>{
      try{
        const res = await fetch("https://641d15e5b556e431a87baff2.mockapi.io/Student",{
          method:"GET"
          })
          const data =await res.json();
          console.log(data);
          setStudentData(data);
      }catch(err){
        console.log(err);
      }
    }
    getStudentDetail();
  },[]);

  return (
    <div>
      <Navbar />
      <div style={{margin:'5rem'}}>
        <h1 style={{color:'red',marginLeft:'35%',marginBottom:'30px'}}>Students Data</h1>
        <Table striped bordered hover size='lg'>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Standard</th>
                    <th>Address</th>
                    <th>Attendance</th>
                    <th>Contact</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                    {
                        studentData && studentData.length > 0 ?
                        studentData.map((e,i)=>{
                            return (
                                <tr key={i}>
                                    <td>{e.name}</td>
                                    <td>{e.standard}</td>
                                    <td>{e.address}</td>
                                    <td>{e.attendance}</td>
                                    <td>{e.phone}</td>
                                    <td>
                                        <Button onClick={()=>histroy(`/editstudent/${e.id}`)}>Edit</Button>
                                        &nbsp;
                                        <Button onClick={()=>deleteStudent(e.id)}>Delete</Button>
                                    </td>                                    
                                </tr>
                            )
                        })
                        :"No data available"
                    }
            </tbody>
        </Table>
        <Link className='d-grid gap-2' to="/createstudent"><Button>Create</Button></Link>
      </div>
    </div>
  )
}

export default App;
