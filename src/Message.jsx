/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/ 
import React, {Component} from 'react';
/*eslint-enable no-unused-vars*/


class Message extends Component {
  
  constructor(props) {
    super(props);
  }
  
  //if (oldusername && ____username)
  //return (...x has chaned name to y....)
  //else 
  
  render() {
    return(
      <div className="message" >
        <span className="message-username">{this.props.message.usrName}</span>
        <span className="message-content">{this.props.message.usrMsg}</span>
      </div>
     );
  }
}
export default Message;
