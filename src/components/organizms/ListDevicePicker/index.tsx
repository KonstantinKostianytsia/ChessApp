import CustomButton from 'components/atoms/CustomButton';
import {IDeviceInfo} from 'models/common/IDeviceInfo';
import React, {ReactElement} from 'react';
import {FlatList, View, Text} from 'react-native';
import {styles} from './styles';
import {useTheme} from 'helpers /hooks/useTheme';

export interface AvailableDevicesListPickerProps {
  listItems: Array<IDeviceInfo>;
  selectedItem?: IDeviceInfo;
  renderItem?: (item: IDeviceInfo, index: number) => ReactElement;
  onSelectItem: (item: IDeviceInfo) => void;
}

const AvailableDevicesListPicker = (props: AvailableDevicesListPickerProps) => {
  const theme = useTheme();
  const renderItem = (item: IDeviceInfo, index: number) => {
    const isSelected =
      !!props.selectedItem && props.selectedItem.udid === item.udid;
    const defaultRenderItem = () => {
      return (
        <View style={styles.defaultRenderItemContainer}>
          <View>
            <Text style={{color: theme.colors.textColor}}>{item.name}</Text>
            <Text style={{color: theme.colors.darkGreyText}}>{item.udid}</Text>
          </View>
          <Text
            style={[
              styles.defaultRenderItemRightIcon,
              {color: theme.colors.buttonBackground},
            ]}>
            ˃
          </Text>
        </View>
      );
    };
    return (
      <CustomButton
        style={
          isSelected && [
            styles.selectedItemContainerStyles,
            {backgroundColor: theme.colors.selectedListItem},
          ]
        }
        onPress={() => props.onSelectItem(item)}>
        {props.renderItem ? props.renderItem(item, index) : defaultRenderItem()}
      </CustomButton>
    );
  };

  return (
    <FlatList
      data={props.listItems}
      renderItem={({item, index}) => renderItem(item, index)}
    />
  );
};

export default AvailableDevicesListPicker;
