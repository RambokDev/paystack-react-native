import {useState} from "react";

import {NavigationContainer} from '@react-navigation/native';

import Succeeded from "../src/Succeeded/Succeeded";
import Payment from "../src/Payment/Payment";
import {useSelector} from "react-redux";

export default function MainNavigator() {

    // const [success, setSuccess] = useState(false)

    const success = useSelector(state => state.payment.success)
    console.log(success)


    return (
        <NavigationContainer>
            {!success && <Payment/>}
            {success && <Succeeded/>}
        </NavigationContainer>
    );
}