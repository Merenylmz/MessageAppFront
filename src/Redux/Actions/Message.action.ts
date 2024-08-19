import axios from "axios";

const apiLink = `http://localhost:5000/message`;
export const getMessages = async(receiverId: string, token: string) =>{
    const response = await axios.get(`${apiLink}/${receiverId}?token=${token}`);
    const data = response.data;

    return data;
};

export const sendMessage = async(data: {receiverId: string, content: string}, token: string) =>{
    
    const response = await axios.post(apiLink+"?token="+token, data);
    const resData = response.data;
    console.log(resData);
    
    return resData;
}