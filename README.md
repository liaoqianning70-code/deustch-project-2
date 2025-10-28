# 德语句序练习 - 静态站点


该目录包含一个简单的静态练习页面：通过拖拽词语来练习德语句子语序。

默认打开页
- 现在 `site/index.html` 已配置为自动重定向到练习页 `site/game.html`，因此打开站点时会直接进入交互练习。

如何预览（本地）
- 在项目根目录运行一个简单的静态服务器（推荐）：

  Python 3.x:

  ```
  python3 -m http.server 8000
  ```

  然后在浏览器中打开:

  http://localhost:8000/site/

  如果浏览器没有自动跳转到练习页，请在页面中点击 “进入练习页面” 链接或直接访问：

  http://localhost:8000/site/game.html

说明
- 页面使用位于 `images/og_image.jpeg` 的背景图，favicon 位于项目根的 `favicon.ico`。
- 练习区域的（示例）正确答案为："Ich habe gestern im Park einen Freund gesehen."。你可以编辑 `site/game.html` 和 `site/game.js` 来添加更多句子或改变逻辑。
