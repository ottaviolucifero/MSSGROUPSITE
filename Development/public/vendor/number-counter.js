/*
 * Vanilla JavaScript Number Animation Plugin
 * Based on jQuery.rollNumber plugin converted to vanilla JS
 */

function NumberAnimation(element, options) {
  const defaultOptions = {
    number: 0,
    speed: 500,
    interval: 100,
    rooms: 2,
    space: null,
    symbol: false,
    fontStyle: {
      'font-size': '52px',
      color: '#000'
    }
  };

  const config = { ...defaultOptions, ...options };

  function init() {
    if (config.number === undefined) return;

    const number = config.number;
    const speed = config.speed;
    const interval = config.interval;
    const fontStyle = config.fontStyle;
    const rooms = config.rooms || String(number).split('').length;
    const _fillZero = !!config.rooms;

    fontStyle.color = fontStyle.color || '#000';
    fontStyle['font-size'] = fontStyle['font-size'] || '52px';

    // Calculate single digit width
    element.style.display = 'flex';
    element.style.alignItems = 'center';
    element.style.fontSize = fontStyle['font-size'];
    element.style.color = 'rgba(0,0,0,0)';
    element.textContent = number;

    const _height = element.offsetHeight;
    const heightSpaceRatio = element.getAttribute('data-height-space') || 2.2;
    const space = config.space || _height / parseFloat(heightSpaceRatio);
    element.innerHTML = '';

    // Create number HTML
    let numberHtml = '';
    for (let i = 0; i < 10; i++) {
      numberHtml += `<span style="display: block; width: ${space}px; height: ${_height}px; line-height: ${_height}px; ${Object.keys(fontStyle).map(key => `${key}: inherit`).join('; ')}">${i}</span>`;
    }

    numberHtml = `<div class="_number" style="width: ${space}px; height: ${_height}px; line-height: ${_height}px; display: flex; align-items: center;"><div style="position: relative; width: ${space}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${numberHtml}</div></div></div>`;

    // Process number
    let numArr = String(number).split('');
    let originalText = element.textContent;
    let hasPercentage = originalText.includes('%');

    if (_fillZero) {
      if (String(number).indexOf('.') !== -1) rooms++;
      for (let i = numArr.length; i < rooms; i++) {
        numArr.unshift(0);
      }
    }

    if (!!config.symbol) {
      // Handle thousand separator
      const appendHtml = [];
      const symbolHtml = `<span style="display: block; width: ${space}px; height: ${_height}px; line-height: ${_height}px; text-align: center; ${Object.keys(fontStyle).map(key => `${key}: inherit`).join('; ')}">${config.symbol}</span>`;
      const dotHtml = `<span style="display: block; width: ${space}px; height: ${_height}px; line-height: ${_height}px; text-align: center; ${Object.keys(fontStyle).map(key => `${key}: inherit`).join('; ')}">.</span>`;

      const symbolDiv = `<div class="_number" style="width: ${space}px; height: ${_height}px; line-height: ${_height}px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${space}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${symbolHtml}</div></div></div>`;
      const dotDiv = `<div class="_number" style="width: ${space}px; height: ${_height}px; line-height: ${_height}px; display: flex; justify-content: center; align-items: center;"><div style="position: relative; width: ${space}px; height: ${_height}px; overflow: hidden;"><div style="position: absolute; width: 100%;">${dotHtml}</div></div></div>`;

      let numarr = String(number).split('.');
      const re = /(-?\d+)(\d{3})/;
      while (re.test(numarr[0])) {
        numarr[0] = numarr[0].replace(re, '$1,$2');
      }
      numArr = (numarr.length > 1 ? numarr[0] + '.' + numarr[1] : numarr[0]).split('');

      for (let i = 0; i < numArr.length; i++) {
        if (isNaN(Number(numArr[i]))) {
          if (numArr[i] === '.') {
            appendHtml.push(dotDiv);
          } else {
            appendHtml.push(symbolDiv);
          }
        } else {
          appendHtml.push(numberHtml);
        }
      }
      element.innerHTML = appendHtml.join('');
    } else {
      element.innerHTML = numberHtml.repeat(rooms);

      // Handle decimal point
      if (String(number).indexOf('.') !== -1) {
        const numberElements = element.querySelectorAll('._number');
        const dotIndex = String(number).indexOf('.');
        if (numberElements[dotIndex]) {
          const spans = numberElements[dotIndex].querySelectorAll('span');
          if (spans[0]) {
            spans[0].innerHTML = '.';
          }
        }
      }

      // Handle percentage symbol
      if (hasPercentage) {
        const percentageSpan = document.createElement('span');
        percentageSpan.textContent = '%';
        percentageSpan.style.marginLeft = '2px';
        element.appendChild(percentageSpan);
      }
    }

    // Apply font styles
    Object.keys(fontStyle).forEach(key => {
      element.style[key] = fontStyle[key];
    });

    // Animate numbers
    const domArr = element.querySelectorAll('._number');

    for (let i = 0; i < domArr.length; i++) {
      setTimeout((dom, n) => {
        const innerDiv = dom.children[0].children[0];
        animate(innerDiv, {
          top: -_height * n + 'px'
        }, speed);
      }, interval * (domArr.length - i), domArr[i], numArr[i]);
    }
  }

  function animate(element, properties, duration) {
    const startTime = performance.now();
    const startValues = {};

    // Get initial values
    Object.keys(properties).forEach(prop => {
      startValues[prop] = parseFloat(getComputedStyle(element)[prop]) || 0;
    });

    const animateFrame = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3);

      Object.keys(properties).forEach(prop => {
        const startValue = startValues[prop];
        const endValue = parseFloat(properties[prop]);
        const currentValue = startValue + (endValue - startValue) * easeProgress;
        element.style[prop] = currentValue + (prop === 'top' ? 'px' : '');
      });

      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    };

    requestAnimationFrame(animateFrame);
  }

  // Initialize the animation
  init();
}

// Make NumberAnimation globally available
window.NumberAnimation = NumberAnimation;

// Global function to initialize number animation
window.initNumberAnimation = function (selector, options) {
  const elements = document.querySelectorAll(selector);
  elements.forEach(element => {
    NumberAnimation(element, options);
  });
}; 