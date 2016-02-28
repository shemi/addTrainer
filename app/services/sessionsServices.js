'use strict';

var sessionsService = angular.module('addTrainerApp/services/sessionsServices', [
    require('./angular-webstorage.min').name
]);

sessionsService.service('sessionsStorage', [ 'webStorage', function(webStorage) {

    var _this = this;
    _this.storage = webStorage.local;
    _this.key = 'ata_sessions';
    _this.exists = _this.storage.has(_this.key);
    _this.sessions = getSessions();

    _this.add = addSessionToStorage;

    return _this;

    function addSessionToStorage(session) {
        getSessions();

        _this.sessions[session.id] = session;

        _this.storage.set(_this.key, JSON.stringify(_this.sessions));
        _this.exists = true;
    }

    function getSessions() {
        if(_this.exists) {
            return _this.sessions = JSON.parse(_this.storage.get(_this.key));
        }

        return _this.sessions = {};
    }

}]);


module.exports = sessionsService;