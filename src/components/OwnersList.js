import React, { Component } from 'react'

class OwnersList extends Component {
    render () {
        return(
            <section className = "topMargin">
            {
                this.props.owners.map(owner =>
                    <div id = {`owner--${owner.id}`}> {owner.name} {owner.phoneNo} </div>
                )
            }
            </section>
        )
    }
}

export default OwnersList