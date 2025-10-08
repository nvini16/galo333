
import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function App() {
  const [pontos, setPontos] = useState(0);
  const [cor, setCor] = useState("blue");

  const mudarCor = () => {
    const cores = ["red", "green", "purple", "orange", "pink", "blue"];
    const novaCor = cores[Math.floor(Math.random() * cores.length)];
    setCor(novaCor);
    setPontos(pontos + 1);
  };

  return (
    <ImageBackground source={require('./galo.333.png')} style={styles.container}>
    <View style={styles.container}>
    <View style={styles.conta}>
             <Text style={styles.texto}>Clique em "na.vichicken" e veja os números aparecerem!</Text>
      <TouchableOpacity onPress={mudarCor} >
        <Text style={[styles.navi, { color: cor }]}>na.vichicken</Text>
        
      </TouchableOpacity>
      <Text style={styles.pontos}>Pontos: {pontos}</Text>
    </View>
      
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: "center",         
    alignItems: "center", 
    padding: 20, 
 
    },


  navi: { 
    fontSize: 20,
    padding: 4,

    },

  pontos: {
    fontSize: 50,
   textAlign: "center",
  },

  texto: {
    fontSize: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  conta: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#23477F",
    backgroundColor: "#9cdcfe8e",
    borderWidth: 3,
    padding: 30,
    borderRadius: 15
  },


});
