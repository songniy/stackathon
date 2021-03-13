import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

const coffees = [
  {name: 'Perspiciatis', image: 'images/1.jpg'},
  {name: 'Voluptatem', image: 'images/2.jpg'},
  {name: 'Explicabo', image: 'images/3.jpg'},
  {name: 'Rchitecto', image: 'images/4.jpg'},
  {name: ' Beatae', image: 'images/5.jpg'},
  {name: ' Vitae', image: 'images/6.jpg'},
  {name: 'Inventore', image: 'images/7.jpg'},
  {name: 'Veritatis', image: 'images/8.jpg'},
  {name: 'Accusantium', image: 'images/9.jpg'}
]
/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div>
      {coffees.map(({name, image}, index) => {
        return (
          <div key={index} className="card">
            <img className="card--avatar" src={`${image}`} />
            <h1 className="card--title">{name}</h1>
            <a className="card--link" href="#">
              Taste
            </a>
          </div>
        )
      })}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
