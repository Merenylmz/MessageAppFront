import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

const Chats = () => {
    const [users, setUsers] = useState([]);
    const auth = useSelector((state:{auth:{isAuth: boolean, token: string}})=>state.auth);
    const getUsers = async() =>{
        const response = await axios.get("http://localhost:5000/auth/users?token="+auth.token);
        const data = response.data;
        setUsers(data);
    };

    useEffect(()=>{
        getUsers();
    }, []);
    return (
        <div>
            
            {
                users && users.map(u=>(
                    <Link to={`/message/${u._id}`}>
                        <div className="card mb-3" style={{maxWidth: `540px`}}>
                            <div className="row g-0">
                                <div className="card-body">
                                    <h5 className="card-title">{u.name}</h5>
                                </div>
                            </div>
                        </div>
                    </Link>
                ))
            }
            
        </div>
    )
}

export default Chats