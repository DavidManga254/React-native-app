import AsyncStorage from "@react-native-async-storage/async-storage";


//function to store persistent data
export async function storeData(name,value){
    try{
        if (name !== null && value !== null){
            var list = JSON.stringify(value);
            await AsyncStorage.setItem(name,list);
        }else{
            console.log('Issue setting item')
        }
        
    }catch (error){
        console.log('Error setting data',error)
    }
}

//get Data
export async function getData(name){
    try{
        if(name !== null){
           var value = await AsyncStorage.getItem(name);
           var returnValue = JSON.parse(value)
           return returnValue;
        }
        else{
            console.log('name is null')
        }
       
    }catch (error){
        console.log('problem getting value',error)
    }
}