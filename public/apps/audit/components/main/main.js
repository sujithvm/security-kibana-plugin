import React, { Component, Fragment } from 'react';
import {
  EuiPage,
  EuiPageBody,
  EuiPanel,
  EuiSpacer,
} from '@elastic/eui';
import { AUDIT_LABELS, CONFIG } from './config';
import ContentPanel from './ContentPanel';
import { DisplayConfig, DisplayMultipleConfigs } from './DisplayConfig';

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

  render() {
    return (
      <>
        <EuiPage>
          <EuiPageBody>
            <EuiSpacer />
            <ContentPanel title={AUDIT_LABELS.AUDIT_LOGGING}></ContentPanel>
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
