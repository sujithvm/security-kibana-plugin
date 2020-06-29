export function displayBoolean(val) {
  return val ? 'Enabled' : 'Disabled';
}

export function displayArray(val) {
  return val && val.length != 0 ? val.join(' , ') : '--';
}

export function generateComboBoxLabels(arr) {
  return arr.map(x => {
    return { label: x };
  });
}

export function removeComboBoxLabels(arr) {
  return arr.map(x => x.label);
}
