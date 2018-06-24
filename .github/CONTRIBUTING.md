### 关于各个分支的作用
- `master`

  正式发布版，`develop` 分支开完完成后，从 `develop` 分支中拉出 `release` 分支，修复 Bug 后合并到(`merge`)到 `master` 分支，一般一次 `master` 分支的提交对应一次发布。
  或者直接将 `develop` 分支合并(merge)到 `master` 分支，不经过 `release` 分支，如：
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/19.png)
- `develop`

  日常开发汇总
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/17.png)
- `feature`

  活动分支，用于新功能开发，该分支从 `develop` 拉取，开发完成后合并(merge)到 `develop`，应当采用策略合并，并且用完即删，即：
  ```bash
  git checkout develop
  git merge --no-ff feature-1
  git branch -D feature-1
  git push origin develop
  ```
- `release`

  正式发布前的测试分支，从 `develop` 拉出，测试完成并修复 Bug 后，合并(merge)到 `master` 分支和 `develop` 分支
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/18.png)
- `hotfix`

  从 `master` 拉出，用于必须立即解决的 Bug，解决完 Bug 合并(merge)到 `master`

### 发送 PR

应该在不同仓库的 `develop` 分支上进行，非中央仓库的 `develop` 分支应当使用 rebase 和中央仓库的 `develop` 分支合并之后再向中央仓库发送 PR

### 关于从远程拉取代码

应当避免合并提交的产生：
```bash
git pull origin develop --rebase
```
