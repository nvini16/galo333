import { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Carta = {
  id: number;
  value: string;
  virada: boolean;
  encontrada: boolean;
};

export default function JogoMemoria() {
  const imagens: string[] = ["🐶", "🐱", "🦊", "🐼"];
  
  const gerarCartas = (): Carta[] => 
    [...imagens, ...imagens]
      .sort(() => Math.random() - 0.5)
      .map((item: string, index: number) => ({ id: index, value: item, virada: false, encontrada: false }));

  const [cartas, setCartas] = useState<Carta[]>(gerarCartas());
  const [primeira, setPrimeira] = useState<number | null>(null);
  const [segunda, setSegunda] = useState<number | null>(null);

  const virarCarta = (index: number) => { 
    if (cartas[index].virada || segunda !== null) return;

    const novasCartas = [...cartas];
    novasCartas[index].virada = true;
    setCartas(novasCartas);

    if (primeira === null) setPrimeira(index);
    else setSegunda(index);
  };

  const resetar = () => {
    setCartas(gerarCartas());
    setPrimeira(null);
    setSegunda(null);
  };

  useEffect(() => {
    if (primeira !== null && segunda !== null) {
      const cartasTemp = [...cartas];
      if (cartasTemp[primeira].value === cartasTemp[segunda].value) {
        cartasTemp[primeira].encontrada = true;
        cartasTemp[segunda].encontrada = true;
        setCartas(cartasTemp);
      } else {
        setTimeout(() => {
          cartasTemp[primeira].virada = false;
          cartasTemp[segunda].virada = false;
          setCartas([...cartasTemp]);
        }, 1000);
      }
      setPrimeira(null);
      setSegunda(null);
    }
  }, [primeira, segunda, cartas]);

  const venceu = cartas.every(c => c.encontrada);

  return (
    <ImageBackground source={require('./galo.333.png')} style={styles.container}>
      <View style={styles.cont}>
        <Text style={styles.instrucoes}>
          O que será que tem atrás dessas cartas? Clique e descubra seus pares!
        </Text>

        <View style={styles.grid}>
          {cartas.map((carta, index) => (
            <TouchableOpacity
              key={carta.id}
              style={styles.carta}
              onPress={() => virarCarta(index)}
            >
              <Text style={styles.texto}>
                {carta.virada || carta.encontrada ? carta.value : "❓"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {venceu && (
          <Text style={styles.vitoria}>
            🎉 Você venceu! 🎉
          </Text>
        )}

        <TouchableOpacity onPress={resetar} style={styles.botao}>
          <Text style={styles.botaoTexto}> Reiniciar</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  cont: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: "#23477F",
    backgroundColor: "#9cdcfe8e",
    borderWidth: 3,
    padding: 20,
    borderRadius: 15,
  },
  instrucoes: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 10,
    color: "#fff",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  carta: {
    width: 80,
    height: 80,
    margin: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  texto: {
    fontSize: 50,
    textAlign: "center",
  },
  botao: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#255694",
    borderRadius: 10,
  },
  botaoTexto: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  vitoria: {
    fontSize: 24,
    color: "gold",
    marginTop: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
});
