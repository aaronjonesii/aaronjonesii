import config from "./config";
import { logger } from "firebase-functions";

export const obfuscatedConfig = Object.assign({}, config, {
  smtpConnectionUri: "<omitted>",
  smtpPassword: "<omitted>",
});

export function init() {
  logger.log("Initializing extension with configuration", obfuscatedConfig);
}

export function start() {
  logger.log(
    "Started execution of extension with configuration",
    obfuscatedConfig
  );
}

export function error(err: Error) {
  logger.log("Unhandled error occurred during processing:", err);
}

export function complete() {
  logger.log("Completed execution of extension");
}

export function attemptingDelivery(ref: FirebaseFirestore.DocumentReference) {
  logger.log(`Attempting delivery for message: ${ref.path}`);
}

export function delivered(
  ref: FirebaseFirestore.DocumentReference,
  info: {
    messageId: string;
    accepted: string[];
    rejected: string[];
    pending: string[];
  }
) {
  logger.log(
    `Delivered message: ${ref.path} successfully. messageId: ${info.messageId} accepted: ${info.accepted.length} rejected: ${info.rejected.length} pending: ${info.pending.length}`
  );
}

export function deliveryError(
  ref: FirebaseFirestore.DocumentReference,
  e: Error
) {
  logger.error(`Error when delivering message=${ref.path}: ${e.toString()}`);
}

export function missingDeliveryField(ref: FirebaseFirestore.DocumentReference) {
  logger.error(`message=${ref.path} is missing 'delivery' field`);
}

export function missingUids(uids: string[]) {
  logger.log(
    `The following uids were provided, however a document does not exist or has no 'email' field: ${uids.join(
      ","
    )}`
  );
}

export function noPartialAttachmentSupport() {
  logger.warn("partial attachments are not handled and will be ignored");
}

export function registeredPartial(name: string) {
  logger.log(`registered partial '${name}'`);
}

export function partialRegistered(name: string) {
  logger.log(`registered partial '${name}'`);
}

export function templatesLoaded(names: string[]) {
  logger.log(`loaded templates (${names.join(',')})`);
}

export function invalidMessage(message: any) {
  logger.warn(
    `message '${message}' is not a valid object - please add as an object or firestore map, otherwise you may experience unexpected results.`
  );
}

export function checkingMissingTemplate(name: string) {
  logger.log(`checking missing template '${name}'`);
}

export function foundMissingTemplate(name: string) {
  logger.log(`template '${name}' has been found`);
}

export function invalidURI(uri: string) {
  logger.warn(
    `invalid url: '${uri}' , please reconfigure with a valid SMTP connection URI`
  );
}
