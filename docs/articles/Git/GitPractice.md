# Git 实践

## 将本地与远程仓库回退到某一 commit 

1. 查看回退目标 commit 的id

   ```bash
   $ git log
   ```

2. 回退到之前的版本

   ```bash
   $ git reset --hard <COMMIT_ID>
   ```

3. 覆盖远程仓库的版本，需要加上参数 `--force` 

   ```bash
   $ git push origin <BRANCH_NAME> --force
   ```

   

