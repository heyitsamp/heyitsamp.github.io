#!/bin/sh

dir=`dirname "$0"`
echo 'Changing directory to '"$dir"
cd "$dir"

echo
echo "Press Ctrl+C to quit"
echo

grunt watch
