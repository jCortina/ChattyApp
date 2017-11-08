/* eslint-disable no-console */
import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Bob'}, 
      UsersCount: 0,
      messages: [],
      outNotType:   'postNotification',
      outMsgType:   'postMessage',
      inNotType:    'inNotification',
      inMsgType:    'inMessage',
      inUsrsOnline: 'UsersCount'
    };
    this.sendMsg = this.sendMsg.bind(this); 
    this.chgUser = this.chgUser.bind(this);
    this.sendNotification = this.sendNotification.bind(this);
  }
 
  componentDidMount() {
   // create new Web Socket (and connect)
    this.chattySocket = new WebSocket('ws://localhost:3001');
    
    setTimeout( () => {
      if (this.chattySocket.readyState !== this.chattySocket.OPEN)  {
        console.log('Web socket DID NOT open ', this.chattySocket.readyState.OPEN);
      }
    }, 3000);
    
    this.chattySocket.onmessage = (inData) =>   {

      const data = JSON.parse(inData.data);
      //handle each type of incoming massage
      switch (true) {
        case data.type == this.state.inNotType:
          //notification message
          const notComplete = {type: data.type, id: data.id, content: data.content};
          const notState = this.state.messages;
          notState.unshift(notComplete);
          this.setState({messages: notState}, () => { 
          }); 
          break;
        case data.type == this.state.inMsgType:
          //a user message 
          const msgComplete = {type: data.type, id: data.id, usrName: data.usrName, usrMsg: data.usrMsg};
          const msgArr = this.state.messages;
          msgArr.unshift(msgComplete);
          this.setState({messages: msgArr}, () => {
          });
          break;
        case data.type == this.state.inUsrsOnline:
          //number of online users change
          this.setState({UsersCount: data.usersOnline}, () => {
          });
          break;
        default:
          //message type unknown
          throw new Error('Unknown message type: ' + data.type);
      } // fin switch
    } // fin socket onmessage
  }  // fin componentDidMount
  
  // callback function passed to ChatBar as onMsgSubmit to send data to ws server 
  sendMsg(msgUsr, msgTxt)  {
    const newMsg = {'type': this.state.outMsgType, 'username': msgUsr, 'content': msgTxt};
    this.chattySocket.send(JSON.stringify(newMsg));
  }
  //send notification
  sendNotification(oldUser, newUser) {
    const notification = {'type': this.state.outNotType, 
          'content': (oldUser + ' has changed their name to ' + newUser) };
    this.chattySocket.send(JSON.stringify(notification));
  }
  // callback function passed to Chatbar as onUsrChg to register user name change here
  chgUser(newUser) {
    this.sendNotification(this.state.currentUser.name, newUser);
    this.setState({currentUser: {name: newUser}});
  }
  
//.....................................................................................  
  render() {
    return (
      <div>
        <nav className="navbar">
          <img className="chatty-gif" src="chatty.gif" />
        <a href="/" className="navbar-brand">Chatty <small>({this.state.UsersCount} users online)</small></a>
          </nav>
        <ChatBar currentUser={this.state.currentUser.name} onMsgSubmit={this.sendMsg} onUsrChg={this.chgUser} />
        <MessageList messages={this.state.messages} />
      </div>
    );
  }
}

export default App;