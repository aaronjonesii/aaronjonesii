#! /bin/bash

# To run script, run command below:
# chmod u+x <script-file-name>
# ./<script-file-name>
#>

# Set Working Directory
cd ..

# Build Application
npm run build-prerender:development

# Set variables
GCP_PROJECT="aaronjonesii"
GCP_SERVICENAME="angular-ssr"
FIREBASE_PROJECT=$GCP_PROJECT
echo 'Input Firebase Hosting deployment message: '
read DEPLOYMENT_MESSAGE

# Set Google Cloud Project
gcloud config set project $GCP_PROJECT

# Build container image with Google Cloud Run
gcloud builds submit --tag gcr.io/$GCP_PROJECT/$GCP_SERVICENAME

# Deploy container image to Google Cloud Run
gcloud run deploy --image gcr.io/$GCP_PROJECT/$GCP_SERVICENAME

# Set Firebase project
firebase use $FIREBASE_PROJECT

# Deploy Firebase Hosting configuration
firebase deploy --only hosting -m "$DEPLOYMENT_MESSAGE"

echo "Finished deploying development build (0_o)"
