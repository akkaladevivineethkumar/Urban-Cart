import {BsFilterRight} from 'react-icons/bs'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import CartContext from '../../context/CartContext'
import RecentlyViewedData from '../RecentlyViewedData'

import './index.css'

const ProductsHeader = props => {
  const {sortbyOptions, activeOptionId} = props

  const onChangeSortby = event => {
    const {changeSortby} = props
    changeSortby(event.target.value)
  }

  const settings = {
    dots: false,
    slidesToScroll: 1,
    slidesToShow: 4,
    centerPadding: '5px',
    centerMode: true,
  }

  return (
    <CartContext.Consumer>
      {value => {
        const {recentData} = value
        const dataLength = recentData.length > 0
        const sliderView = recentData.length >= 4

        return (
          <>
            <div className="products-header1">
              {dataLength && (
                <h1 className="products-list-heading">Recently Viewed</h1>
              )}
              {sliderView ? (
                <ul>
                  <Slider {...settings}>
                    {recentData.map(product => (
                      <RecentlyViewedData
                        productData={product}
                        key={product.id}
                      />
                    ))}
                  </Slider>
                </ul>
              ) : (
                <ul className="products-list1">
                  {recentData.map(product => (
                    <RecentlyViewedData
                      productData={product}
                      key={product.id}
                    />
                  ))}
                </ul>
              )}
            </div>
            <div className="products-header">
              <h1 className="products-list-heading">All Products</h1>
              <div className="sort-by-container">
                <BsFilterRight className="sort-by-icon" />
                <p className="sort-by">Sort by</p>
                <select
                  className="sort-by-select"
                  value={activeOptionId}
                  onChange={onChangeSortby}
                >
                  {sortbyOptions.map(eachOption => (
                    <option
                      key={eachOption.optionId}
                      value={eachOption.optionId}
                      className="select-option"
                    >
                      {eachOption.displayText}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )
      }}
    </CartContext.Consumer>
  )
}

export default ProductsHeader
