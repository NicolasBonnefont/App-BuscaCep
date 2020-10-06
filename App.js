import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, KeyboardEvent } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import api from './src/services/api'

export default function App() {

  const [cep, setCep] = useState('')

  async function carregaCep(){
    if(cep ==''){
      return
    }
    await api.get(`${cep}/json/`)    
   
    .then(function(response){
      setCep(response.data)

    })
    .catch(function(erro){
      alert('Cep nao Localizado ! ')
      console.log(erro)

    })

  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      <Text style={styles.titulo}>Digite o CEP desejado: </Text>
      <TextInput
      style={styles.input}
        placeholder='Ex: 09972010'
        value={cep.cep}
        onChangeText={(e) => setCep(e)}
      />

      <TouchableOpacity style={styles.btn} activeOpacity={0.5} onPress={()=>carregaCep()}>
        <Text style={styles.btnTitulo}> Buscar CEP</Text>
      </TouchableOpacity>

      <Text>{cep.cep}</Text>
      <Text>{cep.logradouro}</Text>
      <Text>{cep.complemento}</Text>
      <Text>{cep.bairro}</Text>
      <Text>{cep.localidade}</Text>
      <Text>{cep.uf}</Text>


      <View></View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn:{
    margin:20,
    width:250,
    height:50,
    backgroundColor:'#f345',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10
  },
  input:{
    borderColor:'#000',
    padding:8, 

    margin:25    
  },
  titulo:{
    fontSize:22,
    fontWeight:'bold'
  },
  btnTitulo:{
    fontWeight:'bold',
    color:'#fff'
  }
  
});
