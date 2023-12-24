import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

export function Login() {
const navigate = useNavigate();
  const formik= useFormik({
    initialValues:{name:"",password:""},
    onSubmit: async (values)=>{
   console.log(values);
    


    const data = await fetch("http://localhost:4000/login" ,{
       method:"POST",
       
       headers:{"Content-Type":"application/json",
      },
      body: JSON.stringify(values),
     });
     const result= await data.json();
     console.log(result);
     localStorage.setItem("token",result.token);
    navigate("/trip_list");
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="login-page">
      <div className="form-group">
        <label htmlFor="exampleInputEmail1">User Name</label>
        <input type="text" className="form-control" 
        name="name"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.name} aria-describedby="emailHelp" placeholder="Enter User Name" />
      </div>
      <div className="form-group">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input type="password"
        name="password"
        className="form-control"
         onChange={formik.handleChange}
         onBlur={formik.handleBlur}
         value={formik.values.password}
         placeholder="Password" />
      </div>


      <div className="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div className="modal-dialog modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Success</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        Login Successfully
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary " data-toggle="modal" data-target="#exampleModalCenter" style={{backgroundColor:"green"}} data-dismiss="modal">Ok</button>
        
      </div>
    </div>
  </div>
</div>


      <div>
        <a className="creat-acc" href="" onClick={()=>navigate("/forget_password")} >Forget Password ?</a></div>
      <button type="submit" className="btn btn-primary">Login</button>
      <hr></hr>
      <div className="New-account">
        <img type="button" className="login-goo" src="./img/google.png"></img>
      </div>

      
      <div className="New-account"><button className="creat-acc" onClick={()=>navigate("/new_user")} >Create Account ?</button></div>
    </form>
  );
}
