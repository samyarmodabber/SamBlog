import React, { Component } from 'react'
import Navbar from './layout/navbar'
import Footer from './layout/footer'
import Articles from "./articles"

export default class index extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <h1>Admin</h1>
        <Articles/>
        <Footer/>
      </div>
    )
  }
}
