---
AIGC:
  ContentProducer: '001191110102MAD55U9H0F10002'
  ContentPropagator: '001191110102MAD55U9H0F10002'
  Label: '1'
  ProduceID: 'f3a97551-ebd0-4f75-b1b5-f43a61b929f7'
  PropagateID: 'f3a97551-ebd0-4f75-b1b5-f43a61b929f7'
  ReservedCode1: '617c850b-1218-4aa5-9f4d-8bfd8a0889cc'
  ReservedCode2: '617c850b-1218-4aa5-9f4d-8bfd8a0889cc'
---

# 美股日报 · 金渐成投资框架（做T回撤锚定版 V2）

基于金渐成公众号历史文章投资框架制作的美股每日复盘网站，内容/结构/格式/配色完全照抄日报 HTML。

## 在线访问

https://fengzt13.github.io/jinjiancheng-daily/

## 项目结构

```
jinjiancheng-daily/
├── index.html      # 主页面（六大板块骨架）
├── css/style.css    # 样式（金色米白配色，照抄日报）
└── js/
    ├── data.js      # ★ 每日数据配置：每天只需更新此文件
    └── render.js    # 渲染脚本：根据 data.js 生成完整页面
```

## 每日更新方法

只需更新 `js/data.js` 中的 `REPORT` 对象：

| 板块 | data.js 字段 |
|------|-------------|
| 头部日期 | `meta.dataDate` / `meta.reportDate` |
| 一、大盘概况 | `indices` / `macro` / `narrative` |
| 二、做T触发监控表 | `triggerNote` / `triggerGroups` |
| 三、重点标的动态分析 | `focusNote` / `focus` |
| 四、操作建议汇总 | `actions` / `actionNote` |
| 五、风控提醒 | `risks` / `discipline` |
| 六、金渐成投资格言 | `quotes` |

更新后提交推送即可，GitHub Pages 自动部署。

## 免责声明

本报告基于公开市场信息整理，仅供学习参考，不构成投资建议。市场有风险，投资需谨慎。

> AI生成