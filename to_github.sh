#!/bin/sh

echo Write your commit message:

read commit

git status

git add .

git commit -m "$commit"

git push origin main
