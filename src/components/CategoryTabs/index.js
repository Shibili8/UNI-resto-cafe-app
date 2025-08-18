import React from 'react'
import './index.css'

export default function CategoryTabs({
  categories,
  activeCategory,
  setActiveCategory,
}) {
  return (
    <div className="tabs-container">
      {categories.map(cat => (
        <button
          key={cat.menu_category_id}
          className={`tab ${
            activeCategory === cat.menu_category_id ? 'active' : ''
          }`}
          onClick={() => setActiveCategory(cat.menu_category_id)}
        >
          {cat.menu_category}
        </button>
      ))}
    </div>
  )
}
