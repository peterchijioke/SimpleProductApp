import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import React, {Fragment, useState} from 'react';
import {APP_COLORS} from '../../../lib/constants';
import {Controller, useForm} from 'react-hook-form';
import {NormalInput} from '../common/AppTextInput';
import {MediumText, SmallText} from '../common/AppText';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {SelectedImage} from '../common/ImagePicker';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {formatToNaira} from '../../../lib/utils';
import {Product} from '../../../types/product.types';
import {isProductUpToFive} from '../../../lib/helpers';

const productSchema = z.object({
  productName: z.string().min(1, 'Product Name is required'),
  productPrice: z
    .string()
    .min(1, 'Product Price is required')
    .regex(/^\d+(\.\d{1,2})?$/, 'Invalid price format'),
});
export type ProductFormValues = z.infer<typeof productSchema>;

const FormComponent = ({
  images,
  clearImage,
}: {
  images: SelectedImage[];
  clearImage: () => void;
}) => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const [loading, setLoading] = useState(false);

  const onSubmit = async (data: ProductFormValues) => {
    setLoading(true);
    if (images.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Upload a product image to continue...',
      });
      setLoading(false);
      return;
    }
    try {
      const isFive = await isProductUpToFive();
      if (isFive) {
        setLoading(false);
        return;
      }
      const product = {
        ...data,
        images,
      };
      let arrayOfProducts;
      const f = await AsyncStorage.getItem('@products');
      if (!f) {
        arrayOfProducts = [];
      } else arrayOfProducts = JSON.parse(f);

      await AsyncStorage.setItem(
        '@products',
        JSON.stringify([...arrayOfProducts, product]),
      );
      clearImage();
      setValue('productName', '');
      setValue('productPrice', '');

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: `Error: ${error.message}`,
      });
    }
  };

  return (
    <View style={styles.formWrapper}>
      <Controller
        control={control}
        name="productName"
        render={({field: {onChange, onBlur, value}}) => (
          <NormalInput
            label="Product Name"
            placeholder="Product Name"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={errors.productName}
          />
        )}
      />

      <Controller
        control={control}
        name="productPrice"
        render={({field: {onChange, onBlur, value}}) => (
          <View>
            <NormalInput
              label="Product Price"
              onBlur={onBlur}
              placeholder="200,000"
              onChangeText={onChange}
              keyboardType="numeric"
              value={value}
              error={errors.productPrice}
            />
            <SmallText>Price: {formatToNaira(value)}</SmallText>
          </View>
        )}
      />
      <Pressable style={styles.submitBtn} onPress={handleSubmit(onSubmit)}>
        {loading ? (
          <ActivityIndicator color={APP_COLORS.white} size={20} />
        ) : (
          <MediumText
            textStyle={{
              fontWeight: 'bold',
            }}>
            Add Product
          </MediumText>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonText: {
    fontWeight: 'bold',
  },
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
  button: {
    width: 60,
    height: 60,
    aspectRatio: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#133',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formWrapper: {
    flexGrow: 1,
    marginTop: '5%',
    position: 'relative',
    gap: 20,
  },
  submitBtn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    backgroundColor: APP_COLORS.button,
    borderRadius: 5,
    marginTop: 'auto',
  },
});

export default FormComponent;
