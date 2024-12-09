import {Row, Col, FormGroup } from "reactstrap";
import { userSchemaValidation } from "../Validations/UserValidations";
import { Container, Form, Label, Button, Input} from "reactstrap";
import logo from "../Images/logo-t.png";
import * as yup from "yup";
import {useForm} from "react-hook-form";
import{yupResolver} from "@hookform/resolvers/yup";
import {useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {registerUser, addUser,deleteUser , updateUser} from "../Features/User";
import {useNavigate} from "react-router-dom";


const Register = () => {
  const userList=useSelector((state)=>state.users.value);
  const [name, setname]=useState("");
  const [email, setemail]=useState("");
  const [password, setpassword]=useState("");
  const [confirmPassword, setconfirmPassword]=useState("");
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const{
    register,
    handleSubmit:submitForm,
    setValue,
    trigger,
    formState:{errors},
  }= useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const onSubmit=(data)=>{
    try{
      const UserData={
        name:data.name,
        email:data.email,
        password:data.password,
    
      };
      console.log( "Form Data ", data);
      alert("Validation all good.");
      dispatch(addUser(UserData));
      navigate("/login");

    }catch(error){
      console.log( "error.");
    }
  }
  

  const handleDelete = (email) => {
    dispatch(deleteUser(email));
  }

  const handleUpdate = (email) => {
    console.log(name);
    const UserData={
      name: name,
      email: email,
      password: password,
      //confirmPassword:confirmPassword,
    };
    dispatch(updateUser(UserData));
  }
  

  return (
    <div className="postButton">
      <Container className="" >
      
      <Row>
        <Col lg={5} className="columndiv1">
        <Form className="div-form " onSubmit={submitForm(onSubmit)} >
        <FormGroup>
        <img src={logo} className="logoImage"/>  
          <Input 
          id="name" 
          type="text" 
          placeholder="Enter Your Name..."
          {
            ...register("name")
          }
          onChange={(e)=>{setValue("name",e.target.value);
            trigger("name");
          }} 
          />
          <p className="error">{errors.name?.message}</p>
          
          <Input 
          id="email" 
          type="email" 
          placeholder="Enter Your Email..."
          {
            ...register("email")
          }
          onChange={(e)=>{setValue("email",e.target.value);
            trigger("email");
          }}
          />
          <p className="error">{errors.email?.message}</p>

          <Input 
          id="password"  
          type="password" 
          placeholder="Enter Your Password..."
          {
            ...register("password")
          }
          onChange={(e)=>{setValue("password",e.target.value);
            trigger("password");
          }}
          />
          <p className="error">{errors.password?.message}</p>

          <Input 
          className="form-control"
          id="confirmPassword" 
          type="password" 
          placeholder="Confirm Your Password..."
          {
            ...register("confirmPassword")
          }
          onChange={(e)=>{setValue("confirmPassword",e.target.value);
            trigger("confirmPassword");
          }}
          />
          <p className="error">{errors.confirmPassword?.message}</p>

          <Button color="primary" className="button">Register</Button>
        
        </FormGroup>
      </Form>
        </Col>
        <Col>
        <img />
        </Col>
      </Row>
      <Row>
   {/* <Col>
        <div>
          <table>
            <tbody>
            {userList.map((user)=>(
              <tr key={user.email}>
                <td>
                  {user.name}
                </td>
                <td>
                  {user.email}
                </td>
                <td>
                  {user.password}
                </td>
                <td><Button onClick={()=>handleDelete(user.email)} 
                  type="button">user Delete</Button>
                  </td>
                  <td>
                  <Button onClick={()=>handleUpdate(user.email)} 
                  type="button"> user Update</Button>
                  </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        </Col> */}
      </Row>
      </Container>
      
    </div>
  );
};

export default Register;
