import {View, Text} from 'react-native';
import React from 'react';
import ImagePickerComponent from '../common/ImagePicker';

type Props = {};

const CreateProductScreenLayout = (props: Props) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      <ImagePickerComponent />
    </View>
  );
};

export default CreateProductScreenLayout;
