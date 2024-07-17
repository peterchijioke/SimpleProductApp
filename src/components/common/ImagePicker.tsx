import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  StyleSheet,
  ScrollView,
  Alert,
  Pressable,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  launchImageLibrary,
  ImageLibraryOptions,
  Asset,
} from 'react-native-image-picker';
import Toast from 'react-native-toast-message';
import {Plus} from 'lucide-react-native';
import {APP_COLORS} from '../../../lib/constants';
import {MediumText} from './AppText';
import {NormalInput} from './AppTextInput';
import {Controller} from 'react-hook-form';
import FormComponent from '../create-product/FormComponent';

interface ImagePickerComponentProps {}

export interface SelectedImage {
  uri: string;
}

const ImagePickerComponent: React.FC<ImagePickerComponentProps> = () => {
  const [images, setImages] = useState<SelectedImage[]>([]);

  const pickImages = () => {
    try {
      if (images.length >= 5) {
        Toast.show({
          text1: 'Limit Reached',
          text2: 'You can only upload up to 5 images',
        });
        return;
      }

      const options: ImageLibraryOptions = {
        mediaType: 'photo',
        maxHeight: 200,
        maxWidth: 200,
        selectionLimit: 5 - images.length,
      };

      launchImageLibrary(options, response => {
        if (response.didCancel) {
          Toast.show({
            text1: 'User cancelled image picker',
          });
        } else if (response.errorCode) {
          Toast.show({
            text1: `'Image Picker Error: ', ${response.errorMessage}`,
          });
        } else if (response.assets) {
          const selectedImages = response.assets.map((asset: Asset) => ({
            uri: asset.uri!,
          }));
          setImages(prevImages => [...prevImages, ...selectedImages]);
        }
      });
    } catch (error: any) {
      Toast.show({
        text1: `'Image Picker Error: ', ${error.message}`,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImages}>
          <Plus color={APP_COLORS.white} size={20} />
        </TouchableOpacity>

        {images.map((image, index) => (
          <Image
            key={index}
            source={{
              uri: image.uri,
            }}
            style={styles.image}
          />
        ))}
      </View>
      <FormComponent
        clearImage={() => {
          setImages([]);
        }}
        images={images}
      />
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

    gap: 15,
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

export default ImagePickerComponent;
