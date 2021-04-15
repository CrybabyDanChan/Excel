class Dom {
  constructor(selector) {
    this.$nativeElement = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector;
  }

  html(html) {
    if (typeof html === 'string') {
      this.$nativeElement.innerHTML = html;
      return this;
    }

    return this.$nativeElement.outerHTML.trim();
  }

  clear() {
    this.html('');

    return this;
  }

  on(eventType, callback) {
    this.$nativeElement.addEventListener(eventType, callback);
  }

  off(eventType, callback) {
    this.$nativeElement.removeEventListener(eventType, callback);
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$nativeElement;
    }

    if (Element.prototype.append) {
      this.$nativeElement.append(node);
    } else {
      this.$nativeElement.appendChild(node);
    }

    return this;
  }
}

// event.target
export function $(selector) {
  return new Dom(selector);
}

$.create = (tagName, classes = '') => {
  const nativeElement = document.createElement(tagName);

  if (classes) {
    nativeElement.classList.add(classes);
  }

  return $(nativeElement);
};
