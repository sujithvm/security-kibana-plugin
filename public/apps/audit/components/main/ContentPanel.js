import React from 'react';
import PropTypes from 'prop-types';
import {
  EuiPanel,
  EuiHorizontalRule,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';

const ContentPanel = ({ title, children, configureHandler }) => (
  <EuiPanel paddingSize="none">
    <div style={{ padding: 20, paddingBottom: 12 }}>
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiTitle>
            <h3>{title}</h3>
          </EuiTitle>
        </EuiFlexItem>
        { typeof configureHandler == 'function' && 
          <EuiFlexItem grow={false}>
            <EuiButton>Configure</EuiButton>
          </EuiFlexItem>
        }
      </EuiFlexGroup>
    </div>
    <EuiHorizontalRule margin="xs" />
    <div style={{ padding: 32 }}>
      {children}
    </div>
  </EuiPanel>
);

ContentPanel.propTypes = {
  title: PropTypes.string, 
  children: PropTypes.node,
  configureHandler: PropTypes.func
};

export default ContentPanel;
