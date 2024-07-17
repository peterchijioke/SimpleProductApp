import {View, Text, SafeAreaView} from 'react-native';
import React from 'react';
import ProductListLayout from '../components/product-list/ProductListLayout';

type Props = {};

export const ProductListScreenName = 'Product List';
const ProductListScreen = (props: Props) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      <ProductListLayout />
    </SafeAreaView>
  );
};

export default ProductListScreen;
