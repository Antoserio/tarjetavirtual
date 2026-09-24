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

  document.addEventListener("DOMContentLoaded", function () {
    setupSaveContact();
    setupQr();
  });
})();
