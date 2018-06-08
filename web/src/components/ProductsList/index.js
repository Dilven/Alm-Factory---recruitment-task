import React from 'react'
import PropTypes from 'prop-types'
import { List, Card } from 'antd';

const ProductsList = ({ data, onChange, page, total }) => {
  return (
    <div>
      <List
        pagination={{
          onChange: onChange,
          pageSize: data.length,
          current: page + 1,
          total
        }}
        grid={{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 4, xl: 4, xxl: 3 }}
        dataSource={data}
        renderItem={product => (
          <List.Item>
            <Card title={product.name}>Card content</Card>
          </List.Item>
        )}
      />
    </div>
  )
}

ProductsList.propTypes = {
  data: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
}

export default ProductsList;
