import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddStudent({studentData,setStudentData}) {

    let histroy = useNavigate();

    const handleButton = async(e)=>{
        const newStudent = {
            id,
            name,
            standard,
            address,
            attendance,
            phone
        }
        e.preventDefault();
        try{
            const res = await fetch("https://641d15e5b556e431a87baff2.mockapi.io/Student",{
                method:"POST",
                body:JSON.stringify(newStudent),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = res.json();
            setStudentData([...studentData,data])
            histroy('/');
        }catch(err){
            console.log(err);
        }
    }

    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [standard,setStandard]=useState("");
    const [address,setAddress]=useState("");
    const [attendance,setAttendance]=useState("");
    const [phone,setPhone]=useState("");
  return (
    <div>
        <Navbar />    
        <Form className='d-grid gap-2' style={{margin:'11rem'}}>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Enter id' onChange={(e)=>setId(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Enter name' onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Standard' onChange={(e)=>setStandard(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Address' onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Attendance Percentage' onChange={(e)=>setAttendance(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Phone Number' onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Group>
            <div style={{display:'flex'}}>
            <Button type='submit' onClick={(e)=>handleButton(e)}>Add Student</Button>
            &nbsp;
            <Link to="/"><Button variant="danger" type='submit'>Cancel</Button></Link>
            </div>
        </Form>  
    </div>
  )
}
