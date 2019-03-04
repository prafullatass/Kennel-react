import { Route } from 'react-router-dom'
import React, { Component } from "react"
import AnimalList from './animal/AnimalList'
import LocationList from './location/LocationList'
import EmployeeList from './employee/EmployeeList'
import OwnersList from './owners/OwnersList';
import animalManager from '../modules/animalManager';
import employeeManager from '../modules/employeeManager';
import locationManager from '../modules/locationManager';
import ownerManager from '../modules/ownerManager';
import animalOwnersManager from '../modules/animalOwnersManager';

import "./Kennel.css"
import AnimalDetail from './animal/AnimalDetail';
import EmployeeDetail from './employee/EmployeeDetail';
import AnimalForm from './animal/AnimalForm';
class ApplicationViews extends Component {
    componentDidMount() {
        console.log("componentDidMount --- appView")
        const newState = {}

        animalManager.getAll()
            .then(animals => newState.animals = animals)
        // .then(() => fetch("http://localhost:5002/employees")
        //     .then(r => r.json()))
        employeeManager.getAll()
            .then(employees => {
                console.log(employees)
                newState.employees = employees
            })
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

    addAnimal = (animal, animalOwner) => {
        let obj = {}
        return animalManager.addNewAnimal(animal)
            .then(animal => {
                console.log(animal)
                animalOwner.animalId = animal.id
                console.log(animalOwner)
                animalOwnersManager.addAnimalOwner(animalOwner)
            })
            .then(() => animalManager.getAll())
            .then(animals => obj.animals = animals)
            .then(() => animalOwnersManager.getAll())
            .then(animalOwners => obj.animalOwners = animalOwners)
            .then(() => this.setState(obj))
    }

    releaseAnimal = (id) => {
        return fetch(`http://localhost:5002/animals/${id}`, {
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
                <Route exact path="/animals" render={(props) => {
                    return <AnimalList animals={this.state.animals}
                        owners={this.state.owners}
                        animalOwners={this.state.animalOwners}
                        releaseAnimal={this.releaseAnimal}
                        employees={this.state.employees}
                        {...props} />
                }} />
                <Route path="/animals/new" render={(props) => {
                    return <AnimalForm {...props}
                        addAnimal={this.addAnimal}
                        employees={this.state.employees}
                        owners={this.state.owners}
                    />
                }} />
                <Route path="/employees" render={(props) => {
                    return <EmployeeList employees={this.state.employees}
                        fireEmployee={this.fireEmployee}
                        fireAll={this.fireAll}
                        {...props} />
                }} />
                <Route exact path="/owners" render={() => {
                    return <OwnersList owners={this.state.owners} />
                }} />
                <Route exact path="/animals/:animalId(\d+)" render={(props) => {
                    console.log(props)
                    return <AnimalDetail {...props}
                        releaseAnimal={this.releaseAnimal}
                        animalOwners={this.state.animalOwners}
                        employees={this.state.employees}
                        owners={this.state.owners}
                        animals={this.state.animals} />
                }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                    return <EmployeeDetail {...props}
                        fireEmployee={this.fireEmployee} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews