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
    this.state = {usrName: this.props.currentUser, usrMsg: ''};
    this.state.wrkUser = this.state.usrName;
    
  }
  // Action to take on User name change
  onUsrChg(ev)  {
    this.state.wrkUser = ev.target.value;
  }
  // Action taken when message entered in chat box
  onMsgChg(ev)  {
    this.setState({usrMsg: ev.target.value}, () => {
    });
  }
  keyPress(ev)  {
    //enter key pressed - perform form submit process
    if (ev.key == 'Enter') {
      // if enter pressed, check user name against state, invoke callbach func if chg 
      if (this.state.usrName !== this.state.wrkUser) {
        this.props.onUsrChg(this.state.wrkUser);
        this.setState({usrName: this.state.wrkUser});
        //return;
      }
      // whenever enter key is pressed(on user or message) send msg only if not null
      if (ev.target.name == 'msg' && ev.target.value !== null) {
        this.onFormSubmit(this.state.wrkUser, this.state.usrMsg);
        ev.target.value = '';
      }
    }
  }
  onFormSubmit(user, message)  {
    this.props.onMsgSubmit(user, message); 
  }
  //............................................................................
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username"  name='usr' defaultValue={this.state.usrName} 
          onChange={this.onUsrChg} onKeyPress={this.keyPress} />
        <input className="chatbar-message"  onKeyPress={this.keyPress} name='msg' 
          onChange={this.onMsgChg} placeholder="Type a message and hit ENTER" />
      </footer>
    );
  }
}

export default ChatBar;