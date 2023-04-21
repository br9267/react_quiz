import React from 'react'
import { useState } from 'react';
import { useChatContext, useUserRole } from 'stream-chat-react';
import { useEffect } from 'react';
import Cookies from 'universal-cookie';
function Lobby() {
    const [users, setUsers] = useState([]);
    const { client } = useChatContext();
    const cookie = new Cookies();
    useEffect(() => {
        async function fetchUsers() {
            if(!client.userID) return;
          try {
            const response = await client.queryUsers({ role: 'user' });
            setUsers(response.users);
          } catch (error) {
            console.error(error);
          }
        }
    
        
        
        fetchUsers();
      }, [client, client.userID]);
  return (
    <>
    <div>
    {users
  .filter((user) => user.name !== cookie.get("username"))
  .map((user) => 
  <div key={user.id}>
    <p>{user.name}</p>
    <button>Ask to play?</button>
</div>
)
}

    </div>
    </>
  )
}

export default Lobby