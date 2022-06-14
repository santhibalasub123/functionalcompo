import './Login.css';
// import { Link } from 'react-router-dom';
import {Link,useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {emailValidation,passwordValidation}  from '../Validation';
function Login() {
    const navigate = useNavigate();

    const[getForm,setForm]=useState({
      email:'',
      password:''
    });
  
    const[getValidation,setValidation]=useState({
      email:'',
      password:''
    });
  
    const onChangeHandler=(event)=>{
      setForm({
        ...getForm,[event.target.name]:event.target.value
      })
    }
  
  
    const onSubmitHandler=(event)=>{
      event.preventDefault(); 
      setValidation({
        ...getValidation,email:!emailValidation(getForm.email)?"please provide email":'',
        password:!passwordValidation(getForm.password)?"Please provide the password":''
      });
      if(emailValidation(getForm.email) && passwordValidation(getForm.password)){
        alert("success");
        let email = sessionStorage.getItem('email');
        let password = sessionStorage.getItem('password');
        if(email === getForm.email && password === getForm.password){
          navigate('/dashboard');
        }
        else{
          setValidation({
            email:'no match found',
            password:'no match found'
          });
        }
  
      }
  }
  
    return (
        <div>
            <div className="login-container row">
                {/* <div className="row"> */}
                <div className="col-4">
                </div>
                <div className="col-4 login-container-box">
                    <form>
                        <div className="form-group">
                            <div><h2><img className="img" src="./lib.jfif"  alt="lib" ></img><center>LIBRARAY</center></h2><center><h6> MANAGEMENT</h6></center></div>
                            <table><tbody><tr><td> <label>User Name   :</label></td><td>
                            <input type="email" onChange={onChangeHandler} value={getForm.email} className="form-control" id="email" name="email"  class="form-control" placeholder="Enter email"/>
                        {getValidation.email && <div class="alert alert-danger" role="alert">
                        {getValidation.email}</div>}
                                {/* <input type="email" className="form-control" id="email" placeholder="@" /> */}
                                </td></tr></tbody></table>
                                

                        </div>
                        <div className="form-group">
                            <table><tbody><tr><td>
                                <label>Password   :</label></td><td>
                                <input type="password" onChange={onChangeHandler} value={getForm.password} name="password" class="form-control" id="password" placeholder="Password"/>

{getValidation.password && <div class="alert alert-danger" role="alert">
{getValidation.password}
</div>}
                                    {/* <input type="password" className="form-control" id="password" placeholder="@" /> */}
                                    </td></tr></tbody></table>
                        </div>
                        <button onClick={onSubmitHandler}  type="submit" class="btn btn-success">Submit</button>
                        {/* <button type="submit" className="bt">
                            <Link to="/dashboard">Submit</Link></button> */}
                    </form>
                </div>
                
                 

            </div>
        </div>)
}
export default Login;