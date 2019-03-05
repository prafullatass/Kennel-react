import React, { Component } from 'react'
import dog from "./DogIcon.png"
import { Link } from "react-router-dom";

import "./Animal.css"

class Animal extends Component {
    render() {
        return (
            <div key={this.props.animal.id} className="card">
                <div className="card-body">
                    <h5 className="card-title">
                        <img src={dog} alt="" className="icon--dog" />
                        <div>{this.props.animal.name}</div>
                    </h5>
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            this.props.history.push(`/animals/${this.props.animal.id}/edit`);
                        }}
                    >
                        Edit </button>
                    <button onClick={() => this.props.releaseAnimal(this.props.animal.id)}>Release Me</button>
                    <Link className="nav-link" to={`/animals/${this.props.animal.id}`}
                    >Details</Link>
                </div>
            </div>
        )
    }
}

export default Animal