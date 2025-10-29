import {onRequest} from "firebase-functions/https";
import * as logger from "firebase-functions/logger";
// import { onDocumentCreated } from "firebase-functions/firestore";
import {getApps, initializeApp} from "firebase-admin/app";
import {getFirestore} from "firebase-admin/firestore";

if (getApps().length === 0) initializeApp();


export const helloWorld = onRequest((request, response) => {
  logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

export const addMessage = onRequest(async (req, res) => {
  const original = req.query.text;

  const writeResult = await getFirestore()
    .collection("testMessages")
    .add({original: original});

  res.json({result: `Message with ID: ${writeResult.id} added.`});
});
