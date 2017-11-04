/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/
import React, {Component} from 'react';
/*eslint-enable no-unused-vars*/

class ChatBar extends Component {
  
  constructor(props) {
    super(props);
    this.onUsrChg = this.onUsrChg.bind(this);
    this.onMsgChg = this.onMsgChg.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.state = {usrName: this.props.currentUser.name, usrMsg: ''};
    
  }
  // Action to take on User name change
  onUsrChg(ev)  {
    this.setState({usrName: ev.target.value,}, () => {
    });
  }
  // Action taken when message entered in chat box
  onMsgChg(ev)  {
    this.setState({usrMsg: ev.target.value}, () => {
    });
  }
  keyPress(ev)  {
    //enter key pressed - perform form submit process
    if (ev.key == 'Enter') {
      //
      this.onFormSubmit();
      ev.target.value = '';
    }
    //clear the message field
  }
  onFormSubmit()  {
    console.log("on form submit:", this.state.usrMsg);
    this.props.onMsgSubmit(this.state.usrName, this.state.usrMsg); 
  }
  //............................................................................
  render() {
    return (
      <footer className="chatbar">
        <form onSubmit={this.onFormSubmit}>
          <input className="chatbar-username" type="txt" placeholder="Your Name           (Optional)" value={this.state.usrName} onChange={this.onUsrChg} />
          <input className="chatbar-message" type="text" onKeyPress={this.keyPress} 
            onChange={this.onMsgChg} placeholder="Type a message and hit ENTER" />
        </form>
      </footer>
    );
  }
}
export default ChatBar;