import React, { useState } from 'react'
import { login } from '../../Redux/Actions/Auth.action';
import { useDispatch } from 'react-redux';
import { useNavigate} from 'react-router-dom';

const Login = () => {
    const [inputs, setInputs] = useState({email: "", password: ""});
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const handleSubmit = async(e) =>{
        e.preventDefault();
        
        const response = await login(inputs);
        console.log(response);
        
        dispatch({type: "LOGIN", payload: {token: response.token}});

        return navigation("/chats");
    };
    return (
        <div>
            <form method="post" className='mt-3' onSubmit={handleSubmit}>
                <label>Email:</label>
                <input type="email" autoComplete='email' className="form-control" onChange={e=>setInputs({...inputs, email: e.target.value})} value={inputs.email} />
                <br />
                <label>Password:</label>
                <input type="password" className="form-control" onChange={e=>setInputs({...inputs, password: e.target.value})} value={inputs.password}/>
                <br />
                <button type='submit' className='btn btn-primary'>Login</button>
            </form>
        </div>
    )
}

export default Login