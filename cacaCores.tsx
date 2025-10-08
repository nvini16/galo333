import React, { useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";


export default function CacaCores() {
  const cores = ["red", "blue", "green", "yellow", "purple", "orange"];
  const [corAlvo, setCorAlvo] = useState(cores[Math.floor(Math.random() * cores.length)]);
  const [pontos, setPontos] = useState(0);

  const verificarCor = (corEscolhida: string) => {
    if (corEscolhida === corAlvo) setPontos(pontos + 2);
    else setPontos(Math.max(pontos - 1, 0));

    setCorAlvo(cores[Math.floor(Math.random() * cores.length)]);
  };

  return (
    <ImageBackground source={require("./galo.333.png")} style={styles.fundo}>
      <View style={styles.container}>
      <View style={styles.conta}>
                <Text style={styles.texto}>Clique no(a) cor:</Text>
        <Text style={[styles.alvo, { color: corAlvo }]}>{corAlvo.toUpperCase()}</Text>

        <View style={styles.grid}>
          {cores.map((cor, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.botao, { backgroundColor: cor }]}
              onPress={() => verificarCor(cor)}
            />
          ))}
        </View>

        <Text style={styles.pontos}>Pontos: {pontos}</Text>
      </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  fundo: { 
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center", 
    alignItems: "center" ,
    borderWidth: 3,
    borderColor: "#255694"
  },

  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20
  },

  texto: { fontSize: 20, marginBottom: 20, color: "#fff", textShadowColor: "black", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 
  },

  alvo: { fontSize: 32, fontWeight: "bold", marginBottom: 20 
  },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" 
  },

  botao: { width: 80, height: 80, margin: 10, borderRadius: 10, borderWidth: 2, borderColor: "#333" 
  },

  pontos: { fontSize: 20, marginTop: 20, fontWeight: "bold", color: "#fff", textShadowColor: "black", textShadowOffset: { width: 1, height: 1 }, textShadowRadius: 2 
  },

  conta: {
    borderWidth: 3,
    borderColor: "#23477F",
    backgroundColor: "#9cdcfe8e",
    alignItems: "center",
       borderRadius: 15,
  }

});