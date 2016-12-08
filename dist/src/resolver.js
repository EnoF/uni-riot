'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerService = registerService;
exports.resolve = resolve;
exports.isServiceRegistered = isServiceRegistered;
var services = new Map();

function registerService(serviceUrl, events) {
  services.set(serviceUrl, events);
}

function resolve(serviceUrl, formData) {
  var serviceEvents = services.get(serviceUrl);
  var event = formData.event;

  var eventHandler = serviceEvents.get(event);
  return eventHandler(formData);
}

function isServiceRegistered(serviceUrl) {
  return !!services.get('serviceUrl');
}