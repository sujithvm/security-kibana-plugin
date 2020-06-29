import React from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
  EuiTitle,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from '@elastic/eui';
import { toastNotifications } from 'ui/notify';
import { cloneDeep, set } from 'lodash';
import { CONFIG_LABELS, CONFIG_GROUPS } from './config';
import ContentPanel from './ContentPanel';
import { DisplayConfigGroup } from './DisplayConfigGroup';
import { EditableConfigGroup } from './EditableConfigGroup';

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
    window.scrollTo({top: 0});
  };

  save = () => {
    this.toggleDisplay(true, false, false);
    toastNotifications.addSuccess("Audit configuration was successfully updated.")
    toastNotifications.addDanger("An error occured while attempting to update audit configuration.")
  }

  renderSave = () => {
    return (
      <>
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                this.toggleDisplay(true, false, false);
              }}
            >
              Cancel
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton fill onClick={() => {
                this.save();
              }}
              >Save</EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );
  };

  renderEditableAuditSettings = () => {
    return (
      <>
        <EuiPanel>
          <EditableConfigGroup
            config_group={CONFIG_GROUPS.LAYER_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
          <EuiSpacer size="xl" />
          <EditableConfigGroup
            config_group={CONFIG_GROUPS.ATTRIBUTE_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
          <EuiSpacer size="xl" />
          <EditableConfigGroup
            config_group={CONFIG_GROUPS.IGNORE_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
        </EuiPanel>
        <EuiSpacer />
        {this.renderSave()}
      </>
    );
  };

  renderEditableComplianceSettings = () => {
    return (
      <>
        <EuiPanel>
          <EuiTitle>
            <h3>{CONFIG_LABELS.COMPLIANCE_SETTINGS}</h3>
          </EuiTitle>
          <EuiSpacer />
          <EuiPanel>
            <EditableConfigGroup
              config_group={CONFIG_GROUPS.COMPLIANCE_SETTINGS_READ}
              config={this.state.edit_config}
              handleChange={this.handleChange}
            ></EditableConfigGroup>
          </EuiPanel>
          <EuiSpacer size="xl" />
          <EuiPanel>
            <EditableConfigGroup
              config_group={CONFIG_GROUPS.COMPLIANCE_SETTINGS_WRITE}
              config={this.state.edit_config}
              handleChange={this.handleChange}
            ></EditableConfigGroup>
          </EuiPanel>
        </EuiPanel>
        <EuiSpacer />
        {this.renderSave()}
      </>
    );
  };

  renderAuditSettings = () => {
    return (
      <>
        <ContentPanel title={CONFIG_LABELS.AUDIT_LOGGING}>
          <EditableConfigGroup
            config_group={CONFIG_GROUPS.AUDIT_SETTINGS}
            config={this.state.edit_config}
            handleChange={this.handleChange}
          ></EditableConfigGroup>
        </ContentPanel>
        <EuiSpacer />
        <ContentPanel
          title={CONFIG_LABELS.GENERAL_SETTINGS}
          configureHandler={() => {
            this.toggleDisplay(false, true, false);
          }}
        >
          <DisplayConfigGroup
            config_group={CONFIG_GROUPS.LAYER_SETTINGS}
            config={this.state.config}
          />
          <EuiSpacer size="xl" />
          <DisplayConfigGroup
            config_group={CONFIG_GROUPS.ATTRIBUTE_SETTINGS}
            config={this.state.config}
          />
          <EuiSpacer size="xl" />
          <DisplayConfigGroup
            config_group={CONFIG_GROUPS.IGNORE_SETTINGS}
            config={this.state.config}
          />
        </ContentPanel>
        <EuiSpacer />
        <ContentPanel
          title={CONFIG_LABELS.COMPLIANCE_SETTINGS}
          configureHandler={() => {
            this.toggleDisplay(false, false, true);
          }}
        >
          <DisplayConfigGroup
            config={this.state.config}
            config_group={CONFIG_GROUPS.COMPLIANCE_CONFIG_SETTINGS}
          />
          <EuiSpacer />
          <EuiPanel>
            <DisplayConfigGroup
              config_group={CONFIG_GROUPS.COMPLIANCE_SETTINGS_READ}
              config={this.state.config}
            />
          </EuiPanel>
          <EuiSpacer />
          <EuiPanel>
            <DisplayConfigGroup
              config_group={CONFIG_GROUPS.COMPLIANCE_SETTINGS_WRITE}
              config={this.state.config}
            />
          </EuiPanel>
        </ContentPanel>
        <EuiSpacer />
      </>
    );
  };

  render() {
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
