import { FeedResponse } from '@/types';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import StarRating from './StarRating';
import { Ionicons } from '@expo/vector-icons';
import { getDateString } from '@/services/util';
import { useState } from 'react';
import ProfileModal from './ProfileModal';

interface Props {
  review: FeedResponse;
}

export default function ReviewDisplay({ review }: Props) {
  const [expanded, setExpanded] = useState(false);
  const [profileOpened, setProfileOpened] = useState(false);

  function handleModalOpen() {
    setProfileOpened(true);
  }

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => setExpanded((curr) => !curr)}
    >
      <View style={styles.card}>
        <Ionicons
          style={{ position: 'absolute', right: 30, top: 20 }}
          name={review.drink.alcohol ? 'beer' : 'cafe'}
          size={55}
        />
        {review.reviewer_name !== '' && (
          <TouchableOpacity
            style={styles.reviewerContainer}
            onPress={handleModalOpen}
          >
            <ProfileModal
              visible={profileOpened}
              reviewerId={review.reviewer_id}
              setVisible={setProfileOpened}
            />
            <Image
              source={require('../../assets/defaultProfile.png')}
              style={styles.profileImage}
            />
            <Text>{review.reviewer_name}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.nameContainer}>
          <Text style={styles.cardTitle}>{review.drink.name}</Text>
        </View>
        {expanded && (
          <View>
            <Text style={styles.locationText}>
              {review.location.name}, {review.location.city}
            </Text>
            {review.review_text !== '' && <Text>{review.review_text}</Text>}
          </View>
        )}
        <StarRating rating={review.rating} size={20} />
        <Text style={styles.subTitle}> {getDateString(review.created_at)}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  locationText: {
    color: '#7a7a7a',
  },
  cardContainer: {
    margin: 10,
    minWidth: '85%',
  },
  profileImage: {
    width: 25,
    height: 25,
    borderRadius: 150 / 2,
  },
  reviewerContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  nameContainer: {
    flexDirection: 'row',
    marginVertical: 5,
    gap: 10,
    alignItems: 'center',
  },
  card: {
    padding: 20,
    paddingBottom: 5,
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
  },
  subTitle: {
    fontSize: 12,
    fontWeight: 'normal',
    marginTop: 10,
    textAlign: 'right',
  },
});
