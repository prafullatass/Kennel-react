import  React, { Component } from 'react'

class EmployeeList extends Component {
    render () {
        return(
            <section className = "topMargin">
            {
            this.props.employees.map(employee =>
                <section key = {`employee--${employee.id}`}>{employee.name} {employee.address}</section>
            )}
            </section>
        )
    }
}

export default EmployeeList