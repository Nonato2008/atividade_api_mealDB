import { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
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

        // Pega apenas as 20 primeiras
        const firstTwenty = response.data.meals.slice(0, 20);

        setMeals(firstTwenty);

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

        <ActivityIndicator
          size="large"
          color="#e74c3c"
        />

        <Text style={styles.loadingText}>
          Carregando receitas...
        </Text>

      </View>
    );

  }

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Receitas
      </Text>

      <Text style={styles.subtitle}>
        Escolha uma receita para ver o modo de preparo
      </Text>

      <FlatList
        data={meals}

        keyExtractor={(item) => item.idMeal}

        showsVerticalScrollIndicator={false}

        contentContainerStyle={styles.list}

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image
              source={{ uri: item.strMealThumb }}
              style={styles.image}
            />

            <View style={styles.info}>

              <Text style={styles.mealName}>
                {item.strMeal}
              </Text>

              <Text style={styles.category}>
                Categoria: {item.strCategory}
              </Text>

              <View style={styles.buttonContainer}>

                <TouchableOpacity
                  style={styles.button}
                  activeOpacity={0.7}
                  onPress={() =>
                    navigation.navigate('Detalhamento', {
                      mealId: item.idMeal,
                    })
                  }
                >

                  <Text style={styles.buttonText}>
                    Modo De Preparo
                  </Text>

                </TouchableOpacity>

              </View>

            </View>

          </View>

        )}
      />

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 20,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },

  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },

  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#222',
    textAlign: 'center',
    marginBottom: 4,
  },

  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginBottom: 20,
  },

  list: {
    paddingBottom: 20,
  },

  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 20,
    overflow: 'hidden',
  },

  image: {
    marginTop: 20,
    width: 200,
    height: 200,
    borderRadius: 10,
    marginBottom: 0,
    alignSelf: 'center',
  },

  info: {
    padding: 16,
  },

  mealName: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 6,
  },

  category: {
    fontSize: 15,
    color: '#e74c3c',
    fontWeight: '600',
    marginBottom: 15,
  },

  buttonContainer: {
    borderRadius: 8,
    overflow: 'hidden',
  },

  button: {
    backgroundColor: '#ff6b35',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

});
