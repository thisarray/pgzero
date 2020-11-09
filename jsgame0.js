/*
 * The humble Rect class, the heart of the implementation.
 */
class Rect {
  constructor() {
    let x, y, width, height;
    if (arguments.length < 1) {
      // If there are not enough arguments
      throw new Error('Not enough arguments.');
    }
    else if (arguments.length < 2) {
      if (typeof arguments[0] !== 'object') {
        throw new Error('Not enough arguments.');
      }
      if (Array.isArray(arguments[0])) {
        [x=0, y=0, width=0, height=0] = arguments[0];
      }
      else {
        ({x=0, y=0, width=0, height=0} = arguments[0]);
      }
    }
    else if (arguments.length < 4) {
      if ((typeof arguments[0] !== 'object') || (typeof arguments[1] !== 'object')) {
        throw new Error('Not enough arguments.');
      }
      if (Array.isArray(arguments[0])) {
        [x=0, y=0] = arguments[0];
      }
      else {
        ({x=0, y=0} = arguments[0]);
      }
      if (Array.isArray(arguments[1])) {
        [width=0, height=0] = arguments[1];
      }
      else {
        ({width=0, height=0} = arguments[1]);
      }
    }
    else {
      [x=0, y=0, width=0, height=0] = arguments;
    }

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }

