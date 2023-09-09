import {Alert, AlertButton as RNAlertButton} from 'react-native';

import {IAlertButton, IAlertsService} from 'models/services/IAlertsService';

export class RNAlertsService implements IAlertsService {
  private processButtons = (
    buttons?: Array<IAlertButton>,
  ): Array<RNAlertButton> | undefined => {
    if (buttons) {
      return buttons.map(item => {
        let mappedButtonType: 'default' | 'cancel' | 'destructive' | undefined;
        switch (item.buttonType) {
          case 'dangerous':
            mappedButtonType = 'destructive';
            break;
          case 'highligted':
            mappedButtonType = undefined;
            break;
          case 'ignored':
            mappedButtonType = 'cancel';
            break;
          case 'primary':
            mappedButtonType = 'default';
        }
        return {
          ...item,
          style: mappedButtonType,
        };
      });
    }
  };

  showMessage = (
    title: string,
    description?: string,
    buttons?: IAlertButton[] | undefined,
  ) => {
    Alert.alert(title, description, this.processButtons(buttons));
  };
}
