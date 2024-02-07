import {StatusBar} from 'expo-status-bar';
import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import {WebView} from 'react-native-webview';
import {useState} from "react";

export default function App() {
    const authorization_url = 'https://checkout.paystack.com/luKuasMan';
    const [pressed, setPressed] = useState(false)
    const onPress = () => {
        console.log("pressed")
        setPressed(true)
    }
    const callback_url = 'https://yourcallback.com';


    const onNavigationStateChange = state => {
        console.log(state)
        const { url } = state;

        if (!url) return;

        if (url === callback_url) {
            // get transaction reference from url and verify transaction, then redirect
            const redirectTo = 'window.location = "' + callback_url + '"';
            // this.webview.injectJavaScript(redirectTo);
        }

        if(url === 'https://standard.paystack.co/close') {
            console.log("close")
            setPressed(false)
            // handle webview removal
            // You can either unmount the component, or
            // Use a navigator to pop off the view
        }
    };


    return (
        // <View style={styles.container}>
        //   <Text>Open up App.js to start working on your app!</Text>
        //   <StatusBar style="auto" />
        // </View>

        // <WebView
        //     source={{ uri: authorization_url }}
        //     style={{ marginTop: 40 }}
        // />


        <>
            {!pressed ?
                <SafeAreaView style={{margin: 20}}>

                    <View style={{height: 200, justifyContent: "center"}}>
                        <Pressable style={styles.button} onPress={onPress}>
                            <Text style={styles.text}>Pay</Text>
                        </Pressable>
                    </View>
                </SafeAreaView>
                :


                <WebView
                    source={{uri: authorization_url}}
                    style={{marginTop: 40}}
                    onNavigationStateChange={ onNavigationStateChange }
                />

            }


        </>


    );
}


const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    text: {
        fontSize: 16,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
});
