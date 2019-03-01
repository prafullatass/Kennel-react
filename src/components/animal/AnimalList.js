import React, { Component } from 'react'
import Animal from './Animal';

import "../Kennel.css"
class AnimalList extends Component {
    render() {
        return (
            <section className="topMargin animals">
                {
                    this.props.animals.map(animal =>
                        <Animal key={animal.id} animal={animal}
                            owners={this.props.animalOwners
                                .filter(animalOwner =>
                                    animalOwner.animalId === animal.id)
                                .map(animalOwner =>
                                    this.props.owners.find(owner =>
                                        owner.id === animalOwner.ownerId).name)}
                            releaseAnimal={this.props.releaseAnimal} />
                        //<section key = {`animal--${animal.id}`}>{animal.name} </section>
                    )}
            </section>
        )
    }
}

export default AnimalList