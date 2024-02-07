import {NavigationContainer} from '@react-navigation/native';

import Succeeded from "../views/Succeeded/Succeeded";
import Payment from "../views/Payment/Payment";
import {useSelector} from "react-redux";

export default function MainNavigator() {

    const success = useSelector(state => state.payment.success)

    return (
        <NavigationContainer>
            {!success && <Payment/>}
            {success && <Succeeded/>}
        </NavigationContainer>
    );
}