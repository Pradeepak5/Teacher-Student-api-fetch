import React, {useEffect, useState} from 'react'
import Navbar from './Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditStudent({studentData,setStudentData}) {

    let histroy = useNavigate();
    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [standard,setStandard]=useState("");
    const [address,setAddress]=useState("");
    const [attendance,setAttendance]=useState("");
    const [phone,setPhone]=useState("");

    const {idx} = useParams();

    const selectedStudent = studentData.find(stu=>stu.id === idx);

    useEffect(()=>{
        setId(selectedStudent.id)
        setName(selectedStudent.name)
        setStandard(selectedStudent.standard)
        setAddress(selectedStudent.address)
        setAttendance(selectedStudent.attendance)
        setPhone(selectedStudent.phone)
    },[]);

    const handleButton  = async(e)=>{
        e.preventDefault();
        const editStudentIndex = studentData.findIndex(stu=>stu.id === idx);
        const editedStudent = {
            id,
            name,
            standard,
            address,
            attendance,
            phone
        }
        try{
            const res = await fetch(`https://641d15e5b556e431a87baff2.mockapi.io/Student/${idx}`,{
                method:"PUT",
                body:JSON.stringify(editedStudent),
                headers:{
                    "Content-Type":"application/json"
                }
            })
            const data = await res.json();
            studentData[editStudentIndex] = data;
            histroy("/");
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
                <Form.Control type='number' placeholder='Standard' value={standard} onChange={(e)=>setStandard(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='text' placeholder='Address' value={address} onChange={(e)=>setAddress(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Attendance Percentage' value={attendance} onChange={(e)=>setAttendance(e.target.value)}/>
            </Form.Group>
            <Form.Group className='mb-3'>
                <Form.Control type='number' placeholder='Phone Number' value={phone} onChange={(e)=>setPhone(e.target.value)}/>
            </Form.Group>
            <Button type='submit' onClick={(e)=>handleButton(e)}>Update Student</Button>
        </Form> 
    </div>
  )
}
