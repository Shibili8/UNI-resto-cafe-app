import {useEffect, useState} from 'react'
import CategoryTabs from '../CategoryTabs'
import DishCard from '../DishCard'
import Header from '../Header'
import './index.css'

export default function MenuCard() {
  const [data, setData] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const [cart, setCart] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const result = await res.json()
      setData(result[0])

      const saladCategory = result[0].table_menu_list.find(
        cat => cat.menu_category.toLowerCase() === 'salad and soup',
      )
      if (saladCategory) {
        setActiveCategory(saladCategory.menu_category_id)
      } else {
        setActiveCategory(result[0]?.table_menu_list?.[0]?.menu_category_id)
      }
    }
    fetchData()
  }, [])

  const handleAddToCart = dishId => {
    setCart(prev => ({
      ...prev,
      [dishId]: (prev[dishId] || 0) + 1,
    }))
  }

  const handleRemoveFromCart = dishId => {
    setCart(prev => {
      if (!prev[dishId]) return prev
      const updated = {...prev, [dishId]: prev[dishId] - 1}
      if (updated[dishId] <= 0) delete updated[dishId]
      return updated
    })
  }

  if (!data) return <p className="loading">Loading...</p>

  const activeDishes =
    data.table_menu_list.find(cat => cat.menu_category_id === activeCategory)
      ?.category_dishes || []

  return (
    <div>
      {console.log(data)}
      <Header cartCount={Object.values(cart).reduce((a, b) => a + b, 0)} />

      <CategoryTabs
        categories={data.table_menu_list}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <div className="dish-grid">
        {activeDishes.map(dish => (
          <DishCard
            key={dish.dish_id}
            dish={dish}
            count={cart[dish.dish_id] || 0}
            onAdd={() => handleAddToCart(dish.dish_id)}
            onRemove={() => handleRemoveFromCart(dish.dish_id)}
          />
        ))}
      </div>
    </div>
  )
}
