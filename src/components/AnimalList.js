import  React, { Component } from 'react'

class AnimalList extends Component {
    render () {
        return(
            <section class = "topMargin">
            {
            this.props.animals.map(animal =>
                <section key = {`animal--${animal.id}`}>{animal.name} {animal.address}</section>
            )}
            </section>
        )
    }
}

export default AnimalList