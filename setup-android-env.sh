#!/bin/bash

# Add Android SDK environment variables to .zshrc
echo 'export ANDROID_HOME=$HOME/Library/Android/sdk' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/emulator' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/tools/bin' >> ~/.zshrc
echo 'export PATH=$PATH:$ANDROID_HOME/platform-tools' >> ~/.zshrc

# Reload .zshrc
source ~/.zshrc

echo "Android environment variables have been set up!" 