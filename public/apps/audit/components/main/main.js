import React, { useEffect } from 'react';
import { EuiPage, EuiPageBody, EuiPanel, EuiSpacer, EuiTitle } from '@elastic/eui';
import { AUDIT_LABELS, CONFIG, CONGIG_GROUPS } from './config';
import ContentPanel from './ContentPanel';
import { DisplayConfigGroup } from './DisplayConfigGroup';
import { EditableConfigGroup } from './EditableConfigGroup';
import { cloneDeep, set } from 'lodash';

export class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      display_settings: true,
      edit_audit_settings: false,
      edit_compliance_settings: false,
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

  toggleDisplay = (display_settings, edit_audit_settings, edit_compliance_settings) => {
    this.setState({ display_settings, edit_audit_settings, edit_compliance_settings });
  };

  renderEditableAuditSettings = () => {
    return (
      <>
        <EuiPanel>
          <EditableConfigGroup
            config_group={CONGIG_GROUPS.LAYER_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
          <EuiSpacer size="xl" />
          <EditableConfigGroup
            config_group={CONGIG_GROUPS.ATTRIBUTE_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
          <EuiSpacer size="xl" />
          <EditableConfigGroup
            config_group={CONGIG_GROUPS.IGNORE_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
        </EuiPanel>
        <EuiSpacer />
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
            <EditableConfigGroup
              config_group={CONGIG_GROUPS.COMPLIANCE_SETTINGS_READ}
              config={this.state.edit_config}
              handleChange={this.handleChange}
            ></EditableConfigGroup>
          </EuiPanel>
          <EuiSpacer size="xl" />
          <EuiPanel>
            <EditableConfigGroup
              config_group={CONGIG_GROUPS.COMPLIANCE_SETTINGS_WRITE}
              config={this.state.edit_config}
              handleChange={this.handleChange}
            ></EditableConfigGroup>
          </EuiPanel>
        </EuiPanel>
        <EuiSpacer />
      </>
    );
  };

  renderAuditSettings = () => {
    return (
      <>
        <ContentPanel title={AUDIT_LABELS.AUDIT_LOGGING}>
          <EditableConfigGroup
            config_group={CONGIG_GROUPS.AUDIT_SETTINGS}
            config={this.state.edit_config}
            setting={CONFIG.ENABLED}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
        </ContentPanel>
        <EuiSpacer />
        <ContentPanel
          title={AUDIT_LABELS.GENERAL_SETTINGS}
          configureHandler={() => {
            this.toggleDisplay(false, true, false);
          }}
        >
          <DisplayConfigGroup
            config_group={CONGIG_GROUPS.LAYER_SETTINGS}
            config={this.state.config}
          />
          <EuiSpacer size="xl" />
          <DisplayConfigGroup
            config_group={CONGIG_GROUPS.ATTRIBUTE_SETTINGS}
            config={this.state.config}
          />
          <EuiSpacer size="xl" />
          <DisplayConfigGroup
            config_group={CONGIG_GROUPS.IGNORE_SETTINGS}
            config={this.state.config}
          />
        </ContentPanel>
        <EuiSpacer />
        <ContentPanel
          title={AUDIT_LABELS.COMPLIANCE_SETTINGS}
          configureHandler={() => {
            this.toggleDisplay(false, false, true);
          }}
        >
          <DisplayConfigGroup
            config={this.state.config}
            config_group={CONGIG_GROUPS.COMPLIANCE_CONFIG_SETTINGS}
          />
          <EuiSpacer />
          <EuiPanel>
            <DisplayConfigGroup
              config_group={CONGIG_GROUPS.COMPLIANCE_SETTINGS_READ}
              config={this.state.config}
            />
          </EuiPanel>
          <EuiSpacer />
          <EuiPanel>
            <DisplayConfigGroup
              config_group={CONGIG_GROUPS.COMPLIANCE_SETTINGS_WRITE}
              config={this.state.config}
            />
          </EuiPanel>
        </ContentPanel>
        <EuiSpacer />
      </>
    );
  };

  render() {
    console.log(this.state.edit_compliance_settings);
    return (
      <>
        <EuiPage>
          <EuiPageBody>
            {this.state.display_settings && this.renderAuditSettings()}
            {this.state.edit_audit_settings && this.renderEditableAuditSettings()}
            {this.state.edit_compliance_settings && this.renderEditableComplianceSettings()}
          </EuiPageBody>
        </EuiPage>
      </>
    );
  }
}
