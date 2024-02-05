import { Map } from "@maptiler/sdk";

export const COLOR_RAMP_CLASS = "maplibregl-ctrl-color-ramp";
export default class colorRampLegendControl {
  public _options;
  public _container = document.createElement("div");
  public _map: any;
  public _desc: any;
  public _canvas: any;

  constructor(options: any) {
    this._options = { ...options };
    this._container.classList.add(COLOR_RAMP_CLASS);
  }
  onAdd(map: Map) {
    this._map = map;
    const colorramp = this._options.colorRamp;
    const canvas = colorramp.getCanvasStrip();
    canvas.style.height = "30px";
    canvas.style.width = "300px";
    canvas.style.marginLeft = "30px";
    canvas.style.marginBottom = "30px";
    canvas.style.border = "1px dashed #00000059";

    const getColorRamp = () => {
      const maxLength = 9;
      const bounds = colorramp.getBounds();
      const boundRange = bounds.max - bounds.min;
      const boundValue = boundRange / maxLength;
      const result = [];
      for (let i = 0; i < maxLength; i++) {
        const value = !i
          ? bounds.min
          : i === maxLength - 1
          ? bounds.max
          : Math.round(bounds.min + i * boundValue);
        result.push({ value });
      }
      return result;
    };

    const colors = colorramp.length <= 9 ? colorramp : getColorRamp();

    const desc = document.createElement("div");
    colors.forEach((el: any) => {
      const span = document.createElement("span");
      span.innerHTML = el.value;
      desc.appendChild(span);
    });

    desc.style.display = "flex";
    desc.style.marginLeft = "30px";

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
