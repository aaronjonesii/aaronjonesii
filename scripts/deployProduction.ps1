# To run script, run command below:
# & <script-file-name>
#>

# Set Working Directory
Set-Location ..

# Set variables
$GCP_PROJECT = "aaronjonesii";
$GCP_SERVICE_NAME = "angular-ssr";
$GCP_REGION_NAME = "us-central1";
$FIREBASE_PROJECT = $GCP_PROJECT;
$DEPLOYMENT_MESSAGE = Read-Host -Prompt 'Input Firebase deployment message: ';

# Build Application
try { npm run build-prerender:production }
catch {
  Write-Error "Failed to build production application"
  exit
}

# Set Google Cloud Project
try { gcloud config set project $GCP_PROJECT }
catch {
  Write-Error "Failed to set Google Cloud Project to $GCP_PROJECT"
  exit
}

# Build container image with Google Cloud Run
try { gcloud builds submit --tag gcr.io/$GCP_PROJECT/$GCP_SERVICE_NAME }
catch {
  Write-Error "Failed to build container image"
  exit
}

# Deploy container image to Google Cloud Run
try { gcloud run deploy $GCP_SERVICE_NAME --image gcr.io/$GCP_PROJECT/$GCP_SERVICE_NAME --region $GCP_REGION_NAME }
catch {
  Write-Error "Failed to deploy container image"
  exit
}

# Set Firebase project
try { firebase use $FIREBASE_PROJECT }
catch {
  Write-Error "Failed to set Firebase project to $FIREBASE_PROJECT"
  exit
}

# Deploy Firebase Hosting configuration
try { firebase deploy --only hosting -m $DEPLOYMENT_MESSAGE }
catch {
  Write-Error "Failed to deploy Firebase Hosting"
  exit
}

Write-Host "Finished deploying production build (0_o)"
