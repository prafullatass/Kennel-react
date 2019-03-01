import React, { Component } from 'react'

class OwnersList extends Component {
    render () {
        console.log("render--owner")
        return(
            <section className = "topMargin">
            {
                this.props.owners.map(owner =>
                    <div key = {`owner--${owner.id}`}>{owner.name} {owner.phoneNo}</div>
                )
            }
            </section>
        )
    }
}

export default OwnersList