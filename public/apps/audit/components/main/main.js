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

const AUDIT_UI_SETTINGS = {
  LAYER_SETTINGS: 'Layer settings',
  REST_LAYER: 'REST layer',
  REST_DISABLED_CATEGORIES: 'REST disabled categories',
  TRANSPORT_LAYER: 'Transport layer',
  TRANSPORT_DISABLED_CATEGORIES: 'Transport disabled categories',
  ATTRIBUTE_SETTINGS: 'Attribute settings',
  BULK_REQUESTS: 'Bulk requests',
  REQUEST_BODY: 'Request body',
  RESOLVE_INDICES: 'Resolve indices',
  SENSITIVE_HEADERS: 'Sensitive headers',
  IGNORE_SETTINGS: 'Ignore settings',
  EXCLUDE_USERS: 'Exclude users',
  EXCLUDE_REQUESTS: 'Exclude requests',
  COMPLIANCE_SETTINGS: 'Compliance settings',
  COMPLIANCE_MODE: 'Compliance mode',
  COMPLIANCE_READ: 'Read',
  COMPLIANCE_READ_METADATA_ONLY: 'Read metadata only',
  COMPLIANCE_READ_IGNORED_USERS: 'Ignored users',
  COMPLIANCE_READ_WATCHED_FIELDS: 'Watched fields',
  COMPLIANCE_WRITE: 'Write',
  COMPLIANCE_WRITE_METADATA_ONLY: 'Write metadata only',
  COMPLIANCE_WRITE_LOG_DIFFS: 'Log diffs',
  COMPLIANCE_WRITE_IGNORED_USERS: 'Ignored users',
  COMPLIANCE_WRITE_WATCHED_INDICES: 'Watched indices',
};

export class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  displayBooleanFlexItem = (title, val) => {
    return (
      <>
        <EuiFlexItem>
          <EuiText size="s">
            <h5>{title}</h5>
            <p>
              <EuiTextColor color="subdued">
                <small>{val ? 'Enabled' : 'Disabled'}</small>
              </EuiTextColor>
            </p>
          </EuiText>
        </EuiFlexItem>
      </>
    );
  };

  displayArrayFlexItem = (title, val) => {
    return (
      <>
        <EuiFlexItem>
          <EuiText size="s">
            <h5>{title}</h5>
            <p>
              <EuiTextColor color="subdued">
                <small>{val && val.length != 0 ? val.join(' , ') : '--'}</small>
              </EuiTextColor>
            </p>
          </EuiText>
        </EuiFlexItem>
      </>
    );
  };

  displayFlexGrid = (title, settings) => {
    return (
      <>
        <EuiText size="s">
          <h3>{title}</h3>
        </EuiText>
        <EuiSpacer size="m" />
        <EuiFlexGrid columns={3}>{settings}</EuiFlexGrid>
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
                {this.displayFlexGrid(
                  AUDIT_UI_SETTINGS.LAYER_SETTINGS,
                  <>
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.REST_LAYER, true)}
                    {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.REST_DISABLED_CATEGORIES, [
                      'GRANTED PRIVILEGES',
                      'AUTHENTICATED',
                    ])}
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.TRANSPORT_LAYER, true)}
                    {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.TRANSPORT_DISABLED_CATEGORIES, [
                      'FAILED_LOGIN',
                    ])}
                  </>
                )}
                <EuiSpacer size="xl" />
                {this.displayFlexGrid(
                  AUDIT_UI_SETTINGS.ATTRIBUTE_SETTINGS,
                  <>
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.BULK_REQUESTS, true)}
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.RESOLVE_INDICES, false)}
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.RESOLVE_INDICES, true)}
                    {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.SENSITIVE_HEADERS, false)}
                  </>
                )}
                <EuiSpacer size="xl" />
                {this.displayFlexGrid(
                  AUDIT_UI_SETTINGS.IGNORE_SETTINGS,
                  <>
                    {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.EXCLUDE_USERS, [
                      'kibanaserver',
                      'sujith',
                      'kvngar',
                    ])}
                    {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.EXCLUDE_REQUESTS, [
                      'indices:data/read/*',
                      'indices:settings/read*',
                    ])}
                  </>
                )}
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
                {this.displayBooleanFlexItem(AUDIT_UI_SETTINGS.COMPLIANCE_MODE, true)}
                <EuiSpacer />
                <EuiPanel>
                  {this.displayFlexGrid(
                    AUDIT_UI_SETTINGS.COMPLIANCE_READ,
                    <>
                      {this.displayBooleanFlexItem(
                        AUDIT_UI_SETTINGS.COMPLIANCE_READ_METADATA_ONLY,
                        true
                      )}
                      {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.COMPLIANCE_READ_IGNORED_USERS, [
                        'kibanaserver',
                        'sujith',
                        'kvngar',
                      ])}
                      {this.displayArrayFlexItem(
                        AUDIT_UI_SETTINGS.COMPLIANCE_READ_WATCHED_FIELDS,
                        []
                      )}
                    </>
                  )}
                </EuiPanel>
                <EuiSpacer />
                <EuiPanel>
                  {this.displayFlexGrid(
                    AUDIT_UI_SETTINGS.COMPLIANCE_WRITE,
                    <>
                      {this.displayBooleanFlexItem(
                        AUDIT_UI_SETTINGS.COMPLIANCE_WRITE_METADATA_ONLY,
                        true
                      )}
                      {this.displayBooleanFlexItem(
                        AUDIT_UI_SETTINGS.COMPLIANCE_WRITE_LOG_DIFFS,
                        true
                      )}
                      {this.displayArrayFlexItem(AUDIT_UI_SETTINGS.COMPLIANCE_WRITE_IGNORED_USERS, [
                        'kibanaserver',
                        'sujith',
                        'kvngar',
                      ])}
                      {this.displayArrayFlexItem(
                        AUDIT_UI_SETTINGS.COMPLIANCE_WRITE_WATCHED_INDICES,
                        []
                      )}
                    </>
                  )}
                </EuiPanel>
              </div>
            </EuiPanel>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }
}
