import { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  ActivityIndicator 
} from 'react-native';
import api from '../../api/api.js'; 

export default function DetalhamentoScreen({ route }) {
  const { mealId } = route.params;
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadMealDetails() {
      try {
        const response = await api.get(`/lookup.php?i=${mealId}`);
        setMeal(response.data.meals[0]);
      } catch (error) {
        console.log('Erro ao buscar detalhes:', error);
      } finally {
        setLoading(false);
      }
    }

    loadMealDetails();
  }, [mealId]);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#e74c3c" />
        <Text>Carregando detalhes...</Text>
      </View>
    );
  }

  if (!meal) {
    return (
      <View style={styles.center}>
        <Text>Receita não encontrada.</Text>
      </View>
    );
  }

  // Monta a lista de ingredientes
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== '') {
      ingredients.push(`${measure} ${ingredient}`);
    }
  }

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: meal.strMealThumb }} 
        style={styles.image} 
      />

      <Text style={styles.title}>{meal.strMeal}</Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Categoria: </Text>
        {meal.strCategory}
      </Text>

      <Text style={styles.info}>
        <Text style={styles.label}>Origem: </Text>
        {meal.strArea}
      </Text>

      <Text style={styles.sectionTitle}>Ingredientes</Text>
      {ingredients.map((item, index) => (
        <Text key={index} style={styles.ingredient}>• {item}</Text>
      ))}

      <Text style={styles.sectionTitle}>Modo de Preparo</Text>
      <Text style={styles.instructions}>{meal.strInstructions}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  ingredient: {
    fontSize: 15,
    marginBottom: 4,
  },
  instructions: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 30,
  },
});