import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native"

interface Props {
    rating: number
    size: number
}

export default function StarRating({ rating , size}: Props) {
    return (
        <View style={styles.container}>
            {[...Array(5)].map((_, index) => {
                const starPosition = index + 1;
                return (
                    <Ionicons
                        key={starPosition}
                        name={
                            starPosition <= rating
                                ? "star" : "star-outline"
                        }
                        size={size}
                        color="#FFD700"
                    />
                );
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
    }
});
