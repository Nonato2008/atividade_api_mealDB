import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  Button, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator 
} from 'react-native';
import api from '../../api/api.js'; 

export default function ReceitasScreen({ navigation }) {
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMeals() {
      try {
        // Busca receitas que começam pela letra 'a'
        const response = await api.get('/search.php?f=a');
        
        // Pega apenas as 5 primeiras
        const firstFive = response.data.meals.slice(0, 20);
        setMeals(firstFive);
      } catch (error) {
        console.log('Erro ao buscar receitas:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMeals();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text>Carregando receitas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Receitas</Text>

      <FlatList
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image 
              source={{ uri: item.strMealThumb }} 
              style={styles.image} 
            />
            <Text style={styles.mealName}>{item.strMeal}</Text>

            <Button
              title="Detalhes"
              onPress={() => 
                navigation.navigate('Detalhamento', { 
                  mealId: item.idMeal 
                })
              }
            />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginBottom: 24,
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 10,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 8,
  },
  mealName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
});