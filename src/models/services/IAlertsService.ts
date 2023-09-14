type AlertButtonType = 'primary' | 'dangerous' | 'ignored' | 'highligted';

export interface IAlertButton {
  text: string;
  onPress: () => void;
  buttonType?: AlertButtonType;
}

export interface IAlertsService {
  showMessage: (
    title: string,
    description?: string,
    buttons?: Array<IAlertButton>,
  ) => void;
}
