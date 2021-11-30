---
title: 以 MonoRepo 形式管理 Eslint 规则并发包
date: 2021-12-01 00:10
---

# 缘由

最近想重写自己的网站，但是想到每一次新项目都要配一堆 Eslint 配置，麻烦死了，然后就想到了自己发包到 NPM 去，然后就折腾了几天。



# 步骤

想到工作上用 Angular ，平时自己用 Vue ，除了 Vanilla JS 还有 TS 的配置，就决定用 MonoRepo 的方式管理了。经过一番调研发现有用 [lerna]('https://github.com/lerna/lerna') 的也有用 [Rush]('https://rushjs.io/') 配合 [pnpm workspace]('https://pnpm.io/workspaces') 的，我个人还是挺喜欢 pnpm 的，而且这个项目也先不用太复杂，就暂且先用 pnpm workspace 来管理吧。其实发包不难，但就遇到一些小问题把自己整麻了，先说一下发包的步骤。

## 1. 登录

先看看有没有登录 npm

**切记**，此处需先把 registry 改回 npmjs ，推荐用 [nrm]('https://github.com/Pana/nrm') 管理。

```bash
$ pnpm whoami
```

如有登录信息则进入第二步，否则继续登录

```bash
$ pnpm adduser
```

根据提示信息输入用户名、密码和邮箱，有两步验证的也要验证一下~

登陆成功后会显示 `Logged in as xxx on https://registry.npmjs.org/.`



## 2. 项目设置

首先项目根目录创建 `packages` 文件夹，里面放各个 eslint 规则的 repo。我的项目结构大致如下：

```bash
├─LICENSE
├─README.md
├─package.json
├─pnpm-lock.yaml
├─pnpm-workspace.yaml
├─packages
|    ├─typescript
|    |   ├─index.js
|    |   └package.json
|    ├─basic
|    |   ├─index.js
|    |   └package.json
|    ├─all
|    |   ├─index.js
|    |   └package.json
```



项目根目录中创建 `pnpm-workspace.yaml` 文件，写入以下内容，配置 packages 目录。

```yaml
packages:
	- 'packages/*'
```



## 3. 发布

项目配好之后，就可以发布了，在 `package.json` 的 scripts 中加入 `"publish": "pnpm publish -r --access=public"`，然后

```bash
$ pnpm run publish
```

完事~



# 踩坑

正常来说，步骤就这样，但是我也遇到了一个~~问题~~

```bash
npm ERR! code E403
npm ERR! 403 403 Forbidden - PUT https://registry.npmjs.org/@dxd%2feslint-config - Forbidden
npm ERR! 403 In most cases, you or one of your dependencies are requesting
npm ERR! 403 a package version that is forbidden by your security policy, or
npm ERR! 403 on a server you do not have access to.
```

万恶的 403，查了网上的众多答案后，可以由以下步骤排查

1. 看看自己的 npm 账号有没有验证邮箱
2. npm registry 是否切换回了 npmjs

​	网上的答案 99% 都是这两个，剩下 1% 就是说你用了 VPN。我尝试了很多次了，但还是 403，折腾了几天才发现了问题所在：包名错了。。。

​	在 [npm Docs]('https://docs.npmjs.com/about-public-packages') 中写了包的范围命名，没范围的呢，就单纯的一个名字，比如 `axios`，还有的就是范围命名，包括 `@username/package-name` 和 `org-name/package-name` ，即 @用户名 或者 @组织名 在前。

​	我本来也是想着用 @用户名 在前的方式的，但忘了自己的 npm 用户名就叫 donaldmok，然后自己在各个 `package.json` 中写了 `@dxd/eslint-config`了。。。包名和用户名对不上，自然就发不了包上去了。

​	还是太粗心了。。。 