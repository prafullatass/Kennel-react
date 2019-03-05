import React, { Component } from 'react'
import Animal from './Animal';

import "../Kennel.css"
class AnimalList extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="animalButton topMargin">
                    <button type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push("/animals/new")
                        }
                        }>
                        Admit Animal
                    </button>
                </div>
                <section className="topMargin animals">
                    {
                        this.props.animals.map(animal =>
                            <Animal key={animal.id} animal={animal}
                                releaseAnimal={this.props.releaseAnimal}
                                {...this.props}
                          />
                                  //<section key = {`animal--${animal.id}`}>{animal.name} </section>
                        )}
                </section>
            </React.Fragment>
        )
    }
}

export default AnimalList