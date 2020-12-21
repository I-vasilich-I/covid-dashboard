/* eslint-disable no-use-before-define */
import Keyboard from 'simple-keyboard';

const keyboard = new Keyboard({
  onChange: (input) => onChange(input),
  onKeyPress: (button) => onKeyPress(button),
  theme: 'hg-theme-default myTheme1',
});

function onChange(input) {
  document.querySelector('.input').value = input;
  console.log('Input changed', input);
}

function onKeyPress(button) {
  console.log('Button pressed', button);

  if (button === '{shift}' || button === '{lock}') handleShift();
}

function handleShift() {
  const currentLayout = keyboard.options.layoutName;
  const shiftToggle = currentLayout === 'default' ? 'shift' : 'default';

  keyboard.setOptions({
    layoutName: shiftToggle,
  });
}

export { onKeyPress, onChange, keyboard };
