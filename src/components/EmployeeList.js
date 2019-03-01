import React, { Component } from 'react'

import "./Employee.css"

class EmployeeList extends Component {
    render() {
        return (
            <section className="topMargin">
                {
                    this.props.employees.map(employee =>
                        <div key={`employee--${employee.id}`} className="card">
                            <div className="card-header bg-info">{employee.designation}</div>
                            <div className="card-body"><strong>{employee.name}</strong></div>
                            <button className="btn btn-primary">Fire</button>
                            <button className="btn btn-primary">Edit</button>

                        </div>
                    )}

            </section>
        )
    }
}

export default EmployeeList