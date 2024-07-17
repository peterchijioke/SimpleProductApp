import {View, Text, FlatList, Image, StyleSheet} from 'react-native';
import React from 'react';
import useGetMyProducts from '../../hooks/useGetMyProducts';
import {MediumText} from '../common/AppText';
import {Product} from '../../../types/product.types';
import {APP_COLORS} from '../../../lib/constants';
import {formatToNaira} from '../../../lib/utils';

const renderItem = ({item}: {item: Product}) => (
  <View
    style={{
      width: '100%',
      padding: 5,
      backgroundColor: APP_COLORS.button,
      borderRadius: 10,
    }}>
    <View
      style={{
        alignItems: 'center',
      }}>
      <MediumText
        textStyle={{
          fontSize: 20,
          fontWeight: 'bold',
        }}>
        Product Name: {item.productName}
      </MediumText>
      <MediumText>Price: {formatToNaira(item.productPrice)}</MediumText>
    </View>
    <View style={styles.imageContainer}>
      {item.images.map((image, index) => (
        <Image
          key={index}
          source={{
            uri: image.uri,
          }}
          style={styles.image}
        />
      ))}
    </View>
  </View>
);

const ProductListLayout = () => {
  const {data, getProducts, loading} = useGetMyProducts();
  return (
    <View style={{flex: 1}}>
      <FlatList
        refreshing={loading}
        onRefresh={getProducts}
        keyExtractor={(_, index) => index.toString()}
        data={data}
        style={{
          flex: 1,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          paddingHorizontal: 16,
          gap: 10,
          paddingBottom: 16,
          paddingTop: 15,
        }}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 16,
  },
  image: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 8,
  },
});
export default ProductListLayout;
