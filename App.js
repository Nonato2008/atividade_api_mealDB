import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IncialScreen from './src/screens/Inicial';
import ReceitasScreen from './src/screens/Receitas';
import DetalhamentoScreen from './src/screens/Detalhamento';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="IncialScreen">
        <Stack.Screen 
          name="IncialScreen" 
          component={IncialScreen} 
          options={{ title: 'Início' }} 
        />
        <Stack.Screen 
          name="Receitas" 
          component={ReceitasScreen} 
          options={{ title: 'Receitas' }} 
        />
        
        <Stack.Screen 
          name="Detalhamento" 
          component={DetalhamentoScreen} 
          options={{ title: 'Detalhes da Receita' }} 
        />
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}