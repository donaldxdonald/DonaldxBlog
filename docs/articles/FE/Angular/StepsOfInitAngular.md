# Angular项目初始化步骤

## 初始化

`ng new xxx`

|                        |                                                              |                                  |               |
| :--------------------- | :----------------------------------------------------------- | :------------------------------- | :------------ |
| 选项                   | 说明                                                         | VALUE TYPE                       | DEFAULT VALUE |
| `--collection`         | 用来生成初始应用的一组原理图。别名: -c                       | `string`                         |               |
| `--commit`             | 初始 git 仓库提交信息。                                      | `boolean`                        | `true`        |
| `--create-application` | 在新工作区的 “src” 文件夹中创建一个新的初始应用程序项目。如果为 false，则会创建一个没有初始应用程序的空工作空间。然后，你可以使用 generate application 命令，以便让所有应用程序都创建在自己的项目文件夹中。 | `boolean`                        | `true`        |
| `--defaults`           | 对有默认值的选项禁用交互式输入提示。                         | `boolean`                        |               |
| `--directory`          | 要在其中创建工作空间的目录名称。                             | `string`                         |               |
| `--dry-run`            | 运行一遍并汇报其活动轨迹，但不真的写入任何结果。别名: -d     | `boolean`                        | `false`       |
| `--force`              | 强制覆盖现存文件。别名: -f                                   | `boolean`                        | `false`       |
| `--help`               | 在控制台显示关于本命令的帮助信息。                           | `true|false|json|JSON`           | `false`       |
| `--inline-style`       | 在组件 TS 文件中包含内联样式。默认情况下，将创建一个外部样式文件，并在组件 TypeScript 文件中对其进行引用。别名: -s | `boolean`                        |               |
| `--inline-template`    | 在组件 TS 文件中包含内联模板。默认情况下，将创建一个外部模板文件，并在组件 TypeScript 文件中对其进行引用。别名: -t | `boolean`                        |               |
| `--interactive`        | 启用交互式输入提示。                                         | `boolean`                        |               |
| `--legacy-browsers`    | 使用差异化加载添加对 Internet Explorer 等旧版浏览器的支持。  | `boolean`                        | `false`       |
| `--minimal`            | 创建没有任何测试框架的工作空间。（仅用于学习目的。）         | `boolean`                        | `false`       |
| `--new-project-root`   | 要创建的新项目的路径。是相对于新工作空间根目录的。           | `string`                         | `projects`    |
| `--package-manager`    | 用于安装依赖项的包管理器。                                   | `npm|yarn|pnpm|cnpm`             |               |
| `--prefix`             | 适用于初始项目的生成选择器的前缀。别名: -p                   | `string`                         | `app`         |
| `--routing`            | 为初始项目生成一个路由模块。                                 | `boolean`                        |               |
| `--skip-git`           | 不要初始化 git 仓库。别名: -g                                | `boolean`                        | `false`       |
| `--skip-install`       | 不要安装依赖包。                                             | `boolean`                        | `false`       |
| `--skip-tests`         | 不要为新项目生成 “spec.ts” 测试文件。别名: -S                | `boolean`                        | `false`       |
| `--strict`             | 创建带有更严格类型检查和更严格捆绑包预算设置的工作空间。此设置有助于提升可维护性，并预先捕获 BUG。欲知详情，参见 https://angular.cn/guide/strict-mode | `boolean`                        | `false`       |
| `--style`              | 用于样式文件的扩展名/预处理器。                              | `css|scss|sass|less|styl`        |               |
| `--verbose`            | 在输出日志中添加更多详情。别名: -v                           | `boolean`                        | `false`       |
| `--view-encapsulation` | 用在初始项目中的视图封装策略。                               | `Emulated|Native|None|ShadowDom` |               |





## Angular配置

> angular.json

`projects.${projectName}.architect.build.styles` - 生产环境全局样式

`projects.${projectName}.architect.serve.styles` - 开发环境全局样式



`projects.${projectName}.architect.serve.configurations.development.hmr` - 开发环境热更新

`projects.${projectName}.architect.serve.configurations.development.host` - 设置为'0.0.0.0'开发环境设置局域网访问

`projects.${projectName}.architect.serve.configurations.development.proxyConfig` - 开发环境设置代理配置外部文件



## Typescript配置

> tsconfig.json

`compilerOptions.paths` 路径别名

## Eslint

### Add schematic

`ng add @angular-eslint/schematics`



### Rules

```json
{
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "indent": ["error", 2, {
          "SwitchCase": 0
        }],
        "@typescript-eslint/ban-ts-comment": "warn",
        "@typescript-eslint/no-extra-semi": "error",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-unused-vars": ["warn", { "vars": "all", "args": "none", "ignoreRestSiblings": false }],
        "@typescript-eslint/type-annotation-spacing": [2, { "before": false, "after": true, "overrides": { "arrow": { "before": true, "after": true }} }],
        "prefer-const": "error",
        "no-underscore-dangle": "off",
        "no-shadow": "off",
        "@angular-eslint/no-empty-lifecycle-method": 0,
        // 强制在关键字前后使用一致的空格 (前后腰需要)
        "keyword-spacing": 2,
        "no-unused-vars": "off",
        "comma-dangle": [2, "never"],
        // 控制逗号前后的空格
        "comma-spacing": [2, {
          "before": false,
          "after": true
        }],
        "semi": ["warn", "never"],
        //要求或禁止在函数标识符和其调用之间有空格
        "func-call-spacing": 2,
        // 强制在对象字面量的属性中键和值之间使用一致的间距
        "key-spacing": [2, {
          "beforeColon": false,
          "afterColon": true
        }],
        // 要求箭头函数的参数使用圆括号
        "arrow-parens": [2, "as-needed"],
        // 指定数组的元素之间要以空格隔开(, 后面)， never参数：[ 之前和 ] 之后不能带空格，always参数：[ 之前和 ] 之后必须带空格
        "array-bracket-spacing": [2, "never"],
        // 禁止或强制在单行代码块中使用空格(禁用)
        "block-spacing": [1, "never"],
        "object-curly-spacing": [1, "always"],
        "space-infix-ops": ["error", { "int32Hint": false }],
        "quotes": ["error", "single"]
      }
```

