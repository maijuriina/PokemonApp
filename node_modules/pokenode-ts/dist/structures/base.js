"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseClient = void 0;
const axios_cache_adapter_1 = require("axios-cache-adapter");
const constants_1 = require("../constants");
const logger_1 = require("../config/logger");
/**
 * ### Base Client
 */
class BaseClient {
    /**
     *
     */
    constructor(clientOptions) {
        var _a, _b, _c;
        this.api = (0, axios_cache_adapter_1.setup)({
            baseURL: (_a = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.baseURL) !== null && _a !== void 0 ? _a : constants_1.BaseURL.REST,
            headers: {
                'Content-Type': 'application/json',
            },
            cache: Object.assign({ maxAge: ((_b = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.cacheOptions) === null || _b === void 0 ? void 0 : _b.maxAge) || 0 }, clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.cacheOptions),
        });
        this.logger = (0, logger_1.createLogger)(Object.assign({ enabled: !(((_c = clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.logOptions) === null || _c === void 0 ? void 0 : _c.enabled) === undefined ||
                (clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.logOptions.enabled) === false) }, clientOptions === null || clientOptions === void 0 ? void 0 : clientOptions.logOptions));
        this.api.interceptors.request.use((config) => (0, logger_1.handleRequest)(config, this.logger), (error) => (0, logger_1.handleRequestError)(error, this.logger));
        this.api.interceptors.response.use((response) => (0, logger_1.handleResponse)(response, this.logger), (error) => (0, logger_1.handleResponseError)(error, this.logger));
    }
}
exports.BaseClient = BaseClient;
