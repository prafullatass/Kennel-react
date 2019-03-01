import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './AnimalList'
import LocationList from './LocationList'
import EmployeeList from './EmployeeList'

import "./Kennel.css"
import OwnersList from './OwnersList';
import animalManager from '../modules/animalManager';
import employeeManager from '../modules/employeeManager';
import locationManager from '../modules/locationManager';
import ownerManager from '../modules/ownerManager';
import animalOwnersManager from '../modules/animalOwnersManager';

class ApplicationViews extends Component {
    componentDidMount() {
        console.log("componentDidMount --- appView")
        const newState = {}

        animalManager.getAll()
            .then(animals => newState.animals = animals)
            // .then(() => fetch("http://localhost:5002/employees")
            //     .then(r => r.json()))
            employeeManager.getAll()
            .then(employees => newState.employees = employees)
            locationManager.getAll()
            .then(locations => newState.locations = locations)
            ownerManager.getAll()
            .then(owners => newState.owners = owners)
            animalOwnersManager.getAll()
            .then(animalOwners => newState.animalOwners = animalOwners)
            .then(() => this.setState(newState))
    }

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        animalOwners: []
    }

    releaseAnimal = (id) => {
        fetch(`http://localhost:5002/animals/${id}`, {
            method: "DELETE"
        })
            .then(() => fetch("http://localhost:5002/animals"))
            .then(r => r.json())
            .then(animals => {
                console.log(animals)
                this.setState({ animals: animals })
            })
    }

    fireEmployee = (empId) => {
        fetch(`http://localhost:5002/employees/${empId}`, {
            method: "DELETE"
        })
            .then(employeeManager.getAll)
            .then(employees => this.setState({ employees: employees }))
    }

    fireAll = () => {
        let promises = []
        this.state.employees.forEach(emp => {
            promises.push(fetch(`http://localhost:5002/employees/${emp.id}`, {
                method: "DELETE"
            })
            )
            console.log(promises)
        }
        )
        console.log(promises)
        Promise.all(promises)
            .then(employeeManager.getAll)
            .then(employees => this.setState({ employees: employees }))
        document.querySelector("#fireAll").disabled = true
    };


    render() {
        console.log("render--view")
        console.log(this.state)
        return (
            <React.Fragment>
                <Route exact path="/" render={() => {
                    return <LocationList locations={this.state.locations} />
                }} />
                <Route path="/animals" render={() => {
                    return <AnimalList animals={this.state.animals}
                        owners={this.state.owners}
                        animalOwners={this.state.animalOwners}
                        releaseAnimal={this.releaseAnimal} />
                }} />
                <Route path="/employees" render={() => {
                    return <EmployeeList employees={this.state.employees}
                        fireEmployee={this.fireEmployee}
                        fireAll={this.fireAll} />
                }} />
                <Route path="/owners" render={() => {
                    return <OwnersList owners={this.state.owners} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews