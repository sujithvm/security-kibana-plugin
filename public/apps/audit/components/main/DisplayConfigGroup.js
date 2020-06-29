import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { EuiFlexItem, EuiFlexGrid, EuiSpacer, EuiText, EuiTextColor, EuiTitle } from '@elastic/eui';
import { displaySettingType } from './utils';
import { get } from 'lodash';

export const DisplayConfigGroup = ({ config_group, config }) => (
  <>
    {config_group.title && (
      <>
        <EuiTitle>
          <h3>{config_group.title}</h3>
        </EuiTitle>
        <EuiSpacer size="m" />
      </>
    )}
    <EuiFlexGrid columns={3}>
      {config_group.settings.map(setting => {
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

DisplayConfigGroup.propTypes = {
  config_group: PropTypes.object,
  config: PropTypes.object,
};
