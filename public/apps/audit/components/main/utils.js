export function displayBoolean(val) {
  return val ? 'Enabled' : 'Disabled';
}

export function displayArray(val) {
  return val && val.length != 0 ? val.join(' , ') : '--';
}

export function displayMap(val) {
  return val && Object.keys(val).length != 0 ? JSON.stringify(val, null, 2) : '--';
}

export function displaySettingType(setting, val) {
  if (setting.type === 'bool') return displayBoolean(val);
  else if (setting.type === 'array') {
    return displayArray(val);
  } else if (setting.type === 'map') {
    return displayMap(val);
  } else {
    return 'Unknown type';
  }
};

export function generateComboBoxLabels(arr) {
  return arr.map(x => {
    return { label: x };
  });
}

export function removeComboBoxLabels(arr) {
  return arr.map(x => x.label);
}
