import React, {useCallback} from 'react';
import {useLongPress} from 'use-long-press';
import {View, Text, TouchableOpacity, TextInput,Button} from 'react-native';

export default function PushButton(props) {
  const callback = useCallback(event => {
    // console.log('')
  }, []);
  const bind = useLongPress(callback, {
    onStart: event => props.events({status: 1, directionId: props.directionId}),
    onFinish: event =>
      props.events({status: 0, directionId: props.directionId}),
    onCancel: event =>
      props.events({status: 0, directionId: props.directionId}),
    // onMove: event => console.log('Detected mouse or touch movement'),
    threshold: 500,
    captureEvent: true,
    cancelOnMovement: false,
    detect: 'both',
  });

  return (
    <>
      <Button title="forword" {...bind} class="btn btn-primary" style={props.style} />

    </>
  );
}
