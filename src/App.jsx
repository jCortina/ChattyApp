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
    this.chattySocket.onmessage = (inMsg) =>   {
      console.log("RAW in from ws server:", inMsg);

      const msgJson = JSON.parse(inMsg.data);
      const msgComplete = {id: msgJson.id, usrName: msgJson.usrName, usrMsg:          msgJson.usrMsg};
      console.log("in from ws server:", msgComplete);
      const msgState = this.state.messages;
      this.setState({messages: msgState.unshift(msgComplete)}, () => { 
      });
    }
    setTimeout( () => {
      console.log('socket status:', this.chattySocket.OPEN)
      if (this.chattySocket.readyState === this.chattySocket.OPEN)  {
        console.log('Web socket opened');
      } else {
        console.log('Web socket DID NOT open ', this.chattySocket.readyState.OPEN);
      }
    }, 3000);
  }
    
  sendMsg(msgUsr, msgTxt)  {
    const newMsg = {msgUsr: msgUsr, msgTxt: msgTxt};
    console.log(newMsg);
    this.chattySocket.send(JSON.stringify(newMsg));
  }
  //receive messages from Web Socket server, parse and extract message components
  
//.....................................................................................  
  render() {
    return (
      <div>
        <h1>Messages:</h1>
        <ChatBar currentUser={this.state.currentUser} onMsgSubmit={this.sendMsg} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;