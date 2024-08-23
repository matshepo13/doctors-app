declare module 'react-native-qrcode-svg' {
    import * as React from 'react';
    import { ViewProps } from 'react-native';
  
    interface QRCodeProps extends ViewProps {
      value: string;
      size?: number;
      color?: string;
      backgroundColor?: string;
      logo?: string;
      logoSize?: number;
      logoBackgroundColor?: string;
      logoMargin?: number;
      logoBorderRadius?: number;
      ecl?: 'L' | 'M' | 'Q' | 'H';
    }
  
    export default class QRCode extends React.Component<QRCodeProps> {}
  }