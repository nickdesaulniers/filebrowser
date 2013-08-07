window.addEventListener("DOMContentLoaded", function () {
  var sdcard = navigator.getDeviceStorage("sdcard");
  var left = document.getElementById("left");
  var right = document.getElementById("right");
  var odd = true;

  var onclick = function (file) {
    alert("opening a " + file.type);
    new MozActivity({
      name: "open",
      data: {
        type: "audio/mpeg",
        blob: file,
      }
    });
  };

  var cursor = sdcard.enumerate();
  cursor.onsuccess = function () {
    var filename, p, svg, div, col;

    if (this.result) {
      filename = this.result.name;

      if (filename[0] !== ".") {
        div = document.createElement("div");
        div.classList.add("listing");
        div.onclick = onclick.bind(null, this.result);

        svg = document.createElement("img");
        svg.src = "icons/audio-mpeg.svg";
        svg.width = "32";
        svg.height = "32";
        div.appendChild(svg);

        p = document.createElement("p");
        p.textContent = filename;
        div.appendChild(p);

        // assignment intentional
        col = ((odd = !odd) ? left : right);
        col.appendChild(div);
      }

      this.continue();
    }
  };

  cursor.onerror = function () {
    alert(this.error);
  };
});

