import React, { useState, useEffect } from 'react';
import { MessageInput, Window, MessageList } from 'stream-chat-react';
function Game({ channel }) {

  return (
    <>
      <Window>
    <MessageList
    messageActions={["react"]}/>
    <MessageInput noFiles/>
      </Window>
    </>
  );
}

export default Game;
