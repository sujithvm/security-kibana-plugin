export const API_PATHS = {
  PUT: '../api/v1/configuration/audit/config',
  GET: '../api/v1/configuration/audit',
}

export const CONFIG_LABELS = {
  AUDIT_LOGGING: 'Audit logging',
  GENERAL_SETTINGS: 'General settings',
  LAYER_SETTINGS: 'Layer settings',
  ATTRIBUTE_SETTINGS: 'Attribute settings',
  IGNORE_SETTINGS: 'Ignore settings',
  COMPLIANCE_SETTINGS: 'Compliance settings',
  COMPLIANCE_CONFIG_SETTINGS: 'Config settings',
  COMPLIANCE_READ: 'Read',
  COMPLIANCE_WRITE: 'Write',
};

export const RESPONSE_MESSAGES = {
  FETCH_ERROR_TITLE: "Sorry, there was an error fetching audit configuration.",
  FETCH_ERROR_MESSAGE: "Please ensure hot reloading of audit configuration is enabled in the security plugin.",
  UPDATE_SUCCESS: "Audit configuration was successfully updated.",
  UPDATE_FAILURE: "Audit configuration could not be updated. Please check configuration."
}

const CONFIG = {
  ENABLED: {
    title: 'Enable audit logging',
    key: 'config:enabled',
    path: 'enabled',
    description: 'Enable or disable audit logging',
    type: 'bool',
  },
  AUDIT: {
    REST_LAYER: {
      title: 'REST layer',
      key: 'config:audit:enable_rest',
      path: 'audit.enable_rest',
      description: 'Enable or disable auditing events that happen on the REST layer',
      type: 'bool',
    },
    REST_DISABLED_CATEGORIES: {
      title: 'REST disabled categories',
      key: 'config:audit:disabled_rest_categories',
      path: 'audit.disabled_rest_categories',
      description: 'Specify audit categories which must be ignored on the REST layer',
      type: 'array',
      options: [
        'BAD_HEADERS',
        'FAILED_LOGIN',
        'MISSING_PRIVILEGES',
        'GRANTED_PRIVILEGES',
        'SSL_EXCEPTION',
        'AUTHENTICATED',
      ],
    },
    TRANSPORT_LAYER: {
      title: 'Transport layer',
      key: 'config:audit:enable_transport',
      path: 'audit.enable_transport',
      description: 'Enable or disable auditing events that happen on the Transport layer',
      type: 'bool',
    },
    TRANSPORT_DISABLED_CATEGORIES: {
      title: 'Transport disabled categories',
      key: 'config:audit:disabled_transport_categories',
      path: 'audit.disabled_transport_categories',
      description: 'Specify audit categories which must be ignored on the Transport layer',
      type: 'array',
      options: [
        'BAD_HEADERS',
        'FAILED_LOGIN',
        'MISSING_PRIVILEGES',
        'GRANTED_PRIVILEGES',
        'SSL_EXCEPTION',
        'AUTHENTICATED',
      ],
    },
    BULK_REQUESTS: {
      title: 'Bulk requests',
      key: 'config:audit:resolve_bulk_requests',
      path: 'audit.resolve_bulk_requests',
      description: 'Resolve bulk requests during auditing of requests.',
      type: 'bool',
    },
    REQUEST_BODY: {
      title: 'Request body',
      key: 'config:audit:log_request_body',
      path: 'audit.log_request_body',
      description: 'Include request body during auditing of requests.',
      type: 'bool',
    },
    RESOLVE_INDICES: {
      title: 'Resolve indices',
      key: 'config:audit:resolve_indices',
      path: 'audit.resolve_indices',
      description: 'Resolve indices during auditing of requests.',
      type: 'bool',
    },
    SENSITIVE_HEADERS: {
      title: 'Sensitive headers',
      key: 'config:audit:exclude_sensitive_headers',
      path: 'audit.exclude_sensitive_headers',
      description: 'Exclude sensitive headers during auditing. Eg: Authorization header',
      type: 'bool',
    },
    IGNORED_USERS: {
      title: 'Ignored users',
      key: 'config:audit:ignore_users',
      path: 'audit.ignore_users',
      description: 'Users to ignore during auditing.',
      type: 'array',
    },
    IGNORED_REQUESTS: {
      title: 'Ignored requests',
      key: 'config:audit:ignore_requests',
      path: 'audit.ignore_requests',
      description: 'Request patterns to ignore during auditing.',
      type: 'array',
    },
  },
  COMPLIANCE: {
    ENABLED: {
      title: 'Enable compliance mode',
      key: 'config:compliance:enabled',
      path: 'compliance.enabled',
      description: 'Enable or disable compliance logging',
      type: 'bool',
    },
    INTERNAL_CONFIG : {
      title: 'Enable internal config logging',
      key: 'config:compliance:internal_config',
      path: 'compliance.internal_config',
      description: 'Enable or disable logging of events on internal security index',
      type: 'bool',
    },
    EXTERNAL_CONFIG : {
      title: 'Enable external config logging',
      key: 'config:compliance:external_config',
      path: 'compliance.external_config',
      description: 'Enable or disable logging of external configuration',
      type: 'bool',
    },
    READ_METADATA_ONLY: {
      title: 'Read metadata',
      key: 'config:compliance:read_metadata_only',
      path: 'compliance.read_metadata_only',
      description: 'Do not log any document fields. Log only metadata of the document',
      type: 'bool',
    },
    READ_IGNORED_USERS: {
      title: 'Ignored users',
      key: 'config:compliance:read_ignore_users',
      path: 'compliance.read_ignore_users',
      description: 'Users to ignore during auditing.',
      type: 'array',
    },
    READ_WATCHED_FIELDS: {
      title: 'Watched fields',
      key: 'config:compliance:read_watched_fields',
      path: 'compliance.read_watched_fields',
      description: 'List the indices and fields to watch during read events. Sample data content is as follows',
      type: 'map',
      code:
`{
  "index-name-pattern": ["field-name-pattern"],
  "logs*": ["message"],
  "twitter": ["id", "user*"]
}`,
      error: "Invalid content. Please check sample data content."
    },
    WRITE_METADATA_ONLY: {
      title: 'Write metadata',
      key: 'config:compliance:write_metadata_only',
      path: 'compliance.write_metadata_only',
      description: 'Do not log any document content. Log only metadata of the document',
      type: 'bool',
    },
    WRITE_LOG_DIFFS: {
      title: 'Log diffs',
      key: 'config:compliance:write_log_diffs',
      path: 'compliance.write_log_diffs',
      description: 'Log only diffs for document updates',
      type: 'bool',
    },
    WRITE_IGNORED_USERS: {
      title: 'Ignored users',
      key: 'config:compliance:write_ignore_users',
      path: 'compliance.write_ignore_users',
      description: 'Users to ignore during auditing.',
      type: 'array',
    },
    WRITE_WATCHED_FIELDS: {
      title: 'Watch indices',
      key: 'config:compliance:write_watched_indices',
      path: 'compliance.write_watched_indices',
      description: 'List the indices to watch during write events.',
      type: 'array',
    },
  },
};

