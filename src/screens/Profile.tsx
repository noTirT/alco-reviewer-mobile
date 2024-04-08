import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { api } from "../services/api";
import { ReviewResponse, UserProfileResponse } from "@/types/api";
import ReviewDisplay from "@/components/ReviewDisplay";

export default function ProfileScreen() {
    const [profile, setProfile] = useState<UserProfileResponse>({} as UserProfileResponse)
    const [reviews, setReviews] = useState<ReviewResponse[]>([])

    useEffect(() => {
        async function getProfile() {
            const profileData = await api.getUserProfile()
            if (!profileData) return
            setProfile(profileData)
            const reviewResponse = await api.getUserReviews()
            if (!reviewResponse) return
            setReviews(reviewResponse)
        }
        getProfile()
    }, [])

    return (
        <View style={styles.container}>
            <Image source={require("../../assets/defaultProfile.png")} style={styles.profileImage} />
            <Text style={styles.nameTitle}>{profile.username}</Text>
            <Text style={styles.subTitle}>{profile.email}</Text>
            {
                reviews.map(review => (
                    <ReviewDisplay review={review} key={review.review_id} onPress={() => console.log("card pressed")} />
                ))
            }
        </View>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: '100%',
        marginTop: 10,
    },
    nameTitle: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
    },
    subTitle: {
        fontSize: 12,
        textAlign: "center",
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
    }
})
