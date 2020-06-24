import React from 'react';
import PropTypes from 'prop-types';
import { EuiFlexItem, EuiFlexGrid, EuiSpacer, EuiText, EuiTextColor, EuiTitle } from '@elastic/eui';
import { get } from 'lodash';

const displayType = (setting, val) => {
  if (setting.type === 'bool') return val ? 'Enabled' : 'Disabled';
  else if (setting.type === 'array') {
    return val && val.length != 0 ? val.join(' , ') : '--';
  } else {
    return 'Unknown type';
  }
};

export const DisplayConfig = ({ config, setting }) => (
  <>
    <EuiFlexItem>
      <EuiText size="m">
        <h5>{setting.title}</h5>
        <p>
          <EuiTextColor color="subdued">
            <small>{displayType(setting, get(config, setting.path))}</small>
          </EuiTextColor>
        </p>
      </EuiText>
    </EuiFlexItem>
  </>
);

DisplayConfig.propTypes = {
  config: PropTypes.object,
  setting: PropTypes.object,
};

export const DisplayMultipleConfigs = ({ config, settings, title }) => (
  <>
    <EuiTitle>
      <h3>{title}</h3>
    </EuiTitle>
    <EuiSpacer size="m" />
    <EuiFlexGrid columns={3}>
      {settings.map(setting => {
        return <DisplayConfig key={setting.key} config={config} setting={setting} />;
      })}
    </EuiFlexGrid>
  </>
);

DisplayMultipleConfigs.propTypes = {
  config: PropTypes.object,
  settings: PropTypes.array,
  title: PropTypes.string,
};
