---
title: '项目框架'
sidebar: auto
---
## Webpack

官网传送门：<u>[https://www.webpackjs.com/](https://www.webpackjs.com/)</u>.

Webpack 是当下最好的前端资源加载、打包的工具，没有之一，它会根据模块之间的依赖关系，递归地构建一个依赖关系图，然后将这些模块打包为一个或多个 Js 文件。Webpack 有四个核心概念：

- 入口(entry)
- 出口(output)
- loader
- 插件(plugins)

这些内容都会在 Webpack 的配置文件中体现出来，但本文不会对这些概念进行详细的解释。

- 入口(entry)会告诉 Webpack 应该使用哪一个模块作为构建内部依赖关系图的开始，然后 Webpack 会根据这个入口(entry)模块，找到所有它直接或间接依赖的模块，构成依赖关系图。
    ```JavaScript
    module.exports = {
        entry: './path/to/my/entry/file.js'
    };
    ```

- 出口(output)会告诉 Webpack 应该在哪里输出打包好的文件。
    ```JavaScript
    const path = require('path');

    module.exports = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        }
    };
    ```

- 由于 Webpack 本身只理解 JavaScript，对于其他文件，比如 CSS、TypeScript 等，Webpack 是不知道如何解析和加载它们的。loader 可以 让 Webpack 有能力去解析和加载这些非 JavaScript 文件。loader 有两个很重要的属性：

    - `test`：指定哪些文件需要被指定的 loader 处理，一般使用正则表达式。
    - `use`：指定一个或多个 loader 处理`test`指定的文件

    ```JavaScript
    const path = require('path');

    const config = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        },
        module: {
            rules: [
                { test: /\.txt$/, use: 'raw-loader' }
                ]
            }
    };
    module.exports = config;
    ```

- 我们现在知道 loader 是用来解析和加载某些非 JavaScript 模块的，而插件(plugins)的应用范围比 loader 广泛得多，我们可以通过加载插件对 Webpack 的打包过程进行优化、压缩等等，当然它的功能远不止这些，通过加载不同的插件可以用来处理各种各样的任务。
    ```JavaScript
    const HtmlWebpackPlugin = require('html-webpack-plugin'); // 通过 npm 安装
    const webpack = require('webpack'); // 用于访问内置插件
    const path = require('path');

    const config = {
        entry: './path/to/my/entry/file.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'my-first-webpack.bundle.js'
        },
        module: {
            rules: [
                { test: /\.txt$/, use: 'raw-loader' }
            ]
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin(),
            new HtmlWebpackPlugin({template: './src/index.html'})
        ]
    };

    module.exports = config;
    ```

## Electron

官网传送门：<u>[https://electronjs.org/](https://electronjs.org/)</u>.

我们知道，借助浏览器强大的渲染功能，我们可以编写出很漂亮很炫酷的网页，这是传统的桌面端软件很难企及的。但 Electron 借助于 Chromium，可以很轻易地实现这些炫酷的效果，而且因为几乎所有的页面都保存在本地，Electron 应用程序的页面加载速度大大优于 Web 端。对 Electron 的一个错误的理解是 Electron 所做的只是将原本的浏览器窗口变成了一个应用程序窗口，把原本应该从互联网上下载的网页都放在了本地，从而实现了 Web 端和客户端的完美结合。其实不然，出于安全原因，浏览器访问网页时需要采用的沙箱机制，以防不安全代码对计算机原生资源的访问或破坏，而 Electron 虽然内置了 Chromium 内核，但它却可以利用 Node Api 访问计算机原生资源，我们可以把 Electron 看做一个拥有 Node.js 环境的本地网页浏览器，而事实上，这和传统的 Web 应用程序已经有本质区别了。<br/>
>&emsp;&emsp;Electron 是由 Github 开发，用 HTML，CSS 和 JavaScript 来构建跨平台桌面应用程序的一个开源库。Electron 通过将 Chromium 和 Node.js 合并到同一个运行时环境中，并将其打包为 Mac，Windows 和Linux 系统下的应用来实现这一目的。<br/>&emsp;&emsp;Electron 于 2013 年作为构建 Github 上可编程的文本编辑器 Atom 的框架而被开发出来。这两个项目在 2014 春季开源。

## Vue

官网传送门：<u>[https://cn.vuejs.org/](https://cn.vuejs.org/)</u>.

>&emsp;&emsp;Vue (读音 /vjuː/，类似于 view) 是一套用于构建用户界面的渐进式框架。与其它大型框架不同的是，Vue 被设计为可以自底向上逐层应用。Vue 的核心库只关注视图层，不仅易于上手，还便于与第三方库或既有项目整合。

不久前因为项目需要，我们使用 Vue 开发了一个执法信息管理系统，不得不说，Vue 是真的好用。在接触 Electron 之前，我个人比较喜欢用 Winform 或 Wpf 开发桌面端软件，虽然只能在 Windows 平台上运行，但毕竟自己只用 Windows，偶尔用用 Linux 也只使用命令行，所有也并没有开发跨平台软件的需求。用过 Wpf 的朋友应该知道 Wpf 的数据绑定特性和 MVVM 模式，这应该是我现在仍然使用 Wpf 最重要的原因了。而使用 Vue，我们可以实现类似的功能，通过一个 Vue 实例的 Data 选项和一个 DOM 元素的 v-bind 属性，可以将视图和数据进行绑定，而通过[单文件组件](https://cn.vuejs.org/v2/guide/single-file-components.html)结合 vue-loader，我们可以将各个组件分离、独立设计，从而实现组件内强耦合、组件间松耦合，每个组件只需要负责自己需要完成的任务。利用 Vue 的动态渲染功能，结合传入组件内的数据，我们可以很容易地实现 MVVM 模式。

## Element-ui

官网传送门：<u>[http://element-cn.eleme.io/](http://element-cn.eleme.io/)</u>.

Element-ui 是由饿了么前端出品的一套 Vue.js 后台组件库，组件清爽美观，与 Vue 2.0 紧密集成。其设计原则是：<br/>
<img src="https://raw.githubusercontent.com/CS-Tao/github-content/master/contents/blog/image/others/03.png" width="85%" height="85%">

- 一致性 Consistency
    - 与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念
    - 在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等
- 反馈 Feedback
    - 控制反馈：通过界面样式和交互动效让用户可以清晰的感知自己的操作
    - 页面反馈：操作后，通过页面元素的变化清晰地展现当前状态
- 效率 Efficiency
    - 简化流程：设计简洁直观的操作流程
    - 清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策
    - 帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担
- 可控 Controllability
    - 用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策
    - 结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等
