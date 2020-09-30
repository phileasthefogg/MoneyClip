import { createStackNavigator } from '@react-navigation/stack';
import MainStackScreen from './MainStack';

const RootStack = createStackNavigator();

function App() {
  console.log('ROOT STACK RENDER');
  return (
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={MainStackScreen}
        options={{ headerShown: false }}
        initialParams={{reset:false}}
      />
      <RootStack.Screen name="MyModal" component={ModalScreen} />
    </RootStack.Navigator>
  );
}

export default App;
