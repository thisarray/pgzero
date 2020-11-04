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
