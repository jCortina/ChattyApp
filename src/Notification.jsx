/* eslint react/prop-types: 0 */

/*eslint-disable no-unused-vars*/ 
import React, {Component} from 'react';
/*eslint-enable no-unused-vars*/


class Notification extends Component {
  
  constructor(props) {
    super(props);
  }
  
  //if (oldusername && ____username)
  //return (...x has chaned name to y....)
  //else 
  
  render() {
    console.log("render notification: " + this.props.message.content);
    return(
      <div className="notification" >
        <span className="msg-notification">{this.props.message.content}</span>
      </div>
     );
  }
}
export default Notification;
