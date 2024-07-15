import ReviewDisplay from '@/components/ReviewDisplay';
import { api } from '@/services/api';
import { FeedRequest, FeedResponse } from '@/types';
import { useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';

export default function Home() {
  const [feedParams, setFeedParams] = useState<FeedRequest>({
    count: 20,
    offset: 0,
  });
  const [feed, setFeed] = useState<FeedResponse[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  async function fetchFeed() {
    setRefreshing(true);
    const response = await api.getFeed(feedParams);
    if (!response) return;
    setFeed(response);
    setRefreshing(false);
  }

  useEffect(() => {
    fetchFeed();
  }, []);

  return (
    <View style={styles.reviewList}>
      <FlatList
        data={feed}
        contentContainerStyle={{ alignItems: 'center' }}
        renderItem={({ item }) => <ReviewDisplay review={item} />}
        keyExtractor={(item) => item.review_id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={fetchFeed} />
        }
      />
    </View>
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
  reviewList: {
    flex: 1,
    width: '100%',
  },
});
