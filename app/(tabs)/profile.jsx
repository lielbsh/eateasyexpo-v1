import { View, Text,Image ,TouchableOpacity, ScrollView,Alert} from 'react-native'
import {React,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import ChangeInformation from "../../components/ChangeInformation"
const Profile = () => {
  const [updatedataoption,setupdatedataoption]=useState({
    change:true,
    value:'every week'
  })
  const [edit,setEdit]=useState(false)
  const updatedataoptions=['every day','every week','every month']
  const [user,setuser]=useState({
    email:"assaf.assa@gmail.com",
    username:"Assaf"
  })
  
  const settingactions=[
    { name:"Change your password",
      handlefunction:()=>{console.log("Change your password")}
    },
    { name:"log out",
      handlefunction:()=>{console.log("User logged out")}
    },
    { name:"Delete your account",
      handlefunction:()=>{console.log("User Delete your account")}
    },
    
  ]
  const handlelactions=(action)=>{
    Alert.alert(
                  
    `Are you sure you want to ${action.name}?`, 
    "",
    [
      {
        text: "No",
        onPress: () => console.log("Cancelled"),
        style: "cancel"// This styles the button as a cancel button (optional)
      },
      {
        text: "Yes", 
        onPress: action.handlefunction, // Replace with your logout logic
        style:"destructive",
      }
    ],
    { cancelable: false } // This ensures the user must choose an option, no outside tapping to dismiss
  )}
  const handlechangeupdatedata=(option)=>{
    if(updatedataoption.value!=option){
        

    
      Alert.alert(
                    
      `Are you sure you want to update your data ${option}?`, 
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Logout Cancelled"),
          style: "cancel" // This styles the button as a cancel button (optional)
        },
        {
          text: "Yes", 
          onPress: () => (setupdatedataoption({
            change:false,
            value:option
          })), // Replace with your logout logic
          style:"destructive",
        }
      ],
      { cancelable: false } // This ensures the user must choose an option, no outside tapping to dismiss
      
    )}
  }
  
  const [form, setForm]  = useState({
    username: '',
    email: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async () => {
    if (form.username === "" || form.email === "" ) {
      Alert.alert("Oops!", "Please fill in all fields");
    } else {
      // Handle sign-up logic
    }
  };
  
  return (
    <SafeAreaView className="bg-background-beige flex-1" edges={['top', 'left', 'right']}>
      <View className="flex-row h-[60px] mt-[20px] ml-[20px]">
          <Text className="color-red text-3xl font-bold mt-[0px] text-primary">Eat</Text>
          <Text className="color-red underline-[2px] text-3xl font-bold font-cursive leading-[42px]">Easy</Text>
          <Image source={require('../../assets/images/logo2.png')}  className="w-[45px] h-[45px] mt-[-4px]" />
        </View>

        <ScrollView className="flex-1 mx-[20px] mt-[10px] ">
          
           <Text className="font-psemibold text-[20px]">your information:</Text>
          
          <ChangeInformation user={user} setuser={setuser}></ChangeInformation> 

          <View className=" mt-[25px] h-[40px] justify-center">
            <View className="flex-row justify-between ">
            <Text className="font-psemibold text-[15px] ml-[15px] mt-[10px]">update your data on cloud</Text>
                <TouchableOpacity
                onPress={() => {
                  if(!updatedataoption.change){
                    setupdatedataoption({
                      change:true,
                      value:updatedataoption.value
                    })
                  }else{
                    setupdatedataoption({
                      change:false,
                      value:updatedataoption.value
                    }) 
                  }
                }}
                activeOpacity={0.7}
                className="bg-secondary rounded-3xl  flex-1 justify-center 
                  bg-background-shadowverysheer h-[40px]"

              >
                <View className="flex-row justify-end">
                  <Text className="font-psemibold text-[15px] mr-[13px]">{updatedataoption.value}{'>'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View >
          {updatedataoption.change&& (
            updatedataoptions.map(option => (
          <View className=" h-[42px] justify-center">
            <View className="flex-row justify-end mr-[10px] ">
                 <TouchableOpacity
                onPress={()=>{
                  handlechangeupdatedata(option)
                }}
                activeOpacity={0.3}
                className="bg-secondary  justify-center 
                  bg-background-offwhitesheer w-[110px] h-[40px]"

              >
                <View className="flex-row  ml-[10px]">
                  
                  <Text className="font-psemibold text-[15px] color-shadow mr-[13px]">{option}</Text>
                </View>
              </TouchableOpacity>
            </View>
           
          </View >
            ))
        )}

          {settingactions.map(action=>(<View className=" h-[60px]">
              <TouchableOpacity
              onPress={()=>{handlelactions(action)}}
              activeOpacity={0.7}
              className="bg-secondary rounded-3xl  flex-1 justify-center 
              mt-[20px]  bg-background-shadowverysheer h-[40px]"

            >
              <View className="flex-row justify-between">
                <Text className="font-psemibold text-[15px] ml-[15px]">{action.name}</Text>
                <Text className="font-psemibold text-[15px] mr-[15px]">{'>'}</Text>
              </View>
            </TouchableOpacity>
           
          </View >)
          )}
          
          

          

        </ScrollView>
        <Image source={require('../../assets/images/background3.png')}  className="absolute w-[700px] h-[550px] top-[-200px] left-[230px]" style={{ opacity: 0.7, zIndex: -1 }}
        />
      <Image source={require('../../assets/images/background3.png')}  className="absolute w-[700px] h-[550px] top-[340px] left-[-550px]" style={{ opacity: 0.7, zIndex: -1 }}
        />
    </SafeAreaView>
  )
}

export default Profile