declare module '@react-native-community/datetimepicker' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';

    export interface DateTimePickerEvent {
      type: 'set' | 'dismissed';
      nativeEvent: {
        timestamp?: number;
      };
    }

    export interface DateTimePickerProps extends ViewProps {
      value: Date;
      mode?: 'date' | 'time' | 'datetime';
      display?: 'default' | 'spinner' | 'calendar' | 'clock';
      onChange?: (event: DateTimePickerEvent, date?: Date) => void;
      minimumDate?: Date;
      maximumDate?: Date;
      is24Hour?: boolean;
    }

    const DateTimePicker: React.FC<DateTimePickerProps>;
    export default DateTimePicker;
  }