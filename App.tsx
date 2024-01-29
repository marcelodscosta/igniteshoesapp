import { useEffect, useState } from 'react';

import { StatusBar } from 'react-native';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';

import { Roboto_400Regular, Roboto_700Bold, useFonts } from '@expo-google-fonts/roboto';
import { NativeBaseProvider } from 'native-base';

import { Routes } from './src/routes';

import { Loading } from './src/components/Loading';
import { THEME } from './src/theme';

import { Notification } from './src/components/Notification';
import { CartContextProvider } from './src/contexts/CartContext';
import { tagUserInfoCreate } from './src/notifications/notificationsTags';

OneSignal.setAppId('528abd34-dc31-4da8-b134-d4e7f255aa2c');

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });
  const [notification, setNotification] = useState<OSNotification>();

  tagUserInfoCreate();

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);

      });
  }, [])


  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
      {
        notification?.title &&
        <Notification
          title={notification.title}
          onClose={() => { setNotification(undefined) }}
        />
      }
    </NativeBaseProvider>
  );
}