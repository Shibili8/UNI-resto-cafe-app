import {useEffect, useState, useContext} from 'react'
import Loader from 'react-loader-spinner'
import CategoryTabs from '../CategoryTabs'
import DishCard from '../DishCard'
import Header from '../Header'
import CartContext from '../../context/CartContext'
import './index.css'

export default function Home() {
  const [data, setData] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)
  const {cartList, addCartItem, incrementCartItemQuantity} = useContext(
    CartContext,
  )

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

  if (!data) {
    return (
      <div className="loader-container">
        <Loader type="Circles" color="#4fa94d" height={80} width={80} />
      </div>
    )
  }

  const activeDishes =
    data.table_menu_list.find(cat => cat.menu_category_id === activeCategory)
      ?.category_dishes || []

  return (
    <div>
      <Header restoName={data.branch_name} />
      <div className="home-container">
        <CategoryTabs
          categories={data.table_menu_list}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />

        <div className="dish-grid">
          {activeDishes.map(dish => (
            <DishCard key={dish.dish_id} dish={dish} />
          ))}
        </div>
      </div>
    </div>
  )
}
