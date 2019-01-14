import React, { Component } from 'react'

export default class Portfolio extends Component {

  constructor() {
    super()
    this.state = {
      portfolio: []
    }
  }

  componentDidMount() {
    fetch('api/portfolio')
      .then(res => res.json())
      .then(portfolio => this.setState({portfolio}, () => console.log(`Portfolio fetched: ${portfolio}`)))
  }

  render() {
    return (
      <div>
        <ul className="portfolio">
        {this.state.portfolio.map(item =>
            <li key={item.id}>{item.name}</li>
        )}
        </ul>
      </div>
    )
  }
}
