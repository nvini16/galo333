import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import LottieView from "lottie-react-native";
import React, { useEffect, useState } from "react";
import { ImageBackground, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import CacaCores from "./cacaCores";
import GaloNumeros from "./galoNumeros";
import JogoMemoria from "./jogoMemoria";


type RootStackParamList = {
  Intro: undefined;
  Home: undefined;
  GaloNumeros: undefined;
  JogoMemoria: undefined;
  CacaCores: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();


type IntroProps = NativeStackScreenProps<RootStackParamList, "Intro">;
type HomeProps = NativeStackScreenProps<RootStackParamList, "Home">;

function IntroScreen({ navigation }: IntroProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace("Home");
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.introContainer}>
      <LottieView
        source={require("./galo-animacao.json")}
        autoPlay
        loop
      />
    </View>
  );
}

function HomeScreen({ navigation }: HomeProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (message: string) => {
    setModalMessage(message);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 2000);
  };

  const navigateWithModal = (screenName: keyof RootStackParamList, message: string) => {
    showModal(message);
    setTimeout(() => navigation.navigate(screenName), 500);
  };

  return (
    <ImageBackground source={require('./galo.333.png')} style={styles.image}>
      <View style={styles.container}>
        <Text style={styles.titulo}>Biblioteca de jogos infantis:</Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateWithModal('GaloNumeros', 'Decolando para Galo de Números!🚀')}
        >
          <Text style={styles.buttonText}>Galo de Números</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateWithModal('JogoMemoria', 'Decolando para Jogo da Memória!🚀')}
        >
          <Text style={styles.buttonText}>Jogo da Memória</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigateWithModal('CacaCores', 'Decolando para Caça Cores!🚀')}
        >
          <Text style={styles.buttonText}>Caça Cores</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
    </ImageBackground>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Intro" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Intro" component={IntroScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GaloNumeros" component={GaloNumeros} />
        <Stack.Screen name="JogoMemoria" component={JogoMemoria} />
        <Stack.Screen name="CacaCores" component={CacaCores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9cdcfe8e",
    padding: 15,
    margin: 50,
    borderColor: "#23477F",
    borderRadius: 15,
  },
  titulo: {
    fontSize: 30,
    marginBottom: 40,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#146EDE",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginVertical: 10,
    transform: [{ scale: 0.95 }],
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#89C0FC",
    padding: 80,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
    textAlign: "center",
  },
});
