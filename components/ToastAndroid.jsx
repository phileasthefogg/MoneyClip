import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ToastAndroid, Button } from 'react-native';
import Constants from 'expo-constants';

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.LONG, ToastAndroid.CENTER, 25, 50);
    return null;
  }
  return null;
};

export default Toast;