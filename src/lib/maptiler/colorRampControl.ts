import { Map } from "@maptiler/sdk";

export default class colorRampLegendControl {
  public _options;
  public _container = document.createElement("div");
  public _map: any;
  public _desc: any;
  public _canvas: any;

  constructor(options: any) {
    this._options = { ...options };
    this._container.classList.add("maplibregl-ctrl");
    this._container.classList.add("maplibregl-ctrl-color-ramp");
  }
  onAdd(map: Map) {
    this._map = map;
    const colorramp = this._options.colorRamp;
    const canvas = colorramp.getCanvasStrip();
    canvas.style.height = "30px";
    canvas.style.width = "500px";
    canvas.style.border = "1px dashed #00000059";

    const bounds = colorramp.getBounds();

    const desc = document.createElement("div");
    for (let i = 0; i < colorramp.length; i++) {
      const value = colorramp[i]?.value;

      const span = document.createElement("span");
      span.innerHTML = value;
      desc.appendChild(span);
    }

    desc.style.display = "flex";
    desc.style.justifyContent = "space-between";

    desc.classList.add("color-ramp-label");
    this._container.appendChild(desc);
    this._container.appendChild(canvas);

    return this._container;
  }
  onRemove() {
    if (!this._map || !this._container) {
      return;
    }
    if (this._container.parentNode)
      this._container.parentNode.removeChild(this._container);
    this._map = undefined;
    delete this._map;
  }
}
