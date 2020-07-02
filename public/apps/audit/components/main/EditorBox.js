import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { EuiCodeEditor } from '@elastic/eui';
import { get } from 'lodash';

import 'brace/theme/textmate';
import 'brace/mode/json';

export const EditorBox = ({ setting, config, handleChange }) => {
  const [value, updateValue] = useState(JSON.stringify(get(config, setting.path), null, 2));

  const onChange = value => {
    updateValue(value);
    try {
      let parsed = JSON.parse(value);
      handleChange(setting, parsed);
    } catch (e) {
    }
  };

  return (
    <>
      <EuiCodeEditor
        mode="json"
        theme="textmate"
        value={value}
        onChange={onChange}
        width="100%"
        height="auto"
        minLines={5}
        maxLines={25}
        setOptions={{
          showLineNumbers: false,
          tabSize: 2,
        }}
        showGutter={false}
      />
    </>
  );
};

EditorBox.propTypes = {
  setting: PropTypes.object,
  config: PropTypes.object,
  handleChange: PropTypes.func,
};
