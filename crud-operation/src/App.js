import React, { Component } from 'react';
import UsersList from './UsersList';
import EditDetails from './EditDetails';
import './App.css';
import './UsersList.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEdit: false,
      isAddUser: false
    }
  }

  handleEditUser = () => this.setState({ isEdit: true })

  handleAddUser = () => this.setState({ isAddUser: true })

  render() {
    const { isAddUser, isEdit } = this.state;
    return (
      <div className="App">
        {
          !(isAddUser || isEdit) ? <UsersList
            handleEditUser={this.handleEditUser}
            handleAddUser={this.handleAddUser}
          /> : null
        }
        {
          isAddUser || isEdit ? <EditDetails
            handleEditUser={this.handleEditUser}
            handleAddUser={this.handleAddUser}
          /> : null
        }
      </div>
    );
  }
}

export default App;
