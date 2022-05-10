import React , {useState} from "react"
import { 
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Keyboard,
 } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";

export default function Form(){

const [height,setHeight]= useState(null)
const [weight,setWeight]= useState(null)
const [messageImc, setMessageImc]= useState("Preencha o peso e a altura.")
const [imc,setImc]= useState(null)
const [textButton,setTextbutton]= useState("Calcular")

function imcCalculator(){
  let heightFormat = height.replace(",",".")  // Used to prevent IOS users from use , instead of  .
  return setImc((weight/(heightFormat*heightFormat)).toFixed(2)) // toFixed Fixing decimal.
}

function validationImc(){
  if(weight != null && height != null){
    imcCalculator()
    setHeight(null)
    setWeight(null)
    setMessageImc("Seu imc é igual:")
    setTextbutton("Calcular Novamente")
    return
  }
  setImc(null)
  setTextbutton("Calcular")
  setMessageImc("Preencha o peso e altura")
}

  return(
    <Pressable 
    onPress={Keyboard.dismiss}
    style={styles.formContext}>
      <View style={styles.form} >
        <Text style={styles.formLabel}>Altura</Text>
        <TextInput
        style={styles.input}
        onChangeText={setHeight} 
        value={height}
        placeholder="Ex. 1.75"
        keyboardType="numeric"
        />
        <Text style={styles.formLabel}>Peso</Text>
        <TextInput
        style={styles.input}
        onChangeText={setWeight}
        value={weight}
        placeholder="Ex. 70"
        keyboardType="numeric"
        />
        <TouchableOpacity
        style={styles.ButtonCalculator}
        onPress={() => {
          validationImc()
        }}
        >
        <Text style={styles.textButtonCalculator}>{textButton}</Text>
        </TouchableOpacity>
      </View>
      <ResultImc
      messageResultImc={messageImc}
      resultImc={imc}
       />
    </Pressable> // Using pressable instead of view, so you can dismiss the keyboard
  );
}