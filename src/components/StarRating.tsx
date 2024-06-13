import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface Props {
  rating: number;
  size: number;
  editable?: boolean;
  onChange?: (newRating: number) => void;
}

export default function StarRating({
  rating,
  size,
  editable = false,
  onChange,
}: Props) {
  return (
    <View style={styles.container}>
      {[...Array(5)].map((_, index) => {
        const starPosition = index + 1;
        return (
          <TouchableWithoutFeedback
            key={starPosition}
            onPress={() =>
              editable && onChange !== undefined && onChange(starPosition)
            }
          >
            <View>
              <Ionicons
                name={starPosition <= rating ? 'star' : 'star-outline'}
                size={size}
                color="#FFD700"
              />
            </View>
          </TouchableWithoutFeedback>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
