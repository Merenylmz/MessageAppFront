import axios from "axios";

const apiUrl = "http://localhost:5000/auth";

export const login = async(data) =>{
    console.log(data);
    
    const response = await axios.post(apiUrl+"/login", data);
    const resData = response.data;
    console.log(response);
    

    return resData;
};

export const register = async(data) =>{
    const response = await axios.post(apiUrl+"/register", data);
    const resData = response.data;
    
    return resData;
};

export const logout = async(token)=>{
    await axios.get(apiUrl+"/logout?token="+token);

    return true;
};