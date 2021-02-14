import React, { Component } from 'react';
import send from './helper/renderer';

class Dashboard extends Component {
  state = {
    userName: '',
  };

  componentDidMount() {
    this.getUserName();
  }

  getUserName = async () => {
    const users = await send('SELECT * FROM users WHERE id = 1').then(
      (result) => result,
    );
    const [user] = users;
    this.setState((s) => ({ ...s, userName: user.first_name }));
    console.log(user);
  };

  sendPing = () => {
    send('ping').then(console.log('pong'));
  };

  render() {
    const { userName } = this.state;
    return (
      <div>
        {userName}
        <button onClick={this.sendPing}>Send Ping</button>{' '}
      </div>
    );
  }
}

export default Dashboard;
