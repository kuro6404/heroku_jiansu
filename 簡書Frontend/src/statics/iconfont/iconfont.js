import { createGlobalStyle } from 'styled-components';

const GlobalIcon = createGlobalStyle`
@font-face {font-family: "iconfont";
  src: url('./iconfont.eot?t=1613817359371'); /* IE9 */
  src: url('./iconfont.eot?t=1613817359371#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
  url('./iconfont.woff?t=1613817359371') format('woff'),
  url('./iconfont.ttf?t=1613817359371') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
  url('./iconfont.svg?t=1613817359371#iconfont') format('svg'); /* iOS 4.1- */
}
.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontThumb {
  font-family: "iconfont" !important;
  font-size: 25px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor:pointer;
}

.iconfontFirst {
  font-family: "iconfont" !important;
  font-size: 24px;
  font-style: normal;
  position:relative;
  z-index:100;
  left:115px;
  top:58px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontSecond {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  position:relative;
  z-index:100;
  left:92px;
  top:127px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontThird {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  position:relative;
  z-index:100;
  left:69px;
  top:197px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontUser {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  color:#EC6149;
  float:left;
  margin-right:14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontUserPage{
  font-family: "iconfont" !important;
  font-size: 22px;
  margin-right:10px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  
}

.iconfontDelete {
  font-family: "iconfont" !important;
  font-size: 22px;
  font-style: normal;
  color:#ec6149;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.iconfontComment{
  font-family: "iconfont" !important;
  font-size: 22px;
  font-weight:700;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  cursor:pointer;
}




.iconspin:before {
  content: "\\e851";
}

.iconsearch:before {
  content: "\\e854";
}

.iconpencil:before {
  content: "\\e655";
}

.iconAa:before {
  content: "\\e636";
}
`
export default GlobalIcon;
