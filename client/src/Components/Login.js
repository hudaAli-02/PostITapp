import { Container, Form, FormGroup, Label, Button, Input} from "reactstrap";
import logo from "../Images/logo-t.png";
import {Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../Features/User";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setemail] = useState();
  const [password, setpassword] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.users.user);
  const isSuccess = useSelector((state) => state.users.isSuccess);
  const isError = useSelector((state) => state.users.isError);

  useEffect(() => {
    if(isError){
      navigate("/login");
    }
    if(isSuccess) {
      navigate("/");
    }else {
      navigate("/login");
    }
  }, [user, isError, isSuccess]);

  
  const handleLogin = () => {
    const UserData = {
      email: email,
      password: password,
    };
    dispatch(login(UserData))
  };
  return (
    <div>
      <Container>
        <Row >
          <Col lg={5}>
        <Form className="div-form" >
        
          <Row>
            <Col md={3}>
            <img src={logo} className="logoImage"/>

            </Col>
          </Row>

          <Row >
          
            <Col md={3}>
              <FormGroup className="smalltext">
            <Label>Email</Label>
            <input id="email"
            name="email" 
            placeholder="Enter email..." 
            type="email"
            onChange={(e) => setemail(e.target.value)}
            />
            </FormGroup>
            </Col>
          </Row>

          <Row>
          
            <Col md={3}>
            <FormGroup className="smalltext">
            <Label> Password</Label>
            <input id="password" 
            name="password" 
            placeholder="Enter password..." 
            type="password"
            onChange={(e)=> setpassword(e.target.value)}
            />
            </FormGroup>
            </Col>
          </Row>

          <Row>
            <Col md={3}>

            <FormGroup >
              <div className="side">
            <Input name="checkbox" type="checkbox"/>
            <Label check> Remember Me </Label>
            </div>
            </FormGroup>

            <FormGroup>
            <Button 
            color="primary" 
            className="button"
            onClick = { () => handleLogin()}
            >Login</Button>
            </FormGroup>
            </Col>
          </Row>
          <p className="smalltext">
        No Account? <Link to="/register">Sign Up now.</Link>
      </p>
        </Form>
        </Col>
        </Row>
      </Container>
      
    </div>
  );
};

export default Login;
