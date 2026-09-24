(function () {
  "use strict";

  var CONTACT = {
    firstName: "Antonio",
    lastName: "Lo Riso",
    org: "Immerso Live",
    title: "CTO & Founder",
    phone: "+34605357287",
    email: "info@immerso.live",
    urls: [
      "https://immerso.live",
      "https://immerso.live/studio",
      "https://proposal.immerso.live/",
      "https://proposal.immerso.live/hoteles"
    ],
    linkedin: "https://www.linkedin.com/in/antonio-lo-riso-14154a12a/"
  };

  function buildVCard(c) {
    var lines = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      "N:" + c.lastName + ";" + c.firstName + ";;;",
      "FN:" + c.firstName + " " + c.lastName,
      "ORG:" + c.org,
      "TITLE:" + c.title,
      "TEL;TYPE=CELL,VOICE:" + c.phone,
      "EMAIL;TYPE=INTERNET,WORK:" + c.email
    ];
    c.urls.forEach(function (u) { lines.push("URL:" + u); });
    lines.push("URL;TYPE=LinkedIn:" + c.linkedin);
    lines.push("NOTE:Tarjeta digital de Immerso Live");
    lines.push("END:VCARD");
    return lines.join("\r\n");
  }

  function setupSaveContact() {
    var btn = document.getElementById("saveContactBtn");
    if (!btn) return;
    var vcard = buildVCard(CONTACT);
    var blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    btn.setAttribute("href", url);
  }

  function setupQr() {
    var el = document.getElementById("qrcode");
    if (!el || typeof qrcode === "undefined") return;
    var target = window.location.href.split("#")[0].split("?")[0];
    var qr = qrcode(0, "M");
    qr.addData(target);
    qr.make();
    el.innerHTML = qr.createSvgTag(4, 4, "Código QR de la tarjeta de Antonio Lo Riso", "Escanea para abrir esta tarjeta");
  }

  function setupParticles() {
    var canvas = document.getElementById("particles");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var DPR = Math.min(window.devicePixelRatio || 1, 2);
    var width, height, points;
    var LINK_DIST = 130;
    var COLORS = ["0, 229, 255", "20, 184, 166"];

    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * DPR;
      canvas.height = height * DPR;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      var count = Math.round(Math.min(width, 900) / 22);
      points = [];
      for (var i = 0; i < count; i++) {
        points.push({
          x: Math.random() * width,
          y: Math.random() * height * 0.75,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          c: COLORS[i % COLORS.length]
        });
      }
    }

    function step() {
      ctx.clearRect(0, 0, width, height);

      for (var i = 0; i < points.length; i++) {
        var p = points[i];
        if (!reduceMotion) {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height * 0.75) p.vy *= -1;
        }
      }

      for (var a = 0; a < points.length; a++) {
        for (var b = a + 1; b < points.length; b++) {
          var dx = points[a].x - points[b].x;
          var dy = points[a].y - points[b].y;
          var dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            ctx.strokeStyle = "rgba(" + points[a].c + ", " + (0.18 * (1 - dist / LINK_DIST)) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(points[a].x, points[a].y);
            ctx.lineTo(points[b].x, points[b].y);
            ctx.stroke();
          }
        }
      }

      for (var j = 0; j < points.length; j++) {
        var pt = points[j];
        ctx.fillStyle = "rgba(" + pt.c + ", 0.55)";
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      if (!reduceMotion) requestAnimationFrame(step);
    }

    resize();
    step();
    window.addEventListener("resize", resize);
  }

  document.addEventListener("DOMContentLoaded", function () {
    setupSaveContact();
    setupQr();
    setupParticles();
  });
})();
