/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
/*eslint-enable no-unused-vars*/

class ChatBar extends Component {
  
  constructor(props) {
    super(props);
    this.onUsrEntry = this.onUsrEntry.bind(this);
    this.onMsgEntry = this.onMsgEntry.bind(this);
  }
  // Action to take on User name change
  onUsrEntry(ev)  {
    
  }
  // Action taken when message entered in chat box
  onMsgEntry(ev)  {
    //this.state.msgCount++;
    //const newMsg = {id: this.state.msgCount, username: this.state.currentUser.name, //content: this.state.msg };
    //const messages = this.state.message.concat(newMsg);
    //this.setState({messages: messages});
    const msg = ev.target.value;
    this.props.newMsg({msg})
    
  }
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" type="txt" placeholder="Your Name (Optional)"
          onChange={this.onUsrEntry} defaultValue={this.props.currentUser.name} />
        <input className="chatbar-message" type="text" 
          onChange={this.onMsgEntry} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}
export default ChatBar;