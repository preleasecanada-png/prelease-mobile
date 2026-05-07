import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Circle, Defs, Path, RadialGradient, Stop } from 'react-native-svg';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Colors } from '../../theme';

const CircularDatePicker = () => {
  const [angle, setAngle] = useState(0);
  const radius = 100;
  const strokeWidth = 30;

  const handleGesture = ({ nativeEvent }) => {
    const { x, y } = nativeEvent;
    const centerX = radius + strokeWidth;
    const centerY = radius + strokeWidth;
    const dx = x - centerX;
    const dy = y - centerY;
    const newAngle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
    setAngle(newAngle >= 0 ? newAngle : 360 + newAngle);
  };

  // Calculate month and date from the angle
  const month = Math.floor((angle / 360) * 12) + 1;

  return (
    <View style={styles.container}>
      <Svg width={radius * 2 + strokeWidth * 2} height={radius * 2 + strokeWidth * 2}>
        {/* Shadow Effect Circles */}
        {/* <Circle
          cx={radius + strokeWidth + 3}
          cy={radius + strokeWidth + 3}
          r={radius}
          stroke="rgba(231,231,231,0.1)"
          strokeWidth={strokeWidth + 2}
          fill="none"
        /> */}
        <Defs>
          <RadialGradient id="shadowGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <Stop offset="0%" stopColor="rgba(0,0,0,0.3)" />
            <Stop offset="100%" stopColor="rgba(0,0,0,0)" />
          </RadialGradient>
        </Defs>
        <Circle
          cx={radius + strokeWidth + 1}
          cy={radius + strokeWidth + 1}
          r={radius}
          stroke="rgba(245,245,245,100)"
          strokeWidth={strokeWidth + 1}
          fill="none"
        />
        
        {/* 12 Dots */}
        {/* {Array.from({ length: 12 }).map((_, index) => {
          const angle = (index * 30 * Math.PI) / 180; // Angle in radians
          const x = radius * Math.sin(angle) + radius + strokeWidth;
          const y = radius - radius * Math.cos(angle) + radius + strokeWidth;

          return (
            <Circle
              key={index}
              cx={x}
              cy={y}
              r={4}
              fill="#000000"
            />
          );
        })} */}
        {/* Main Circle */}
        {/* <Circle
          cx={radius + strokeWidth}
          cy={radius + strokeWidth}
          r={radius}
          stroke="#d3d3d3"
          strokeWidth={strokeWidth}
          fill="none"
        /> */}
        {/* Selected Period Arc */}
        <Path
          d={`M${radius + strokeWidth},${strokeWidth} A${radius},${radius} 0 ${angle > 180 ? 1 : 0
            } 1 ${radius + strokeWidth + radius * Math.sin((angle * Math.PI) / 180)},${strokeWidth + radius - radius * Math.cos((angle * Math.PI) / 180)
            }`}
          fill="none"
          stroke={Colors.primary}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        {/* Drag Handle Circle */}
        <Circle
          cx={radius + strokeWidth + radius * Math.sin((angle * Math.PI) / 180)}
          cy={strokeWidth + radius - radius * Math.cos((angle * Math.PI) / 180)}
          r={10}
          fill="#FFFFFF"
          stroke={Colors.primary}
          strokeWidth={3}
        />
      </Svg>
      <Text style={styles.text}>{`${month} Months`}</Text>
      <PanGestureHandler onGestureEvent={handleGesture}>
        <View style={StyleSheet.absoluteFill} />
      </PanGestureHandler>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  text: {
    position: 'absolute',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CircularDatePicker;
