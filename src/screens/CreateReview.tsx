import AutocompleteInput from '@/components/AutocompleteInput';
import StarRating from '@/components/StarRating';
import TitledComponent from '@/components/TitledComponent';
import { getDrinksByLocation } from '@/services/api/drinks';
import { getAllLocations } from '@/services/api/locations';
import { DrinkResponse, LocationResponse } from '@/types';
import { useEffect, useState } from 'react';
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { styles as stylesExtern } from '@/styles/styles';
import { createReview } from '@/services/api/reviews';
import Toast from 'react-native-root-toast';

export default function CreateReviewScreen() {
  const [locationId, setLocationId] = useState('');
  const [possibleLocations, setPossibleLocations] = useState<
    LocationResponse[]
  >([]);

  const [drinkId, setDrinkId] = useState('');
  const [possibleDrinks, setPossibleDrinks] = useState<DrinkResponse[]>([]);

  const [rating, setRating] = useState(0);

  const [description, setDescription] = useState('');

  useEffect(() => {
    async function fetchLocations() {
      const response = await getAllLocations();
      if (response) setPossibleLocations(response);
    }
    fetchLocations();
  }, []);

  useEffect(() => {
    async function fetchDrink(tempLocationId: string) {
      const response = await getDrinksByLocation(tempLocationId);
      if (response) setPossibleDrinks(response);
    }
    if (locationId !== '') fetchDrink(locationId);
    setDrinkId('');
  }, [locationId]);

  function invalidData() {
    return (
      !locationId || locationId === '' || !drinkId || drinkId === '' || !rating
    );
  }

  async function handleSubmit() {
    if (invalidData()) return;

    try {
      await createReview({
        rating: rating,
        location_id: locationId,
        drink_id: drinkId,
        review_text: description,
      });
      Toast.show('Review created sucessfully', {
        duration: Toast.durations.LONG,
      });
    } catch (err: unknown) {
      Toast.show('Error creating review', {
        duration: Toast.durations.LONG,
      });
    } finally {
      setRating(0);
      setDrinkId('');
      setLocationId('');
      setDescription('');
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={{ flex: 1, width: '100%', alignItems: 'center' }}>
        <View>
          <AutocompleteInput
            data={possibleLocations.map((location) => ({
              name: location.name,
              id: location.id,
            }))}
            placeholder="Select location..."
            iconName="location-outline"
            value={locationId}
            onChange={setLocationId}
          />
        </View>
        <View>
          <AutocompleteInput
            data={possibleDrinks.map((drink) => ({
              name: drink.name,
              id: drink.id,
            }))}
            placeholder="Select drink..."
            iconName="beer-outline"
            value={drinkId}
            onChange={setDrinkId}
            disabled={locationId === ''}
          />
        </View>
        <View
          style={
            (styles.ratingContainer, { opacity: drinkId === '' ? 0.3 : 1 })
          }
        >
          <TitledComponent title="Select rating">
            <StarRating
              rating={rating}
              size={50}
              editable={drinkId !== ''}
              onChange={(newRating: number) => setRating(newRating)}
            />
          </TitledComponent>
        </View>
        <View style={styles.textArea}>
          <TextInput
            multiline={true}
            onChangeText={(text) => setDescription(text)}
            value={description}
            placeholder="Enter additional review description here..."
          />
        </View>
        <View style={stylesExtern.buttonContainer}>
          <TouchableOpacity
            style={[stylesExtern.button, { opacity: invalidData() ? 0.5 : 1 }]}
            onPress={handleSubmit}
            disabled={invalidData()}
          >
            <Text style={stylesExtern.buttonText}>Submit review</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  ratingContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  textArea: {
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 5,
    width: '90%',
    marginTop: 30,
    flexGrow: 1,
  },
});
