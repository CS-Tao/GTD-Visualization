### 关于各个分支的作用
- `master`

  正式发布版，`develop` 分支开完完成后，从 `develop` 分支中拉出 `release` 分支，修复 Bug 后合并到(`merge`)到 `master` 分支，一般一次 `master` 分支的提交对应一次发布。
  或者直接将 `develop` 分支合并(merge)到 `master` 分支，不经过 `release` 分支，如：
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/19.png)
- `develop`

  日常开发汇总
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/17.png)
- `feature`

  活动分支，用于新功能开发，该分支从 `develop` 为拉取，用完即删，也就是在 PR 合并(merge)的时候选择删除原分支。而且如果在本分支的开发过程中，发现 `develop` 分支有更新，只能
  使用 `rebase` 将 `develop` 的提交合并到当前 `feature` 分支。尽量在每次发送 PR 前都从 `develop` 分支 `rebase` 一下，使当前分支的`基`和 `develop` 分支的最新提交一致
- `release`

  正式发布前的测试分支，从 `develop` 拉出，测试完成并修复 Bug 后，合并(merge)到 `master` 分支和 `develop` 分支
  
  ![](https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/18.png)
- `hotfix`

  从 `master` 拉出，用于必须立即解决的 Bug，解决完 Bug 合并(merge)到 `master`

### 关于从远程代码拉取
```bash
git pull origin develop --rebase
```
