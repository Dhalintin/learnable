# TASK FIVE

## Please see task 5 in the file animalkingdom.js

# SECOND LEARNABLE ASSIGNMENT

## VERSION CONTROLLER

Version control is a system that helps keep track of files and changes made to files over a perios of time, it basically allows one to keep specific (multiple) versions of a file or a set of files. In programming version controll helps programmers keep specific versions of a programm and if need be there can be recall to that version.

## DIFFERENCES BETWEEN GIT AND GITHUB

Git is the technology that helps in version controll while GitHub is the web platform for the Git Technology
Git tracks your code and GitHub is the platform to store your code
Git focuses on managing and keeping track of your versions while GitHub is a platform for social coding and collaboration on projects

## Alternatives to GitHub

1. GitLab
2. Azure DevOps
3. AWS CodeCommit

## Differences between Git Fetch and Git Pull

1. Git fetch gets all the latest changes from the remote repository without merging them into your local working directory while git pull combines git fetch with git merge and fetches all the latest changes from the remote repository and attempts to merge them into your current local branch

2. Git fetch updates the remote-tracking branches in your local repository while git pull Updates the remote-tracking branches and attempts to merge the changes into your current working directory

3. Git fetch check for updates before merging them into your work while git pull doesn't and can sometimes lead to merge conflicts

## Git Rebase

Allows you to move your existing commits onto a newer another branch to create a smoother linear history.
`git rebase <base-branch>` (replace <base-branch> with the branch you want to update with)
Use it: When you want to integrate changes from another branch while keeping your commit

## GIT CHERRY-PICK

Allows you to choose a single commit from one branch and add it to another branch, leaving the rest of the commits untouched.
`git cherry-pick <commit-hash>` (replace <commit-hash> with the branch you want to update with)
