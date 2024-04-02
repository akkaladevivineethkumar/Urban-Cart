import {BsSearch} from 'react-icons/bs'
import CartContext from '../../context/CartContext'
import './index.css'

const FiltersGroup = props => {
  const renderRatingsFiltersList = () => {
    const {ratingsList} = props

    return ratingsList.map(rating => {
      const {changeRating, activeRatingId} = props
      const ratingClassName =
        activeRatingId === rating.ratingId ? `and-up active-rating` : `and-up`

      const onClickRatingItem = () => changeRating(rating.ratingId)

      return (
        <li
          className="rating-item"
          key={rating.ratingId}
          onClick={onClickRatingItem}
        >
          <img
            src={rating.imageUrl}
            alt={`rating ${rating.ratingId}`}
            className="rating-img"
          />
          <p className={ratingClassName}>& up</p>
        </li>
      )
    })
  }

  const renderRatingsFilters = () => (
    <div>
      <h1 className="rating-heading">Rating</h1>
      <ul className="ratings-list">{renderRatingsFiltersList()}</ul>
    </div>
  )

  const renderCategoriesList = () => {
    const {categoryOptions} = props

    return (
      <CartContext.Consumer>
        {value => {
          const {getActiveCat} = value
          const {changeCategory, activeCategoryId} = props

          return categoryOptions.map(category => {
            const onClickCategoryItem = () => {
              changeCategory(category.categoryId)
              getActiveCat(category.name)
            }
            const isActive = category.categoryId === activeCategoryId
            const categoryClassName = isActive
              ? `category-name active-category-name`
              : `category-name`

            return (
              <li
                className="category-item"
                key={category.categoryId}
                onClick={onClickCategoryItem}
              >
                <p className={categoryClassName}>{category.name}</p>
              </li>
            )
          })
        }}
      </CartContext.Consumer>
    )
  }

  const renderProductCategories = () => (
    <>
      <h1 className="category-heading">Category</h1>
      <ul className="categories-list">{renderCategoriesList()}</ul>
    </>
  )

  const onEnterSearchInput = event => {
    const {enterSearchInput} = props
    if (event.key === 'Enter') {
      enterSearchInput()
    }
  }

  const onChangeSearchInput = event => {
    const {changeSearchInput} = props
    changeSearchInput(event.target.value)
  }

  const renderSearchInput = () => {
    const {searchInput} = props
    return (
      <div className="search-input-container">
        <input
          value={searchInput}
          type="search"
          className="search-input"
          placeholder="Search"
          onChange={onChangeSearchInput}
          onKeyDown={onEnterSearchInput}
        />
        <BsSearch className="search-icon" />
      </div>
    )
  }

  const {clearFilters} = props

  return (
    <CartContext.Consumer>
      {value => {
        const {getActiveCat} = value

        const handleClearFilters = () => {
          getActiveCat('')
          clearFilters()
        }

        return (
          <div className="filters-group-container">
            {renderSearchInput()}
            {renderProductCategories()}
            {renderRatingsFilters()}
            <button
              type="button"
              className="clear-filters-btn"
              onClick={handleClearFilters}
            >
              Clear Filters
            </button>
          </div>
        )
      }}
    </CartContext.Consumer>
  )
}

export default FiltersGroup
