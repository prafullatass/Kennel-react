import React, { Component } from 'react'

import "./Kennel.css"

class LocationList extends Component {
    render() {
        return (
            <section className="topMargin">
                {
                    this.props.locations.map(location =>
                        <div key={`Location--${location.id}`}>
                            <h2>{location.name} </h2>
                            <p>{location.address}</p>
                            <hr/>
                        </div>
                    )
                }
            </section>
        )
    }
}

export default LocationList