import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  followingCount: number;
  followerCount: number;
}

export default function ProfileHeader({
  followingCount,
  followerCount,
}: Props) {
  return (
    <View style={styles.imageContainer}>
      <View>
        <Text style={styles.countText}>{followingCount}</Text>
        <Text style={styles.countText}>Following</Text>
      </View>
      <Image
        source={require('../../assets/defaultProfile.png')}
        style={styles.profileImage}
      />
      <View>
        <Text style={styles.countText}>{followerCount}</Text>
        <Text style={styles.countText}>Followers</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  countText: {
    fontSize: 14,
    textAlign: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2,
  },
});
