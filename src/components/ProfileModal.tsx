import { api } from '@/services/api';
import { UserProfileResponse } from '@/types';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import IconButton from './IconButton';
import ProfileHeader from './ProfileHeader';

interface Props {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  reviewerId: string;
}

export default function ProfileModal({
  visible,
  reviewerId,
  setVisible,
}: Props) {
  const [profile, setProfile] = useState<UserProfileResponse>(
    {} as UserProfileResponse,
  );
  const [loading, setLoading] = useState(true);

  async function handleShow() {
    const profileData = await api.getProfileById(reviewerId);
    if (!profileData) return;
    setProfile(profileData);
    setLoading(false);
  }

  function handleMessage() {}

  async function handleFollow() {
    if (profile.following) await api.unfollowUser(reviewerId);
    else await api.followUser(reviewerId);
    await handleShow();
  }

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => setVisible(false)}
      onShow={handleShow}
    >
      <View style={styles.modalContainer}>
        <BlurView intensity={30} style={styles.blurView}>
          <View
            style={[styles.innerModalContainer, { opacity: loading ? 0.6 : 1 }]}
          >
            <View style={styles.modalHeader}>
              <Text style={[styles.buttonText]}>{profile.username}</Text>
              <View style={{ position: 'absolute', right: -20 }}>
                <IconButton
                  iconName={'close-outline'}
                  size={30}
                  color="black"
                  onPress={() => setVisible(false)}
                />
              </View>
            </View>
            <ActivityIndicator
              animating={loading}
              size="large"
              hidesWhenStopped={true}
              style={{
                position: 'absolute',
                top: '50%',
                zIndex: 3,
              }}
              color="#000"
            />
            <ProfileHeader
              followingCount={profile.following_count}
              followerCount={profile.follower_count}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[
                  styles.button,
                  profile.following ? styles.cancelButton : styles.followButton,
                ]}
                onPress={handleFollow}
              >
                {profile.following ? (
                  <Ionicons
                    name="person-remove-outline"
                    size={20}
                    color={'red'}
                  />
                ) : (
                  <Ionicons
                    name="person-add-outline"
                    size={20}
                    color={'white'}
                  />
                )}
                <Text
                  style={[
                    !profile.following
                      ? styles.followButtonText
                      : { color: 'red' },
                    styles.buttonText,
                  ]}
                >
                  {profile.following ? 'Unfollow' : 'Follow'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={handleMessage}
              >
                <Ionicons name="chatbubble-ellipses-outline" size={20} />
                <Text style={[styles.buttonText]}>Message</Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  blurView: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
  },
  innerModalContainer: {
    position: 'relative',
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: 20,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    width: '50%',
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  followButtonText: {
    color: 'white',
  },
  followButton: {
    backgroundColor: '#0098ff',
  },
  cancelButton: {
    backgroundColor: '#d7d7d7',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
