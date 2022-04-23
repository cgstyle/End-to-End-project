import React from 'react'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/esm/Col'
import { useState,useEffect } from 'react'
import { Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Table from 'react-bootstrap/Table' 

const Microservice = () => {

const [user,setUser]=useState("");
const [role,setRole]=useState("");
const [status,setStatus]=useState("");
const [dat, setDat] = useState([])

 const handleChange=(event)=>{
     event.preventDefault();
    
    console.log(user);
    console.log(role);
    console.log(status);
    
        axios.post("http://localhost:8080/micro/saveMicro", {user,role,status }).then(res => {
        const User = res.data;
        console.log(User); 
    })
     
}
// getcall from the data base
useEffect(() => {
axios.get("http://localhost:8080/micro/getAllData")
.then((res) => {
console.log(res.data)
setDat(res.data)

})
}, [])
console.log(dat)

const renderedtable=(data, index)=>{
    return (
        <tr key={index}>
         <td>{index} </td>
        <td>{data.user}</td>
        <td>{data.role}</td>
        <td>{data.status}</td>
        </tr>
    )
    }
    
  return (

    <div>
        <center>
        {/* <Card style={{align:"center", padding:"100px"}}> */}
        <h4>{user} {'    '}
        {role} {'    '}
        {status}</h4>
    <Form className="formLabel" style={{ padding: 15 }} onSubmit={handleChange}   >
    <Form.Group as={Col} md="12" style={{ padding: 10 }} >
    <Form.Label> <h4>User </h4> </Form.Label>{' '}
    <input
    required
    type="user"
    placeholder="enter username"
    onChange={(event)=>setUser(event.target.value)}
    />
    </Form.Group>


    <Form.Group as={Col} md="12" style={{ padding: 10 ,width:"20rem"}}>
    <Form.Label><h4>Role</h4></Form.Label>
    <Form.Select aria-label="Role" onChange={(e)=>setRole(e.target.value) }>
    <option   required >select values</option>
    <option value="Senior Developer">Senior Developer</option>
    <option value="Junior Developer">Junior Developer</option>
    <option value="Trainee">Trainee</option>
    </Form.Select>
    </Form.Group>

    <Form.Group as={Col} md="12" style={{ padding: 10, width:"20rem" }}>
    <Form.Label><h4>Status</h4></Form.Label>
    <Form.Select aria-label="Status" onChange={(e)=>setStatus(e.target.value) 
    }>
    <option required >select values</option>
    <option value="Active">Active</option>
    <option value="No Active">No Active</option>
    </Form.Select>
    </Form.Group>
    <Button variant="primary" type='submit' >Submit</Button>
    </Form>
    </center>
    {/* </Card> */}

    <Table striped bordered hover >
  <thead>
    <tr>
        <th>id</th>
      <th>User</th>
      <th>Role</th>
      <th>Status</th>
    </tr>
  </thead>
  <tbody>
  {dat.map(renderedtable)}
  </tbody>
</Table>
    
    </div>
  )
}
export default Microservice;
