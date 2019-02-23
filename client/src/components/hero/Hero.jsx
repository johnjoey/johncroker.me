import React, { Component } from 'react'

export default class Hero extends Component {
  render() {
    return (
      <div className="hero">
        <div className="hero__inner">
            <div className="hero__logo">
                <img src="/images/arsehole.png" alt="Some idiot." />
            </div>
            <div className="titles">
                <div className="titles__left">
                    <h1 className="titles__name">john croker</h1>
                </div>
                <div className="titles__right">
                    <div className="titles__job">web developer</div>
                    <div className="titles__greeting">hi</div>
                </div>
            </div>
        </div>
      </div>
    )
  }
}
