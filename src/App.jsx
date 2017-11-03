/* eslint-disable no-console */
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, 
      initMsgCount: 0,
      messages: []  
    };
    this.sendMsg = this.sendMsg.bind(this);
  }
 
  componentDidMount() {
   // create new Web Socket (and connect)
    this.chattySocket = new WebSocket('ws://localhost:3001');
    setTimeout( () => {
      console.log('socket status:', this.chattySocket.OPEN)
      if (this.chattySocket.readyState === this.chattySocket.OPEN)  {
        console.log('Web socket opened');
      } else {
        console.log('Web socket DID NOT open ', this.chattySocket.readyState.OPEN);
      }
    }, 3000);
  }
    
  sendMsg(newMsg)  {
    this.chattySocket.send(JSON.stringify(newMsg));
  }
  
  render() {
    return (
      <div>
        <h1>Hello React :</h1>
        <ChatBar currentUser={this.state.currentUser} newMsg={this.sendMsg} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;