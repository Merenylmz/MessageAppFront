import { BrowserRouter, Route, Routes } from "react-router-dom"
import MainLayout from "./layouts/MainLayout"
import Login from "./Components/Auth/Login"
import Register from "./Components/Auth/Register"
import Chat from "./Components/Message/Chat"
import Chats from "./Components/Message/Chats"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout/>}>
          <Route path="/" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/chats" element={<Chats/>}/>
          <Route path="/message/:receiverId" element={<Chat/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
