import React , { Component } from 'react'

export default class EmployeeDetail extends Component {
    render() {
        const employee = this.props.employees.find(a =>
            a.id === parseInt(this.props.match.params.employeeId)) || {}
console.log("render --- employee Detail",this.props)

        return (
            <div key={`employee--${employee.id}`} className="topMargin">
                <div className="card-header bg-info">{employee.designation}</div>
                <div className="card-body"><strong>{employee.name}</strong></div>
                <div>Works in :
                {(this.props.locations.find(location => location.id === employee.location) || {}).name}
                </div>
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