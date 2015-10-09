# MultiLevelMenu
Base on codrops/ResponsiveMultiLevelMenu.

# How to use
  * 引入js、css
  ```html
  <link rel="stylesheet" type="text/css" href="css/component.css" />
  <script src="js/jquery.dlmenu.js"></script>
  ```
  
  * 公开接口方法
  ```javascript
  $('.menu').dlmenu({
  	onLinkClick: function(el, ev) {}, // 链接点击
      onLevelClick: function(el, name) {} // 子菜单点击事件
  }); // 实例化
  $('.menu').dlmenu('openMenu'); // 展开菜单
  $('.menu').dlmenu('openMenu'); // 关闭菜单
  ```
