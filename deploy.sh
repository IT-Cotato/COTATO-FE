DEPLOY_LOG_PATH="/home/ubuntu/frontend/production/log/deploy/deploy_$(date +%Y%m%d).log"


echo "> deployment start : $(date +%c)" >> $DEPLOY_LOG_PATH

echo "> deployment end : $(date +%c)" >> $DEPLOY_LOG_PATH
