import React, { useState, useEffect } from 'react';
import { useChatContext } from 'stream-chat-react';
import { Channel } from 'stream-chat-react';
import Game from '../Game/Game';
import Cookies from 'universal-cookie';

function Lobby() {
  const [users, setUsers] = useState([]);
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();
  const cookie = new Cookies();

  useEffect(() => {
    async function fetchUsers() {
      if (!client.userID) return;
      try {
        const response = await client.queryUsers({ role: 'user' });
        setUsers(response.users);
      } catch (error) {
        console.error(error);
      }
    }

    fetchUsers();
  }, [client, client.userID]);

  const createChannel = async (id) => {
    const channelID = `game-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  
    const newChannel = client.channel('messaging', channelID, { members: [client.userID] });

    await newChannel.watch()
    setChannel(newChannel);
  };
  
  return (
    <>
       {channel ? (
        <Channel channel={channel}>
          <Game channel={channel} />
        </Channel>
    ) : (
        <div>
          {users
            .filter((user) => user.name !== cookie.get('username'))
            .map((user) => (
              <div key={user.id}>
                <p>{user.name}</p>
                <button onClick={() => createChannel(user.id)}>Ask to play?</button>
              </div>
            ))}
        </div>
      )}
    </>
  );
}

export default Lobby;