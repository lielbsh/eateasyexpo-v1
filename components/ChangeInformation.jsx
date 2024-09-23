import { View, Text,Image ,TouchableOpacity, ScrollView,Alert} from 'react-native'
import {React,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from "./custom/FormField";
import CustomButton from "./custom/CustomButton";
const ChangeInformation = ({user,setuser}) => {
  const [updatedataoption,setupdatedataoption]=useState({
    change:true,
    value:'every week'
  })
  const [edit,setEdit]=useState("no edit")
  

  
  const [form, setForm]  = useState({
    username: '',
    email: '',
    password:'',
    verify:''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" || form.password === "" ) {
      Alert.alert("Oops!", "Please fill in all fields");
    } else {
      Alert.alert(
                  
        `Are you sure you want to change your information?`, 
        "",
        [
          {
            text: "No",
            onPress: () => console.log("Cancelled"),
            style: "cancel"// This styles the button as a cancel button (optional)
          },
          {
            text: "Yes", 
            onPress: ()=>{
              if (edit=="verify"){
                setuser({
                  username:form.username,
                  email:form.email
                })
                setEdit("no edit")
              }
              if(edit=="edit"){
                setEdit("verify")
              }
          }, // Replace with your logout logic
            style:"destructive",
          }
        ],
        { cancelable: false } // This ensures the user must choose an option, no outside tapping to dismiss
      )
    }
  };
  
  
    
      if(edit=="no edit"){return (
        <View>
          <View className="items-end mt-[-40px] mb-[30px] ">
              <TouchableOpacity
              onPress={() => {
                setEdit("edit")
              }}
              activeOpacity={0.5}
              className="bg-secondary rounded-3xl min-h-[25px] flex flex-row justify-center items-center 
              mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-beige h-[25px]"

            >
              <Text className="font-psemibold text-[15px]">edit</Text>
            </TouchableOpacity>
          </View >
          
            <View className="bg-background-offwhitesheer h-[80px] space-y-[20px] rounded-[5px] p-[5px]" >
              <View className="flex-row space-x-[60px] mt-[5px] ">
                <Text className="font-psemibold text-[15px] ml-[10px]">email:</Text>
                <Text className="font-regular text-[15px]">{user.email}</Text>
              </View>
              <View className="flex-row space-x-[30px]">
                <Text className="font-psemibold text-[15px] ml-[10px]">username:</Text>
                <Text className="font-regular text-[15px] ">{user.username}</Text>
              </View>
            </View>
        </View>
      )}
    if 
      (edit=="edit"){return(
        <View className="h-[250px]">
          <View className="items-end mt-[-40px] mb-[30px] ">
              <TouchableOpacity
              onPress={() => {
                setEdit("no edit")
              }}
              activeOpacity={0.5}
              className="bg-secondary rounded-3xl min-h-[25px] flex flex-row justify-center items-center 
              mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-red h-[25px]"

            >
              <Text className="font-psemibold text-[15px] color-beige">Cancel</Text>
            </TouchableOpacity>
           
          </View >

          <View className="bg-background-offwhitesheer h-[120px] space-y-[15px] rounded-[5px] p-[5px]" >
            <View className="flex-row space-x-[30px] mt-[5px]">
                <Text className="font-psemibold text-[15px] ml-[10px]">new email:            </Text>
                <FormField
                  placeholder={user.email}
                  title=""
                  value={form.email}
                  handleChangeText={(e) => setForm({ ...form, email: e })}
                  otherStyles=" "
                  keyboardType="email-address"
                  othercontainorStyles="  flex flex-row items-center h-[25px]"
                  
                />
            </View>
            <View className="flex-row space-x-[60px] ">
              <Text className="font-psemibold text-[15px] ml-[10px]">new username:  </Text>
              <FormField
              placeholder={user.username}
                title={undefined}
                value={form.username}
                handleChangeText={(e) => setForm({ ...form, username: e })}
                otherStyles=""
                othercontainorStyles="  flex flex-row items-center h-[25px] "
              />
            </View>
            <View className="flex-row space-x-[60px] ">
              <Text className="font-psemibold text-[15px] ml-[10px] color-green">password:        </Text>
              <FormField
                placeholder=""
                title="Password"
                value={form.password}
                secureTextEntry
                type="no title"
                handleChangeText={(e) => setForm({ ...form, password: e })}
                otherStyles=""
                othercontainorStyles=" w-[65%] flex flex-row items-center flex-row "
              />
            </View>
            
            <View className="items-center">
            <CustomButton
              title="Set new information"
              handlePress={submit}
              isLoading={isSubmitting}
              textStyles="text-[16px] color-burgundy"
                containerStyles="mt-[20px] items-center w-[180px] border  border-burgundy border-2 bg-background-beige h-[50px]"
            />
          </View>
          </View>
        </View>
      )}
      if (edit=="verify"){
        return(
        <View className="h-[250px]">
          <View className="items-end mt-[-40px] mb-[30px] ">
              <TouchableOpacity
              onPress={() => {
                setEdit("no edit")
              }}
              activeOpacity={0.5}
              className="bg-secondary rounded-3xl min-h-[25px] flex flex-row justify-center items-center 
              mt-[20px] items-center w-[100px] border  border-burgundy border-2 bg-background-red h-[25px]"

            >
              <Text className="font-psemibold text-[15px] color-beige">Cancel</Text>
            </TouchableOpacity>
           
          </View >
            <View className="items-center mb-[10px]">
              <Text className="font-psemibold text-[20px] ">Code sent to your mail: </Text>
              <Text className="font-psemibold text-[20px] color-burgundy ">{form.email}</Text>
            </View>
          <View className="bg-background-offwhitesheer h-[40px] space-y-[15px] rounded-[5px] p-[5px]" >
            <View className="flex-row space-x-[60px] ">
              <Text className="font-psemibold text-[15px] ml-[10px] color-green">verify code:     </Text>
              <FormField
                placeholder=""
                title="Password"
                value={form.verify}
                secureTextEntry
                type="no title"
                handleChangeText={(e) => setForm({ ...form, verify: e })}
                otherStyles=""
                othercontainorStyles=" w-[65%] flex flex-row items-center flex-row "
              />
            </View>
            
            <View className="items-center">
            <CustomButton
              title="Verify changes"
              handlePress={submit}
              isLoading={isSubmitting}
              textStyles="text-[16px] color-burgundy"
                containerStyles="mt-[20px] items-center w-[180px] border  border-burgundy border-2 bg-background-beige h-[50px]"
            />
          </View>
          </View>
        </View>
    )}
    

       
  
}

export default ChangeInformation