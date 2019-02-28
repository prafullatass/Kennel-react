import React, { Component } from 'react'
import dog from "./DogIcon.png"

import "./Animal.css"

class Animal extends Component {
    render() {
        return (
            <div key={this.props.animal.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={dog} alt ="" className="icon--dog" />
                        <div>{this.props.animal.name}</div>
                    </h5>
                    <div>{this.props.owners.join(", ")}</div>
                    <button onClick={() => this.props.releaseAnimal(this.props.animal.id)}>Release Me</button>
                </div>
            </div>

        )
    }
}

export default Animal