import React, { Component } from 'react'

import "./Employee.css"

class EmployeeList extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="topMargin card-holder">
                    {
                        this.props.employees.map(employee =>
                            <div key={`employee--${employee.id}`} className="card">
                                <div className="card-header bg-info">{employee.designation}</div>
                                <div className="card-body"><strong>{employee.name}</strong></div>
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
                <button id="fireAll" className="btnAll btn-danger">Fire All</button>
            </React.Fragment>
        )
    }
}

export default EmployeeList