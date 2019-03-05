import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import "./Employee.css"
import EmployeeForm from './employeeForm';

class EmployeeList extends Component {
    render() {
        return (
            <React.Fragment>
                <section className ="topMargin">
                    <button onClick={() => {
                        this.props.history.push("/employee/new")
                    }} >Add New Employee
                    </button>
                </section>
                <section className=" card-holder">
                    {
                        this.props.employees.map(employee =>
                            <div key={`employee--${employee.id}`} className="card">
                                <div className="card-header bg-info">{employee.designation}</div>
                                <div className="card-body"><strong>{employee.name}</strong></div>
                                <Link to={`/employees/${employee.id}`}>Details</Link>
                                <div className="btn-container">
                                    <button className="btn btn-outline-danger"
                                        onClick={() => { this.props.fireEmployee(`${employee.id}`) }}>
                                        Fire
                                    </button>
                                    <button className="btn btn-outline-primary">Edit</button>
                                </div>
                            </div>
                        )}
                </section>
                <button id="fireAll"
                    onClick={() => this.props.fireAll()}
                    className="btnAll btn-danger">Fire All</button>
            </React.Fragment>
        )
    }
}

export default EmployeeList