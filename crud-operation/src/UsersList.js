import React, { Component } from 'react';
import './UsersList.css';


class UsersList extends Component {
  head = ["Name", "Phone_Number", "Address", "Age"]

  constructor(props) {
    super(props);
    this.state = {
      users: []
    }
  }

  componentDidMount() {
    this.fetchAllUsers();
  }

  fetchAllUsers = () => {
    fetch("http://localhost:8080/api/v1/getAllUsersData")
      .then(res => res.json())
      .then((data => {
        this.setState({ users: data });
      }))
  }

  deleteUserHandler = (phonNo) => {
    let options = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
      }
    }
    console.log(phonNo, "=============phonNo")
    fetch("http://localhost:8080/api/v1/deleteUserData/" + phonNo, options)
      .then((res) => res.json())
      .then((data) => {
        this.fetchAllUsers();
        alert("User deleted sucessfully");

      })
      .catch((err) => {
        console.log("inside error")
        alert(err)
      })
  }




  render() {
    const { handleAddUser } = this.props;
    const { users } = this.state;
    return (
      <div>
        <h1>List of Users</h1>
        <table className="TableContainer">
          <thead className="FlexOne">
            <tr className="User">
              {this.head.map((ele, index) => <th key={index + 'header'} className="DataColumn">{ele}</th>)}
            </tr>
          </thead>
          <tbody>
            {users.map((ele, index) => {
              return (
                <tr key={index + 'container'} className="User">
                  <td key={index + 'name'} className="DataColumn">{ele.Name}</td>
                  <td key={index + 'phone'} className="DataColumn">{ele.Phone_Number}</td>
                  <td key={index + 'address'} className="DataColumn">{ele.Address}</td>
                  <td key={index + 'age'} className="DataColumn">
                    <span className="FlexOne age">
                      {ele.Age}
                    </span>
                    <button className="delete"
                      onClick={() => this.deleteUserHandler(ele.Phone_Number)}>Delete</button>

                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <div className="addUsersButtonContainer">
          <button className="addUserButton" onClick={handleAddUser}>Add Users</button>
        </div>
      </div>
    );
  }
}

export default UsersList;
