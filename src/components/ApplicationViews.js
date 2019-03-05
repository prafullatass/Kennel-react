import { Route, Redirect } from "react-router-dom"

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
import Login from "./login";
import AnimalEditForm from "./animal/animalEditForm";
import { Promise } from "q";
import EmployeeForm from "./employee/employeeForm";

class ApplicationViews extends Component {
    componentDidMount() {
        console.log("componentDidMount --- appView")
        const newState = {}
        const promises = []
        promises.push(animalManager.getAll()
            .then(animals => newState.animals = animals))

        promises.push(employeeManager.getAll()
            .then(employees => newState.employees = employees))

        promises.push(locationManager.getAll()
            .then(locations => newState.locations = locations))

        promises.push(ownerManager.getAll()
            .then(owners => newState.owners = owners))

        promises.push(animalOwnersManager.getAll()
            .then(animalOwners => newState.animalOwners = animalOwners))

        Promise.all(promises)
            .then(() => this.setState(newState))
    }

    state = {
        employees: [],
        locations: [],
        animals: [],
        owners: [],
        animalOwners: []
    }

    isAuthenticated = () => sessionStorage.getItem("credentials") !== null

    addEmployee =(emp) => {
        return employeeManager.addNewEmployee(emp)
        .then(() => employeeManager.getAll())
        .then(employees => this.setState({employees : employees}))
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

    updateAnimal = (editedAnimalObject) => {
        return animalManager.put(editedAnimalObject)
            .then(() => animalManager.getAll())
            .then(animals => {
                this.setState({
                    animals: animals
                })
            });
    };

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
        return fetch(`http://localhost:5002/employees/${empId}`, {
            method: "DELETE"
        })
            .then(employeeManager.getAll)
            .then(employees => this.setState({ employees: employees }))
    }

    fireAll = () => {
        let promises = []
        this.state.employees.forEach(emp =>
            promises.push(fetch(`http://localhost:5002/employees/${emp.id}`, {
                method: "DELETE"
            })
            )
        )
        console.log(promises)
        Promise.all(promises)
            .then(employeeManager.getAll)
            .then(employees => this.setState({ employees: employees }))
        document.querySelector("#fireAll").disabled = true
    };


    render() {
        console.log("Render--View")
        console.log(this.state)
        return (
            <React.Fragment>
                <Route path="/login" component={Login} />
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
                <Route exact path="/employees" render={props => {
                    if (this.isAuthenticated()) {
                        return <EmployeeList employees={this.state.employees}
                            fireEmployee={this.fireEmployee}
                            fireAll={this.fireAll}
                            {...props} />
                    } else {
                        return <Redirect to="/login" />
                    }
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
                <Route path="/animals/:animalId(\d+)/edit" render={props => {
                    return <AnimalEditForm {...props}
                        employees={this.state.employees}
                        updateAnimal={this.updateAnimal} />
                }} />
                <Route exact path="/employees/:employeeId(\d+)" render={(props) => {
                    console.log("Route", this.state)
                    return <EmployeeDetail {...props}
                        fireEmployee={this.fireEmployee}
                        employees={this.state.employees}
                        locations={this.state.locations}
                    />
                }} />
                <Route exact path="/employee/new" render={(props) => {
                    return <EmployeeForm locations={this.state.locations}
                    addEmployee={this.addEmployee}
                    {...props} />
                }} />
            </React.Fragment>
        )
    }
}

export default ApplicationViews