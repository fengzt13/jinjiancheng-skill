/* ============================================================
   美股日报 · 金渐成投资框架 · 做T回撤锚定版 V2
   渲染脚本：根据 js/data.js 的 REPORT 对象生成完整页面
   与日报HTML展示形式完全一致（六大板块）
   ============================================================ */

/* ---------- 工具 ---------- */
function el(id) { return document.getElementById(id); }
function tagCls(t) { return { fire: "fire", near: "near", wait: "wait" }[t] || "wait"; }
function tagText(t) { return { fire: "已触发", near: "临界", wait: "等待" }[t] || t; }
function chgCls(c) { return c === "up" ? "up" : c === "down" ? "down" : ""; }
/* 回撤进度条：回撤 / 阈值 × 100，封顶 100；≥100 红色已破，≥70 橙色临界 */
function barState(dd, thresh) {
  var pct = Math.round(dd / thresh * 100);
  if (pct > 100) pct = 100;
  var cls = pct >= 100 ? "done" : pct >= 70 ? "near" : "";
  return { pct: pct, cls: cls };
}

/* ---------- 渲染：头部 ---------- */
function renderHeader() {
  el("pageTitle").textContent = "金渐成投资理念及SKILL· 美股复盘与做T节点日报";
  el("kicker").textContent = "金渐成投资框架 · 做T回撤锚定版 V2";
  el("mainTitle").textContent = "金渐成投资理念及SKILL· 美股复盘与做T节点日报";
  el("subLine").textContent = "先保值，再增值 ｜ 要么第一，要么唯一 ｜ 不极端，不单一 ｜ 永不满仓";
  el("metaLine").innerHTML =
    "数据日期：" + REPORT.meta.dataDate + "　·　报告日期：" + REPORT.meta.reportDate + "　·　数据来源：公开市场信息";
}

/* ---------- 渲染：一、大盘概况 ---------- */
function renderOverview() {
  var idxHtml = REPORT.indices.map(function (it) {
    return '<div class="card">' +
      '<div class="nm">' + it.name + '</div>' +
      '<div class="val">' + it.val + '</div>' +
      '<div class="chg ' + chgCls(it.cls) + '">' + it.chg + ' <small>' + it.note + '</small></div>' +
      '</div>';
  }).join("");
  el("idxCards").innerHTML = idxHtml;

  var macroHtml = REPORT.macro.map(function (m) {
    return '<div class="mcell"><div class="l">' + m.l + '</div><div class="v">' + m.v +
      '</div><div class="c ' + chgCls(m.cls) + '">' + m.c + '</div></div>';
  }).join("");
  el("macroCells").innerHTML = macroHtml;

  var pointsHtml = REPORT.narrative.points.map(function (p) { return "<li>" + p + "</li>"; }).join("");
  el("narrative").innerHTML =
    '<span class="ttl">' + REPORT.narrative.title + '</span>' +
    REPORT.narrative.intro +
    "<ul>" + pointsHtml + "</ul>" +
    REPORT.narrative.ending;
}

/* ---------- 渲染：二、做T触发监控表 ---------- */
function renderTrigger() {
  el("triggerNote").innerHTML = REPORT.triggerNote.map(function (t) {
    return "<p style='margin:4px 0;'>" + t + "</p>";
  }).join("");

  var html = "";
  REPORT.triggerGroups.forEach(function (g) {
    html += '<tr class="grp"><td class="l" colspan="10">' + g.name + "</td></tr>";
    g.rows.forEach(function (r) {
      var bc = barState(r.dd, r.thresh);
      var barCls = bc.cls ? "bar " + bc.cls : "bar";
      var ddTxt = r.ddBold ? "<b>" + r.dd.toFixed(2) + "%</b>" : r.dd.toFixed(2) + "%";
      html += "<tr>" +
        '<td class="l"><span class="tk">' + r.tk + '</span><span class="nmx">' + r.nm + "</span></td>" +
        "<td>" + r.price + "</td>" +
        '<td class="' + chgCls(r.chgCls) + '">' + r.chg + "</td>" +
        "<td>" + r.hi + "</td>" +
        "<td>" + ddTxt + "</td>" +
        '<td><div class="' + barCls + '"><i style="width:' + bc.pct + '%"></i></div></td>' +
        "<td>" + r.thresh + "%</td>" +
        "<td>" + r.trig + "</td>" +
        "<td>" + r.dist + "</td>" +
        '<td><span class="tag ' + tagCls(r.tag) + '">' + tagText(r.tag) + "</span></td>" +
        "</tr>";
    });
  });
  el("triggerBody").innerHTML = html;
}

