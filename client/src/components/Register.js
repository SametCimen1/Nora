import {useState} from 'react';
const Register = () =>{
    const [information, setInformation] = useState({name:'', firstName:'', lastName:'', email:'', password:''});

    const submitForm = async(e) =>{
        e.preventDefault();
        if(information.name !== '' && information.firstName !== ''&& information.lastName !== ''&& information.email !== '' && information.password !== ''){
           const data = await fetch(`http://localhost:5000/register`, {
               method:"POST",
               headers:{"Content-Type":"application/json"},
               body: {
                  name: information.name,
                  password: information.password,
                  first_name:information.firstName,
                  last_name:information.lastName,
                  email: information.email
               }
           })
           console.log(data)
        }
        else{
            alert("fill the fields")
        }
      }


    return (
        <div style = {{width:"20%", marginTop:"10rem", display:'flex' ,height:500, justifyContent:'center', alignItems:'center', margin:"auto"}}>
            <form onSubmit = {submitForm}>
                <input type = "text" className = "form-control" placeholder = "name" onChange = {(e) => setInformation(prev => ({...prev, name:e.target.value} ))} value = {information.name}  />
                <input type = "text" className = "form-control mt-5" placeholder = "first name"  onChange = {(e) => setInformation(prev => ({...prev, firstName:e.target.value}))} value = {information.firstName}  /> 
                <input type = "text" className = "form-control mt-5" placeholder = "last name" onChange = {(e) => setInformation(prev => ({...prev, lastName:e.target.value}))} value = {information.lastName}  />
                <input type = "email" className = "form-control mt-5" placeholder = "email"  onChange = {(e) => setInformation(prev => ({...prev, email:e.target.value}))} value = {information.email}  />
                <input type = "password" className = "form-control mt-5" placeholder = "password"  onChange = {(e) => setInformation(prev => ({...prev,password:e.target.value}))} value = {information.password}  />                   
                <button type = "submit" className = "btn bg-primary w-100 mt-5" >Login</button>
            </form>
    </div>
    )
}

export default Register;

