import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { useTheme } from 'native-base';

import { Notification } from '../components/Notification';

import { useEffect, useState } from 'react';
import OneSignal, { NotificationReceivedEvent, OSNotification } from 'react-native-onesignal';
import { AppRoutes } from './app.routes';

const linking = {
  prefixes: [
    'igniteshoesapp://',
    'com.projetopessoal.igniteshoes://',
    'exp+igniteshoesapp://'
  ],
  config: {
    screens: {
      details: {
        path: 'details/:productId',
        parse: {
          productId: (productId: string) => productId
        }
      }
    },
  },
};

export function Routes() {
  const { colors } = useTheme();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  const [notification, setNotification] = useState<OSNotification>();

  useEffect(() => {
    const unsubscribe = OneSignal
      .setNotificationWillShowInForegroundHandler((notificationReceivedEvent: NotificationReceivedEvent) => {
        const response = notificationReceivedEvent.getNotification();
        setNotification(response);

      });
  }, [])

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {
        notification?.title &&
        <Notification
          data={notification}
          onClose={() => { setNotification(undefined) }}
        />
      }
    </NavigationContainer>
  );
}