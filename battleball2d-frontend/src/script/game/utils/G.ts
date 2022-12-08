import {TypePosition} from "../types";

class G {
  static context: CanvasRenderingContext2D;

  static Rectangle(config: TypeRectangle) {
    const {x, y, lx, ly, color} = config;
    const c = G.context;

    c.fillStyle = color || "#888";
    c.fillRect(x, y, lx, ly);
  }

  static Circle(config: TypeCircle) {
    const {x, y, radius, color} = config;
    const c = G.context;

    c.fillStyle = color || "#fff";
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2);
    c.fill();
  }

  static ClipCircle(config: TypeClipCircle) {
    const {x, y, radius, image} = config;
    const c = G.context;

    c.save();
    c.beginPath();
    c.arc(x, y, radius, 0, Math.PI * 2);
    c.clip();
    c.drawImage(image, x - radius, y - radius, radius * 2, radius * 2);
    c.restore();
  }

  static Triangle(config: TypeTriangle) {
    const {x, y, ld, lh, color} = config;
    const c = G.context;
    const [x0, y0, x1, y1, x2, y2] = [
      x - ld / 2, y,
      x + ld / 2, y,
      x, y + lh
    ];
    c.beginPath();
    c.moveTo(x0, y0);
    c.lineTo(x1, y1);
    c.lineTo(x2, y2);
    c.fillStyle = color || "#fff";
    c.fill();
  }

  static randomPicUrl() {
    const randomHex = () => {
      return new Array(6)
        .fill("0")
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    };
    return `https://sdfsdf.dev/500x500.png,${randomHex()},${randomHex()}`;
  }
}

type TypeRectangle = TypePosition & {
  lx: number
  ly: number
  color?: string
};

type TypeCircle = TypePosition & {
  radius: number
  color?: string
};

type TypeClipCircle = TypePosition & {
  radius: number
  image: HTMLImageElement
};

type TypeTriangle = TypePosition & {
  ld: number
  lh: number
  color?: string
};

export default G;