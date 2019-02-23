import React, { Component } from 'react'
import SimpleBar from 'simplebar-react' 

import 'simplebar/dist/simplebar.min.css'

export default class Portfolio extends Component {

  constructor() {
    super()
    this.state = {
      open: false,
      portfolio: []
    }
    this.togglePortfolio = this.togglePortfolio.bind(this)
  }

  componentDidMount() {
    fetch('api/portfolio')
      .then(res => res.json())
      .then(portfolio => this.setState({portfolio}))
  }

  togglePortfolio() {
    this.setState({
      open: !this.state.open
    })
  }

  render() {
    return (
      <div className="menu menu--top-right"> 
        <button onClick={this.togglePortfolio} className="menu-item text-right">portfolio</button>
        <ul className={ this.state.open ? "portfolio open" : "portfolio" }>
          {this.state.portfolio.map(item =>
              <li key={item.id} className="portfolio__item">
                <a href={item.url}>
                  <h4 className="portfolio__title">{item.name}</h4>
                  <p className="portfolio__desc">{item.description}</p>
                </a>
              </li>
          )}
        </ul>
      </div>
    )
  }
}
