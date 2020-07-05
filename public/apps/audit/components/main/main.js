import React, { useState, useEffect } from 'react';
import {
  EuiCallOut,
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
import { set } from 'lodash';
import { API_PATHS, CONFIG_LABELS, SETTING_GROUPS, RESPONSE_MESSAGES } from './config';
import ContentPanel from './ContentPanel';
import DisplaySettingGroup from './DisplaySettingGroup';
import EditableSettingGroup from './EditableSettingGroup';

export function Main(props) {
  const [config, setConfig] = useState(null);
  const [editConfig, setEditConfig] = useState(null);
  const [showAllSettings, setShowAllSettings] = useState(true);
  const [showConfigureAudit, setShowConfigureAudit] = useState(false);
  const [showConfigureCompliance, setShowConfigureCompliance] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    fetchConfig();
  }, [props.httpClient]);

  const handleChange = (setting, val) => {
    const editedConfig = set({ ...editConfig }, setting.path, val);
    setEditConfig(editedConfig);
  };

  const handleChangeAudit = (setting, val) => {
    const editedConfig = set({ ...editConfig }, setting.path, val);
    saveConfig(editedConfig, false);
  };

  const toggleDisplay = (
    show_all_settings = true,
    show_configure_audit = false,
    show_configure_compliance = false
  ) => {
    setShowAllSettings(show_all_settings);
    setShowConfigureAudit(show_configure_audit);
    setShowConfigureCompliance(show_configure_compliance);
    window.scrollTo({ top: 0 });
  };

  const cancel = () => {
    toggleDisplay();
    setEditConfig(config);
  };

  const saveConfig = (payload, showToast = true) => {
    const { httpClient } = props;
    httpClient
      .post(API_PATHS.PUT, payload)
      .then(() => {
        if (showToast) {
          toastNotifications.addSuccess(RESPONSE_MESSAGES.UPDATE_SUCCESS);
        }
        toggleDisplay();
        fetchConfig();
      })
      .catch(() => {
        toastNotifications.addDanger(RESPONSE_MESSAGES.UPDATE_FAILURE);
      });
  };

  const fetchConfig = () => {
    const { httpClient } = props;
    httpClient
      .get(API_PATHS.GET)
      .then(resp => {
        let responseConfig = resp.data.data.config;
        setConfig(responseConfig);
        setEditConfig(responseConfig);
        setShowError(false);
      })
      .catch(() => {
        setShowError(true);
      });
  };

  const renderError = () => {
    return (
      <EuiCallOut title={RESPONSE_MESSAGES.FETCH_ERROR_TITLE} color="danger" iconType="alert">
        <p>{RESPONSE_MESSAGES.FETCH_ERROR_MESSAGE}</p>
      </EuiCallOut>
    );
  };

  const renderSave = () => {
    return (
      <>
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                cancel();
              }}
            >
              Cancel
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              fill
              onClick={() => {
                saveConfig(editConfig);
              }}
            >
              Save
            </EuiButton>
          </EuiFlexItem>
        </EuiFlexGroup>
      </>
    );
  };

  const renderEditableAuditSettings = () => {
    return (
      <>
        <EuiPanel>
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.LAYER_SETTINGS}
            config={editConfig}
            handleChange={handleChange}
          ></EditableSettingGroup>
          <EuiSpacer size="xl" />
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.ATTRIBUTE_SETTINGS}
            config={editConfig}
            handleChange={handleChange}
          ></EditableSettingGroup>
          <EuiSpacer size="xl" />
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.IGNORE_SETTINGS}
            config={editConfig}
            handleChange={handleChange}
          ></EditableSettingGroup>
        </EuiPanel>
        <EuiSpacer />
        {renderSave()}
      </>
    );
  };

  const renderEditableComplianceSettings = () => {
    return (
      <>
        <EuiPanel>
          <EuiTitle>
            <h3>{CONFIG_LABELS.COMPLIANCE_SETTINGS}</h3>
          </EuiTitle>
          <EuiSpacer size="xl" />
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.COMPLIANCE_CONFIG_MODE_SETTINGS}
            config={editConfig}
            handleChange={handleChange}
          ></EditableSettingGroup>
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.COMPLIANCE_CONFIG_SETTINGS}
            config={editConfig}
            handleChange={handleChange}
          ></EditableSettingGroup>
          <EuiSpacer />
          <EuiPanel>
            <EditableSettingGroup
              settingGroup={SETTING_GROUPS.COMPLIANCE_SETTINGS_READ}
              config={editConfig}
              handleChange={handleChange}
            ></EditableSettingGroup>
          </EuiPanel>
          <EuiSpacer size="xl" />
          <EuiPanel>
            <EditableSettingGroup
              settingGroup={SETTING_GROUPS.COMPLIANCE_SETTINGS_WRITE}
              config={editConfig}
              handleChange={handleChange}
            ></EditableSettingGroup>
          </EuiPanel>
        </EuiPanel>
        <EuiSpacer />
        {renderSave()}
      </>
    );
  };

  const renderAuditSettings = () => {
    return (
      <>
        <ContentPanel title={CONFIG_LABELS.AUDIT_LOGGING}>
          <EditableSettingGroup
            settingGroup={SETTING_GROUPS.AUDIT_SETTINGS}
            config={editConfig}
            handleChange={handleChangeAudit}
          ></EditableSettingGroup>
        </ContentPanel>
        {config.enabled && (
          <>
            <EuiSpacer />
            <ContentPanel
              title={CONFIG_LABELS.GENERAL_SETTINGS}
              configureHandler={() => {
                toggleDisplay(false, true, false);
              }}
            >
              <DisplaySettingGroup settingGroup={SETTING_GROUPS.LAYER_SETTINGS} config={config} />
              <EuiSpacer size="xl" />
              <DisplaySettingGroup
                settingGroup={SETTING_GROUPS.ATTRIBUTE_SETTINGS}
                config={config}
              />
              <EuiSpacer size="xl" />
              <DisplaySettingGroup settingGroup={SETTING_GROUPS.IGNORE_SETTINGS} config={config} />
            </ContentPanel>
            <EuiSpacer />
            <ContentPanel
              title={CONFIG_LABELS.COMPLIANCE_SETTINGS}
              configureHandler={() => {
                toggleDisplay(false, false, true);
              }}
            >
              <DisplaySettingGroup
                config={config}
                settingGroup={SETTING_GROUPS.COMPLIANCE_CONFIG_MODE_SETTINGS}
              />
              <EuiSpacer />
              <DisplaySettingGroup
                config={config}
                settingGroup={SETTING_GROUPS.COMPLIANCE_CONFIG_SETTINGS}
              />
              <EuiSpacer />
              <EuiPanel>
                <DisplaySettingGroup
                  settingGroup={SETTING_GROUPS.COMPLIANCE_SETTINGS_READ}
                  config={config}
                />
              </EuiPanel>
              <EuiSpacer />
              <EuiPanel>
                <DisplaySettingGroup
                  settingGroup={SETTING_GROUPS.COMPLIANCE_SETTINGS_WRITE}
                  config={config}
                />
              </EuiPanel>
            </ContentPanel>
            <EuiSpacer />
          </>
        )}
      </>
    );
  };

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          {showError && renderError()}
          {config && editConfig && showAllSettings && renderAuditSettings()}
          {config && editConfig && showConfigureAudit && renderEditableAuditSettings()}
          {config && editConfig && showConfigureCompliance && renderEditableComplianceSettings()}
        </EuiPageBody>
      </EuiPage>
    </>
  );
}
