// ==UserScript==
// @name         VIP解析 · 精简无广告版
// @namespace    https://xukzhao.eu.org
// @version      2.0.0
// @description  仅提供视频解析跳转，不注入广告、不劫持页面、不内嵌播放器
// @author       xu
// @match        *://v.qq.com/*
// @match        *://*.iqiyi.com/*
// @match        *://*.iq.com/*
// @match        *://*.youku.com/*
// @match        *://*.mgtv.com/*
// @match        *://*.bilibili.com/*
// @grant        GM_addStyle
// ==/UserScript==

(() => {
  'use strict';

  /* ================= 配置区 ================= */

  // 精选相对干净的解析接口（建议后期替换为自建接口）
  const APIS = [
        { name: 'HLS解析', url: 'https://jx.hls.one/?url=' },
		{ name: '测试', url: 'https://aibox.eu.org/?url=' },
		{ name: '极速解析', url: 'https://jx.2s0.cn/player/?url=' },
		{ name: 'ik9', url: 'https://yparse.ik9.cc/index.php?url=' },
		{ name: '芒果TV1', url: 'https://videocdn.ihelpy.net/jiexi/m1907.html?m1907jx=' },
		{ name: '虾米', url: 'https://jx.xmflv.com/?url=' },
	    { name: 'Player-JY', url: 'https://jx.playerjy.com/?url=' },
		{ name: 'playm3u8', url: 'https://www.playm3u8.cn/jiexi.php?url=' }
  ];

  const DEFAULT_API = APIS[0];

  /* ================= 样式 ================= */

  GM_addStyle(`
    #vipjx {
      position: fixed;
      left: 0;
      top: 10%;
      z-index: 999999;
      font-family: system-ui, -apple-system, BlinkMacSystemFont;
    }
    #vipjx-btn {
      background: #ffeb3b;
      color: #c00;
      font-weight: bold;
      padding: 10px 6px;
      cursor: pointer;
      border-radius: 0 6px 6px 0;
      user-select: none;
    }
    #vipjx-menu {
      display: none;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    #vipjx:hover #vipjx-menu {
      display: block;
    }
    #vipjx-menu li {
      background: rgba(0,0,0,.75);
      color: #fff;
      padding: 6px 12px;
      cursor: pointer;
      white-space: nowrap;
    }
    #vipjx-menu li:hover {
      background: #ff9800;
    }
  `);

  /* ================= DOM ================= */

  const box = document.createElement('div');
  box.id = 'vipjx';

  const btn = document.createElement('div');
  btn.id = 'vipjx-btn';
  btn.textContent = '▶';
  btn.title = DEFAULT_API.name;
  btn.onclick = () => openApi(DEFAULT_API.url);

  const ul = document.createElement('ul');
  ul.id = 'vipjx-menu';

  APIS.forEach(api => {
    const li = document.createElement('li');
    li.textContent = api.name;
    li.onclick = () => openApi(api.url);
    ul.appendChild(li);
  });

  box.appendChild(btn);
  box.appendChild(ul);
  document.body.appendChild(box);

  /* ================= 功能 ================= */

  function openApi(apiUrl) {
    const currentUrl = location.href;
    window.open(
      apiUrl + encodeURIComponent(currentUrl),
      '_blank',
      'noopener,noreferrer'
    );
  }

})();
