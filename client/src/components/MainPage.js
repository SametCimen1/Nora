import {Link} from 'react-router-dom'
import {Fragment} from 'react'
import Login from './Login'
import Register from './Register'
import note1 from './img/note1.jpg'


const MainPage = () =>{
    return (
        <Fragment>
            <h1 className = "mt-5 ">Welcome to Nora</h1>
            <div className = "container w-40 d-flex align-items-center justify-content-around" style = {{height:"600px"}}>
                <img className = "img-fluid" style ={{maxHeight:"600px"}} src = {note1} alt = "a women writing somethingn on a notebook"/>
                <div className = " d-flex  flex-column bg d-inline-block h-100 align-items-center justify-content-center">
                    <h3 className = "m-2 align-bottom">Welcome to Nora</h3>
                    <h3 className = "m-2 align-bottom">A place to  take notes</h3>
                </div>
            </div>
            <div className = "mt-5 container d-flex align-items-center justify-content-center">
                <Link to = "/register"><button className = "mr-2 border-0 p-2 bg-secondary">Make a new account</button> </Link>
                <Link to = "/login">  <button className = "ml-2 border-0 p-2 bg-info">Login</button></Link>
            </div>
        </Fragment>

    )
}
export default MainPage;