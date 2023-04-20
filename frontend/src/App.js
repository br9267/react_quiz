import {useEffect, useState } from 'react';
import Board from './components/Board/Board';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import {StreamChat} from 'stream-chat';
import Cookies from 'universal-cookie';
import { Chat } from "stream-chat-react";
import Lobby from './components/Lobby/Lobby';
function App() {
  const [currentForm, setcurrentForm] = useState('SignUp');
  const [isAuth, setisAuth] = useState(false);
  const cookie = new Cookies();
  const token = cookie.get("token");
  const client = StreamChat.getInstance('7wf2ag7vysbr');

  useEffect( () => {
    if (token) {
      if (!client.userID) {
     client.connectUser(
        {
          id : cookie.get("userId"),
          name : cookie.get("username"),
          email: cookie.get("email"),
          password_hash : cookie.get("password_hash")
        },token
      )}
      setisAuth(true);
    }
  }, []);


  
  
  const handleLogout = async () => {
    cookie.remove('token', {path: "/"});
    cookie.remove('userId', {path: "/"});
    cookie.remove('username', {path: "/"});
    cookie.remove('email', {path: "/"});
    cookie.remove('password_hash', {path: "/"});
    await client.disconnectUser();
    setisAuth(false);
  }


  const changeCurrentForm = (formName) => {
    setcurrentForm(formName);
  }

  return (
    <div>
    {isAuth ? (
      <>
      <Chat client={client}>
      <Lobby/>
      <button onClick={handleLogout}>LogOut</button>
      </Chat>
      </>
    ):(
      <>
      {
            currentForm === 'SignUp' ? <SignUp onFormSwitch={changeCurrentForm} setisAuth={setisAuth}/> : <Register onFormSwitch={changeCurrentForm} setisAuth={setisAuth}/> 
      }
      </>
            )}
    </div>
  );
}

export default App;
