import React from 'react'
import {IoCartOutline} from 'react-icons/io5'
import './index.css'

export default function Header({cartCount}) {
  return (
    <header className="header">
      <h1 className="logo">UNI Resto Cafe</h1>
      <div className="cart">
        <span className="orders-text">My Orders</span>
        <IoCartOutline size={24} />
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </div>
    </header>
  )
}
