import {
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import {useSelector} from "react-redux";
import { useState, useEffect } from "react";
import { updateUserProfile } from "../Features/User";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import User from "./User";
import { userSchemaValidation } from "../Validations/UserValidations";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const Profile = () => {

  const user = useSelector((state) => state.users.user);

  const [userName, setuserName] = useState(user.name);
  const [pwd, setPwd] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState(user.password);
  const [profilePic, setProfilePic] = useState(user.profilePic);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const{
    register,
    handleSubmit,
    setValue,
    trigger,
    formState:{errors},
  }= useForm({
    resolver: yupResolver(userSchemaValidation),
  });

  const handleUpdate = (event) => {
    event.preventDefault();

    const UserData = {
      email: user.email,
      name: userName, 
      password: pwd,
      profilePic: profilePic,

    };
    console.log(UserData);
    dispatch(updateUserProfile(UserData));
    alert("Profile Updated.");
    navigate("/profile")
  };

  const handleFileChange = (event) =>{
    const uploadFile = event.target.files[0];
    if (!uploadFile) alert("No file uploaded");
    else setProfilePic(event.target.files[0]);
  };
  useEffect(() => {
    if (!user.email) {
      navigate("/login");
    }
  }, [user.email, navigate]);

  return (
    <Container fluid>
      <h1>Profile</h1>
      <Row>
        <Col md={2}>
          <User/>
        </Col>
        <Col md={4}>
        <Form onSubmit={handleUpdate}>
          upload photo
          <br/>
          <input type="file" name="profilePic" onChange={handleFileChange}/>
          <div className="appTitle"></div>
          Update Profile
          <FormGroup>
            <Label for="name">Name</Label>
            <Input id="name" name="name" placeholder="Name..." 
            type="text" value={userName}
            {...register("name", {
              onChange: (e) => {
                setuserName(e.target.value);
              },
            })}
            />
          </FormGroup>
          <FormGroup>
            <Label for="password">Password</Label>
            <Input id="password" name="password" placeholder="Password..." 
            type="password" value={pwd} 
            {...register("password", {
              onChange: (e) => {
                setPwd(e.target.value);
              },
            })} />
          </FormGroup>
          <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword " name="confirmPassword" placeholder="Confirm Password..."
                 type="password" value={confirmPassword}
                 {...register("confirmPassword", {
                  onChange: (e) => {
                    setConfirmPassword(e.target.value);
                  },
                })}
              />
            </FormGroup>
            <FormGroup>
              <Button color="primary" className="button" type="submit">
                Update Profile
              </Button>
            </FormGroup>

        </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
