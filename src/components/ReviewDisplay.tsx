import { ReviewResponse } from '@/types';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from './StarRating';

interface Props {
  review: ReviewResponse;
  onPress: () => void;
}

export default function ReviewDisplay({ review, onPress }: Props) {
  function getDateString() {
    const originalDate = new Date(review.created_at);
    const dateString =
      ('0' + originalDate.getDay()).slice(-2) +
      '.' +
      ('0' + (originalDate.getMonth() + 1)).slice(-2) +
      '.' +
      originalDate.getFullYear();

    return dateString;
  }

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          {review.drink.name}
          <Text style={styles.subTitle}> {getDateString()}</Text>
        </Text>
        <StarRating rating={review.rating} size={20} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    width: '85%',
  },
  card: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    marginLeft: 10,
    paddingLeft: 10,
  },
});
