#!/bin/bash
readonly REPOSITORY_PATH=${1:-"/home/ubuntu/employers-site"}

readonly FRONTEND_PATH="${REPOSITORY_PATH}/frontend"
readonly BACKEND_PATH="${REPOSITORY_PATH}/backend"

Set current directory
pushd . > /dev/null

# Update system packages
sudo apt update

# Install npm
sudo apt install -y npm
sudo npm cache clean -f
sudo npm install --global n

# Install stable Node.js version
sudo n stable

# Install yarn globally
sudo npm install --global yarn
# Install frontend dependencies
cd ${FRONTEND_PATH} || exit
npm i

# Install pip
sudo apt install -y python3-pip

# Install backend Python dependencies
cd ${BACKEND_PATH} || exit 
pip install -r requirements.txt

# Change back to the original directory
popd > /dev/null || exit 
