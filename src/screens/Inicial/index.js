import { useState, useEffect, useCallback } from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Button} from 'react-native'

export default function IncialScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao APP de Receitas!</Text>
      
      <Text style={styles.description}>
        Esse app tem como finalidade apenas mostrar o consumo de uma API pública e a exibição dos seus dados.
      </Text>

      <Button
        title="Ver Receitas"
        onPress={() => navigation.navigate('Receitas')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#555',
  },
});