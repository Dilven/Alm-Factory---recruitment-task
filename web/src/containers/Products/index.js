import React, { Component } from 'react';
import ProductsList from '../../components/ProductsList';
import ProductsFilter from '../../components/ProductsFilter';
import { Spin, Select } from 'antd';
import { connect } from 'react-redux';
import * as productsAction from '../../actions/products';
import debounce from 'lodash/debounce'
const Option = Select.Option;


class Products extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categoryId: '',
      page: 0,
      searchedPhrase: ''
    };
  };

  componentDidMount() {
    this.props.getProducts();
  };

  handleChangeCategory = (value) => {
    this.setState({ categoryId: value, page: 0 })
    this.props.getProducts(0, this.state.searchedPhrase, value);
  };

  handleChangePage = (value) => {
    const page = value - 1
    this.setState({ page })
    this.props.getProducts(page, this.state.searchedPhrase, this.state.categoryId);
  };

  handleFilter = (event) => {
    // console.log(event.target)
    const phrase = event.target.value;
    this.setState({ searchedPhrase: phrase, page: 0 })
    this.changeFilterText(this.state.searchedPhrase)
  };

  changeFilterText = debounce((phrase) => {
    this.props.getProducts(0, phrase, this.state.categoryId);
  }, 250);

  render() {
    const { products, isLoading, totalProducts } = this.props.products;
    return (
      <div>
        <Select
          defaultValue=""
          placeholder="Select category"
          style={{ width: 120 }}
          onChange={this.handleChangeCategory}
        >
          <Option value="">All</Option>
          <Option value="0">Books</Option>
          <Option value="1">Home</Option>
          <Option value="2">Clothes</Option>
        </Select>
        <ProductsFilter
          onChange={this.handleFilter}
          value={this.state.searchedPhrase}
        />
        {isLoading ? <Spin size="large" /> : <ProductsList data={products} onChange={this.handleChangePage} page={this.state.page} total={totalProducts} />}
      </div>
    )
  };
};

const mapStateToProps = (state) => {
  return {
    ...state
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProducts: (page, phrase, categoryId) => dispatch(productsAction.getProducts(page, phrase, categoryId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Products);