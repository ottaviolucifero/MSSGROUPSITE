/* =========================
Gradient Path Animation
=========================== */

document.addEventListener('DOMContentLoaded', function () {
  // Check if GSAP is available
  if (typeof gsap === 'undefined') {
    console.error('GSAP is not loaded.');
    return;
  }

  // Register MotionPath plugin
  gsap.registerPlugin(MotionPathPlugin);

  const gradientAnimation = {
    init() {
      // Create animation for each path
      const paths = [
        'curve-path-1',
        'curve-path-2',
        'curve-path-3',
        'curve-path-4',
        'curve-path-5',
        'curve-path-6',
        'curve-path-7',
        'curve-path-8',
      ];

      paths.forEach((pathId, index) => {
        const path = document.getElementById(pathId);

        // Function to interpolate between two colors
        function interpolateColor(color1, color2, factor) {
          const r1 = parseInt(color1.slice(1, 3), 16);
          const g1 = parseInt(color1.slice(3, 5), 16);
          const b1 = parseInt(color1.slice(5, 7), 16);

          const r2 = parseInt(color2.slice(1, 3), 16);
          const g2 = parseInt(color2.slice(3, 5), 16);
          const b2 = parseInt(color2.slice(5, 7), 16);

          const r = Math.round(r1 + (r2 - r1) * factor);
          const g = Math.round(g1 + (g2 - g1) * factor);
          const b = Math.round(b1 + (b2 - b1) * factor);

          return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
        }

        if (index === 0) {
          // Special handling for first path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-1-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#83E7EE', '#F9EB57', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 1) {
          // Special handling for second path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-2-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#F9EB57', '#83E7EE', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 2) {
          // Special handling for third path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-3-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#83E7EE', '#F9EB57', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 3) {
          // Special handling for fourth path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-4-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#83E7EE', '#F9EB57', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 4) {
          // Special handling for fifth path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-5-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#F9EB57', '#83E7EE', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 5) {
          // Special handling for sixth path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-6-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#83E7EE', '#F9EB57', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 6) {
          // Special handling for seventh path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-7-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#F9EB57', '#83E7EE', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        } else if (index === 7) {
          // Special handling for eighth path - animate 60 rectangles as one unit with gradient
          const duration = gsap.utils.random(3, 6);
          const delay = gsap.utils.random(0, 2);

          for (let i = 1; i <= 60; i++) {
            const rect = document.getElementById(`rect-8-${i}`);
            if (path && rect) {
              // Calculate gradient color based on position
              const factor = (i - 1) / 59; // 0 to 1 across 60 rectangles
              const gradientColor = interpolateColor('#83E7EE', '#F9EB57', factor);

              // Set the color
              rect.setAttribute('fill', gradientColor);

              gsap.to(rect, {
                motionPath: {
                  path: path,
                  align: path,
                  alignOrigin: [0.5, 0.5],
                  autoRotate: false,
                },
                duration: duration, // Same duration for all
                ease: 'power1.inOut',
                repeat: -1,
                delay: delay + i * 0.002, // Slight stagger to create continuous line
              });
            }
          }
        }
      });
    },

    // Method to pause all animations
    pause() {
      gsap.globalTimeline.pause();
    },

    // Method to resume all animations
    resume() {
      gsap.globalTimeline.resume();
    },

    // Method to restart all animations
    restart() {
      gsap.globalTimeline.restart();
    },
  };

  // Initialize the animation
  gradientAnimation.init();

  // Make it globally available for debugging
  window.gradientAnimation = gradientAnimation;
});
