import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import {
  EuiComboBox,
  EuiDescribedFormGroup,
  EuiFormRow,
  EuiSpacer,
  EuiSwitch,
  EuiTitle,
  EuiCodeBlock,
} from '@elastic/eui';
import { get } from 'lodash';
import { displayBoolean, generateComboBoxLabels, removeComboBoxLabels } from './utils';
import EditorBox from './EditorBox';

function EditSettingGroup({ settingGroup, config, handleChange, handleInvalid }) {
  const renderField = (config, setting, handleChange, handleInvalid) => {
    const val = get(config, setting.path);
    if (setting.type === 'bool') {
      return (
        <EuiSwitch
          label={displayBoolean(val)}
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
            handleChange(setting, [...val, searchValue]);
          }}
        />
      );
    } else if (setting.type === 'map') {
      return <EditorBox config={config} handleChange={handleChange} handleInvalid={handleInvalid} setting={setting} />;
    } else {
      return <></>;
    }
  };

  const renderCodeBlock = setting => {
    return (
      <>
        <EuiCodeBlock language="json" paddingSize="none" isCopyable>
          {setting.code}
        </EuiCodeBlock>
      </>
    );
  };

  return (
    <>
      {settingGroup.title && (
        <>
          <EuiTitle>
            <h3>{settingGroup.title}</h3>
          </EuiTitle>
          <EuiSpacer />
        </>
      )}
      {settingGroup.settings.map(setting => {
        return (
          <Fragment key={setting.key}>
            <EuiDescribedFormGroup
              title={<h3>{setting.title}</h3>}
              description={
                <>
                  {setting.description}
                  {setting.code &&
                    renderCodeBlock(setting)
                  }
                </>
              }
              fullWidth
            >
              <EuiFormRow label={setting.key}>
                {renderField(config, setting, handleChange, handleInvalid)}
              </EuiFormRow>
            </EuiDescribedFormGroup>
          </Fragment>
        );
      })}
    </>
  );
}

EditSettingGroup.propTypes = {
  settingGroup: PropTypes.object,
  config: PropTypes.object,
  handleChange: PropTypes.func,
  handleInvalid: PropTypes.func,
};

export default EditSettingGroup;
