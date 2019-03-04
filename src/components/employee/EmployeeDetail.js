import React , { Component } from 'react'

export default class EmployeeDetail extends Component {
    render() {
        const employee = this.props.employee.find(a =>
            a.employeeId === parseInt(this.props.match.param.employeeId)) || {}
        return (
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
        )
    }
}