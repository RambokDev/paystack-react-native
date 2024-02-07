import {useState} from "react";
import {
    Keyboard,
    SafeAreaView,
    Text,
    Image,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import {WebView} from 'react-native-webview';

import OneTipLogo from '../../assets/onetip-logo.svg'
import styles from "./PaymentStyle"
import {store} from "../../redux/store";
import {paymentSucceeded} from "../../redux/slices/payment";

const FAKE_URL = "https://soluce-technologies.com"

const API_URL = "https://staging.paystack-api.soluce-technologies.com"
const callback_url = 'https://staging.paystack-api.soluce-technologies.com/callback';
const cancel_url = 'https://staging.paystack-api.soluce-technologies.com/cancel';

export default function Payment() {

    const [authUrl, setAuthUrl] = useState("")
    const [amount, setAmount] = useState(0)
    const [pressed, setPressed] = useState(false)
    const [reference, setReference] = useState("")

    const fetchAuthorizationUrl = async () => {

        const response = await fetch(`${API_URL}/transaction/init_transaction`, {
            method: 'POST',
            body: JSON.stringify({
                amount: amount * 100,
                email: "test@soluce-technologies.com"
            }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        const {data} = await response.json();
        setReference(data.reference)
        return data
    };


    const onPress = () => {
        if (amount) {
            console.log(amount)
            fetchAuthorizationUrl().then(response => {
                    setAuthUrl(response.authorization_url)
                    setPressed(true)
                }
            )
        }
    }


    const onNavigationStateChange = state => {
        console.log(state.url)
        const {url} = state;

        if (!url) return;

        if (url === callback_url + "?trxref=" + reference + "&reference=" + reference) {
            console.log("callback")
            setPressed(false)
            store.dispatch(paymentSucceeded())
        }

        if (url === cancel_url) {
            console.log("cancel")
            setPressed(false)
        }
    };

    return (

        <>
            {!pressed ?

                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                    <SafeAreaView style={{margin: 20, marginTop: 100}}>
                        <View style={{alignItems: 'center'}}>
                            <OneTipLogo width={240} height={80}/>
                            <View style={{marginTop: 200, marginBottom: 200}}>
                                <Text
                                    style={{fontSize: 30, lineHeight: 30, fontWeight: 'bold', marginBottom: 30}}>
                                    Montant du pourboire
                                </Text>
                                <View style={{flexDirection: 'row', alignSelf: 'center'}}>
                                    <TextInput
                                        style={styles.tipText}
                                        keyboardType="numeric"
                                        onChangeText={(e) => setAmount(e)}/>
                                    <Text style={{fontSize: 24, lineHeight: 30}}> NGN</Text>
                                </View>
                            </View>
                            <TouchableOpacity style={styles.button} onPress={onPress}>
                                <Text style={styles.text}>Pay</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                </TouchableWithoutFeedback>

                :

                <WebView
                    source={{uri: authUrl}}
                    style={{marginTop: 40}}
                    onNavigationStateChange={onNavigationStateChange}
                />

            }
        </>

    )
}
