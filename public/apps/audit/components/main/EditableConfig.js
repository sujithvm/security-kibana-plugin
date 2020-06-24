import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiDescribedFormGroup,
  EuiFormRow,
  EuiSwitch,
  EuiComboBox,
  EuiTitle,
  EuiSpacer,
} from '@elastic/eui';
import { cloneDeep, get } from 'lodash';

const generateComboBoxLabels = arr => {
  return arr.map(x => {
    return { label: x };
  });
};

const removeComboBoxLabels = arr => {
  return arr.map(x => x.label);
};

const displayField = (config, setting, handleChange) => {
  const val = get(config, setting.path);
  if (setting.type === 'bool') {
    return (
      <EuiSwitch
        label={val ? 'Enabled' : 'Disabled'}
        checked={val}
        onChange={e => {
          handleChange(setting, e.target.checked);
        }}
      />
    );
  } else if (setting.type === 'array' && typeof setting.options !== 'undefined') {
    return (
      <EuiComboBox
        placeholder={setting.title}
        options={generateComboBoxLabels(setting.options)}
        selectedOptions={generateComboBoxLabels(val)}
        onChange={selectedOptions => {
          handleChange(setting, removeComboBoxLabels(selectedOptions));
        }}
      />
    );
  } else if (setting.type === 'array') {
    return (
      <EuiComboBox
        noSuggestions
        placeholder={setting.title}
        selectedOptions={generateComboBoxLabels(val)}
        onChange={selectedOptions => {
          handleChange(setting, removeComboBoxLabels(selectedOptions));
        }}
        onCreateOption={searchValue => {
          let updatedVal = cloneDeep(val);
          updatedVal.push(searchValue);
          handleChange(setting, updatedVal);
        }}
      />
    );
  } else {
    return <></>;
  }
};

export const EditableConfig = ({ config, setting, handleChange }) => (
  <>
    <EuiDescribedFormGroup
      title={<h3>{setting.title}</h3>}
      description={<>{setting.description}</>}
      fullWidth
    >
      <EuiFormRow label={setting.key}>{displayField(config, setting, handleChange)}</EuiFormRow>
    </EuiDescribedFormGroup>
  </>
);

EditableConfig.propTypes = {
  config: PropTypes.object,
  setting: PropTypes.object,
  handleChange: PropTypes.func,
};

export const EditableMultipleConfigs = ({ config, settings, handleChange, title }) => (
  <>
    <EuiTitle>
      <h3>{title}</h3>
    </EuiTitle>
    <EuiSpacer />
    {settings.map(setting => {
      return (
        <EditableConfig
          key={setting.key}
          config={config}
          setting={setting}
          handleChange={handleChange}
        ></EditableConfig>
      );
    })}
  </>
);

EditableMultipleConfigs.propTypes = {
  config: PropTypes.object,
  settings: PropTypes.array,
  handleChange: PropTypes.func,
  title: PropTypes.string,
};
