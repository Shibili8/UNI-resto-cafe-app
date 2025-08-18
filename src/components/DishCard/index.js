import React from 'react'
import './index.css'

export default function DishCard({dish, count, onAdd, onRemove}) {
  const dishtype = dish.dish_Type === 1 ? 'non-veg' : 'veg'
  const dishCircle = dish.dish_Type === 1 ? 'non-veg-circle' : 'veg-circle'
  return (
    <div className='dish-card'>
      <div className={dishtype}>
        <div className={dishCircle}></div>
      </div>
      <div className='dish-specifications'>
        <h3 className='dish-title'>{dish.dish_name}</h3>
        <p className='dish-price'>
          {dish.dish_currency} {dish.dish_price}
        </p>
        <p className='dish-desc'>{dish.dish_description}</p>

        <div className='dish-actions'>
          <button onClick={() => onRemove(dish.dish_id)} className='btn'>
            -
          </button>
          <span className='count'>{count}</span>
          <button onClick={() => onAdd(dish.dish_id)} className='btn add'>
            +
          </button>
        </div>
        {count > 0 && (
          <p className='customizations'>Customizations available</p>
        )}
      </div>
      <div className='calories-container'>
        <p className='calory'>{dish.dish_calories} calories</p>
      </div>
      <div className='img-container'>
        <img src={dish.dish_image} alt={dish.dish_name} className='dish-img' />
      </div>
    </div>
  )
}
