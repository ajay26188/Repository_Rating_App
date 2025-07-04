import { Pressable } from "react-native";
import Text from "./Text";

const AppBarTab = () => {

    return (
        <Pressable>
            <Text color='white'  fontWeight='bold' style={{ padding: 15, fontSize: 20 }}>Repositories</Text>
        </Pressable>
    )
}

export default AppBarTab;