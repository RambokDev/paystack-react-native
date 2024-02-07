import LottieView from "lottie-react-native";

export default function Succeeded() {
    return (
        <>
            <LottieView
                source={require("../../assets/heart_red.json")}
                // source={require("../../assets/confetti.json")}
                style={{width: "100%", height: "100%"}}
                autoPlay={true}
                loop={false}
                speed={3}
            />
        </>
    )
}