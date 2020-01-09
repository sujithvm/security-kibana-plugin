import { uiModules } from 'ui/modules';
import { merge } from 'lodash';
import { uniq, cloneDeep } from 'lodash';
import client from './client';

/**
 * Internal users API client service.
 */
uiModules.get('apps/opendistro_security/configuration', [])
    .service('backendAccount', function (backendAPI, Promise, $http) {

        const RESOURCE = 'account';

        this.title = {
            singular: 'account',
            plural: 'accounts'
        };

        this.newLabel = "Account";

        this.fetch = () => {
            return backendAPI.get(RESOURCE);
        }

        this.save = (username, data) => {
            let dataToSave = cloneDeep(data);
            dataToSave = this.preSave(dataToSave);            
            return backendAPI.save(RESOURCE, username, dataToSave, false);
        };

        this.emptyModel = () => {
            var user = {};
            user["password"] = "";
            user["passwordConfirmation"] = "";
            return user;
        };

        this.preSave = (user) => {
            delete user.hidden;
            delete user.reserved;
            delete user.static;
            delete user["passwordConfirmation"];
            return user;
        };

        this.postFetch = (user) => {
            delete user["hash"];
            user["password"] = "";
            user["passwordConfirmation"] = "";
            return user;
        };
    });
