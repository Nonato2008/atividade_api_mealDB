import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';


export default function InicialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />

      {/* Card central */}
      <View style={styles.card}>
        <Text style={styles.emoji}>🍳</Text>
        
        <Text style={styles.title}>Bem-vindo ao App de Receitas!</Text>
        
        <Text style={styles.description}>
          Esse app tem como finalidade apenas mostrar o consumo de uma API pública e a exibição dos seus dados.
        </Text>

        <TouchableOpacity 
          style={styles.button}
          activeOpacity={0.8}
          onPress={() => navigation.navigate('Receitas')}
        >
          <Text style={styles.buttonText}>Ver Receitas</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  card: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#ffffff',
    borderRadius: 20,
    paddingVertical: 36,
    paddingHorizontal: 28,
    alignItems: 'center',
    
  },
  emoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 14,
    lineHeight: 32,
  },
  description: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 32,
  },
  button: {
    backgroundColor: '#ff6b35',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});