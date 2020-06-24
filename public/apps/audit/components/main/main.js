import React from 'react';
import { EuiPage, EuiPageBody, EuiPanel, EuiSpacer, EuiTitle } from '@elastic/eui';
import { AUDIT_LABELS, CONFIG } from './config';
import ContentPanel from './ContentPanel';
import { DisplayConfig, DisplayMultipleConfigs } from './DisplayConfig';
import { EditableConfig, EditableMultipleConfigs } from './EditableConfig';
import { cloneDeep, set } from 'lodash';

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
      edit_config: {
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

  handleChange = (setting, val) => {
    let edit_config = cloneDeep(this.state.edit_config);
    set(edit_config, setting.path, val);
    this.setState({ edit_config: edit_config });
  };

  renderEditableAuditSettings = () => {
    return (
      <>
        <EuiPanel>
          <EditableMultipleConfigs
            title={AUDIT_LABELS.LAYER_SETTINGS}
            config={this.state.edit_config}
            settings={[
              CONFIG.AUDIT.REST_LAYER,
              CONFIG.AUDIT.REST_DISABLED_CATEGORIES,
              CONFIG.AUDIT.TRANSPORT_LAYER,
              CONFIG.AUDIT.TRANSPORT_DISABLED_CATEGORIES,
            ]}
            handleChange={this.handleChange}
          ></EditableMultipleConfigs>
          <EuiSpacer size="xl" />
          <EditableMultipleConfigs
            title={AUDIT_LABELS.ATTRIBUTE_SETTINGS}
            config={this.state.edit_config}
            settings={[
              CONFIG.AUDIT.BULK_REQUESTS,
              CONFIG.AUDIT.REQUEST_BODY,
              CONFIG.AUDIT.RESOLVE_INDICES,
              CONFIG.AUDIT.SENSITIVE_HEADERS,
            ]}
            handleChange={this.handleChange}
          ></EditableMultipleConfigs>
          <EuiSpacer size="xl" />
          <EditableMultipleConfigs
            title={AUDIT_LABELS.IGNORE_SETTINGS}
            config={this.state.edit_config}
            settings={[CONFIG.AUDIT.IGNORED_USERS, CONFIG.AUDIT.IGNORED_REQUESTS]}
            handleChange={this.handleChange}
          ></EditableMultipleConfigs>
        </EuiPanel>
      </>
    );
  };

  renderEditableComplianceSettings = () => {
    return (
      <>
        <EuiPanel>
          <EuiTitle>
            <h3>{AUDIT_LABELS.COMPLIANCE_SETTINGS}</h3>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel>
            <EditableMultipleConfigs
              title={AUDIT_LABELS.COMPLIANCE_READ}
              config={this.state.edit_config}
              settings={[
                CONFIG.COMPLIANCE.READ_METADATA_ONLY,
                CONFIG.COMPLIANCE.READ_IGNORED_USERS,
                CONFIG.COMPLIANCE.READ_WATCHED_FIELDS,
              ]}
              handleChange={this.handleChange}
            ></EditableMultipleConfigs>
          </EuiPanel>
          <EuiSpacer size="xl" />
          <EuiPanel>
            <EditableMultipleConfigs
              title={AUDIT_LABELS.COMPLIANCE_WRITE}
              config={this.state.edit_config}
              settings={[
                CONFIG.COMPLIANCE.WRITE_METADATA_ONLY,
                CONFIG.COMPLIANCE.WRITE_LOG_DIFFS,
                CONFIG.COMPLIANCE.WRITE_IGNORED_USERS,
                CONFIG.COMPLIANCE.WRITE_WATCHED_FIELDS,
              ]}
              handleChange={this.handleChange}
            ></EditableMultipleConfigs>
          </EuiPanel>
        </EuiPanel>
      </>
    );
  };

  render() {
    return (
      <>
        <EuiPage>
          <EuiPageBody>
            {this.renderEditableAuditSettings()}
            <EuiSpacer />
            {this.renderEditableComplianceSettings()}
            <EuiSpacer />
            <ContentPanel title={AUDIT_LABELS.AUDIT_LOGGING}>
            <EditableConfig
                config={this.state.edit_config}
                setting={CONFIG.ENABLED}
                handleChange={this.handleChange}
              ></EditableConfig>
            </ContentPanel>
            <EuiSpacer />
            <ContentPanel title={AUDIT_LABELS.GENERAL_SETTINGS} configureHandler={() => {}}>
              <DisplayMultipleConfigs
                config={this.state.config}
                title={AUDIT_LABELS.LAYER_SETTINGS}
                settings={[
                  CONFIG.AUDIT.REST_LAYER,
                  CONFIG.AUDIT.REST_DISABLED_CATEGORIES,
                  CONFIG.AUDIT.TRANSPORT_LAYER,
                  CONFIG.AUDIT.TRANSPORT_DISABLED_CATEGORIES,
                ]}
              />
              <EuiSpacer size="xl" />
              <DisplayMultipleConfigs
                config={this.state.config}
                title={AUDIT_LABELS.ATTRIBUTE_SETTINGS}
                settings={[
                  CONFIG.AUDIT.BULK_REQUESTS,
                  CONFIG.AUDIT.REQUEST_BODY,
                  CONFIG.AUDIT.RESOLVE_INDICES,
                  CONFIG.AUDIT.SENSITIVE_HEADERS,
                ]}
              />
              <EuiSpacer size="xl" />
              <DisplayMultipleConfigs
                config={this.state.config}
                title={AUDIT_LABELS.IGNORE_SETTINGS}
                settings={[CONFIG.AUDIT.IGNORED_USERS, CONFIG.AUDIT.IGNORED_REQUESTS]}
              />
            </ContentPanel>
            <EuiSpacer />
            <ContentPanel title={AUDIT_LABELS.COMPLIANCE_SETTINGS} configureHandler={() => {}}>
              <DisplayConfig config={this.state.config} setting={CONFIG.COMPLIANCE.ENABLED} />
              <EuiSpacer />
              <EuiPanel>
                <DisplayMultipleConfigs
                  config={this.state.config}
                  title={AUDIT_LABELS.COMPLIANCE_READ}
                  settings={[
                    CONFIG.COMPLIANCE.READ_METADATA_ONLY,
                    CONFIG.COMPLIANCE.READ_IGNORED_USERS,
                    CONFIG.COMPLIANCE.READ_WATCHED_FIELDS,
                  ]}
                />
              </EuiPanel>
              <EuiSpacer />
              <EuiPanel>
                <DisplayMultipleConfigs
                  config={this.state.config}
                  title={AUDIT_LABELS.COMPLIANCE_WRITE}
                  settings={[
                    CONFIG.COMPLIANCE.WRITE_METADATA_ONLY,
                    CONFIG.COMPLIANCE.WRITE_LOG_DIFFS,
                    CONFIG.COMPLIANCE.WRITE_IGNORED_USERS,
                    CONFIG.COMPLIANCE.WRITE_WATCHED_FIELDS,
                  ]}
                />
              </EuiPanel>
            </ContentPanel>
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }
}
