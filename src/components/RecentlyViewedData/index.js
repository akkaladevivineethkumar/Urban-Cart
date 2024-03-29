import './index.css'

const RecentlyViewedData = props => {
  const {productData} = props
  const {title, brand, imageUrl, rating, price} = productData

  return (
    <li className="product-item">
      <img src={imageUrl} alt="product" className="thumbnail1" />
      <h1 className="title1">{title}</h1>
      <p className="brand1">by {brand}</p>
      <div className="product-details1">
        <p className="price1">Rs {price}/-</p>
        <div className="rating-container1">
          <p className="rating1">{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star1"
          />
        </div>
      </div>
      {/* </Link> */}
    </li>
  )
}
export default RecentlyViewedData
