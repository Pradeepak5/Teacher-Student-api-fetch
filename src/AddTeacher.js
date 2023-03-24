import React, { useState } from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function AddTeacher({teacherData,setTeacherData}) {

    let histroy = useNavigate();

    const handleButton = async(e)=>{
        const newTeacher = {
            id,
            name,
            subject,
            address,
            doj,
            phone
        }
        e.preventDefault();
        try{
            const res = await fetch("https://641d15e5b556e431a87baff2.mockapi.io/Teacher",{
                method:"POST",
                body:JSON.stringify(newTeacher),
                headers:{
                    "Content-Type":"application/json"
                }
            });
            const data = res.json();
            setTeacherData([...teacherData,data])
            histroy('/teacher');
        }catch(err){
            console.log(err);
        }
    }

    const [id,setId]=useState("");
    const[name,setName]=useState("");
    const[subject,setSubject]=useState("");
    const[address,setAddress]=useState("");
    const[doj,setDoj]=useState("");
    const[phone,setPhone]=useState("");
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
                <Form.Control type='text' placeholder='Subject' onChange={(e)=>setSubject(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Address' onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='date' placeholder='DOJ' onChange={(e)=>setDoj(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Phone Number' onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Group>
            <div style={{display:'flex'}}>
            <Button type='submit' onClick={(e)=>handleButton(e)}>Add Teacher</Button>
            &nbsp;
            <Link to="/teacher"><Button variant="danger" type='submit'>Cancel</Button></Link>
            </div>
        </Form>  
    </div>
  )
}
