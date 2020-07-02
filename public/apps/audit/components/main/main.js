import React, { useState } from 'react';
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
import { CONFIG_LABELS, SETTING_GROUPS, SAMPLE_CONFIG } from './config';
import ContentPanel from './ContentPanel';
import DisplaySettingGroup from './DisplaySettingGroup';
import EditableSettingGroup from './EditableSettingGroup';

export function Main(props) {
  const [config, setConfig] = useState(SAMPLE_CONFIG);
  const [editConfig, setEditConfig] = useState(SAMPLE_CONFIG);
  const [showAllSettings, setShowAllSettings] = useState(true);
  const [showConfigureAudit, setShowConfigureAudit] = useState(false);
  const [showConfigureCompliance, setShowConfigureCompliance] = useState(false);

  const handleChange = (setting, val) => {
    const updatedConfig = cloneDeep(editConfig);
    set(updatedConfig, setting.path, val);
    setEditConfig(updatedConfig);
  };

  const toggleDisplay = (show_all_settings, show_configure_audit, show_configure_compliance) => {
    setShowAllSettings(show_all_settings);
    setShowConfigureAudit(show_configure_audit);
    setShowConfigureCompliance(show_configure_compliance);
    window.scrollTo({ top: 0 });
  };

  const save = () => {
    toggleDisplay(true, false, false);
    const { httpClient } = props;
    httpClient.post('../api/v1/configuration/audit/config', editConfig).then(resp => {
      toastNotifications.addSuccess('Audit configuration was successfully updated.');
      fetchConfig();
    });
  };

  const fetchConfig = () => {
    const { httpClient } = props;
    httpClient.get('../api/v1/configuration/audit').then(resp => {
      let responseConfig = resp.data.data.config;
      setConfig(responseConfig);
      setEditConfig(responseConfig);
    });
  };

  const renderSave = () => {
    return (
      <>
        <EuiFlexGroup justifyContent="flexEnd">
          <EuiFlexItem grow={false}>
            <EuiButton
              onClick={() => {
                toggleDisplay(true, false, false);
              }}
            >
              Cancel
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton
              fill
              onClick={() => {
                save();
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
            handleChange={handleChange}
          ></EditableSettingGroup>
        </ContentPanel>
        <EuiSpacer />
        <ContentPanel
          title={CONFIG_LABELS.GENERAL_SETTINGS}
          configureHandler={() => {
            toggleDisplay(false, true, false);
          }}
        >
          <DisplaySettingGroup settingGroup={SETTING_GROUPS.LAYER_SETTINGS} config={config} />
          <EuiSpacer size="xl" />
          <DisplaySettingGroup settingGroup={SETTING_GROUPS.ATTRIBUTE_SETTINGS} config={config} />
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
    );
  };

  return (
    <>
      <EuiPage>
        <EuiPageBody>
          {showAllSettings && renderAuditSettings()}
          {showConfigureAudit && renderEditableAuditSettings()}
          {showConfigureCompliance && renderEditableComplianceSettings()}
        </EuiPageBody>
      </EuiPage>
    </>
  );
}
