import { getEventarc } from "firebase-admin/eventarc";

let eventChannel: any;

/** setup events */
export const setupEventChannel = () => {
  eventChannel =
    process.env['EVENTARC_CHANNEL'] &&
    getEventarc().channel(process.env['EVENTARC_CHANNEL'], {
      allowedEventTypes: process.env['EXT_SELECTED_EVENTS'],
    });
};

export const recordStartEvent = async (change: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onStart",
    subject: change.after.id,
    data: { doc: change.after },
  });
};

export const recordProcessingEvent = async (change: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onProcessing",
    subject: change.after.id,
    data: { doc: change.after },
  });
};

export const recordErrorEvent = async (change: any, doc: any, err: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onError",
    subject: change.after.id,
    data: { doc, err },
  });
};

export const recordSuccessEvent = async (change: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onSuccess",
    subject: change.after.id,
    data: { doc: change.after },
  });
};

export const recordCompleteEvent = async (change: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onComplete",
    subject: change.after.id,
    data: { doc: change.after },
  });
};

export const recordPendingEvent = async (change: any, doc: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onPending",
    subject: change.after.id,
    data: { doc },
  });
};

export const recordRetryEvent = async (change: any, doc: any) => {
  if (!eventChannel) return;

  return eventChannel.publish({
    type: "firebase.extensions.firestore-send-email.v1.onRetry",
    subject: change.after.id,
    data: { doc },
  });
};
