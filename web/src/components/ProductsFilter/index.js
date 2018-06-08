import React from 'react'
import { Input } from 'antd';
import PropTypes from 'prop-types';
const Search = Input.Search;

const ProductsFilter = ({ onChange, value }) => {
  return (
    <div>
      <Search
        placeholder="input search product"
        onChange={onChange.bind(this)}
        value={value}
        style={{ width: 200 }}
        enterButton
        id="search-products"
      />
    </div>
  )
}
ProductsFilter.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default ProductsFilter;