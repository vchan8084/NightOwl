import { createStackNavigator, StackViewCard } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import Map from './Map';

const AppNavigator = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header: null,
    },
  },
  Map: { screen: Map },
});

const AppNav = createAppContainer(AppNavigator);

export default AppNav;
