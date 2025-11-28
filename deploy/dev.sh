node mergeSchemas.js

if [ $? -ne 0 ]; then
  echo "Schema merge failed. Aborting deployment."
  exit 1
fi

sam build && sam deploy --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM CAPABILITY_AUTO_EXPAND --profile briggo --config-env dev  --parameter-overrides 'ParameterKey=Environment,ParameterValue=dev' 'ParameterKey=LogLevel,ParameterValue=DEBUG' 'ParameterKey=StackName,ParameterValue=post-generation-dev' 'ParameterKey=InstagramAppId,ParameterValue=1505725710571824' 'ParameterKey=InstagramAppSecret,ParameterValue=2e850365fa9117e53754b4bf46db9c9f'