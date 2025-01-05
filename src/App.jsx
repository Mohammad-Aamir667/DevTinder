import { BrowserRouter, Route, Routes } from "react-router-dom"
import Body from "./components/Body"
import Login from "./components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/appStore"
import Profile from "./components/Profile"
import Feed from "./components/Feed"
import EditProfile from "./components/EditProfile"
import Connections from "./components/Connections"
import Requests from "./components/Requests"
import ViewProfile from "./components/ViewProfile"
import Chat from "./components/Chat"
import ChatList from "./components/ChatList"
import ForgotPassword from "./components/ForgotPassword"
import ResetPassword from "./components/ResetPassword"



function App() {
  
  return (
    <> 
    <div className="min-h-screen">
    <Provider store = {appStore}>
    <BrowserRouter basename="/">
     <Routes>
      <Route path ="/" element={<Body/>}>
      <Route path ="/" element ={<Feed/>}></Route>
      <Route path = "/login"element={<Login/>}></Route>
      <Route path = "/profile"element ={<Profile/>}></Route>
      <Route path = "/editProfile"element ={<EditProfile/>}></Route>
      <Route path= "/connections" element = {<Connections/>}></Route>
      <Route path = "/requests" element = {<Requests/>}></Route>
      <Route path ="/view-profile" element = {<ViewProfile/>}></Route>
      <Route path = "/chat" element = {<ChatList/>}></Route>
      <Route path = "/chat-box" element = {<Chat/>}></Route> 
      <Route path = "/forgot-password" element = {<ForgotPassword/>}></Route>
      <Route path = "/reset-password" element ={<ResetPassword/>}></Route>
      </Route>
     </Routes>
      </BrowserRouter>
    </Provider>
    
    </div>
   
    </>
  )
}

export default App
