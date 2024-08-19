import React, { useState } from 'react'
import { register } from '../../Redux/Actions/Auth.action';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [inputs, setInputs] = useState({name: "", email: "", password: ""});
    const navigate = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        const response = await register(inputs);
        return response && navigate("/");
    };
    return (
        <div>
            <form method="post" className='mt-3' onSubmit={handleSubmit}>
                <label>Name:</label>
                <input type="text" className="form-control" onChange={e=>setInputs({...inputs, name: e.target.value})} value={inputs.name}/>
                <br />
                <label>Email:</label>
                <input type="email" className="form-control" onChange={e=>setInputs({...inputs, email: e.target.value})} value={inputs.email} />
                <br />
                <label>Password:</label>
                <input type="password" className="form-control" onChange={e=>setInputs({...inputs, password: e.target.value})} value={inputs.password}/>
                <br />
                <button type='submit' className='btn btn-primary'>Sign Up</button>
            </form>
        </div>
    )
}

export default Register