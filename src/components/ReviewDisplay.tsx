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
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/defaultProfile.png')}
        style={styles.profileImage}
      />
      <View style={styles.content}>
        <View style={styles.postHeader}>
          <Text style={styles.reviewerName}>
            {review.reviewer_name + ' '}
            <Text style={styles.reviewDate}>
              - {getDateString(review.created_at)}
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  reviewDate: {
    fontWeight: 'normal',
    color: '#a3a3a3',
  },
  reviewerName: {
    fontWeight: 'bold',
  },
  postHeader: {
    flexDirection: 'row',
    gap: 20,
  },
  content: {},
  container: {
    minWidth: '100%',
    padding: 5,
    backgroundColor: '#fff',
    borderBottomWidth: 0.3,
    borderBottomColor: '#e2e2e2',
    flexDirection: 'row',
    gap: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 150 / 2,
  },
});
