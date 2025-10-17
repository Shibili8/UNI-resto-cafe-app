import {useState, useContext} from 'react'
import CartContext from '../../context/CartContext'
import './index.css'

export default function DishCard({dish}) {
  const [quantity, setQuantity] = useState(0)
  const {cartList, addCartItem, incrementCartItemQuantity} = useContext(
    CartContext,
  )

  const dishtype = dish.dish_Type === 1 ? 'non-veg' : 'veg'
  const dishCircle = dish.dish_Type === 1 ? 'non-veg-circle' : 'veg-circle'

  const onClickAddButton = () => {
    const existing = cartList.find(item => item.dish_id === dish.dish_id)
    if (existing) {
      incrementCartItemQuantity(dish.dish_id)
    } else {
      addCartItem({...dish, quantity: quantity || 1})
    }
  }

  const onClickAddCount = () => setQuantity(prev => prev + 1)
  const onClickDecrementCount = () =>
    setQuantity(prev => (prev > 0 ? prev - 1 : 0))

  return (
    <div className="dish-card">
      <div className={dishtype}>
        <div className={dishCircle}></div>
      </div>

      <div className="dish-specifications">
        <h3 className="dish-title">{dish.dish_name}</h3>
        <p className="dish-price">
          {dish.dish_currency} {dish.dish_price}
        </p>
        <p className="dish-desc">{dish.dish_description}</p>

        {dish.dish_Availability ? (
          <>
            <div className="dish-actions">
              <button
                type="button"
                onClick={onClickDecrementCount}
                className="btn"
              >
                -
              </button>
              <p className="count">{quantity}</p>
              <button
                type="button"
                onClick={onClickAddCount}
                className="btn add"
              >
                +
              </button>
            </div>

            {quantity > 0 && (
              <>
                {dish.addonCat?.length > 0 && (
                  <p
                    className="customizations"
                    data-testid={`customizations-${dish.dish_id}`}
                  >
                    Customizations available
                  </p>
                )}
                <button
                  className="add-to-cart-btn"
                  type="button"
                  onClick={onClickAddButton}
                  data-testid={`add-to-cart-${dish.dish_id}`}
                >
                  ADD TO CART
                </button>
              </>
            )}
          </>
        ) : (
          <p className="not-available">Not available</p>
        )}
      </div>

      <div className="calories-container">
        <p className="calory">{dish.dish_calories} calories</p>
      </div>

      <div className="img-container">
        <img src={dish.dish_image} alt={dish.dish_name} className="dish-img" />
      </div>
    </div>
  )
}
