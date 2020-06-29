import React, { Component } from 'react';
import './EditDetails.css';


class EditDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Name: '',
            Phone_Number: '',
            Address: '',
            Age: '',
            error: ''
        }
    }

    submitButtonHandler = (event) => {
        console.log(this.state);
        let options = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(this.state)
        }

        fetch("http://localhost:8080/api/v1/setUserData", options)
            .then((res) => res.json())
            .then((data) => {
                if (data.errors) {
                    alert(data.message);
                    return;
                }
                this.setState({
                    Name: '', Phone_Number: '', Address: '', Age: ''
                })
                alert("User addes sucessfully");
            })
            .catch((err) => {
                console.log("inside error")
                alert(err)
            })

    }

    render() {
        const { Name, Address, Phone_Number, Age } = this.state;
        return (
            <div>
                <h2>Please enter your details</h2>
                <div className="formContainer" href="#">
                    <label>
                        <span className="label">
                            Name:
                    </span>
                        <input type="text" value={Name} onChange={(event => {
                            this.setState({ 'Name': event.target.value })
                        })} />
                    </label>
                    <label>
                        <span className="label">
                            Phone_Number:
                    </span>
                        <input type="text" value={Phone_Number} onChange={(event => {
                            this.setState({ 'Phone_Number': event.target.value });
                        })} />
                    </label>
                    <label>
                        <span className="label">
                            Address:
                    </span>
                        <input type="text" value={Address} onChange={(event => {
                            this.setState({ 'Address': event.target.value });
                        })} />
                    </label>
                    <label>
                        <span className="label">
                            Age:
                    </span>
                        <input type="text"
                            value={Age}
                            onChange={(event => {
                                this.setState({ 'Age': event.target.value });
                            })} />
                    </label>
                    <button className="detailSubmitButton" onClick={this.submitButtonHandler}>Submit</button>
                </div>
            </div>
        );
    }
}

export default EditDetails;