/* ---------- 渲染：三、重点标的动态分析 ---------- */
function renderFocus() {
  el("focusNote").innerHTML = REPORT.focusNote;
  var html = REPORT.focus.map(function (f) {
    var barCls = f.barCls ? "bar " + f.barCls : "bar";
    var kvHtml = f.kv.map(function (kv) {
      return '<div><div class="k">' + kv.k + '</div><div class="v">' + kv.v + "</div></div>";
    }).join("");
    var tierHtml = f.tiers.map(function (row) {
      return "<tr><td>价格/资金</td>" + row.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
    }).join("");
    var advCls = f.advCls ? "adv " + f.advCls : "adv";
    return '<div class="fc">' +
      '<div class="top"><span class="tk">' + f.tk + '</span><span class="nm">' + f.nm + '</span>' +
      '<span class="price ' + chgCls(f.priceCls) + '">' + f.price + "</span></div>" +
      '<div class="pbwrap">' +
      '<div class="lbl"><span>52周高点 ' + f.hi + "</span><span>" + f.ddLabel + "</span></div>" +
      '<div class="' + barCls + '"><i style="width:' + f.barPct + '%"></i></div>' +
      "</div>" +
      '<div class="kv">' + kvHtml + "</div>" +
      "<table><thead><tr><th>档位</th><th>第1档</th><th>第2档</th><th>第3档</th><th>第4档</th></tr></thead>" +
      "<tbody>" + tierHtml + "</tbody></table>" +
      '<div class="' + advCls + '">' + f.adv + "</div>" +
      "</div>";
  }).join("");
  el("focusGrid").innerHTML = html;
}

/* ---------- 渲染：四、操作建议汇总 ---------- */
function renderActions() {
  var html = REPORT.actions.map(function (a) {
    return "<tr>" +
      '<td class="l"><span class="tk">' + a.tk + "</span></td>" +
      "<td>" + a.now + "</td>" +
      "<td>" + a.trig + "</td>" +
      '<td><span class="tag ' + tagCls(a.tag) + '">' + a.tagTxt + "</span></td>" +
      "<td>" + a.p1 + "</td>" +
      "<td>" + a.sell + "</td>" +
      '<td class="l">' + a.act + "</td>" +
      "</tr>";
  }).join("");
  el("actionBody").innerHTML = html;
  el("actionNote").innerHTML =
    '<span class="ttl">' + REPORT.actionNote.ttl + "</span>" +
    REPORT.actionNote.html.replace(/\n/g, "<br>");
}

/* ---------- 渲染：五、风控提醒 ---------- */
function renderRisk() {
  var html = REPORT.risks.map(function (r) {
    return '<div class="rk"><div class="h"><span class="dot"></span>' + r.h +
      '</div><div class="b">' + r.b + "</div></div>";
  }).join("");
  el("riskGrid").innerHTML = html;

  var discHtml = REPORT.discipline.map(function (d) { return "<li>" + d + "</li>"; }).join("");
  el("discipline").innerHTML = '<div class="h">V2 纪律速记</div><ul>' + discHtml + "</ul>";
}

/* ---------- 渲染：六、金渐成投资格言 ---------- */
function renderQuotes() {
  var html = REPORT.quotes.map(function (q) {
    return '<div class="q"><div class="t">' + q.t + '</div><div class="a">' + q.a + "</div></div>";
  }).join("");
  el("quoteGrid").innerHTML = html;
}

/* ---------- 页脚 ---------- */
function renderFoot() {
  el("footText").innerHTML =
    "本报告基于公开市场信息整理，仅供学习参考，<b>不构成投资建议</b>。市场有风险，投资需谨慎。<br>" +
    "金渐成投资框架 · 做T回撤锚定版 V2 · " + REPORT.meta.titleShort;
}

/* ---------- 渲染：友情链接 ---------- */
function renderCrossLinks() {
  var SITES = [
    { href: "https://fengzt13.github.io/nasdaq100-dashboard/", label: "纳指看板", key: "nasdaq" },
    { href: "https://fengzt13.github.io/ai-dashboard/", label: "AI看板", key: "ai" },
    { href: "https://fengzt13.github.io/metal-dashboard/", label: "金铜看板", key: "metal" },
    { href: "https://fengzt13.github.io/hbm-dashboard/", label: "HBM看板", key: "hbm" },
    { href: "https://fengzt13.github.io/hb/", label: "老雷观点", key: "laolei" }
  ];
  // 排除自己（金渐成日报站）
  var html = '<span class="cross-links-label">友情链接</span>' + SITES.map(function (s) {
    return '<a class="cross-link" href="' + s.href + '" target="_blank" rel="noopener">' + s.label + "</a>";
  }).join("");
  el("crossLinks").innerHTML = html;
}

/* ---------- 入口 ---------- */
function renderAll() {
  renderHeader();
  renderCrossLinks();
  renderOverview();
  renderTrigger();
  renderFocus();
  renderActions();
  renderRisk();
  renderQuotes();
  renderFoot();
}
document.addEventListener("DOMContentLoaded", renderAll);