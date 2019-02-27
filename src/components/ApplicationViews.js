import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './AnimalList'
import LocationList from './LocationList'
import EmployeeList from './EmployeeList'

import "./Kennel.css"
import OwnersList from './OwnersList';

class ApplicationViews extends Component {
    employeesFromAPI = [
        { id: 1, name: "Jessica Younker" },
        { id: 2, name: "Jordan Nelson" },
        { id: 3, name: "Zoe LeBlanc" },
        { id: 4, name: "Blaise Roberts" }
    ]

    ownersFromAPI = [
        { id: 1, name: "Jessica Younker", phoneNo:"6156688693" },
        { id: 2, name: "Jordan Nelson", phoneNo:"1111111111"},
        { id: 3, name: "Zoe LeBlanc", phoneNo:"2222222" },
        { id: 4, name: "Blaise Roberts", phoneNo:"3333333333" }
    ]

    locationsFromAPI = [
        { id: 1, name: "Nashville North", address: "500 Circle Way" },
        { id: 2, name: "Nashville South", address: "10101 Binary Court" }
    ]

    animalsFromAPI = [
        { id: 1, name: "Doodles" },
        { id: 2, name: "Jack" },
        { id: 3, name: "Angus" },
        { id: 4, name: "Henley" },
        { id: 5, name: "Derkins" },
        { id: 6, name: "Checkers" }
    ]

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: []
    }

    render() {
        return (
            <React.Fragment>
            console.log("render")
                <Route exact path="/" render={(props) => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals} />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees} />
                }} />
                <Route path="/owners" render={() => {
                    return <OwnersList owners = {this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews