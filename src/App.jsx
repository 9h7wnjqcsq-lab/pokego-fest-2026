import { useState, useRef } from "react";

var typeColors = {
  ICE: { bg: "#7ecfff" },
  FLYING: { bg: "#89aae0" },
  WATER: { bg: "#6390f0" },
  GROUND: { bg: "#e2bf65" },
  PSYCHIC: { bg: "#f95587" },
  FIGHTING: { bg: "#c22e28" },
  ELECTRIC: { bg: "#f7d02c" },
  FAIRY: { bg: "#d685ad" },
  GHOST: { bg: "#735797" },
  GRASS: { bg: "#7ac74c" },
  ROCK: { bg: "#b6a136" },
  FIRE: { bg: "#ee8130" },
  STEEL: { bg: "#b7b7ce" },
  NORMAL: { bg: "#a8a878" },
  BUG: { bg: "#a6b91a" },
};

var weaknessColors = {
  ROCK: "#b6a136",
  STEEL: "#b7b7ce",
  FIRE: "#ee8130",
  ELECTRIC: "#f7d02c",
  GRASS: "#7ac74c",
  ICE: "#7ecfff",
  FIGHTING: "#c22e28",
  POISON: "#a33ea1",
  GROUND: "#e2bf65",
  FLYING: "#89aae0",
  PSYCHIC: "#f95587",
  BUG: "#a6b91a",
  GHOST: "#735797",
  DRAGON: "#6f35fc",
  DARK: "#705746",
  FAIRY: "#d685ad",
  WATER: "#6390f0",
};

var normalRaids = [
  {
    id: 1,
    nameCN: "急凍鳥",
    nameEN: "Articuno",
    types: ["ICE", "FLYING"],
    cp1: 1743,
    cp2: 2179,
    sprite: "144",
    bg: "#1a1a24",
    weaknesses: ["ROCK", "STEEL", "FIRE", "ELECTRIC"],
  },
  {
    id: 2,
    nameCN: "水君",
    nameEN: "Suicune",
    types: ["WATER"],
    cp1: 1704,
    cp2: 2130,
    sprite: "245",
    bg: "#1a1a24",
    weaknesses: ["GRASS", "ELECTRIC"],
  },
  {
    id: 3,
    nameCN: "原始蓋歐卡",
    nameEN: "Primal Kyogre",
    types: ["WATER"],
    cp1: 2351,
    cp2: 2939,
    sprite: "382",
    bg: "#3c1f2b",
    weaknesses: ["GRASS", "ELECTRIC"],
  },
  {
    id: 4,
    nameCN: "原始固拉多",
    nameEN: "Primal Groudon",
    types: ["GROUND"],
    cp1: 2351,
    cp2: 2939,
    sprite: "383",
    bg: "#3c1f2b",
    weaknesses: ["WATER", "GRASS", "ICE"],
  },
  {
    id: 5,
    nameCN: "超夢",
    nameEN: "Mewtwo",
    types: ["PSYCHIC"],
    cp1: 2387,
    cp2: 2984,
    sprite: "150",
    bg: "#153250",
    weaknesses: ["BUG", "GHOST", "DARK"],
  },
  {
    id: 6,
    nameCN: "帕底亞\n肯泰羅(水瀾)",
    nameEN: "Paldean Tauros Aqua",
    types: ["FIGHTING", "WATER"],
    cp1: 1621,
    cp2: 2026,
    sprite: "10250",
    bg: "#153250",
    weaknesses: ["FLYING", "PSYCHIC", "FAIRY", "GRASS", "ELECTRIC"],
  },
];

var shadowRaids = [
  {
    id: 7,
    nameCN: "暗影急凍鳥",
    nameEN: "Shadow Articuno",
    types: ["ICE", "FLYING"],
    cp1: 1743,
    cp2: 2179,
    sprite: "144",
    bg: "#2a1040",
    shadow: true,
    weaknesses: ["ROCK", "STEEL", "FIRE", "ELECTRIC"],
  },
  {
    id: 8,
    nameCN: "暗影水君",
    nameEN: "Shadow Suicune",
    types: ["WATER"],
    cp1: 1704,
    cp2: 2130,
    sprite: "245",
    bg: "#2a1040",
    shadow: true,
    weaknesses: ["GRASS", "ELECTRIC"],
  },
  {
    id: 9,
    nameCN: "暗影蓋歐卡",
    nameEN: "Shadow Kyogre",
    types: ["WATER"],
    cp1: 2351,
    cp2: 2939,
    sprite: "382",
    bg: "#2a1040",
    shadow: true,
    weaknesses: ["GRASS", "ELECTRIC"],
  },
  {
    id: 10,
    nameCN: "暗影固拉多",
    nameEN: "Shadow Groudon",
    types: ["GROUND"],
    cp1: 2351,
    cp2: 2939,
    sprite: "383",
    bg: "#2a1040",
    shadow: true,
    weaknesses: ["WATER", "GRASS", "ICE"],
  },
];

var BG_EVENT = "#1a2a1a";
var BG_LEGEND = "#1a1535";
var BG_RARE = "#1e1e28";
var BG_COMMON = "#2a2418";
var BG_COSTUME = "#E2EDE4";
var BG_FOCUS = "#F7E6D8";
var BG_UNOWN = "#E5E5EA";
var BG_OTHER = "#E1EBF5";

var HIGHLIGHT = {};
HIGHLIGHT[BG_EVENT] = {
  bg: "rgba(100,220,120,0.35)",
  border: "rgba(100,220,120,0.7)",
  text: "#7dffaa",
};
HIGHLIGHT[BG_LEGEND] = {
  bg: "rgba(255,200,50,0.35)",
  border: "rgba(255,200,50,0.7)",
  text: "#ffd966",
};
HIGHLIGHT[BG_RARE] = {
  bg: "rgba(180,150,255,0.35)",
  border: "rgba(180,150,255,0.7)",
  text: "#c9b0ff",
};
HIGHLIGHT[BG_COMMON] = {
  bg: "rgba(220,200,160,0.35)",
  border: "rgba(220,200,160,0.7)",
  text: "#e8d9b8",
};
HIGHLIGHT[BG_COSTUME] = {
  bg: "rgba(60,120,80,0.18)", border: "rgba(60,120,80,0.45)", text: "#2a6040",
  light: true, cardText: "#1a3a28", cardSubText: "#6a8a74",
};
HIGHLIGHT[BG_FOCUS] = {
  bg: "rgba(180,100,40,0.18)", border: "rgba(180,100,40,0.45)", text: "#7a3a10",
  light: true, cardText: "#5c3010", cardSubText: "#a07050",
};
HIGHLIGHT[BG_UNOWN] = {
  bg: "rgba(80,80,100,0.18)", border: "rgba(80,80,100,0.45)", text: "#3a3a4a",
  light: true, cardText: "#2a2a3a", cardSubText: "#787888",
};
HIGHLIGHT[BG_OTHER] = {
  bg: "rgba(40,80,160,0.18)", border: "rgba(40,80,160,0.45)", text: "#1a2a4a",
  light: true, cardText: "#1a2a4a", cardSubText: "#5a7090",
};

var wildPokemon = [
  {
    id: 101,
    nameCN: "傑尼龜（皮卡丘遮陽帽）",
    nameEN: "Squirtle (Straw Hat)",
    types: ["WATER"],
    bg: BG_COSTUME,
  },
  {
    id: 119,
    nameCN: "綠毛蟲（精靈球帽）",
    nameEN: "Caterpie (Poké Ball hat)",
    types: ["BUG"],
    bg: BG_COSTUME,
  },
  {
    id: 102,
    nameCN: "♂ 皮卡丘（叡智帽）",
    nameEN: "Pikachu (Wisecracker) M",
    types: ["ELECTRIC"],
    bg: BG_COSTUME,
  },
  {
    id: 104,
    nameCN: "清洗洛托姆",
    nameEN: "Rotom (Wash)",
    types: ["ELECTRIC", "WATER"],
    bg: BG_FOCUS,
  },
  {
    id: 118,
    nameCN: "♀ 皮卡丘（叡智帽）",
    nameEN: "Pikachu (Wisecracker) F",
    types: ["ELECTRIC"],
    bg: BG_COSTUME,
  },
  {
    id: 106,
    nameCN: "捷拉奧拉",
    nameEN: "Zeraora",
    types: ["ELECTRIC"],
    bg: BG_FOCUS,
  },
  {
    id: 103,
    nameCN: "花療環環",
    nameEN: "Comfey",
    types: ["FAIRY"],
    bg: BG_FOCUS,
  },
  {
    id: 110,
    nameCN: "伽勒爾魔牆人偶",
    nameEN: "Mime Jr. (Galarian)",
    types: ["ICE", "PSYCHIC"],
    bg: BG_FOCUS,
  },
  {
    id: 105,
    nameCN: "未知圖騰",
    nameEN: "Unown",
    types: ["PSYCHIC"],
    bg: BG_UNOWN,
    special: true,
    caught: 0,
    total: 28,
  },
  {
    id: 107,
    nameCN: "泥驢仔",
    nameEN: "Hippopotas",
    types: ["GROUND"],
    bg: BG_OTHER,
  },
  {
    id: 108,
    nameCN: "破破舵輪",
    nameEN: "Sinistea",
    types: ["GHOST"],
    bg: BG_OTHER,
  },
  {
    id: 109,
    nameCN: "來悲茶",
    nameEN: "Poltchageist",
    types: ["GRASS", "GHOST"],
    bg: BG_OTHER,
  },
  {
    id: 114,
    nameCN: "黑眼鱷",
    nameEN: "Totodile",
    types: ["WATER"],
    bg: BG_OTHER,
  },
  {
    id: 111,
    nameCN: "海星星",
    nameEN: "Staryu",
    types: ["WATER"],
    bg: BG_OTHER,
  },
  {
    id: 116,
    nameCN: "太古羽蟲",
    nameEN: "Nincada",
    types: ["BUG", "GROUND"],
    bg: BG_OTHER,
  },
  {
    id: 112,
    nameCN: "拉普拉斯",
    nameEN: "Lapras",
    types: ["WATER", "ICE"],
    bg: BG_OTHER,
  },
  {
    id: 115,
    nameCN: "幼基拉斯",
    nameEN: "Larvitar",
    types: ["ROCK", "GROUND"],
    bg: BG_OTHER,
  },
  {
    id: 117,
    nameCN: "鐵啞鈴",
    nameEN: "Iron Dumbell",
    types: ["STEEL", "FLYING"],
    bg: BG_OTHER,
  },
  {
    id: 113,
    nameCN: "水伊布",
    nameEN: "Vaporeon",
    types: ["WATER"],
    bg: BG_OTHER,
  },
];

var parkSessions = [
  "5/29 10:00 - 14:00 MORNING PARK",
  "5/29 16:00 - 20:00 AFTERNOON PARK",
  "5/30 10:00 - 14:00 MORNING PARK",
  "5/30 16:00 - 20:00 AFTERNOON PARK",
  "5/31 10:00 - 14:00 MORNING PARK",
  "5/31 16:00 - 20:00 AFTERNOON PARK",
  "6/1 10:00 - 14:00 MORNING PARK",
  "6/1 16:00 - 20:00 AFTERNOON PARK",
];
var allDays = ["5/25", "5/26", "5/27", "5/28", "5/29", "5/30", "5/31", "6/1"];

var parkPerks = [
  { text: "活動主題田野調查", color: "#ccc" },
  { text: "野外遭遇主題寶可夢", color: "#ccc" },
  { text: "異色機率提升", color: "#ccc" },
  { text: "捕捉糖果加倍", color: "#ccc" },
  { text: "團體戰每日入場券 9 張", color: "#7ecfff" },
  { text: "以紀念球成功捕捉寶可夢的機率提高", color: "#7ecfff" },
  { text: "特殊蛋", color: "#7ac74c" },
  { text: "孵蛋距離 1/2", color: "#7ac74c" },
  { text: "每顆孵化：糖果、星塵 x1.5", color: "#7ac74c" },
  { text: "交換星塵減半", color: "#f95587" },
  { text: "小隊合作時間延長", color: "#f95587" },
  { text: "每日特殊交換 6 次", color: "#f95587" },
  {
    text: "10:00 – 20:00 城市體驗活動期間，每日最多可開啟 50 個友情禮物。",
    color: "#f95587",
  },
];

var cityPerks = [
  { text: "異色機率提升", color: "#ccc" },
  { text: "捕捉糖果加倍", color: "#ccc" },
  { text: "小隊合作時間延長", color: "#f95587" },
  { text: "誘餌模組效果：2小時", color: "#ccc" },
  { text: "薰香效果延長：2小時", color: "#ccc" },
  { text: "活動主題田野調查：每小時領取", color: "#ccc" },
  { text: "獲得特殊活動主題貼圖：旋補給站、開禮物", color: "#ccc" },
];

var raidPackDetails = [];
var eggPackDetails = [
  "孵蛋距離 1/2 → 1/4",
  "每顆孵化經驗值、糖果、星塵 x1.5 → x3",
];
var UNOWN_FORMS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!?".split("");

var CARD = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: 12,
  marginBottom: 10,
  border: "1px solid rgba(255,255,255,0.1)",
  padding: "12px 14px",
};
var CARD_NO_BORDER = {
  background: "rgba(255,255,255,0.05)",
  borderRadius: 12,
  marginBottom: 10,
  border: "none",
  padding: "12px 14px",
};

// ── Canvas export ────────────────────────────────────────────────────────────
function drawCard(raidTogs, wildTogs, unownTog, callback) {
  var SIZE = 1080,
    PAD = 48;

  var raidOrder = [
    normalRaids[0],
    shadowRaids[0],
    normalRaids[1],
    shadowRaids[1],
    normalRaids[2],
    shadowRaids[2],
    normalRaids[3],
    shadowRaids[3],
    normalRaids[4],
    normalRaids[5],
  ];

  var raidNames = [
    "articuno",
    "articuno",
    "suicune",
    "suicune",
    "kyogre-primal",
    "kyogre-primal",
    "groudon-primal",
    "groudon-primal",
    "mewtwo",
    "tauros-paldea-aqua-breed",
  ];

  var wildOrder = [
    { id: 101, name: "squirtle" },
    { id: 102, name: "pikachu" },
    { id: 104, name: "rotom-wash" },
    { id: 118, name: "pikachu" },
    { id: 106, name: "zeraora" },
    { id: 103, name: "comfey" },
    { id: 110, name: "mime-jr" },
    { id: 107, name: "hippopotas" },
    { id: 108, name: "sinistea" },
    { id: 109, name: "poltchageist" },
    { id: 114, name: "totodile" },
    { id: 111, name: "staryu" },
    { id: 116, name: "nincada" },
    { id: 112, name: "lapras" },
    { id: 115, name: "larvitar" },
    { id: 117, name: "iron-hands" },
    { id: 113, name: "vaporeon" },
  ];

  var wildRows = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14, 15, 16],
  ];
  var unownLeftForms = ["A","B","C","D","E","F","G","H","I","J","K","L","M","!"];
  var unownRightForms = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z","?"];

  function spriteUrl(name) {
    return "https://img.pokemondb.net/sprites/home/normal/" + name + ".png";
  }

  var allSpriteUrls = [];
  raidNames.forEach(function (n) { allSpriteUrls.push(spriteUrl(n)); });
  wildOrder.forEach(function (w) { allSpriteUrls.push(spriteUrl(w.name)); });
  unownLeftForms.concat(unownRightForms).forEach(function () { allSpriteUrls.push(spriteUrl("unown")); });

  var images = new Array(allSpriteUrls.length).fill(null);
  var loaded = 0;
  function onLoad() {
    loaded++;
    if (loaded >= allSpriteUrls.length) render();
  }
  allSpriteUrls.forEach(function (url, i) {
    var img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = function () { images[i] = img; onLoad(); };
    img.onerror = function () { images[i] = null; onLoad(); };
    img.src = url;
  });

  function render() {
    var canvas = document.createElement("canvas");
    canvas.width = SIZE;
    canvas.height = SIZE * 2;
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "#10234a";
    ctx.fillRect(0, 0, SIZE, canvas.height);
    var y = PAD;

    function txt(str, x, yy, size, color, align) {
      ctx.font = "bold " + size + "px sans-serif";
      ctx.fillStyle = color || "#fff";
      ctx.textAlign = align || "left";
      ctx.fillText(str, x, yy);
    }
    function rRect(x, yy, w, h, r, fill, stroke) {
      ctx.beginPath();
      ctx.moveTo(x + r, yy);
      ctx.lineTo(x + w - r, yy);
      ctx.quadraticCurveTo(x + w, yy, x + w, yy + r);
      ctx.lineTo(x + w, yy + h - r);
      ctx.quadraticCurveTo(x + w, yy + h, x + w - r, yy + h);
      ctx.lineTo(x + r, yy + h);
      ctx.quadraticCurveTo(x, yy + h, x, yy + h - r);
      ctx.lineTo(x, yy + r);
      ctx.quadraticCurveTo(x, yy, x + r, yy);
      ctx.closePath();
      if (fill) { ctx.fillStyle = fill; ctx.fill(); }
      if (stroke) { ctx.strokeStyle = stroke; ctx.lineWidth = 1.5; ctx.stroke(); }
    }
    function divider(yy) {
      ctx.fillStyle = "rgba(255,255,255,0.08)";
      ctx.fillRect(PAD, yy, SIZE - PAD * 2, 1);
    }
    function drawSprite(imgIdx, x, yy, w, h) {
      var img = images[imgIdx];
      if (img) { ctx.drawImage(img, x, yy, w, h); }
    }

    txt("2026 GO Fest Tokyo", SIZE / 2, y + 28, 28, "#fff", "center");
    y += 52;
    txt("Pokemon catch Ledger", SIZE / 2, y + 22, 20, "#aaa", "center");
    y += 48;

    txt("團體戰捕捉  Raid Catches", PAD, y + 20, 20, "#ffd700");
    y += 36;
    var cW = (SIZE - PAD * 2 - 12) / 2;
    var rH = 66;
    raidOrder.forEach(function (raid, i) {
      var col = i % 2, row = Math.floor(i / 2);
      var rx = PAD + col * (cW + 12), ry = y + row * rH;
      var t = raidTogs[raid.id] || {};
      var shinyPct = t.stat > 0 ? Math.round(((t.shiny || 0) / t.stat) * 100) : 0;
      rRect(rx, ry, cW, rH - 6, 10, raid.bg, "rgba(255,255,255,0.07)");
      drawSprite(i, rx + 6, ry + 3, 54, 54);
      txt(raid.nameCN.replace(/\n/g, " "), rx + 66, ry + 24, 14, "#fff");
      txt(shinyPct + "%", rx + cW - 100, ry + 20, 11, "#ffd966", "right");
      var icons = [["✨", t.shiny || 0], ["💯", t.iv100 || 0], ["🌄", t.lucky2 || 0]];
      icons.forEach(function (p, j) {
        var ix = rx + cW - 80 + j * 30;
        txt(p[0], ix, ry + 22, 12, "#fff", "center");
        txt(String(p[1]), ix, ry + 40, 12, p[1] > 0 ? "#ffd700" : "#555", "center");
      });
    });
    y += Math.ceil(raidOrder.length / 2) * rH + 20;
    divider(y);
    y += 20;

    txt("野外與調查任務捕捉  Wild & Research Catches", PAD, y + 20, 20, "#ffd700");
    y += 36;
    var wildImgOffset = raidOrder.length;
    wildRows.forEach(function (rowIdxs) {
      var n = rowIdxs.length;
      var cardW = (SIZE - PAD * 2 - (n - 1) * 8) / n;
      var cardH = 96;
      rowIdxs.forEach(function (wi, ci) {
        var mon = wildOrder[wi];
        var wildMon = null;
        for (var k = 0; k < wildPokemon.length; k++) {
          if (wildPokemon[k].id === mon.id) { wildMon = wildPokemon[k]; break; }
        }
        if (!wildMon) wildMon = { bg: "#1e1e28" };
        var t = wildTogs[mon.id] || {};
        var hl = HIGHLIGHT[wildMon.bg] || {};
        var any = t.shiny || t.lucky || t.xxs || t.xxl;
        var mx = PAD + ci * (cardW + 8);
        rRect(mx, y, cardW, cardH, 8, wildMon.bg, any ? hl.border : "rgba(255,255,255,0.06)");
        drawSprite(wildImgOffset + wi, mx + (cardW - 48) / 2, y + 2, 48, 48);
        ctx.font = "bold 9px sans-serif";
        ctx.fillStyle = "#ddd";
        ctx.textAlign = "center";
        ctx.fillText(wildMon.nameCN, mx + cardW / 2, y + 58);
        var btns = [["✨", t.shiny], ["💯", t.iv100], ["XXS", t.xxs], ["XXL", t.xxl]];
        var bw = (cardW - 12) / 4;
        btns.forEach(function (b, bi) {
          var bx = mx + 6 + bi * (bw + 1.5), by = y + cardH - 26;
          rRect(bx, by, bw, 18, 3, b[1] ? hl.bg || "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.07)");
          ctx.font = "bold 8px sans-serif";
          ctx.fillStyle = b[1] ? hl.text || "#fff" : "#555";
          ctx.textAlign = "center";
          ctx.fillText(b[0], bx + bw / 2, by + 13);
        });
      });
      y += cardH + 8;
    });
    y += 12;
    divider(y);
    y += 20;

    txt("未知圖騰全圖鑑  Unown", PAD, y + 20, 20, "#ffd700");
    y += 36;
    var unownImgOffset = raidOrder.length + wildOrder.length;
    [unownLeftForms, unownRightForms].forEach(function (rowForms, rowIdx) {
      var n = rowForms.length;
      var uw = (SIZE - PAD * 2 - (n - 1) * 6) / n;
      var uh = 56;
      rowForms.forEach(function (f, fi) {
        var globalIdx = rowIdx === 0 ? fi : unownLeftForms.length + fi;
        var ux = PAD + fi * (uw + 6);
        var t = unownTog[f] || {};
        var any = Object.values(t).some(Boolean);
        rRect(ux, y, uw, uh, 6, any ? "rgba(180,150,255,0.2)" : "rgba(255,255,255,0.06)", any ? "rgba(180,150,255,0.7)" : "rgba(255,255,255,0.08)");
        drawSprite(unownImgOffset + globalIdx, ux + (uw - 32) / 2, y + 2, 32, 32);
        ctx.font = "bold 10px sans-serif";
        ctx.fillStyle = any ? "#c9b0ff" : "#555";
        ctx.textAlign = "center";
        ctx.fillText(f, ux + uw / 2, y + uh - 6);
      });
      y += uh + 8;
    });
    y += 12;

    txt("Powered by mktbch @Threads  •  GO trainer and Independent creator", SIZE / 2, y + 20, 12, "#444", "center");
    y += 40;

    var finalCanvas = document.createElement("canvas");
    finalCanvas.width = SIZE;
    finalCanvas.height = y;
    var fctx = finalCanvas.getContext("2d");
    fctx.drawImage(canvas, 0, 0);
    callback(finalCanvas);
  }
}

