#!/bin/bash

# Set Working Directory (assuming script is executed from scripts directory)
cd ..

# Set variables
GCP_PROJECT="aaronjonesii"
GCP_SERVICE_NAME="angular-ssr"
GCP_REGION_NAME="us-central1"
FIREBASE_PROJECT="$GCP_PROJECT"

# Get user input for Firebase deployment message
read -p "Input Firebase deployment message: " DEPLOYMENT_MESSAGE

# Build Application
npm run build:production || {
  echo "‼️ Failed to build production application"
  exit 1
}

# Set Google Cloud Project
gcloud config set project "$GCP_PROJECT" || {
  echo "‼️ Failed to set Google Cloud Project to $GCP_PROJECT"
  exit 1
}

# Build container image with Google Cloud Run
gcloud builds submit --tag "gcr.io/$GCP_PROJECT/$GCP_SERVICE_NAME" || {
  echo "‼️ Failed to build container image"
  exit 1
}

# Deploy container image to Google Cloud Run
gcloud run deploy "$GCP_SERVICE_NAME" --image "gcr.io/$GCP_PROJECT/$GCP_SERVICE_NAME" --region "$GCP_REGION_NAME" || {
  echo "‼️ Failed to deploy container image"
  exit 1
}

# Set Firebase project
firebase use "$FIREBASE_PROJECT" || {
  echo "‼️ Failed to set Firebase project to $FIREBASE_PROJECT"
  exit 1
}

# Deploy Firebase Hosting configuration
firebase deploy --only hosting -m "$DEPLOYMENT_MESSAGE" || {
  echo "‼️ Failed to deploy Firebase Hosting"
  exit 1
}

echo "✅ Finished deploying production build (0_o)"