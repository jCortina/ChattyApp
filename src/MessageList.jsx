/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import Message from './Message.jsx';
import Notification from './Notification.jsx';
/*eslint-enable no-unused-vars*/

class MessageList extends React.Component {
    
  constructor(props) {
    super(props);
  }
  
  render() {
    var msgsArray = this.props.messages;
    var allMsgs = msgsArray.map( (msg) => {
      if (msg.type == 'inMessage') {
        return <Message message={msg} key={msg.id} />;      
      } else {
        return <Notification message={msg} key={msg.id} />
      }
    });
    return (
    <main className="messages">
      {allMsgs}
    </main>
    )
  }
}

export default MessageList;