// ── Shared components ────────────────────────────────────────────────────────
function PerkList(props) {
  return (
    <ul style={{ margin: "8px 0 0", paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.4 }}>
      {props.perks.map(function (p) {
        return (
          <li key={p.text} style={{ display: "flex", alignItems: "baseline", gap: 8, padding: "3px 0", color: p.color }}>
            <span style={{ flexShrink: 0, fontSize: 13, color: "#4caf6e", fontWeight: 700, lineHeight: 1 }}>✓</span>
            <span>{p.text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function TypeBadge(props) {
  var type = props.type;
  var c = typeColors[type] || { bg: "#888" };
  return (
    <span style={{ background: c.bg, color: type === "ELECTRIC" ? "#000" : "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 3, letterSpacing: 0.3, lineHeight: "14px", display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", flexShrink: 0 }}>
      {type}
    </span>
  );
}

function makeBox(active) {
  return {
    width: 44,
    height: 44,
    borderRadius: 6,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: active ? "rgba(255,255,255,0.25)" : "rgba(255,255,255,0.08)",
    border: "1.5px solid " + (active ? "rgba(255,255,255,0.6)" : "rgba(255,255,255,0.18)"),
    cursor: "pointer",
    transition: "all 0.15s",
    filter: active ? "none" : "grayscale(1)",
    opacity: active ? 1 : 0.55,
    padding: 0,
    lineHeight: 1,
    WebkitTapHighlightColor: "transparent",
    touchAction: "manipulation",
  };
}

function IconBtn(props) {
  return (
    <button onClick={props.onClick} aria-label={props.label || ""} style={Object.assign({}, makeBox(props.active), { fontSize: 18 })}>
      {props.children}
    </button>
  );
}

function LabelBtn(props) {
  var label = props.label;
  return (
    <button onClick={props.onClick} aria-label={label} style={Object.assign({}, makeBox(props.active), { fontSize: label.length >= 5 ? 9 : 12, fontWeight: 900, color: props.active ? "#fff" : "rgba(255,255,255,0.4)" })}>
      {label}
    </button>
  );
}

// ── RaidRow ──────────────────────────────────────────────────────────────────
function RaidRow(props) {
  var raid = props.raid, onTogChange = props.onTogChange;
  var exp_s = useState(props.defaultExpanded || false);
  var expanded = exp_s[0], setExpanded = exp_s[1];
  var tog_s = useState({ shiny: false, iv100: false, lucky2: false, xxs: false, xxl: false, lucky: false });
  var tog = tog_s[0], setTog = tog_s[1];
  var cnt_s = useState({ stat: 0, shiny: 0, iv100: 0, lucky: 0 });
  var cnt = cnt_s[0], setCnt = cnt_s[1];

  function flip(k) {
    setTog(function (t) { var n = Object.assign({}, t); n[k] = !t[k]; if (onTogChange) onTogChange(raid.id, n); return n; });
  }
  function inc(k) {
    setCnt(function (c) { var n = Object.assign({}, c); n[k] = c[k] + 1; return n; });
  }
  function dec(k) {
    setCnt(function (c) { var n = Object.assign({}, c); n[k] = Math.max(0, c[k] - 1); return n; });
  }

  var statKeys = [
    { k: "stat", icon: "📊", color: "rgba(100,160,255,0.25)", border: "rgba(100,160,255,0.5)" },
    { k: "shiny", icon: "✨", color: "rgba(255,220,80,0.25)", border: "rgba(255,220,80,0.5)" },
    { k: "iv100", icon: "💯", color: "rgba(255,80,80,0.25)", border: "rgba(255,80,80,0.5)" },
    { k: "lucky", icon: "🌄", color: "rgba(100,200,120,0.25)", border: "rgba(100,200,120,0.5)" },
  ];
  var lightColors = ["ELECTRIC", "ICE", "GRASS", "STEEL", "NORMAL", "ROCK"];

  return (
    <div style={{ marginBottom: 10, borderRadius: 16, border: "1px solid rgba(255,255,255,0.07)", overflow: "hidden", backgroundColor: raid.bg }}>
      <div
        style={{ display: "grid", gridTemplateColumns: "60px auto 1fr auto", alignItems: "center", gap: "0 12px", padding: "14px", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
        onClick={function () { setExpanded(function (e) { return !e; }); }}
      >
        <img
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + raid.sprite + ".png"}
          alt={raid.nameEN}
          style={{ width: 56, height: 56, objectFit: "contain", filter: raid.shadow ? "drop-shadow(0 0 6px #c000ff) brightness(0.85)" : "none" }}
          onError={function (e) { e.target.style.opacity = 0.15; }}
        />
        <div style={{ display: "flex", flexDirection: "column", gap: 5, alignItems: "flex-start" }}>
          <div style={{ color: "#fff", fontSize: 13, fontWeight: 800, borderRadius: 6, padding: "2px 5px", whiteSpace: "nowrap", background: "rgba(255,255,255,0.08)", minWidth: 58, textAlign: "center", fontFamily: "'Share Tech Mono',monospace" }}>{raid.cp1}</div>
          <div style={{ color: "#ffd700", fontSize: 13, fontWeight: 800, borderRadius: 6, padding: "2px 5px", whiteSpace: "nowrap", background: "rgba(255,215,0,0.1)", minWidth: 58, textAlign: "center", fontFamily: "'Share Tech Mono',monospace" }}>{raid.cp2}</div>
        </div>
        <div>
          <div style={{ color: "#fff", fontSize: 16, fontWeight: 800, lineHeight: 1.2, whiteSpace: "pre-line" }}>{raid.nameCN}</div>
          <div style={{ color: "#aaa", fontSize: 11, lineHeight: 1, margin: "3px 0 5px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{raid.nameEN}</div>
          <div style={{ display: "flex", gap: 4, flexWrap: "nowrap" }}>{raid.types.map(function (t) { return <TypeBadge key={t} type={t} />; })}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }} onClick={function (e) { e.stopPropagation(); }}>
          <div style={{ display: "flex", gap: 5, alignItems: "center" }}>
            <IconBtn active={tog.shiny || cnt.shiny > 0} label="色違" onClick={function () { flip("shiny"); }}>✨</IconBtn>
            <IconBtn active={tog.iv100 || cnt.iv100 > 0} label="IV100" onClick={function () { flip("iv100"); }}>💯</IconBtn>
            <IconBtn active={tog.lucky2 || cnt.lucky > 0} label="幸運" onClick={function () { flip("lucky2"); }}>🌄</IconBtn>
          </div>
          <div style={{ display: "flex", gap: 5 }}>
            <LabelBtn active={tog.xxs} onClick={function () { flip("xxs"); }} label="XXS" />
            <LabelBtn active={tog.xxl} onClick={function () { flip("xxl"); }} label="XXL" />
            <LabelBtn active={tog.lucky} onClick={function () { flip("lucky"); }} label="LUCKY" />
          </div>
        </div>
      </div>
      {expanded ? (
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", padding: "12px 14px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "60px auto 1fr auto", gap: "0 12px" }}>
            <div />
            <div style={{ gridColumn: "2 / -1", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4, flexWrap: "nowrap", overflow: "hidden" }}>
                <span style={{ fontSize: 11, color: "#aaa", fontWeight: 700, flexShrink: 0 }}>弱點</span>
                <div style={{ display: "flex", gap: 3, flexWrap: "nowrap", overflow: "hidden" }}>
                  {raid.weaknesses.map(function (w) {
                    return (
                      <span key={w} style={{ background: weaknessColors[w] || "#888", color: lightColors.indexOf(w) >= 0 ? "#000" : "#fff", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4, whiteSpace: "nowrap", flexShrink: 0 }}>{w}</span>
                    );
                  })}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#888" }}>{"異色比例  " + (cnt.stat > 0 ? Math.round((cnt.shiny / cnt.stat) * 100) + "%" : "—")}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 6 }}>
                {statKeys.map(function (s) {
                  var active = s.k !== "stat" && cnt[s.k] > 0;
                  return (
                    <div
                      key={s.k}
                      style={{ position: "relative", background: active ? s.color : "rgba(255,255,255,0.07)", borderRadius: 10, padding: "8px 6px", textAlign: "center", border: "1px solid " + (active ? s.border : "transparent"), transition: "all 0.2s", overflow: "hidden", cursor: "pointer", userSelect: "none", WebkitTapHighlightColor: "transparent" }}
                      onClick={function (e) {
                        e.stopPropagation();
                        var rect = e.currentTarget.getBoundingClientRect();
                        if (e.clientX - rect.left < rect.width / 2) { dec(s.k); } else { inc(s.k); }
                      }}
                    >
                      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, opacity: 0.15, pointerEvents: "none" }}>{s.icon}</div>
                      <div style={{ position: "relative", fontSize: 20, fontWeight: 700, color: "#fff" }}>{cnt[s.k]}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

// ── UnownCard ────────────────────────────────────────────────────────────────
function UnownCard(props) {
  var mon = props.mon, onUnownChange = props.onUnownChange, inline = props.inline;
  var exp_s = useState(false);
  var expanded = exp_s[0], setExpanded = exp_s[1];
  var leftForms = ["A","B","C","D","E","F","G","H","I","J","K","L","M","!"];
  var rightForms = ["N","O","P","Q","R","S","T","U","V","W","X","Y","Z","?"];
  var allForms = leftForms.concat(rightForms);
  var tog_s = useState(function () {
    var init = {};
    allForms.forEach(function (f) { init[f] = { got: false, shiny: false, lucky: false, xxs: false, xxl: false }; });
    return init;
  });
  var tog = tog_s[0], setTog = tog_s[1];

  function flip(form, k) {
    setTog(function (t) {
      var nf = Object.assign({}, t[form]); nf[k] = !nf[k];
      var nn = Object.assign({}, t); nn[form] = nf;
      if (onUnownChange) onUnownChange(nn);
      return nn;
    });
  }

  var caughtCount = allForms.filter(function (f) { return Object.values(tog[f]).some(Boolean); }).length;
  var shinyCount = allForms.filter(function (f) { return tog[f].shiny; }).length;
  var hl = HIGHLIGHT[mon.bg] || { bg: "rgba(255,255,255,0.22)", border: "rgba(255,255,255,0.4)", text: "#fff" };
  var isLight = !!hl.light;
  var textPrimary = hl.cardText || "#fff";
  var textSecondary = isLight ? hl.cardSubText : "#666";
  var cardBorder = isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.08)";
  var btnInactiveBg = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  var btnInactiveColor = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)";
  var btnInactiveBorder = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";
  var btnCfg = [
    { k: "got",   lbl: "☐", activeLbl: "☑", fs: 16, noFilter: true },
    { k: "shiny", lbl: "✨",    fs: 18 },
    { k: "lucky", lbl: "Lucky", fs: 8  },
    { k: "xxs",   lbl: "XXS",   fs: 11 },
    { k: "xxl",   lbl: "XXL",   fs: 11 },
  ];

  function unownSpriteSrc(form) {
    var name = form === "!" ? "exclamation" : form === "?" ? "question" : form.toLowerCase();
    return "/unown/" + name + ".png";
  }

  function FormRow(rowProps) {
    var form = rowProps.form, t = tog[form], anyActive = Object.values(t).some(Boolean);
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "stretch", gap: 3, marginBottom: 10, width: "100%", height: 53 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: anyActive ? hl.text : (isLight ? "rgba(0,0,0,0.3)" : "#aaa"), fontSize: 20, fontWeight: 700, width: 28 }}>
          {form === "!" ? "！" : form === "?" ? "？" : form}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <img
            src={unownSpriteSrc(form)}
            alt={"Unown " + form}
            style={{ width: 53, height: 53, objectFit: "contain", imageRendering: "pixelated" }}
            onError={function (e) { e.target.style.visibility = "hidden"; }}
          />
        </div>
        {btnCfg.map(function (cfg) {
          return (
            <button
              key={cfg.k}
              onClick={function () { flip(form, cfg.k); }}
              aria-label={cfg.k}
              style={{ width: 44, height: "100%", padding: 0, borderRadius: 4, fontSize: cfg.fs, fontWeight: 800, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", background: t[cfg.k] ? hl.bg : btnInactiveBg, color: t[cfg.k] ? hl.text : btnInactiveColor, border: "1px solid " + (t[cfg.k] ? hl.border : btnInactiveBorder), filter: (t[cfg.k] || cfg.noFilter) ? "none" : "grayscale(1) brightness(1.8)", transition: "all 0.15s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
            >
              {t[cfg.k] && cfg.activeLbl ? cfg.activeLbl : cfg.lbl}
            </button>
          );
        })}
      </div>
    );
  }

  var carouselRef = useRef(null);
  var sg_s = useState(0); var selectedGroup = sg_s[0], setSelectedGroup = sg_s[1];
  var groups = [
    { label: "A B C D E F G", forms: ["A","B","C","D","E","F","G"] },
    { label: "H I J K L M N", forms: ["H","I","J","K","L","M","N"] },
    { label: "O P Q R S T U", forms: ["O","P","Q","R","S","T","U"] },
    { label: "V W X Y Z ! ?", forms: ["V","W","X","Y","Z","!","?"] },
  ];
  function scrollToGroup(i) {
    setSelectedGroup(i);
    if (carouselRef.current) {
      carouselRef.current.scrollTo({ left: carouselRef.current.offsetWidth * i, behavior: "smooth" });
    }
  }
  function onCarouselScroll(e) {
    var idx = Math.round(e.target.scrollLeft / e.target.offsetWidth);
    setSelectedGroup(idx);
  }

  if (inline) {
    return (
      <div style={{ background: mon.bg, borderRadius: 16, overflow: "hidden" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderBottom: cardBorder }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: textPrimary, fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{mon.nameCN}</div>
            <div style={{ color: textSecondary, fontSize: 10, lineHeight: 1, marginBottom: 5 }}>{mon.nameEN}</div>
            <div style={{ display: "flex", gap: 3 }}><TypeBadge type={mon.types[0]} /></div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 3, flexShrink: 0 }}>
            <span style={{ color: isLight ? "rgba(0,0,0,0.4)" : "#888", fontSize: 12 }}>已捕捉 <span style={{ color: textPrimary, fontWeight: 700 }}>{caughtCount}</span> / {mon.total} 種</span>
            <span style={{ color: isLight ? "rgba(0,0,0,0.4)" : "#888", fontSize: 12 }}>✨ 已捕捉 <span style={{ color: textPrimary, fontWeight: 700 }}>{shinyCount}</span> / {mon.total} 種</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 0, margin: "10px 12px 0", background: isLight ? "rgba(0,0,0,0.07)" : "rgba(255,255,255,0.07)", borderRadius: 100, padding: 4 }}>
          {groups.map(function (g, i) {
            var active = selectedGroup === i;
            return (
              <button key={i} onClick={function () { scrollToGroup(i); }} style={{ flex: 1, borderRadius: 100, border: "none", background: active ? (isLight ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.2)") : "transparent", color: active ? textPrimary : (isLight ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)"), fontSize: 10, fontWeight: 700, padding: "5px 2px", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", transition: "all 0.2s", fontFamily: "'Share Tech Mono',monospace", whiteSpace: "nowrap" }}>
                {g.label}
              </button>
            );
          })}
        </div>
        <div ref={carouselRef} className="strip-hide-sb" onScroll={onCarouselScroll} style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", WebkitOverflowScrolling: "touch", paddingTop: 10, paddingBottom: 6 }}>
          {groups.map(function (g, gi) {
            return (
              <div key={gi} style={{ flexShrink: 0, width: "100%", scrollSnapAlign: "start", paddingLeft: 12, paddingRight: 12, boxSizing: "border-box" }}>
                {g.forms.map(function (f) { return <FormRow key={f} form={f} />; })}
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 6, padding: "2px 0 12px" }}>
          {groups.map(function (_, i) {
            var active = selectedGroup === i;
            return (
              <div key={i} onClick={function () { scrollToGroup(i); }} style={{ width: active ? 16 : 6, height: 6, borderRadius: 3, background: active ? hl.border : (isLight ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.25)"), transition: "all 0.2s", cursor: "pointer" }} />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div>
      {expanded ? (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 100 }} onClick={function () { setExpanded(false); }}>
          <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.6)" }} />
          <div style={{ position: "relative", zIndex: 1, maxWidth: 440, width: "calc(100% - 40px)", margin: "16px auto", background: "#10234a", borderRadius: 16, overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }} onClick={function (e) { e.stopPropagation(); }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span style={{ color: "#fff", fontSize: 15, fontWeight: 700 }}>{mon.nameCN}</span>
                <TypeBadge type={mon.types[0]} />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ color: "#888", fontSize: 12 }}>已捕捉 <span style={{ color: "#fff", fontWeight: 700 }}>{caughtCount}</span> / {mon.total} 種</span>
                <button onClick={function () { setExpanded(false); }} aria-label="關閉" style={{ background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 13, touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}>✕</button>
              </div>
            </div>
            <div style={{ padding: "10px 8px", maxHeight: "70vh", overflowY: "auto", display: "flex", justifyContent: "center" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 8px", width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{leftForms.map(function (f) { return <FormRow key={f} form={f} />; })}</div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>{rightForms.map(function (f) { return <FormRow key={f} form={f} />; })}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
      <div style={{ background: mon.bg, borderRadius: 12, border: "1px solid rgba(255,255,255,0.08)", height: 80, boxSizing: "border-box" }}>
        <div
          style={{ padding: "8px 10px", display: "flex", justifyContent: "space-between", alignItems: "center", height: "100%", boxSizing: "border-box", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}
          onClick={function () { setExpanded(function (e) { return !e; }); }}
        >
          <div>
            <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 2 }}>
              <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>{mon.nameCN}</span>
              <TypeBadge type={mon.types[0]} />
            </div>
            <div style={{ color: "#aaa", fontSize: 10, lineHeight: 1, marginBottom: 3 }}>{mon.nameEN}</div>
            <div style={{ color: "#888", fontSize: 10 }}>已捕捉 <span style={{ color: "#fff", fontWeight: 700 }}>{caughtCount}</span> / {mon.total} 種</div>
          </div>
          <span style={{ color: "#666", fontSize: 14 }}>▼</span>
        </div>
      </div>
    </div>
  );
}

// ── WildCard ─────────────────────────────────────────────────────────────────
function GenderName(props) {
  var name = props.name;
  if (name[0] !== '♂' && name[0] !== '♀') return name;
  return (
    <span>
      <span style={{ display: "inline-block", verticalAlign: "middle", lineHeight: 1, fontSize: "0.9em" }}>{name[0]}</span>
      {name.slice(1)}
    </span>
  );
}

function WildCard(props) {
  var mon = props.mon, onTogChange = props.onTogChange, fullWidth = props.fullWidth;
  var tog_s = useState({ shiny: false, lucky: false, xxs: false, xxl: false });
  var tog = tog_s[0], setTog = tog_s[1];

  function flip(k) {
    setTog(function (t) { var n = Object.assign({}, t); n[k] = !t[k]; if (onTogChange) onTogChange(mon.id, n); return n; });
  }
  var hl = HIGHLIGHT[mon.bg] || { bg: "rgba(255,255,255,0.22)", border: "rgba(255,255,255,0.4)", text: "#fff" };
  var isLight = !!hl.light;
  var textPrimary = hl.cardText || "#fff";
  var textSecondary = isLight ? hl.cardSubText : "#666";
  var cardBorder = isLight ? "1px solid rgba(0,0,0,0.08)" : "1px solid rgba(255,255,255,0.07)";
  var btnInactiveBg = isLight ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.08)";
  var btnInactiveColor = isLight ? "rgba(0,0,0,0.35)" : "rgba(255,255,255,0.35)";
  var btnInactiveBorder = isLight ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)";

  function tagBtn(k, lbl, fixedWidth) {
    var active = tog[k];
    return (
      <button key={k} onClick={function () { flip(k); }} aria-label={k} style={{ width: fixedWidth ? 44 : undefined, flex: fixedWidth ? undefined : 1, height: 36, padding: 0, borderRadius: 6, fontSize: 10, fontWeight: 700, cursor: "pointer", background: active ? hl.bg : btnInactiveBg, color: active ? hl.text : btnInactiveColor, border: "1px solid " + (active ? hl.border : btnInactiveBorder), filter: active ? "none" : "grayscale(1) brightness(1.8)", transition: "all 0.15s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>
        {lbl}
      </button>
    );
  }

  if (fullWidth) {
    return (
      <div style={{ background: mon.bg, borderRadius: 12, padding: "10px 12px", border: cardBorder, display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ color: textPrimary, fontSize: 13, fontWeight: 700, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}><GenderName name={mon.nameCN} /></div>
          <div style={{ color: textSecondary, fontSize: 10, lineHeight: 1, marginBottom: 5 }}>{mon.nameEN}</div>
          <div style={{ display: "flex", gap: 3, flexWrap: "wrap" }}>{mon.types.map(function (t) { return <TypeBadge key={t} type={t} />; })}</div>
        </div>
        <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
          {[["shiny", "✨"], ["lucky", "Lucky"], ["xxs", "XXS"], ["xxl", "XXL"]].map(function (p) { return tagBtn(p[0], p[1], true); })}
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: mon.bg, borderRadius: 12, padding: "8px 10px", border: cardBorder, height: 96, boxSizing: "border-box", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 2 }}>
        <span style={{ color: textPrimary, fontSize: 13, fontWeight: 700, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", flex: 1, marginRight: 4 }}><GenderName name={mon.nameCN} /></span>
        <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>{mon.types.map(function (t) { return <TypeBadge key={t} type={t} />; })}</div>
      </div>
      <div style={{ color: textSecondary, fontSize: 10, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", lineHeight: 1, marginBottom: 4 }}>{mon.nameEN}</div>
      <div style={{ display: "flex", gap: 4 }}>
        {[["shiny", "✨"], ["lucky", "Lucky"], ["xxs", "XXS"], ["xxl", "XXL"]].map(function (p) { return tagBtn(p[0], p[1], false); })}
      </div>
    </div>
  );
}

// ── PackCard ─────────────────────────────────────────────────────────────────
function PackCard(props) {
  var name = props.name, price = props.price, details = props.details, active = props.active, onToggle = props.onToggle, extra = props.extra;
  var dc = name === "團戰加值包" ? "#7ecfff" : name === "孵蛋加值包" ? "#7ac74c" : "#ccc";
  return (
    <button onClick={onToggle} style={{ width: "100%", textAlign: "left", cursor: "pointer", WebkitTapHighlightColor: "transparent", background: active ? "rgba(255,215,0,0.1)" : "rgba(255,255,255,0.06)", borderRadius: 12, marginBottom: 10, border: "1px solid " + (active ? "rgba(255,215,0,0.4)" : "rgba(255,255,255,0.08)"), padding: "12px 14px", transition: "all 0.15s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
        <span style={{ color: "#1a1a2a", fontSize: 15, fontWeight: 800 }}>{name}</span>
        <span style={{ color: "#888", fontSize: 15, fontWeight: 800 }}>{price}</span>
      </div>
      <ul style={{ margin: 0, paddingLeft: 0, listStyle: "none", fontSize: 14, lineHeight: 1.4 }}>
        {details.map(function (p, i) {
          return (
            <li key={i} style={{ paddingLeft: 12, position: "relative", color: dc }}>
              <span style={{ position: "absolute", left: 0, opacity: 0.5 }}>·</span>{p}
            </li>
          );
        })}
      </ul>
      {extra ? <div style={{ marginTop: 8 }}>{extra}</div> : null}
    </button>
  );
}

// ── EventInfo ────────────────────────────────────────────────────────────────
function EventInfo() {
  var ps = useState(""); var parkSession = ps[0], setParkSession = ps[1];
  var cd = useState({}); var cityDays = cd[0], setCityDays = cd[1];
  var rp = useState(false); var raidPack = rp[0], setRaidPack = rp[1];
  var ep = useState(false); var eggPack = ep[0], setEggPack = ep[1];

  var parkDay = parkSession ? parkSession.split(" ")[0] : null;
  var parkCityTime = parkSession ? (parkSession.includes("10:00") ? "15-20:00" : "10-15:00") : null;
  var availableDays = allDays.filter(function (d) { return d !== parkDay; });
  function toggleCity(d) { setCityDays(function (p) { var n = Object.assign({}, p); n[d] = !p[d]; return n; }); }
  var selectedCityDays = availableDays.filter(function (d) { return cityDays[d]; });
  var hasSelection = parkSession || selectedCityDays.length > 0 || raidPack || eggPack;
  var total = (parkSession ? 4000 : 0) + selectedCityDays.length * 3000 + (raidPack ? 2000 : 0) + (eggPack ? 2000 : 0);

  var breakdown = [].concat(
    parkSession ? [{ label: "公園遊記  " + parkSession, amount: 4000 }] : [],
    selectedCityDays.length > 0 ? [{ label: "城市遊記 x " + selectedCityDays.length + "  ( " + selectedCityDays.join(", ") + " 10:00 - 20:00 )", amount: selectedCityDays.length * 3000 }] : [],
    raidPack ? [{ label: "團戰加值包（適用 5/25 - 6/1 於東京市區遊玩）", amount: 2000 }] : [],
    eggPack ? [{ label: "孵蛋加值包（適用 5/25 - 6/1 於東京市區遊玩）", amount: 2000 }] : []
  );

  return (
    <div>
      <div style={CARD}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "#1a1a2a", fontSize: 15, fontWeight: 800 }}>公園遊記（主票券）</span>
        </div>
        <select value={parkSession} onChange={function (e) { setParkSession(e.target.value); }} style={{ background: "rgba(0,0,0,0.06)", border: "1px solid rgba(0,0,0,0.15)", borderRadius: 8, padding: "5px 8px", fontSize: 12, fontWeight: 700, color: parkSession ? "#b8860b" : "rgba(0,0,0,0.45)", cursor: "pointer", outline: "none", width: "100%", WebkitAppearance: "none", appearance: "none" }}>
          <option value="" style={{ background: "#1a1a2a", color: "#aaa" }}>選擇場次…</option>
          {parkSessions.map(function (s) { return <option key={s} value={s} style={{ background: "#1a1a2a", color: "#fff" }}>{s}</option>; })}
        </select>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "12px 0 8px" }}>
          <span style={{ color: "#1a1a2a", fontSize: 15, fontWeight: 800 }}>城市遊記（街上樂遊加值包）</span>
          {parkDay ? <span style={{ color: "#888", fontSize: 11 }}>{parkDay} 城市遊記 {parkCityTime} 已包含在主票券內</span> : null}
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {availableDays.map(function (d) {
            return (
              <button key={d} onClick={function () { toggleCity(d); }} style={{ flex: 1, padding: "12px 0", borderRadius: 8, fontSize: 12, fontWeight: 700, cursor: "pointer", background: cityDays[d] ? "rgba(255,215,0,0.2)" : "rgba(0,0,0,0.06)", color: cityDays[d] ? "#b8860b" : "rgba(0,0,0,0.5)", border: "1px solid " + (cityDays[d] ? "rgba(184,134,11,0.5)" : "rgba(0,0,0,0.15)"), transition: "all 0.15s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation" }}>{d}</button>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <PackCard name="團戰加值包" price="¥2,000" details={raidPackDetails} active={raidPack} onToggle={function () { setRaidPack(function (v) { return !v; }); }} extra={
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/ticket.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="ticket" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>9 → 18<br />daily</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <span style={{ color: "#888", fontSize: 13, fontWeight: 700, lineHeight: "32px" }}>XP</span>
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>+5,000<br />per raid</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/candy.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="candy" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>+6<br />per raid</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/candy.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="candy" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>+3 XL<br />per raid</span>
                </div>
              </div>
            } />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <PackCard name="孵蛋加值包" price="¥2,000" details={eggPackDetails} active={eggPack} onToggle={function () { setEggPack(function (v) { return !v; }); }} extra={
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/hatch.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="hatch" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>1/2 → 1/4<br />distance</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <span style={{ color: "#888", fontSize: 13, fontWeight: 700, lineHeight: "32px" }}>XP</span>
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>x1.5 → x3<br />per egg hatched</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/candy.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="candy" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>x1.5 → x3<br />per egg hatched</span>
                </div>
                <div style={{ background: "rgba(0,0,0,0.06)", borderRadius: 8, border: "1px solid rgba(0,0,0,0.1)", padding: "10px 8px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                  <img src="/icons/dust.svg" style={{ width: 32, height: 32, objectFit: "contain" }} alt="dust" />
                  <span style={{ color: "#555", fontSize: 11, textAlign: "center" }}>x1.5 → x3<br />per egg hatched</span>
                </div>
              </div>
            } />
          </div>
        </div>
        {hasSelection ? (
          <div style={{ marginTop: 12, borderTop: "1px solid rgba(0,0,0,0.1)", paddingTop: 10 }}>
            <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 6 }}>
              <span style={{ color: "#ffd700", fontSize: 15, fontWeight: 800 }}>{"¥" + total.toLocaleString()}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
              {breakdown.map(function (item) {
                return (
                  <div key={item.label} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ color: "#aaa", fontSize: 11 }}>{item.label}</span>
                    <span style={{ color: "#ffd700", fontSize: 11, fontWeight: 700 }}>{"¥" + item.amount.toLocaleString()}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
        <span style={{ fontSize: 18 }}>🎟</span>
        <span style={{ color: "#1a1a2a", fontSize: 15, fontWeight: 700 }}>票種</span>
      </div>
      <div style={CARD}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "#1a1a2a", fontSize: 17, fontWeight: 800 }}>公園遊記</span>
          <span style={{ color: "#888", fontSize: 15, fontWeight: 800 }}>¥4,000</span>
        </div>
        <PerkList perks={parkPerks} />
      </div>
      <div style={CARD}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ color: "#1a1a2a", fontSize: 17, fontWeight: 800 }}>城市遊記</span>
          <span style={{ color: "#888", fontSize: 15, fontWeight: 800 }}>¥3,000</span>
        </div>
        <div style={{ color: "#888", fontSize: 12, margin: "8px 0 2px", textAlign: "right" }}>
          以下內容適用於所選日期{" "}
          <span style={{ color: selectedCityDays.length > 0 ? "#ffd700" : "#888" }}>10:00 - 20:00</span>
        </div>
        <PerkList perks={cityPerks} />
      </div>
    </div>
  );
}

// ── TutCarousel ───────────────────────────────────────────────────────────────
function TutCarousel(props) {
  var images = props.images;
  var idx_s = useState(0); var idx = idx_s[0], setIdx = idx_s[1];

  function onScroll(e) {
    var w = e.target.offsetWidth;
    setIdx(Math.round(e.target.scrollLeft / w));
  }

  return (
    <div style={{ marginBottom: 10 }}>
      <div
        onScroll={onScroll}
        className="strip-hide-sb"
        style={{ display: "flex", overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", borderRadius: 10, gap: 0 }}
      >
        {images.map(function (item, i) {
          return (
            <div key={i} style={{ flexShrink: 0, width: "100%", scrollSnapAlign: "start", borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.06)", aspectRatio: "16/9", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {item.src ? <img src={item.src} style={{ width: "100%", height: "100%", objectFit: "contain" }} alt={"step " + (i + 1)} /> : <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 12 }}>Image {i + 1}</span>}
            </div>
          );
        })}
      </div>
      {images.length > 1 && (
        <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 8 }}>
          {images.map(function (_, i) {
            return <div key={i} style={{ width: i === idx ? 14 : 6, height: 6, borderRadius: 3, background: i === idx ? "#7ecfff" : "rgba(255,255,255,0.25)", transition: "all 0.2s" }} />;
          })}
        </div>
      )}
      {images[idx] && images[idx].desc ? (
        <div style={{ color: "#ccc", fontSize: 13, lineHeight: 1.5, marginTop: 8, textAlign: "center" }}>{images[idx].desc}</div>
      ) : null}
    </div>
  );
}

// ── TutorialModal ─────────────────────────────────────────────────────────────
function TutorialModal(props) {
  var onClose = props.onClose;
  var sections = [
    {
      title: "團體戰計數器",
      images: [
        { src: "/tut-1.png", desc: "每個團體戰寶可夢的卡片都可以展開" },
        { src: "/tut-2.png", desc: "展開後有計數器" },
        { src: "/tut-3.png", desc: "點擊計數格左 / 右半 → 數字 -1 / +1" },
        { src: "/tut-4.png", desc: "當捕捉總數不為 0，異色比例會自動計算，並同步顯示在卡片收合狀態欄位。" },
      ],
      items: [],
      extra: { rows: [
        [
          { icon: "📊", text: "捕捉總數" },
          { icon: "✨", text: "異色" },
          { icon: "💯", text: "完美" },
          { icon: "🌄", text: "背卡" },
        ],
        [
          { icon: "LUCKY", text: "亮晶晶寶可夢", small: true },
        ],
      ]},
    },
    {
      title: "匯出 Infographic",
      items: [
        { icon: "↑", text: "（建置中）右上角黃色按鈕，將成果儲存為圖片收藏", small: true },
      ],
    },
  ];

  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, zIndex: 200 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.65)" }} />
      <div
        style={{ position: "relative", zIndex: 1, maxWidth: 440, width: "calc(100% - 40px)", margin: "16px auto", background: "#10234a", borderRadius: 20, overflow: "hidden", boxShadow: "0 8px 40px rgba(0,0,0,0.7)", border: "1px solid rgba(255,255,255,0.1)" }}
        onClick={function (e) { e.stopPropagation(); }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 18px", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>
          <div>
            <div style={{ color: "#fff", fontSize: 16, fontWeight: 800 }}>使用說明</div>
            <div style={{ color: "#fff", fontSize: 11, marginTop: 2 }}>Pokémon Catch Ledger · GO Fest 2026</div>
          </div>
          <button onClick={onClose} aria-label="關閉" style={{ background: "rgba(255,255,255,0.08)", border: "none", color: "#aaa", borderRadius: 8, padding: "10px 14px", cursor: "pointer", fontSize: 14, touchAction: "manipulation", WebkitTapHighlightColor: "transparent" }}>✕</button>
        </div>
        <div style={{ padding: "12px 18px 20px", maxHeight: "72vh", overflowY: "auto" }}>
          {sections.map(function (sec) {
            return (
              <div key={sec.title} style={{ marginBottom: 18 }}>
                <div style={{ color: "#ffd700", fontSize: 11, fontWeight: 800, letterSpacing: 1, marginBottom: 8, textTransform: "uppercase" }}>{sec.title}</div>
                {sec.images && <TutCarousel images={sec.images} />}
                {sec.inline ? (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {sec.items.map(function (item) {
                      return (
                        <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "5px 10px" }}>
                          <span style={{ fontSize: item.small ? 10 : 15, fontWeight: 900, color: "#fff" }}>{item.icon}</span>
                          <span style={{ color: "#ccc", fontSize: 12, lineHeight: 1.3 }}>{item.text}</span>
                        </div>
                      );
                    })}
                  </div>
                ) : sec.items.map(function (item) {
                  return (
                    <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 12, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                      <span style={{ flexShrink: 0, width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: item.small ? 10 : 16, fontWeight: 900, color: "#fff" }}>{item.icon}</span>
                      <span style={{ color: "#ccc", fontSize: 13, lineHeight: 1.4 }}>{item.text}</span>
                    </div>
                  );
                })}
                {sec.extra && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 10 }}>
                    {sec.extra.rows.map(function (row, ri) {
                      return (
                        <div key={ri} style={{ display: "flex", gap: 6 }}>
                          {row.map(function (item) {
                            return (
                              <div key={item.text} style={{ display: "flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "5px 10px", flex: 1 }}>
                                <span style={{ fontSize: item.small ? 10 : 15, fontWeight: 900, color: "#fff" }}>{item.icon}</span>
                                <span style={{ color: "#ccc", fontSize: 12, lineHeight: 1.3 }}>{item.text}</span>
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── InstallModal ──────────────────────────────────────────────────────────────
function InstallModal(props) {
  var pl_s=useState("iphone"); var platform=pl_s[0],setPlatform=pl_s[1];
  var isAndroid=platform==="android";

  var ShareIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px -1px"}}><path d="M12 16 L12 4 M8 8 L12 4 L16 8" stroke="#ddd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 12 L4 12 L4 22 L20 22 L20 12 L16 12" stroke="#ddd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
  var IosAddIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px -1px"}}><rect x="3" y="3" width="18" height="18" rx="4" stroke="#ddd" strokeWidth="2"/><path d="M12 8 L12 16 M8 12 L16 12" stroke="#ddd" strokeWidth="2" strokeLinecap="round"/></svg>;
  var AndroidAddIcon = <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{display:"inline-block",verticalAlign:"middle",margin:"0 2px -1px"}}><path d="M12 3 L12 13 M8 9 L12 13 L16 9" stroke="#ddd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 11 L4 11 L4 21 L20 21 L20 11 L16 11" stroke="#ddd" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/></svg>;

  var steps=isAndroid
    ? [
        {n:1,text:"Chrome 網址右側 ⋮"},
        {n:2,text:<span>{AndroidAddIcon} 加到主畫面</span>},
      ]
    : [
        {n:1,text:<span>Safari 網址右側 ⋯ → {ShareIcon} 分享</span>},
        {n:2,text:<span>點擊右下角「檢視較多」→ {IosAddIcon} 加入主畫面</span>},
      ];

  var tabBtn=function(active,onClick,children){
    return (
      <button onClick={onClick} style={{flex:1,padding:"10px 0",borderRadius:10,border:"none",fontSize:13,fontWeight:700,cursor:"pointer",background:active?"#fff":"rgba(255,255,255,0.07)",color:active?"#111":"rgba(255,255,255,0.45)",transition:"all 0.15s",WebkitTapHighlightColor:"transparent"}}>
        {children}
      </button>
    );
  };

  return (
    <div style={{position:"fixed",inset:0,zIndex:200,display:"flex",flexDirection:"column",justifyContent:"flex-end"}} onClick={props.onClose}>
      <div style={{position:"absolute",inset:0,background:"rgba(0,0,0,0.55)"}}/>
      <div style={{position:"relative",zIndex:1,background:"#1c1f2a",borderRadius:"24px 24px 0 0",padding:"24px 20px 40px",maxWidth:480,width:"100%",margin:"0 auto",boxShadow:"0 -8px 40px rgba(0,0,0,0.6)"}} onClick={function(e){e.stopPropagation();}}>
        <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:20}}>
          <div style={{display:"flex",alignItems:"center",gap:12}}>
            <img src="/icon.jpg" alt="GOft26" style={{width:48,height:48,borderRadius:12,objectFit:"cover"}}/>
            <div>
              <div style={{color:"#fff",fontSize:16,fontWeight:800}}>加入主畫面</div>
              <div style={{color:"#aaa",fontSize:12}}>享受像原生 App 的流暢體驗！</div>
            </div>
          </div>
          <button onClick={props.onClose} style={{background:"rgba(255,255,255,0.1)",border:"none",color:"#aaa",borderRadius:50,width:28,height:28,cursor:"pointer",fontSize:14,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
        </div>
        <div style={{display:"flex",gap:6,background:"rgba(255,255,255,0.06)",borderRadius:12,padding:5,marginBottom:20}}>
          {tabBtn(!isAndroid,function(){setPlatform("iphone");},"📱 iOS → Safari")}
          {tabBtn(isAndroid,function(){setPlatform("android");},"🤖 Android → Chrome")}
        </div>
        <div style={{background:"rgba(255,255,255,0.06)",borderRadius:12,padding:"12px 14px",marginBottom:24,display:"flex",flexDirection:"column",gap:12}}>
          {steps.map(function(s){
            return (
              <div key={s.n} style={{display:"flex",alignItems:"center",gap:14}}>
                <div style={{flexShrink:0,width:28,height:28,borderRadius:50,background:"rgba(255,255,255,0.07)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:14,fontWeight:800,color:"rgba(255,255,255,0.45)"}}>{s.n}</div>
                <div style={{color:"#ddd",fontSize:14,lineHeight:1.5}}>{s.text}</div>
              </div>
            );
          })}
        </div>
        <button onClick={props.onClose} style={{width:"100%",padding:"10px 0",borderRadius:14,border:"none",background:"#fff",color:"#111",fontSize:16,fontWeight:800,cursor:"pointer",WebkitTapHighlightColor:"transparent",display:"block"}}>
          我知道了
        </button>
      </div>
    </div>
  );
}

var tabs = ["團體戰", "限定調查", "捕捉紀錄", "活動資訊"];

export default function App() {
  var tab_s = useState(0); var tab = tab_s[0], setTab = tab_s[1];
  var rt_s = useState({}); var raidTogs = rt_s[0], setRaidTogs = rt_s[1];
  var wt_s = useState({}); var wildTogs = wt_s[0], setWildTogs = wt_s[1];
  var ut_s = useState(function () {
    var init = {};
    UNOWN_FORMS.forEach(function (f) { init[f] = { got: false, shiny: false, lucky: false, xxs: false, xxl: false }; });
    return init;
  });
  var unownTog = ut_s[0], setUnownTog = ut_s[1];
  var sv_s = useState(false); var saved = sv_s[0], setSaved = sv_s[1];
  var tu_s = useState(false); var tutOpen = tu_s[0], setTutOpen = tu_s[1];
  var rs_s = useState(normalRaids[0].id); var selectedRaid = rs_s[0], setSelectedRaid = rs_s[1];
  var lt_s = useState(0); var selectedLimitedTab = lt_s[0], setSelectedLimitedTab = lt_s[1];
  var wt_tab_s = useState(0); var selectedWildTab = wt_tab_s[0], setSelectedWildTab = wt_tab_s[1];
  var in_s = useState(function () { return !localStorage.getItem("installShown"); });
  var installOpen = in_s[0], setInstallOpen = in_s[1];

  function closeInstall() { localStorage.setItem("installShown", "1"); setInstallOpen(false); }

  function exportCard() {
    drawCard(raidTogs, wildTogs, unownTog, function (canvas) {
      try {
        var a = document.createElement("a");
        a.href = canvas.toDataURL("image/png");
        a.download = "pokemon-catch-ledger.png";
        a.click();
      } catch (e) {
        var win = window.open();
        win.document.write('<img src="' + canvas.toDataURL("image/png") + '" style="max-width:100%">');
      }
      setSaved(true);
      setTimeout(function () { setSaved(false); }, 2000);
    });
  }

  return (
    <div style={{ background: "#EEF2F8", minHeight: "100vh", color: "#1a1a2e", fontFamily: "'Chakra Petch','Noto Sans TC',sans-serif", maxWidth: 480, margin: "0 auto", boxSizing: "border-box" }}>
      {installOpen ? <InstallModal onClose={closeInstall} /> : null}
      {saved ? (
        <div style={{ position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.5)", color: "#ffd700", fontSize: 13, fontWeight: 700, padding: "8px 20px", borderRadius: 12, zIndex: 999, fontFamily: "'Share Tech Mono',monospace", letterSpacing: 1 }}>
          Image saved!
        </div>
      ) : null}

      {tutOpen ? <TutorialModal onClose={function () { setTutOpen(false); }} /> : null}

      {/* ── 深色 Header（sticky，只含標題）── */}
      <div style={{ position: "sticky", top: 0, zIndex: 40, background: "#10234a", padding: "16px 20px 14px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ textAlign: "left", flex: 1 }}>
            <div style={{ fontSize: 18, fontWeight: 400, letterSpacing: 2, fontFamily: "'Russo One',sans-serif", textTransform: "uppercase", textShadow: "0 0 18px rgba(126,207,255,0.45)", color: "#E2E8F0" }}>Pokémon Catch Ledger</div>
            <div style={{ color: "#7ecfff", fontSize: 11, marginTop: 2, letterSpacing: 1.5, fontFamily: "'Share Tech Mono',monospace", textTransform: "uppercase" }}>2026 GO FEST 🇯🇵TOKYO, by mktbch</div>
          </div>
          <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <button onClick={function () { setTutOpen(true); }} aria-label="使用說明" style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.08)", border: "none", color: "#7ecfff", fontSize: 18, fontWeight: 900, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", transition: "all 0.15s", flexShrink: 0 }}>?</button>
            <button onClick={exportCard} aria-label="匯出 Infographic" style={{ width: 44, height: 44, borderRadius: 12, border: "none", background: "rgba(255,215,0,0.1)", cursor: "pointer", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, padding: 0 }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 16 L12 4 M8 8 L12 4 L16 8" stroke="#ffd700" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12 L4 12 L4 22 L20 22 L20 12 L16 12" stroke="#ffd700" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>{/* end sticky header */}

      {/* ── 淺色 Content ── */}
      <div style={{ padding: "16px 20px 72px" }}>

      <div className="strip-hide-sb" style={{ display: "flex", overflowX: "auto", gap: 0, marginBottom: 16, borderRadius: 100, padding: "4px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
        {tabs.map(function (t, i) {
          var active = tab === i;
          var nextActive = tab === i + 1;
          var showDivider = i < tabs.length - 1 && !active && !nextActive;
          return [
            <button key={t} onClick={function () { setTab(i); }} aria-label={t} style={{ flexShrink: 0, flex: 1, padding: "5px 10px", border: "none", borderRadius: 100, fontWeight: 700, fontSize: 18, cursor: "pointer", background: active ? "rgba(0,0,0,0.18)" : "transparent", color: active ? "#10234a" : "rgba(0,0,0,0.45)", transition: "background 0.2s, color 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", fontFamily: "'Chakra Petch',sans-serif", letterSpacing: 0.3, whiteSpace: "nowrap" }}>
              {t}
            </button>,
            showDivider ? <div key={"divider-" + i} style={{ width: 1, height: 7, background: "rgba(0,0,0,0.22)", alignSelf: "center", flexShrink: 0 }} /> : null
          ];
        })}
      </div>

      {tab === 0 ? (
        <div>
          <div style={{ padding: "0 2px", marginBottom: 10, fontSize: 13, lineHeight: 1.5, color: "#444" }}>
            <div style={{ color: "#f95587", fontWeight: 700, marginBottom: 6 }}>極致超級團體戰：超級超夢 X、超級超夢 Y 首度登場！</div>
            <p style={{ marginBottom: 6 }}>公園體驗最後 30 分鐘會出現新道館，讓超過一千名訓練家一同挑戰！</p>
            <p style={{ marginBottom: 8 }}>捕捉到的超夢：一般招式「反擊」+ 特殊招式「精神擊破」+ 東京背卡 + 超級等級 1 🍀運氣好的話可能是超級等級 2 或 3</p>
            <p style={{ color: "#aaa" }}>⚠️ 超級超夢X、超級超夢Y 超級能量不共用，需分開累積。</p>
          </div>
          <RaidRow raid={normalRaids[4]} onTogChange={function (id, t) { setRaidTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} />
          <div style={{ display: "flex", gap: 0, margin: "14px 0", background: "#fff", borderRadius: 100, padding: "4px" }}>
            {(function () {
              var raids = normalRaids.filter(function (r) { return r.id !== 5; });
              return raids.map(function (r, i) {
                var active = selectedRaid === r.id;
                var nextActive = i < raids.length - 1 && selectedRaid === raids[i + 1].id;
                var showDivider = i < raids.length - 1 && !active && !nextActive;
                var label = r.nameCN.replace(/\n/g, " ").replace("原始蓋歐卡", "蓋歐卡").replace("原始固拉多", "固拉多").replace("帕底亞 肯泰羅(水瀾)", "肯泰羅");
                return [
                  <button key={r.id} onClick={function () { setSelectedRaid(r.id); }} style={{ flex: 1, padding: "7px 4px", border: "none", borderRadius: 100, background: active ? "#fbcb57" : "transparent", color: active ? "#10234a" : "rgba(0,0,0,0.45)", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "'Chakra Petch',sans-serif", transition: "background 0.2s, color 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {label}
                  </button>,
                  showDivider ? <div key={"d-" + i} style={{ width: 1, height: 7, background: "rgba(0,0,0,0.22)", alignSelf: "center", flexShrink: 0 }} /> : null
                ];
              });
            })()}
          </div>
          {normalRaids.filter(function (r) { return r.id !== 5; }).map(function (r) {
            var shadow = shadowRaids.find(function (s) { return s.sprite === r.sprite; });
            return (
              <div key={r.id} style={{ display: selectedRaid === r.id ? "block" : "none" }}>
                <RaidRow raid={r} defaultExpanded={r.id === 6} onTogChange={function (id, t) { setRaidTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} />
                {shadow ? <RaidRow raid={shadow} onTogChange={function (id, t) { setRaidTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} /> : null}
              </div>
            );
          })}
        </div>
      ) : null}
      {tab === 1 ? (
        <div>
          <div style={{ display: "flex", gap: 0, marginBottom: 14, background: "#fff", borderRadius: 100, padding: "4px" }}>
            {["公園遊記", "城市遊記 / 人孔蓋"].map(function (name, i) {
              var active = selectedLimitedTab === i;
              return (
                <button key={name} onClick={function () { setSelectedLimitedTab(i); }} style={{ flex: 1, padding: "5px 10px", border: "none", borderRadius: 100, fontWeight: 700, fontSize: 12, cursor: "pointer", background: active ? "#fbcb57" : "transparent", color: active ? "#111" : "rgba(0,0,0,0.45)", transition: "background 0.2s, color 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", fontFamily: "'Chakra Petch',sans-serif", whiteSpace: "nowrap" }}>
                  {name}
                </button>
              );
            })}
          </div>
          {selectedLimitedTab === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 700, paddingLeft: 2, paddingBottom: 2 }}>公園遊記</div>
              <div style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                <span style={{ color: "#10234a", fontSize: 15, fontWeight: 700 }}>捷拉奧拉調查</span>
              </div>
              {[
                { name: "齊力區域", desc: "透過完成團體戰，瞭解更多關於各個小隊的資訊。" },
                { name: "驚奇區域", desc: "近距離邂逅各種不同種類、樣子與尺寸的寶可夢，已記錄於 Pokémon GO 圖鑑的寶可夢也可能會在這裡出現。" },
                { name: "探索區域", desc: "透過特別的活動主題田野調查、特殊活動主題蛋以及孵化器效果加成，鑽研寶可夢的奧秘。跟著熱衷於研究寶可夢且樂於分享的人們，與寶可夢成為最佳拍檔。" },
                { name: "GO 火箭隊的秘密基地", desc: "參與 GO 火箭隊對戰與暗影團體戰，協助布蘭雪和叡智隊奪回「Pokémon GO Fest」的主導權。" },
              ].map(function (item) {
                return (
                  <div key={item.name} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ color: "#10234a", fontSize: 15, fontWeight: 700, marginBottom: item.desc ? 6 : 0 }}>{item.name}</div>
                    {item.desc ? <div style={{ color: "#666", fontSize: 12, lineHeight: 1.6 }}>{item.desc}</div> : null}
                  </div>
                );
              })}
            </div>
          ) : null}
          {selectedLimitedTab === 1 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 700, paddingLeft: 2 }}>城市遊記</div>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 700, paddingLeft: 2 }}>Stamp Rally</div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, paddingLeft: 2 }}>Enter Minato City, Koto City, or Shinagawa City to get a stamp sheet that will also show the locations of the PokéStops.</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {[1, 2, 3, 4].map(function (n) {
                  return (
                    <div key={n} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)", minHeight: 80, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ color: "#ccc", fontSize: 12 }}>Placeholder {n}</span>
                    </div>
                  );
                })}
              </div>
              <div style={{ fontSize: 12, color: "#555", lineHeight: 1.7, paddingLeft: 2, marginBottom: 4 }}>
                <p style={{ marginBottom: 8 }}>在全城市遊戲體驗的第一天獲得四個限時調查，每個限時調查都以四個城市區域中的其中一個為主題。在同一個 GO Fest 舉辦城市參與複數天數活動的訓練家，僅能獲得一份「訓練家挑戰」限時調查（包含加碼限時調查）及獎勵。</p>
                <p style={{ marginBottom: 4 }}>・探索至少兩個城市區域、完成限時調查 → 遊戲內的「Pokémon GO 專家獎牌」。</p>
                <p>・完成至少兩項訓練家挑戰 → 加碼限時調查。調查中可選擇遇見已解鎖第一個超級等級的超級超夢 X 或超級超夢 Y。</p>
              </div>
              {["城市限時調查 1", "城市限時調查 2", "城市限時調查 3", "城市限時調查 4"].map(function (name) {
                return (
                  <div key={name} style={{ background: "#fff", borderRadius: 12, padding: "14px 16px", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
                    <div style={{ color: "#10234a", fontSize: 15, fontWeight: 700 }}>{name}</div>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {tab === 2 ? (
        <div>
          <div className="strip-hide-sb" style={{ display: "flex", overflowX: "auto", gap: 0, marginBottom: 14, background: "#fff", borderRadius: 100, padding: "4px", WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}>
            {["扮裝", "活動焦點", "未知圖騰", "其他"].map(function (name, i) {
              var active = selectedWildTab === i;
              var nextActive = selectedWildTab === i + 1;
              var showDivider = i < 3 && !active && !nextActive;
              return [
                <button key={name} onClick={function () { setSelectedWildTab(i); }} style={{ flexShrink: 0, flex: 1, padding: "5px 10px", border: "none", borderRadius: 100, fontWeight: 700, fontSize: 12, cursor: "pointer", background: active ? "#fbcb57" : "transparent", color: active ? "#111" : "rgba(0,0,0,0.45)", transition: "background 0.2s, color 0.2s", WebkitTapHighlightColor: "transparent", touchAction: "manipulation", fontFamily: "'Chakra Petch',sans-serif", whiteSpace: "nowrap" }}>
                  {name}
                </button>,
                showDivider ? <div key={"d-" + i} style={{ width: 1, height: 7, background: "rgba(0,0,0,0.22)", alignSelf: "center", flexShrink: 0 }} /> : null
              ];
            })}
          </div>
          {selectedWildTab === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {wildPokemon.filter(function (m) { return [101, 102, 118, 119].indexOf(m.id) >= 0; }).map(function (m) {
                return <WildCard key={m.id} mon={m} fullWidth onTogChange={function (id, t) { setWildTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} />;
              })}
            </div>
          ) : null}
          {selectedWildTab === 1 ? (
            <div>
              <div style={{ fontSize: 12, color: "#666", marginBottom: 10, paddingLeft: 2 }}>包含遊戲中初登場、地區限定野外出沒</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {wildPokemon.filter(function (m) { return [106, 103, 110, 104].indexOf(m.id) >= 0; }).map(function (m) {
                  return <WildCard key={m.id} mon={m} fullWidth onTogChange={function (id, t) { setWildTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} />;
                })}
              </div>
            </div>
          ) : null}
          {selectedWildTab === 2 ? (
            <div>
              {wildPokemon.filter(function (m) { return m.special; }).map(function (m) {
                return <UnownCard key={m.id} mon={m} inline onUnownChange={setUnownTog} />;
              })}
            </div>
          ) : null}
          {selectedWildTab === 3 ? (
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {wildPokemon.filter(function (m) { return [107, 108, 109, 114, 111, 116, 112, 115, 117, 113].indexOf(m.id) >= 0; }).map(function (m) {
                return <WildCard key={m.id} mon={m} onTogChange={function (id, t) { setWildTogs(function (p) { var n = Object.assign({}, p); n[id] = t; return n; }); }} />;
              })}
            </div>
          ) : null}
        </div>
      ) : null}
      {tab === 3 ? <EventInfo /> : null}

      </div>{/* end content */}

      <div style={{ position: "fixed", bottom: 0, left: "50%", transform: "translateX(-50%)", width: "100%", maxWidth: 480, textAlign: "center", padding: "10px 20px 14px", background: "linear-gradient(to bottom, transparent, #EEF2F8 40%)", zIndex: 10, pointerEvents: "none" }}>
        <div style={{ color: "#999", fontSize: 11, lineHeight: 1 }}>Powered by mktbch @Threads • GO trainer &amp; independent creator</div>
        <div style={{ color: "#999", fontSize: 10, lineHeight: 1, marginTop: 2 }}>內容如有出入，以來源 pokemon.com/gofest/tokyo 為主</div>
      </div>

    </div>
  );
}
