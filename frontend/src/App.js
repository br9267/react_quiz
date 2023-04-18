import {useState } from 'react';
import Board from './components/Board/Board';
import SignUp from './components/SignUp/SignUp';
import Register from './components/Register/Register';
import {StreamChat} from 'stream-chat';
function App() {
  const [currentForm, setcurrentForm] = useState('SignUp');
  const [isAuth, setisAuth] = useState(false);
  const client = StreamChat.getInstance('7wf2ag7vysbr');
  const handleLogout = () => {
    setisAuth(false);
  }

  const changeCurrentForm = (formName) => {
    setcurrentForm(formName);
  }

  return (
    <div>
    {isAuth ? (
      <>
      <div>here</div>
      <button onClick={handleLogout}>LogOut</button></>
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
