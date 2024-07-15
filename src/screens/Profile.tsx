import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { api } from '../services/api';
import { ReviewResponse, UserProfileResponse } from '@/types';
import ReviewDisplay from '@/components/ReviewDisplay';
import { LinearGradient } from 'expo-linear-gradient';
import ProfileHeader from '@/components/ProfileHeader';

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfileResponse>(
    {} as UserProfileResponse,
  );
  const [reviews, setReviews] = useState<ReviewResponse[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function refetchData() {
    setRefreshing(true);
    const profileData = await api.getUserProfile();
    if (!profileData) return;
    setProfile(profileData);
    const reviewResponse = await api.getUserReviews();
    if (!reviewResponse) return;
    setReviews(reviewResponse);
    setRefreshing(false);
  }

  useEffect(() => {
    refetchData();
  }, []);

  return (
    <LinearGradient colors={['#fff', '#cccccc']} style={styles.container}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: 20,
        }}
      >
        <ProfileHeader
          followerCount={profile.follower_count}
          followingCount={profile.following_count}
        />
        <Text style={styles.nameTitle}>{profile.username}</Text>
        <Text style={styles.subTitle}>{profile.email}</Text>
      </View>
      <View style={styles.reviewList}>
        <FlatList
          data={reviews}
          contentContainerStyle={{ alignItems: 'center' }}
          renderItem={({ item }) => (
            <ReviewDisplay review={{ ...item, reviewer_name: '' }} />
          )}
          keyExtractor={(item) => item.review_id}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={refetchData} />
          }
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    minWidth: '85%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    width: '100%',
  },
  nameTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  reviewList: {
    flex: 1,
    width: '100%',
    marginTop: 15,
  },
});
