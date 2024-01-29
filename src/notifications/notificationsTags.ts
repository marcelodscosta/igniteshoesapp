import OneSignal from "react-native-onesignal";

export const tagUserInfoCreate = () => {
  OneSignal.sendTags({
    'user_name': 'Marcelo',
    'user_email': 'marcelodscosta@yahoo.com.br',
  });
};