// marquee-init.js

document.addEventListener('DOMContentLoaded', function () {
  if (typeof InfiniteMarquee === 'undefined') {
    return;
  }

  const animation = {
    infiniteLeft() {
      if (document.querySelector('.logos-marquee-container')) {
        new InfiniteMarquee({
          element: '.logos-marquee-container',
          speed: 40000,
          smoothEdges: true,
          direction: 'left',
          gap: '32px',
          duplicateCount: 1,
          mobileSettings: {
            direction: 'top',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    infiniteRight() {
      if (document.querySelector('.logos-right-marquee-container')) {
        new InfiniteMarquee({
          element: '.logos-right-marquee-container',
          speed: 40000,
          smoothEdges: true,
          direction: 'right',
          gap: '32px',
          duplicateCount: 1,
          mobileSettings: {
            direction: 'right',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    infiniteIconRight() {
      if (document.querySelector('.icon-right-marquee-container')) {
        new InfiniteMarquee({
          element: '.icon-right-marquee-container',
          speed: 2000,
          smoothEdges: true,
          direction: 'right',
          gap: '32px',
          duplicateCount: 1,
          mobileSettings: {
            direction: 'right',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    initHover() {
      if (document.querySelector('.cards-marquee-container')) {
        new InfiniteMarquee({
          element: '.cards-marquee-container',
          speed: 140000,
          smoothEdges: true,
          direction: 'left',
          gap: '32px',
          pauseOnHover: true,
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    initHoverRight() {
      if (document.querySelector('.cards-right-marquee-container')) {
        new InfiniteMarquee({
          element: '.cards-right-marquee-container',
          speed: 140000,
          smoothEdges: true,
          direction: 'right',
          gap: '32px',
          pauseOnHover: true,
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    infiniteTop() {
      if (document.querySelector('.top-marquee-container')) {
        new InfiniteMarquee({
          element: '.top-marquee-container',
          speed: 40000,
          smoothEdges: true,
          direction: 'top',
          gap: '32px',
          pauseOnHover: true,
          duplicateCount: 0,
          mobileSettings: {
            direction: 'top',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },

    infiniteBottom() {
      if (document.querySelector('.bottom-marquee-container')) {
        new InfiniteMarquee({
          element: '.bottom-marquee-container',
          speed: 40000,
          smoothEdges: true,
          direction: 'bottom',
          pauseOnHover: true,
          gap: '32px',
          duplicateCount: 0,
          mobileSettings: {
            direction: 'bottom',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },
    initTopNavMarquee() {
      if (document.querySelector('.top-nav-marquee')) {
        new InfiniteMarquee({
          element: '.top-nav-marquee',
          speed: 70000,
          smoothEdges: true,
          pauseOnHover: true,
          direction: 'left',
          gap: '16px',
          duplicateCount: 2,
          mobileSettings: {
            direction: 'left',
            speed: 50000,
          },
          on: {
            beforeInit: () => {},
            afterInit: () => {},
          },
        });
      }
    },
  };

  // Initialize all
  animation.infiniteLeft();
  animation.infiniteRight();
  animation.initHover();
  animation.initHoverRight();
  animation.infiniteTop();
  animation.infiniteBottom();
  animation.infiniteIconRight();
  animation.initTopNavMarquee();
});
