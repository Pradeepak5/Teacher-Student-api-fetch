import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditTeacher({teacherData,setTeacherData}) {

    let histroy = useNavigate();
    const [id,setId]=useState("");
    const[name,setName]=useState("");
    const[subject,setSubject]=useState("");
    const[address,setAddress]=useState("");
    const[doj,setDoj]=useState("");
    const[phone,setPhone]=useState("");

    const {idx} = useParams();

    const selectedTeacher = teacherData.find(stu=>stu.id === idx);

    useEffect(()=>{
        setId(selectedTeacher.id)
        setName(selectedTeacher.name)
        setSubject(selectedTeacher.subject)
        setAddress(selectedTeacher.address)
        setDoj(selectedTeacher.doj)
        setPhone(selectedTeacher.phone)
    },[]);

    const handleButton  = async(e)=>{
        e.preventDefault();
        const editTeacherIndex = teacherData.findIndex(stu=>stu.id === idx);
        const editedTeacher = {
            id,
            name,
            subject,
            address,
            doj,
            phone
        }
        try{
            const res = await fetch(`https://641d15e5b556e431a87baff2.mockapi.io/Teacher/${idx}`,{
                method:"PUT",
                body:JSON.stringify(editedTeacher),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json();
            teacherData[editTeacherIndex] = data;
            histroy("/teacher");
        }catch(err){
            console.log(err);
        }
    }
  return (
    <div>
      <Navbar />    
      <Form className='d-grid gap-2' style={{margin:'11rem'}}>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Enter id' value={id} onChange={(e)=>setId(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Enter name' value={name} onChange={(e)=>setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Subject' value={subject} onChange={(e)=>setSubject(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Doj' value={doj} onChange={(e)=>setDoj(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Group>
            <Button type='submit' onClick={(e)=>handleButton(e)}>Update Teacher</Button>
        </Form> 
    </div>
  )
}
