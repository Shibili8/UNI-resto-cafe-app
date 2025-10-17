import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import CartContext from '../../context/CartContext'
import './index.css'

const Header = props => {
  const {restoName, history} = props

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  const onClickCart = () => {
    history.replace('/cart')
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {cartList} = value
        console.log(cartList)
        return (
          <nav className="nav-header">
            <div className="nav-content">
              <div className="nav-bar-large-container">
                <Link to="/" className="nav-link">
                  <h1 className="title">{restoName}</h1>
                </Link>
                <ul className="nav-menu">
                  <li className="nav-menu-item">
                    <Link to="/" className="nav-link">
                      <p>Home</p>
                    </Link>
                  </li>

                  <li className="nav-menu-item">
                    <button
                      className="button-test"
                      data-testid="cart"
                      onClick={onClickCart}
                      type="button"
                    >
                      <p>My Orders</p>
                      {cartList.length > 0 ? (
                        <p className="cart-count-badge">{cartList.length}</p>
                      ) : (
                        <p className="cart-count-badge">0</p>
                      )}
                    </button>
                  </li>
                </ul>
                <button
                  type="button"
                  className="logout-desktop-btn"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </div>
          </nav>
        )
      }}
    </CartContext.Consumer>
  )
}

export default withRouter(Header)