export const SETTING_GROUPS = {
  AUDIT_SETTINGS: {
    settings: [
      CONFIG.ENABLED,
    ]
  },
  LAYER_SETTINGS: {
    title: CONFIG_LABELS.LAYER_SETTINGS,
    settings: [
      CONFIG.AUDIT.REST_LAYER,
      CONFIG.AUDIT.REST_DISABLED_CATEGORIES,
      CONFIG.AUDIT.TRANSPORT_LAYER,
      CONFIG.AUDIT.TRANSPORT_DISABLED_CATEGORIES,
    ]
  },
  ATTRIBUTE_SETTINGS: {
    title: CONFIG_LABELS.ATTRIBUTE_SETTINGS,
    settings: [
      CONFIG.AUDIT.BULK_REQUESTS,
      CONFIG.AUDIT.REQUEST_BODY,
      CONFIG.AUDIT.RESOLVE_INDICES,
      CONFIG.AUDIT.SENSITIVE_HEADERS,
    ]
  },
  IGNORE_SETTINGS: {
    title: CONFIG_LABELS.IGNORE_SETTINGS,
    settings: [
      CONFIG.AUDIT.IGNORED_USERS, CONFIG.AUDIT.IGNORED_REQUESTS
    ]
  },
  COMPLIANCE_CONFIG_MODE_SETTINGS: {
    title: CONFIG_LABELS.COMPLIANCE,
    settings: [
      CONFIG.COMPLIANCE.ENABLED,
    ]
  },
  COMPLIANCE_CONFIG_SETTINGS: {
    settings: [
      CONFIG.COMPLIANCE.INTERNAL_CONFIG,
      CONFIG.COMPLIANCE.EXTERNAL_CONFIG,
    ]
  },
  COMPLIANCE_SETTINGS_READ: {
    title: CONFIG_LABELS.COMPLIANCE_READ,
    settings: [
      CONFIG.COMPLIANCE.READ_METADATA_ONLY,
      CONFIG.COMPLIANCE.READ_IGNORED_USERS,
      CONFIG.COMPLIANCE.READ_WATCHED_FIELDS,
    ]
  },
  COMPLIANCE_SETTINGS_WRITE: {
    title: CONFIG_LABELS.COMPLIANCE_WRITE,
    settings: [
      CONFIG.COMPLIANCE.WRITE_METADATA_ONLY,
      CONFIG.COMPLIANCE.WRITE_LOG_DIFFS,
      CONFIG.COMPLIANCE.WRITE_IGNORED_USERS,
      CONFIG.COMPLIANCE.WRITE_WATCHED_FIELDS,
    ]
  }
}