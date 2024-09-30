import { View, Text,Image ,TouchableOpacity, ScrollView,Alert} from 'react-native'
import {React,useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import FormField from "../../components/custom/FormField";
import CustomButton from "../../components/custom/CustomButton";
import ChangeInformation from "../../components/ChangeInformation"
import Header from '../../components/custom/Header';
import { useDataGuard } from '../../components/data/globaldata.jsx';
import {sighOutReq} from '../../scripts/regesterScript/sign-out.js'
import { router } from 'expo-router';
import { removeData } from '../../scripts/data/asyncstorage.js';
import { sendverifymail } from '../../scripts/regesterScript/sign-up.js';
import { useNavigationGuard } from "../../components/navigation/navigationGuard";


const Profile = () => {
  const { access,allowAccess } = useNavigationGuard();
  const { user,updateData,resetData } = useDataGuard();
  const [updatedataoption,setupdatedataoption]=useState({
    change:false,
    name:user.updateoption.name,
    value:user.updateoption.value,
  })
  const [edit,setEdit]=useState(false)
  const updatedataoptions=[{key:4, name:'every day', value:86400000 }
  ,{key:5, name:'every week',value:604800000},
  {key:6, name:'every month',value:2592000000}]
  
  
  const settingactions=[
    { key: 1,name:"Change your password",
      handlefunction:async()=>{
        console.log("Change your password")
        let email=user.email
        let username=user.username
        await sighOutReq({},resetData)
        console.log(email,username)
        removeData('jwt')
        updateData("username",username)
        updateData("email",email)
        updateData("action","reset password")
        allowAccess("canAccessVerify")
        await sendverifymail({email:email, action:'reset password'})

        setTimeout(() => {
          router.push('/verify');
          
        }, 2000)

      }
    },
    { key: 2,name:"log out",
      handlefunction:async()=>{
        console.log("User logged out")
        router.push('/')
        await sighOutReq({},resetData)
        removeData('jwt')
        
      }
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
  const handlechangeupdatedata=(name,value)=>{
    if(updatedataoption.value!=name){
        

    
      Alert.alert(
                    
      `Are you sure you want to update your data ${name}?`, 
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Logout Cancelled"),
          style: "cancel" // This styles the button as a cancel button (optional)
        },
        {
          text: "Yes", 
          onPress: () => {
            setupdatedataoption({change:false, name:name})
            updateData('updateoption',{name,value})
          }, // Replace with your logout logic
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
      <Header
      color={"#F1684B"}/>

        <ScrollView className="flex-1 mx-[20px] mt-[10px] ">
          
           <Text  key= {6} className="font-psemibold text-[20px]">your information:</Text>

          {/* //chainging email and username component */}
           
          <View key= {7}>
         
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

          {/* //choosing freqency of updating data to cloud */}
          <View  key= {8} className=" mt-[25px] h-[40px] justify-center">
            <View className="flex-row justify-between ">
            <Text className="font-psemibold text-[15px] ml-[15px] mt-[10px]">update your data on cloud</Text>
                <TouchableOpacity
                onPress={() => {
                  if(!updatedataoption.change){
                    setupdatedataoption({
                      change:true,
                      name:updatedataoption.name
                    })
                  }else{
                    setupdatedataoption({
                      change:false,
                      name:updatedataoption.name
                    }) 
                  }
                }}
                activeOpacity={0.7}
                className="bg-secondary rounded-3xl  flex-1 justify-center 
                  bg-background-shadowverysheer h-[40px]"

              >
                <View className="flex-row justify-end">
                  <Text className="font-psemibold text-[15px] mr-[13px]">{updatedataoption.name}{'>'}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View >
          {updatedataoption.change&& (
            updatedataoptions.map(option => (
          <View className=" h-[42px] justify-center" key={option.key}>
            <View className="flex-row justify-end mr-[10px] ">
                 <TouchableOpacity
                onPress={()=>{
                  handlechangeupdatedata(option.name,option.value)
                }}
                activeOpacity={0.3}
                className="bg-secondary  justify-center 
                  bg-background-offwhitesheer w-[115px] h-[40px]"

              >
                <View className="flex-row  ml-[10px]">
                  
                  <Text className="font-psemibold text-[15px] color-shadow mr-[10px]">{option.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
           
          </View >
            ))
        )}

        
          {settingactions.map(action=>(<View className=" h-[60px]" key={action.key}>
              <TouchableOpacity
              key={action.key}
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