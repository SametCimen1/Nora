import {useState, useEffect} from 'react';

const Login = () =>{
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');

   const submitForm = async(e) =>{
     e.preventDefault();
     if(name !== '' && password !== ''){
        const data = await fetch(`http://localhost:5000/login`, {
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body: {
               name: name,
               password: password
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
                <input type = "text" className = "form-control" placeholder = "name" onChange = {(e) => setName(e.target.value)} value = {name}  />
                <input type = "password" className = "form-control mt-5" placeholder = "password"  onChange = {(e) => setPassword(e.target.value)} value = {password}  />                   
                <button type = "submit" className = "btn bg-primary w-100 mt-5" >Login</button>
            </form>
        </div>
        
    )
}

export default Login;