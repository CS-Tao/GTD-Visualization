module.exports = {
  base: '/GTD-Visualization/docs/',
  dest: 'dist/docs',
  locales: {
    '/': {
      lang: 'zh-CN',
      title: '全球恐怖袭击数据可视化系统',
      description: 'Terrorist Attacks Visualization System'
    }
  },
  head: [
    ['link', { rel: 'icon', href: `/logo.png` }],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
    ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
    ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
    ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
    ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
  ],
  serviceWorker: true,
  theme: 'vue',
  themeConfig: {
    repo: 'CS-Tao/GTD-Visualization',
    editLinks: true,
    docsDir: 'docs',
    locales: {
      '/': {
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdated: '上次更新',
        nav: [
          {
            text: '项目框架',
            link: '/framework/',
          },
          {
            text: '开发工具',
            link: '/tools/'
          },
          {
            text: '预览',
            link: '/preview/'
          }
        ],
        sidebar: {
          '/preview/': [
            {
              title: '预览',
              collapsable: false,
              children: [
                '',
                'gif'
              ]
            }
          ]
        }
      }
    }
  }
}
