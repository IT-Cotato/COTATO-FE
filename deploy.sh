#!/bin/bash

# 사용할 리전을 명시
REGION="ap-northeast-2" 

DEPLOY_LOG_PATH="/home/ubuntu/frontend/production/log/deploy/deploy_$(date +%Y%m%d).log"

echo "> deployment start : $(date +%c)" >> $DEPLOY_LOG_PATH

# 최신 배포 ID 가져오기
DEPLOYMENT_ID=$(grep -oP '\[d-[a-zA-Z0-9]+\]' /opt/codedeploy-agent/deployment-root/deployment-logs/codedeploy-agent-deployments.log | tail -1 | grep -oP 'd-[a-zA-Z0-9]+')

# 배포 그룹 이름 가져오기
DEPLOYMENT_GROUP_NAME=$(aws deploy get-deployment --region "$REGION" --deployment-id "$DEPLOYMENT_ID" --query 'deploymentInfo.deploymentGroupName' --output text)

# app directory
APP_DIR="/home/ubuntu/frontend"
PRODUCTION_DIR="$APP_DIR/production/cotato"
RELEASE_DIR="$APP_DIR/release/cotato"

# 배포 그룹 이름에 따라 대상 디렉토리를 설정
if [[ "$DEPLOYMENT_GROUP_NAME" == "cotato-deploy-fe-production" ]]; then
    TARGET_DIR=$PRODUCTION_DIR
elif [[ "$DEPLOYMENT_GROUP_NAME" == "cotato-deploy-fe-release" ]]; then
    TARGET_DIR=$RELEASE_DIR
else
    echo "Unknown deployment group: $DEPLOYMENT_GROUP_NAME" >> $DEPLOY_LOG_PATH
    exit 1
fi

# build 디렉토리, appspec.yml, deploy.sh 파일을 대상 디렉토리로 이동
mv "$APP_DIR/cotato/build" "$TARGET_DIR"
mv "$APP_DIR/cotato/appspec.yml" "$TARGET_DIR"
mv "$APP_DIR/cotato/deploy.sh" "$TARGET_DIR"

echo "Deployment files moved to $TARGET_DIR" >> $DEPLOY_LOG_PATH

echo "> deployment end : $(date +%c)" >> $DEPLOY_LOG_PATH
