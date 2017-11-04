/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
import Message from './Message.jsx';
/*eslint-enable no-unused-vars*/

class MessageList extends React.Component {
  
  constructor(props) {
    super(props);
  }
  
  render() {
    return(
    <main className="messages">
      {this.props.messages.map((msg) => {
        return <Message message={msg} key={msg.id} />
      })}  
    </main>
    );
  }
}
export default MessageList;
