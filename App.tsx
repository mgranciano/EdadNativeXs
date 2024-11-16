import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const App: React.FC = () => {
  const [yearOfBirth, setYearOfBirth] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);
  const [showWebView, setShowWebView] = useState<boolean>(false);

  const calculateAge = () => {
    const currentYear = new Date().getFullYear();
    const year = parseInt(yearOfBirth, 10);

    if (!isNaN(year)) {
      setAge(currentYear - year);
      setShowWebView(true);
    } else {
      alert('Por favor, ingresa un año válido.');
    }
  };

  // Contenido HTML asegurado
  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          font-family: Arial, sans-serif;
          background-color: #eef2f3; /* Fondo claro */
        }
        h1 {
          color: #4CAF50;
          text-align: center;
          font-size: 24px;
        }
      </style>
    </head>
    <body>
      <h1>Gracias por usar el servicio</h1>
    </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      {!showWebView ? (
        <>
          <Text style={styles.title}>Bienvenido, calcula tu edad</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu año de nacimiento"
            keyboardType="numeric"
            value={yearOfBirth}
            onChangeText={setYearOfBirth}
          />
          <Button title="Calcular" onPress={calculateAge} />
          {age !== null && <Text style={styles.result}>Tu edad es {age} años</Text>}
        </>
      ) : (
        <WebView
          originWhitelist={['*']}
          source={{ html: htmlContent }}
          style={styles.webview}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '80%',
    marginBottom: 16,
  },
  result: {
    marginTop: 16,
    fontSize: 18,
    color: 'green',
    textAlign: 'center',
  },
  webview: {
    flex: 1,
    width: '100%',
  },
});

export default App;
