import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { EuiFlexItem, EuiFlexGrid, EuiSpacer, EuiText, EuiTextColor, EuiTitle } from '@elastic/eui';
import { displaySettingType } from './utils';
import { get } from 'lodash';

function DisplaySettingGroup({ settingGroup, config }) {
  return (
    <>
      {settingGroup.title && (
        <>
          <EuiTitle>
            <h3>{settingGroup.title}</h3>
          </EuiTitle>
          <EuiSpacer size="m" />
        </>
      )}
      <EuiFlexGrid columns={3}>
        {settingGroup.settings.map(setting => {
          return (
            <Fragment key={setting.key}>
              <EuiFlexItem>
                <EuiText size="m">
                  <h5>{setting.title}</h5>
                  <p>
                    <EuiTextColor color="subdued">
                      <small>{displaySettingType(setting, get(config, setting.path))}</small>
                    </EuiTextColor>
                  </p>
                </EuiText>
              </EuiFlexItem>
            </Fragment>
          );
        })}
      </EuiFlexGrid>
    </>
  );
}

DisplaySettingGroup.propTypes = {
  settingGroup: PropTypes.object,
  config: PropTypes.object,
};

export default DisplaySettingGroup;
