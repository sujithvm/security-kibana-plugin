import React, { Component, Fragment } from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPageSideBar,
  EuiTitle,
  EuiText,
  EuiTextColor,
  EuiPanel,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiHorizontalRule,
  EuiFlexGrid,
} from '@elastic/eui';
import { AUDIT_LABELS, CONFIG } from './config'
import { get } from 'lodash';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      config: {
        enabled: true,
        audit: {
          enable_rest: true,
          disabled_rest_categories: ['GRANTED_PRIVILEGES', 'SSL_EXCEPTION', 'AUTHENTICATED'],
          enable_transport: true,
          disabled_transport_categories: ['GRANTED_PRIVILEGES', 'AUTHENTICATED'],
          resolve_bulk_requests: false,
          log_request_body: true,
          resolve_indices: true,
          exclude_sensitive_headers: true,
          ignore_users: ['kibanaserver'],
          ignore_requests: [],
        },
        compliance: {
          enabled: true,
          internal_config: true,
          external_config: false,
          read_metadata_only: true,
          read_watched_fields: {},
          read_ignore_users: ['kibanaserver'],
          write_metadata_only: true,
          write_log_diffs: false,
          write_watched_indices: [],
          write_ignore_users: ['kibanaserver'],
        },
      },
    };
  }

  displayType = (setting, val) => {
    if (setting.type === 'bool') return val ? 'Enabled' : 'Disabled';
    else if (setting.type === 'array') {
      return val && val.length != 0 ? val.join(' , ') : '--';
    } else {
      return 'Unknown type';
    }
  };

  displayConfig = (setting) => {
    return (
      <Fragment key={setting.key}>
        <EuiFlexItem>
          <EuiText size="s">
            <h5>{setting.title}</h5>
            <p>
              <EuiTextColor color="subdued">
                <small>{this.displayType(setting, get(this.state.config, setting.path))}</small>
              </EuiTextColor>
            </p>
          </EuiText>
        </EuiFlexItem>
      </Fragment>
    );
  }

  displayConfigs = (title, settings) => {
    const configs = settings.map(setting => {
      return this.displayConfig(setting)
    });
    return (
      <>
        <EuiText size="s">
          <h3>{title}</h3>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiFlexGrid columns={3}>{configs}</EuiFlexGrid>
      </>
    );
  };

  render() {
    return (
      <>
        <EuiPage>
          <EuiPageSideBar>Audit Logs</EuiPageSideBar>
          <EuiPageBody>
            <EuiPanel paddingSize="none">
              <div style={{ padding: 24, paddingBottom: 16 }}>
                <EuiTitle>
                  <h2>Audit Logging</h2>
                </EuiTitle>
              </div>
              <EuiHorizontalRule margin="xs" />
            </EuiPanel>

            <EuiSpacer />

            <EuiPanel paddingSize="none">
              <div style={{ padding: 24, paddingBottom: 16 }}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiTitle>
                      <h3>General settings</h3>
                    </EuiTitle>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton>Configure</EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </div>
              <EuiHorizontalRule margin="xs" />
              <div style={{ padding: 32 }}>
                {this.displayConfigs(AUDIT_LABELS.LAYER_SETTINGS, [
                  CONFIG.AUDIT.REST_LAYER,
                  CONFIG.AUDIT.REST_DISABLED_CATEGORIES,
                  CONFIG.AUDIT.TRANSPORT_LAYER,
                  CONFIG.AUDIT.TRANSPORT_DISABLED_CATEGORIES,
                ])}
                <EuiSpacer size="xl" />
                {this.displayConfigs(AUDIT_LABELS.ATTRIBUTE_SETTINGS, [
                  CONFIG.AUDIT.BULK_REQUESTS,
                  CONFIG.AUDIT.REQUEST_BODY,
                  CONFIG.AUDIT.RESOLVE_INDICES,
                  CONFIG.AUDIT.SENSITIVE_HEADERS,
                ])}
                <EuiSpacer size="xl" />
                {this.displayConfigs(AUDIT_LABELS.IGNORE_SETTINGS, [
                  CONFIG.AUDIT.IGNORED_USERS,
                  CONFIG.AUDIT.IGNORED_REQUESTS,
                ])}
              </div>
            </EuiPanel>

            <EuiSpacer />

            <EuiPanel paddingSize="none">
              <div style={{ padding: 24, paddingBottom: 16 }}>
                <EuiFlexGroup>
                  <EuiFlexItem>
                    <EuiTitle>
                      <h3>Compliance settings</h3>
                    </EuiTitle>
                  </EuiFlexItem>
                  <EuiFlexItem grow={false}>
                    <EuiButton>Configure</EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </div>
              <EuiHorizontalRule margin="xs" />
              <div style={{ padding: 32, paddingTop: 16 }}>
                {this.displayConfig(CONFIG.COMPLIANCE.ENABLED)}
                <EuiSpacer />
                <EuiPanel>
                {this.displayConfigs(AUDIT_LABELS.COMPLIANCE_READ, [
                  CONFIG.COMPLIANCE.READ_METADATA_ONLY,
                  CONFIG.COMPLIANCE.READ_IGNORED_USERS,
                  CONFIG.COMPLIANCE.READ_WATCHED_FIELDS,
                ])}
                </EuiPanel>
                <EuiSpacer />
                <EuiPanel>
                {this.displayConfigs(AUDIT_LABELS.COMPLIANCE_WRITE, [
                  CONFIG.COMPLIANCE.WRITE_METADATA_ONLY,
                  CONFIG.COMPLIANCE.WRITE_LOG_DIFFS,
                  CONFIG.COMPLIANCE.WRITE_IGNORED_USERS,
                  CONFIG.COMPLIANCE.WRITE_WATCHED_FIELDS,
                ])}
                </EuiPanel>
              </div>
            </EuiPanel>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }
}