  get top() {
    return this.y;
  }
  set top(top) {
    this.y = top;
  }
  get left() {
    return this.x;
  }
  set left(left) {
    this.x = left;
  }
  get right() {
    return this.x + this.width;
  }
  set right(right) {
    this.x = right - this.width;
  }
  get bottom() {
    return this.y + this.height;
  }
  set bottom(bottom) {
    this.y = bottom - this.height;
  }
  get centerx() {
    return this.x + Math.floor(this.width / 2);
  }
  set centerx(centerx) {
    this.x = centerx - Math.floor(this.width / 2);
  }
  get centery() {
    return this.y + Math.floor(this.height / 2);
  }
  set centery(centery) {
    this.y = centery - Math.floor(this.height / 2);
  }
  get topleft() {
    let tuple = [this.x, this.y];
    return tuple;
  }
  set topleft(topleft) {
    let [x=0, y=0] = topleft;
    this.x = x;
    this.y = y;
  }
  get topright() {
    let tuple = [this.x + this.width, this.y];
    return tuple;
  }
  set topright(topright) {
    let [x=0, y=0] = topright;
    this.x = x - this.width;
    this.y = y;
  }
  get bottomleft() {
    let tuple = [this.x, this.y + this.height];
    return tuple;
  }
  set bottomleft(bottomleft) {
    let [x=0, y=0] = bottomleft;
    this.x = x;
    this.y = y - this.height;
  }
  get bottomright() {
    let tuple = [this.x + this.width, this.y + this.height];
    return tuple;
  }
  set bottomright(bottomright) {
    let [x=0, y=0] = bottomright;
    this.x = x - this.width;
    this.y = y - this.height;
  }
  get midtop() {
    let tuple = [this.x + Math.floor(this.width / 2), this.y];
    return tuple;
  }
  set midtop(midtop) {
    let [x=0, y=0] = midtop;
    this.x = x - Math.floor(this.width / 2);
    this.y = y;
  }
  get midleft() {
    let tuple = [this.x, this.y + Math.floor(this.height / 2)];
    return tuple;
  }
  set midleft(midleft) {
    let [x=0, y=0] = midleft;
    this.x = x;
    this.y = y - Math.floor(this.height / 2);
  }
  get midbottom() {
    let tuple = [this.x + Math.floor(this.width / 2), this.y + this.height];
    return tuple;
  }
  set midbottom(midbottom) {
    let [x=0, y=0] = midbottom;
    this.x = x - Math.floor(this.width / 2);
    this.y = y - this.height;
  }
  get midright() {
    let tuple = [this.x + this.width, this.y + Math.floor(this.height / 2)];
    return tuple;
  }
  set midright(midright) {
    let [x=0, y=0] = midright;
    this.x = x - this.width;
    this.y = y - Math.floor(this.height / 2);
  }
  get center() {
    let tuple = [this.x + Math.floor(this.width / 2), this.y + Math.floor(this.height / 2)];
    return tuple;
  }
  set center(center) {
    let [x=0, y=0] = center;
    this.x = x - Math.floor(this.width / 2);
    this.y = y - Math.floor(this.height / 2);
  }
  get size() {
    let tuple = [this.width, this.height];
    return tuple;
  }
  set size(size) {
    let [w=0, h=0] = size;
    this.width = w;
    this.height = h;
  }
  move(dx, dy) {
    return new Rect(this.x + dx, this.y + dy, this.width, this.height);
  }
  move_ip(dx, dy) {
    this.x = this.x + dx;
    this.y = this.y + dy;
  }
  inflate(dx, dy) {
    return new Rect(this.x - Math.floor(dx / 2), this.y - Math.floor(dy / 2), this.width + dx, this.height + dy);
  }
  inflate_ip(dx, dy) {
    this.x = this.x - Math.floor(dx / 2);
    this.y = this.y - Math.floor(dy / 2);
    this.width = this.width + dx;
    this.height = this.height + dy;
  }
  clamp() {
    let rect = new Rect(...arguments), x, y;

    if (this.width >= rect.width) {
      x = rect.x + Math.floor(rect.width / 2) - Math.floor(this.width / 2);
    }
    else if (this.x < rect.x) {
      x = rect.x;
    }
    else if ((this.x + this.width) > (rect.x + rect.width)) {
      x = rect.x + rect.width - this.width;
    }
    else {
      x = this.x;
    }

    if (this.height >= rect.height) {
      y = rect.y + Math.floor(rect.height / 2) - Math.floor(this.height / 2);
    }
    else if (this.y < rect.y) {
      y = rect.y;
    }
    else if ((this.y + this.height) > (rect.y + rect.height)) {
      y = rect.y + rect.height - this.height;
    }
    else {
      y = this.y;
    }

    return new Rect(x, y, this.width, this.height);
  }
  clamp_ip() {
    let rect = this.clamp(...arguments);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
  clip() {
    let rect = new Rect(...arguments), x, y, width, height;

    if ((this.x >= rect.x) && (this.x < (rect.x + rect.width))) {
      x = this.x;
    }
    else if ((rect.x >= this.x) && (rect.x < (this.x + this.width))) {
      x = rect.x;
    }
    else {
      // The two Rect objects do not intersect
      return new Rect(this.x, this.y, 0, 0);
    }

    if (((this.x + this.width) > rect.x) && ((this.x + this.width) <= (rect.x + rect.width))) {
      width = this.x + this.width - x;
    }
    else if (((rect.x + rect.width) > this.x) && ((rect.x + rect.width) <= (this.x + this.width))) {
      width = rect.x + rect.width - x;
    }
    else {
      // The two Rect objects do not intersect
      return new Rect(this.x, this.y, 0, 0);
    }

    if ((this.y >= rect.y) && (this.y < (rect.y + rect.height))) {
      y = this.y;
    }
    else if ((rect.y >= this.y) && (rect.y < (this.y + this.height))) {
      y = rect.y;
    }
    else {
      // The two Rect objects do not intersect
      return new Rect(this.x, this.y, 0, 0);
    }

    if (((this.y + this.height) > rect.y) && ((this.y + this.height) <= (rect.y + rect.height))) {
      height = this.y + this.height - y;
    }
    else if (((rect.y + rect.height) > this.y) && ((rect.y + rect.height) <= (this.y + this.height))) {
      height = rect.y + rect.height - y;
    }
    else {
      // The two Rect objects do not intersect
      return new Rect(this.x, this.y, 0, 0);
    }

    return new Rect(x, y, width, height);
  }
  clip_ip() {
    let rect = this.clip(...arguments);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
  union() {
    let rect = new Rect(...arguments),
        x = Math.min(this.x, rect.x),
        y = Math.min(this.y, rect.y),
        width = Math.max(this.x + this.width, rect.x + rect.width) - x,
        height = Math.max(this.y + this.height, rect.y + rect.height) - y;
    return new Rect(x, y, width, height);
  }
  union_ip() {
    let rect = this.union(...arguments);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
  unionall(others) {
    let xs = [this.x],
        ys = [this.y],
        widths = [this.x + this.width],
        heights = [this.y + this.height];
    for (let other of others) {
      let rect = new Rect(...[other]);
      xs.push(rect.x);
      ys.push(rect.y);
      widths.push(rect.x + rect.width);
      heights.push(rect.y + rect.height);
    }
    let x = Math.min(...xs),
        y = Math.min(...ys),
        width = Math.max(...widths) - x,
        height = Math.max(...heights) - y;
    return new Rect(x, y, width, height);
  }
  unionall_ip(others) {
    let rect = this.unionall(others);
    this.x = rect.x;
    this.y = rect.y;
    this.width = rect.width;
    this.height = rect.height;
  }
  fit() {
    let rect = new Rect(...arguments),
        ratio = Math.max(this.width / rect.width, this.height / rect.height),
        width = Math.floor(this.width / ratio),
        height = Math.floor(this.height / ratio),
        x = rect.x + Math.floor((rect.width - width) / 2),
        y = rect.y + Math.floor((rect.height - height) / 2);
    return new Rect(x, y, width, height);
  }
  normalize() {
    if (this.width < 0) {
      this.x = this.x + this.width;
      this.width = Math.abs(this.width);
    }
    if (this.height < 0) {
      this.y = this.y + this.height;
      this.height = Math.abs(this.height);
    }
  }
  contains() {
    let rect = new Rect(...arguments);
    return ((this.x <= rect.x) &&
            (this.y <= rect.y) &&
            ((this.x + this.width) >= (rect.x + rect.width)) &&
            ((this.y + this.height) >= (rect.y + rect.height)) &&
            ((this.x + this.width) > rect.x) &&
            ((this.y + this.height) > rect.y));
  }
  collidepoint() {
    let x, y;
    if (arguments.length < 1) {
      return false;
    }
    else if (arguments.length < 2) {
      if (typeof arguments[0] !== 'object') {
        return false;
      }
      if (Array.isArray(arguments[0])) {
        [x=0, y=0] = arguments[0];
      }
      else {
        ({x=0, y=0} = arguments[0]);
      }
    }
    else {
      [x=0, y=0] = arguments;
    }
    return ((this.x <= x) &&
            (x < (this.x + this.width)) &&
            (this.y <= y) &&
            (y < (this.y + this.height)));
  }
  colliderect() {
    let rect = new Rect(...arguments);
    return ((this.x < (rect.x + rect.width)) &&
            (this.y < (rect.y + rect.height)) &&
            ((this.x + this.width) > rect.x) &&
            ((this.y + this.height) > rect.y));
  }
  _collidelist(others) {
    let result = [],
        i = 0;
    for (let other of others) {
      let rect = new Rect(...[other]);
      if (this.colliderect(rect)) {
        result.push(i);
      }
      i++;
    }
    return result;
  }
  collidelist(others) {
    let result = this._collidelist(others);
    if (result.length <= 0) {
      return -1;
    }
    else {
      return result[0];
    }
  }
  collidelistall(others) {
    return this._collidelist(others);
  }
  collidedict(dict, use_values = true) {
    let result = [];
    for (let [k, v] of dict) {
      if (use_values) {
        if (this.colliderect(v)) {
          result.push(k, v);
          return result;
        }
      }
      else {
        if (this.colliderect(k)) {
          result.push(k, v);
          return result;
        }
      }
    }
    return undefined;
  }
  collidedictall(dict, use_values = true) {
    let result = [];
    for (let [k, v] of dict) {
      if (use_values) {
        if (this.colliderect(v)) {
          result.push([k, v]);
        }
      }
      else {
        if (this.colliderect(k)) {
          result.push([k, v]);
        }
      }
    }
    return result;
  }
  copy() {
    return new Rect(this.x, this.y, this.width, this.height);
  }
}
Rect.prototype.toString = function () {
  return `{x: ${ this.x }, y: ${ this.y }, width: ${ this.width }, height: ${ this.height }}`;
}

const images = (function () {
  return {
    // Uppercase method names to avoid clashing with lowercase names of resources
    LOAD(id) {
      for (let e of Array.from(document.querySelector(id).querySelectorAll('img'))) {
        let name = e.getAttribute('alt');
        this[name] = e;
      }
    }
  }
})();

const sounds = (function () {
  return {
    // Uppercase method names to avoid clashing with lowercase names of resources
    LOAD(id) {
      for (let e of Array.from(document.querySelector(id).querySelectorAll('audio'))) {
        let name = e.id;
        this[name] = e;
      }
    }
  }
})();

/*
 * The global screen object representing your game screen.
 *
 * It mimicks the Python object using Immediately Invoked Function Expression/Self-Executing Anonymous Function.
 */
const screen = (function () {
  const DEFAULT_FONT = 'sans-serif';
  const DEFAULT_FONT_SIZE = 24;
  const DEFAULT_COLOR = 'white';
  const MAX_COLOR = 255;
  const TWO_PI = Math.PI * 2;

  /*
   * Parse a color given as a string or an Array of 3 Numbers.
   */
  function parseColor(color) {
    if (typeof color === 'string') {
      if (color.length < 3) {
        return 'black';
      }
      else {
        return color;
      }
    }
    else {
      let [r=0, g=0, b=0] = color;
      r = Math.max(Math.min(r, MAX_COLOR), 0);
      g = Math.max(Math.min(g, MAX_COLOR), 0);
      b = Math.max(Math.min(b, MAX_COLOR), 0);
      return `rgb(${ r }, ${ g }, ${ b })`;
    }
  }

  let context = null,
      width = 300,
      height = 150,
      running = 0,
      start;

  /*
   * The core game loop
   */
  function loop(timestamp) {
    if (start == null) {
      // For the first run of the game loop
      start = timestamp;
    }
    const elapsed = timestamp - start;
    start = timestamp;
    window.update(elapsed);
    window.draw();
    running = window.requestAnimationFrame(loop);
  }

  return {
    draw: {
      line(start, end, color, width = 1) {
        if (context == null) {
          return;
        }
        context.save();
        context.lineWidth = width;
        context.strokeStyle = parseColor(color);

        let x1, y1, x2, y2;
        [x1=0, y1=0] = start;
        [x2=0, y2=0] = end;
        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
        context.restore();
      },
      circle(pos, radius, color, width = 1) {
        if (context == null) {
          return;
        }
        context.save();
        context.lineWidth = width;
        context.strokeStyle = parseColor(color);

        let [x=0, y=0] = pos;
        context.beginPath();
        context.arc(x, y, radius, 0, TWO_PI, false);
        context.stroke();
        context.restore();
      },
      filled_circle(pos, radius, color) {
        if (context == null) {
          return;
        }
        context.save();
        context.fillStyle = parseColor(color);

        let [x=0, y=0] = pos;
        context.beginPath();
        context.arc(x, y, radius, 0, TWO_PI, false);
        context.fill();
        context.restore();
      },
      polygon(points, color) {
        if (context == null) {
          return;
        }
        context.save();
        context.strokeStyle = parseColor(color);

        context.beginPath();
        let isFirst = true;
        for (let point of points) {
          let [x=0, y=0] = point;
          if (isFirst) {
            context.moveTo(x, y);
          }
          else {
            context.lineTo(x, y);
          }
          isFirst = false;
        }
        // Explicitly close the polygon
        context.closePath();
        context.stroke();
        context.restore();
      },
      filled_polygon(points, color) {
        if (context == null) {
          return;
        }
        context.save();
        context.fillStyle = parseColor(color);

        context.beginPath();
        let isFirst = true;
        for (let point of points) {
          let [x=0, y=0] = point;
          if (isFirst) {
            context.moveTo(x, y);
          }
          else {
            context.lineTo(x, y);
          }
          isFirst = false;
        }
        context.fill();
        context.restore();
      },
      rect(rect, color, width = 1) {
        if (!(rect instanceof Rect)) {
          throw new TypeError('rect must be a Rect.');
        }
        if (context == null) {
          return;
        }
        context.save();
        context.lineWidth = width;
        context.strokeStyle = parseColor(color);
        context.strokeRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
      },
      filled_rect(rect, color) {
        if (!(rect instanceof Rect)) {
          throw new TypeError('rect must be a Rect.');
        }
        if (context == null) {
          return;
        }
        context.save();
        context.fillStyle = parseColor(color);
        context.fillRect(rect.x, rect.y, rect.width, rect.height);
        context.restore();
      },
      text(text, config) {
        screen.draw.textbox(text, null, config);
      },
      textbox(text, rect, config) {
        if (typeof text !== 'string') {
          return;
        }
        context.save();

        let fontsize = DEFAULT_FONT_SIZE,
            fontname = DEFAULT_FONT,
            color = DEFAULT_COLOR,
            drawOutline = false,
            gcolor, x, y;

        if ('fontsize' in config) {
          fontsize = config['fontsize'];
        }
        if ('fontname' in config) {
          fontname = config['fontname'];
        }
        context.font = fontsize + 'px ' + fontname;

        context.textAlign = 'left';
        context.textBaseline = 'top';
        if ('topleft' in config) {
          [x=0, y=0] = config['topleft'];
        }
        else if ('midtop' in config) {
          [x=0, y=0] = config['midtop'];
          context.textAlign = 'center';
          context.textBaseline = 'top';
        }
        else if ('topright' in config) {
          [x=0, y=0] = config['topright'];
          context.textAlign = 'right';
          context.textBaseline = 'top';
        }
        else if ('midleft' in config) {
          [x=0, y=0] = config['midleft'];
          context.textAlign = 'left';
          context.textBaseline = 'middle';
        }
        else if ('center' in config) {
          [x=0, y=0] = config['center'];
          context.textAlign = 'center';
          context.textBaseline = 'middle';
        }
        else if ('midright' in config) {
          [x=0, y=0] = config['midright'];
          context.textAlign = 'right';
          context.textBaseline = 'middle';
        }
        else if ('bottomleft' in config) {
          [x=0, y=0] = config['bottomleft'];
          context.textAlign = 'left';
          context.textBaseline = 'bottom';
        }
        else if ('midbottom' in config) {
          [x=0, y=0] = config['midbottom'];
          context.textAlign = 'center';
          context.textBaseline = 'bottom';
        }
        else if ('bottomright' in config) {
          [x=0, y=0] = config['bottomright'];
          context.textAlign = 'right';
          context.textBaseline = 'bottom';
        }
        else if ('pos' in config) {
          [x=0, y=0] = config['pos'];
        }

        if ('color' in config) {
          color = parseColor(config['color']);
        }
        if ('gcolor' in config) {
          gcolor = parseColor(config['gcolor']);
        }
        if ('owidth' in config) {
          drawOutline = true;
          context.lineWidth = config['owidth'];
          if ('ocolor' in config) {
            context.strokeStyle = parseColor(config['ocolor']);
          }
        }
        if ('shadow' in config) {
          let [sdx=0, sdy=0] = config['shadow'];
          context.shadowOffsetX = sdx;
          context.shadowOffsetY = sdy;
          if ('scolor' in config) {
            context.shadowColor = parseColor(config['scolor']);
          }
        }

        context.fillStyle = color;
        let gradient;
        if (rect instanceof Rect) {
          while (fontsize > 0) {
            let m = context.measureText(text);
            if (m.width < rect.width) {
              if (gcolor != null) {
                // The linear gradient is dependent on the fontsize to determine the line height
                if (context.textBaseline === 'bottom') {
                  gradient = context.createLinearGradient(0, y - fontsize, 0, y);
                }
                else if (context.textBaseline === 'middle') {
                  gradient = context.createLinearGradient(0, y - Math.floor(fontsize / 2), 0, y + Math.floor(fontsize / 2));
                }
                else {
                  gradient = context.createLinearGradient(0, y, 0, y + fontsize);
                }
                gradient.addColorStop(0, color);
                gradient.addColorStop(1, gcolor);
                context.fillStyle = gradient;
              }

              context.fillText(text, x, y);
              if (drawOutline) {
                context.strokeText(text, x, y);
              }

              break;
            }
            fontsize--;
            context.font = fontsize + 'px ' + fontname;
          }
        }
        else {
          let i = 0;
          for (let line of text.split('\n')) {
            let line_y = y + (i * fontsize);

            if (gcolor != null) {
              // The linear gradient repeats for each line
              if (context.textBaseline === 'bottom') {
                gradient = context.createLinearGradient(0, line_y - fontsize, 0, line_y);
              }
              else if (context.textBaseline === 'middle') {
                gradient = context.createLinearGradient(0, line_y - Math.floor(fontsize / 2), 0, line_y + Math.floor(fontsize / 2));
              }
              else {
                gradient = context.createLinearGradient(0, line_y, 0, line_y + fontsize);
              }
              gradient.addColorStop(0, color);
              gradient.addColorStop(1, gcolor);
              context.fillStyle = gradient;
            }

            context.fillText(line, x, line_y);
            if (drawOutline) {
              context.strokeText(line, x, line_y);
            }

            i++;
          }
        }
        context.restore();
      }
    },

    /*
     * Return a Rect representing the bounds of the screen.
     */
    bounds() {
      return new Rect(0, 0, width, height);
    },

    /*
     * Clear the screen to black.
     */
    clear() {
      if (context == null) {
        return;
      }
      context.clearRect(0, 0, width, height);
      this.fill('black');
    },

    /*
     * Fill the screen with a colour.
     */
    fill(color, gcolor) {
      if (context == null) {
        return;
      }
      if (gcolor != null) {
        let gradient = context.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, parseColor(color));
        gradient.addColorStop(1, parseColor(gcolor));
        context.fillStyle = gradient;
      }
      else {
        context.fillStyle = parseColor(color);
      }
      context.fillRect(0, 0, width, height);
    },

    /*
     * Draw image to the screen at the given position.
     */
    blit(image, pos) {
      if (context == null) {
        return;
      }

      let [x=0, y=0] = pos;
      context.drawImage(image, x, y);
    },

    init(id) {
      const canvas = document.querySelector(id);
      if (!canvas.getContext) {
        // If not the canvas element or Canvas API not supported
        return;
      }
      if (window.TITLE) {
        document.querySelector('title').innerText = window.TITLE;
      }
      if (window.WIDTH) {
        width = canvas.width = window.WIDTH;
      }
      if (window.HEIGHT) {
        height = canvas.height = window.HEIGHT;
      }

      context = canvas.getContext('2d');
      start = undefined;

      if ((typeof window.update === 'function') &&
          (typeof window.draw === 'function')) {
        // Only run the core game loop if draw() and update() are defined
        running = window.requestAnimationFrame(loop);
      }
    }
  }
})();
