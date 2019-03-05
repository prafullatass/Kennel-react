import React, { Component } from "react";

export default class EmployeeForm extends Component {
  state = {
    empName: "",
    designation: "",
    locationId: ""
  };

  handleFieldChange = evt => {
    const stateToChange = {};
    stateToChange[evt.target.id] = evt.target.value;
    this.setState(stateToChange);
  };

  constructNewEmployee = evt => {
    evt.preventDefault();
    if (this.state.employee === "") {
      window.alert("Please select a caretaker");
    } else {
      const Employee = {
        name: this.state.empName,
        designation: this.state.designation,
        location: parseInt(this.state.locationId)
      };
      this.props
        .addEmployee(Employee)
        .then(() => this.props.history.push("/employees"));
    }
  };

  render() {
    return (
      <React.Fragment>
        <form className="empForm topMargin">
          <div className="form-group">
            <label htmlFor="empName">Employee name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="empName"
              placeholder="Employee name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="designation">Designation</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="designation"
              placeholder="Designation"
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location :</label>
            <select
              defaultValue=""
              name="location"
              id="locationId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an Location</option>
              {this.props.locations.map(loc => (
                <option key={loc.id} id={loc.id} value={loc.id}>
                  {loc.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            onClick={this.constructNewEmployee}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    );
  }
}