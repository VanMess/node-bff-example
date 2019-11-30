#!/usr/bin/env bash

if [ -z "$1" ]
then 
  VERSION_STRATEGY="patch"
else 
  VERSION_STRATEGY=$1
fi 

# Only accept major/minor/patch strategies.
# Lookup https://docs.npmjs.com/cli/version for detail
if [ $VERSION_STRATEGY = "major" ] || [ $VERSION_STRATEGY = "minor" ] || [ $VERSION_STRATEGY = "patch" ];
then
  # read new version
  VERSION=$(npm version $VERSION_STRATEGY)
  echo Building for node-bff-example:@${VERSION}.
  npm run build
  npm run changelog

  # build docker
  docker build -t node-bff-example:$VERSION .
  # push docker image to private docker repository
  # docker push node-bff-example:$VERSION
  # docker tag node-bff-example:$VERSION node-bff-example:latest
  # docker push node-bff-example:latest

  # update git
  git add CHANGELOG.md
  git add package.json
  git commit -m "docs(dashboard): version bump to $VERSION"
  git tag -a -m "Tagging version $VERSION" "$VERSION"
  git push origin master
  git push origin --tags
else
  echo 'We only accept major/minor/patch strategies.'
  echo 'Please check https://docs.npmjs.com/cli/version for more infomation.'
fi

