import React, { Component } from "react"
import "./Animal.css"
import dog from "./DogIcon.png"


export default class AnimalDetail extends Component {
    render() {
        /*
            Using the route parameter, find the animal that the
            user clicked on by looking at the `this.props.animals`
            collection that was passed down from ApplicationViews
        */
        const animal = this.props.animals.find(a =>
            a.id === parseInt(this.props.match.params.animalId)) || {}

        return (
            <section className="animal card-width">
                <div key={animal.id} className="card card-width">
                    <div className="card-body">
                        <h4 className="card-title">
                            <img src={dog} alt="" className="icon--dog" />
                            {animal.name}
                        </h4>
                        <h6 className="card-title">{animal.breed}</h6>
                        <div>Owners : {this.props.animalOwners
                            .filter(animalOwner =>
                                animalOwner.animalId === animal.id)
                            .map(animalOwner =>
                                this.props.owners.find(owner =>
                                    owner.id === animalOwner.ownerId).name)} </div>
                        <div>Caretaker : {this.props.employees
                            .filter(emp => emp.id === animal.employeeId)
                            .map(employee =>
                                this.props.employees.find(emp =>
                                    emp.id === employee.id).name)}</div>

                        <button href="#"
                            onClick={() => this.props.releaseAnimal(animal.id)
                                .then(() => this.props.history.push("/animals"))}
                            className="card-link">Delete</button>
                    </div>
                </div>
            </section>
        )
    }
}