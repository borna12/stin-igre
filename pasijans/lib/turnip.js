/*
  Lokalna, samostalna zamjena za dio Turnip biblioteke koji ova igra koristi.
  Pruža globalni `inputData` i `generateForm(defs, container)` za generiranje
  postavki (klizači i preklopnici), bez vanjskih ovisnosti.

  Podržani tipovi unosa:
    ["slider",  name, label, default, min, max, step, callback]
    ["boolean", name, label, default, [v1,label1, v2,label2, ...], callback]
    grupa: [ ["slider",...], ["boolean","", [value,label]] ]   // gumb postavlja klizač
*/
var inputData = {};

(function () {
  function fireChange() {
    document.body.dispatchEvent(new Event("inputchange"));
  }

  function makeLabel(text) {
    var l = document.createElement("div");
    l.className = "lbl";
    l.textContent = text;
    return l;
  }

  function makeSlider(def, parent) {
    var name = def[1], label = def[2], defVal = def[3],
        min = def[4], max = def[5], step = def[6], cb = def[7];

    var item = document.createElement("div");
    item.className = "inputitem";
    item.setAttribute("type", "slider");
    if (label) item.appendChild(makeLabel(label));

    var box = document.createElement("div"); box.className = "sliderbox";
    var bar = document.createElement("div"); bar.className = "sliderbar";
    var nub = document.createElement("div"); nub.className = "slidernub";
    bar.appendChild(nub); box.appendChild(bar); item.appendChild(box);

    var txt = document.createElement("input");
    txt.className = "slidertext"; txt.type = "number";
    txt.min = min; txt.max = max; txt.step = step;
    item.appendChild(txt);

    var obj = { name: name, value: defVal, getValue: function () { return this.value; }, changeCallback: cb };

    function clamp(v) {
      if (isNaN(v)) v = defVal;
      v = Math.round((v - min) / step) * step + min;
      v = Math.max(min, Math.min(max, v));
      return Math.round(v * 1e6) / 1e6;
    }
    function setVal(v, fire) {
      obj.value = clamp(v);
      var pct = (max === min) ? 0 : (obj.value - min) / (max - min);
      nub.style.left = (pct * 100) + "%";
      if (document.activeElement !== txt) txt.value = obj.value;
      if (fire) { if (cb) cb(obj); fireChange(); }
    }
    obj._setVal = setVal;

    function valFromX(clientX) {
      var r = bar.getBoundingClientRect();
      var pct = (clientX - r.left) / r.width;
      pct = Math.max(0, Math.min(1, pct));
      return min + pct * (max - min);
    }
    var dragging = false;
    function down(e) { dragging = true; mv(e); e.preventDefault(); }
    function mv(e) { if (!dragging) return; var x = e.touches ? e.touches[0].clientX : e.clientX; setVal(valFromX(x), true); }
    function up() { dragging = false; }
    bar.addEventListener("mousedown", down);
    document.addEventListener("mousemove", mv);
    document.addEventListener("mouseup", up);
    bar.addEventListener("touchstart", down, { passive: false });
    document.addEventListener("touchmove", mv, { passive: false });
    document.addEventListener("touchend", up);
    txt.addEventListener("change", function () { setVal(parseFloat(txt.value), true); });

    setVal(defVal, false);
    parent.appendChild(item);
    if (name) inputData[name] = obj;
    return obj;
  }

  function makeToggle(def, parent) {
    var name = def[1] || "";
    var label = (typeof def[2] === "string") ? def[2] : "";
    var defVal = (typeof def[3] !== "undefined" && !Array.isArray(def[3]) && typeof def[3] !== "function") ? def[3] : undefined;
    var opts = null, cb = null;
    for (var i = 2; i < def.length; i++) {
      if (Array.isArray(def[i]) && !opts) opts = def[i];
      else if (typeof def[i] === "function") cb = def[i];
    }
    opts = opts || [];

    var pairs = [];
    for (var j = 0; j + 1 < opts.length; j += 2) pairs.push([opts[j], opts[j + 1]]);
    if (!pairs.length && opts.length >= 2) pairs.push([opts[0], opts[1]]);
    if (defVal === undefined && pairs.length) defVal = pairs[0][0];

    var item = document.createElement("div");
    item.className = "inputitem";
    item.setAttribute("type", "radio");
    if (label) item.appendChild(makeLabel(label));
    var bar = document.createElement("div"); bar.className = "togglebar"; item.appendChild(bar);

    var obj = { name: name, value: defVal, getValue: function () { return this.value; }, changeCallback: cb };

    function select(v, fire) {
      obj.value = v;
      var ch = bar.children;
      for (var k = 0; k < ch.length; k++) ch[k].classList.toggle("selected", pairs[k][0] === v);
      if (fire) { if (cb) cb(obj); fireChange(); }
    }
    obj._select = select;

    pairs.forEach(function (p) {
      var d = document.createElement("div");
      d.className = "toggleitem";
      d.textContent = p[1];
      d.addEventListener("click", function () { select(p[0], true); });
      bar.appendChild(d);
    });
    select(defVal, false);

    parent.appendChild(item);
    if (name) inputData[name] = obj;
    return obj;
  }

  function makeItem(def, parent) {
    return def[0] === "slider" ? makeSlider(def, parent) : makeToggle(def, parent);
  }

  window.generateForm = function (defs, container) {
    container.innerHTML = "";
    defs.forEach(function (def) {
      if (Array.isArray(def[0])) {
        // grupa: klizač + akcijski gumb koji postavlja klizač na zadanu vrijednost
        var group = document.createElement("div");
        group.className = "inputitem";
        var sliderObj = null;
        def.forEach(function (item) {
          if (item[0] === "slider") {
            sliderObj = makeSlider(item, group);
          } else {
            var o = null;
            for (var i = 2; i < item.length; i++) if (Array.isArray(item[i])) { o = item[i]; break; }
            o = o || item[2] || [];
            var target = o[0], lbl = o[1];
            var bdiv = document.createElement("div");
            bdiv.className = "inputitem"; bdiv.setAttribute("type", "radio");
            var bbar = document.createElement("div"); bbar.className = "togglebar";
            var b = document.createElement("div"); b.className = "toggleitem"; b.textContent = lbl;
            b.addEventListener("click", function () { if (sliderObj && sliderObj._setVal) sliderObj._setVal(target, true); });
            bbar.appendChild(b); bdiv.appendChild(bbar); group.appendChild(bdiv);
          }
        });
        container.appendChild(group);
      } else {
        makeItem(def, container);
      }
    });
  };
})();
