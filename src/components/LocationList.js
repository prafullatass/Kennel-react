import  React, { Component } from 'react'

import "./Kennel.css"

class LocationList extends Component {
    render () {
        return(
            <section className = "topMargin">
            {
            this.props.locations.map(location =>
                <section key = {`Location--${location.id}`}>{location.name} {location.address}</section>
            )
            }
            </section>
        )
    }
}

export default LocationList