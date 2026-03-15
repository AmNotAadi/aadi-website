import { useEffect, useRef, useMemo, useState } from 'react';
import { gsap } from 'gsap';
import './TargetCursor.css';

const TargetCursor = ({
  targetSelector = '.cursor-target',
  spinDuration = 2,
  hideDefaultCursor = true,
  hoverDuration = 0.2,
  parallaxOn = true
}) => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);

  const isMobile = useMemo(() => {
    if (typeof window === 'undefined') return false;
    const hasTouchScreen = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const isSmallScreen = window.innerWidth <= 768;
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;
    const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase());
    return (hasTouchScreen && isSmallScreen) || isMobileUserAgent;
  }, []);

  const constants = useMemo(() => ({
    borderWidth: 3,
    cornerSize: 12
  }), []);

  useEffect(() => {
    if (isMobile || !cursorRef.current) return;

    const originalCursor = document.body.style.cursor;
    if (hideDefaultCursor) {
      document.body.style.cursor = 'none';
    }

    const cursor = cursorRef.current;
    const corners = Array.from(cursor.querySelectorAll('.target-cursor-corner'));

    let activeTarget = null;
    let currentLeaveHandler = null;
    let tickerFn = null;

    // Use gsap.quickTo for absolute peak performance on cursor movement
    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.15, ease: 'power3.out' });
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.15, ease: 'power3.out' });

    // Initial positioning
    gsap.set(cursor, {
      xPercent: -50,
      yPercent: -50,
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    });

    let spinTl = gsap.timeline({ repeat: -1 })
      .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });

    const activeStrength = { current: 0 };
    let targetCornerPositions = null;

    tickerFn = () => {
      const strength = activeStrength.current;
      if (strength === 0 || !targetCornerPositions) return;

      const cursorX = gsap.getProperty(cursor, 'x');
      const cursorY = gsap.getProperty(cursor, 'y');

      corners.forEach((corner, i) => {
        const currentX = gsap.getProperty(corner, 'x');
        const currentY = gsap.getProperty(corner, 'y');

        const targetX = targetCornerPositions[i].x - cursorX;
        const targetY = targetCornerPositions[i].y - cursorY;

        const finalX = currentX + (targetX - currentX) * strength;
        const finalY = currentY + (targetY - currentY) * strength;

        const duration = strength >= 0.99 ? (parallaxOn ? 0.2 : 0) : 0.05;

        gsap.to(corner, {
          x: finalX,
          y: finalY,
          duration: duration,
          ease: duration === 0 ? 'none' : 'power1.out',
          overwrite: 'auto'
        });
      });
    };

    gsap.ticker.add(tickerFn);

    const onMouseMove = (e) => {
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const scrollHandler = () => {
      const vault = document.getElementById('vault-section');
      if (vault) {
        const rect = vault.getBoundingClientRect();
        const pastVault = rect.bottom <= 0;
        setIsVisible(!pastVault);
        if (hideDefaultCursor) {
          document.body.style.cursor = pastVault ? 'auto' : 'none';
        }
      }

      if (activeTarget) {
        // Re-measure bounds on scroll if hovering securely
        const rect = activeTarget.getBoundingClientRect();
        const { borderWidth, cornerSize } = constants;
        targetCornerPositions = [
          { x: rect.left - borderWidth, y: rect.top - borderWidth },
          { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
          { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
          { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
        ];
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', scrollHandler, { passive: true });
    scrollHandler();

    const mouseDownHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 0.7, duration: 0.3 });
      gsap.to(cursor, { scale: 0.9, duration: 0.2 });
    };

    const mouseUpHandler = () => {
      if (!dotRef.current) return;
      gsap.to(dotRef.current, { scale: 1, duration: 0.3 });
      gsap.to(cursor, { scale: 1, duration: 0.2 });
    };

    window.addEventListener('mousedown', mouseDownHandler, { passive: true });
    window.addEventListener('mouseup', mouseUpHandler, { passive: true });

    let resumeTimeout = null;

    const enterHandler = (e) => {
      let current = e.target;
      let target = null;
      while (current && current !== document.body) {
        if (current.matches && current.matches(targetSelector)) {
          target = current;
          break;
        }
        current = current.parentElement;
      }

      if (!target || activeTarget === target) return;

      if (activeTarget && currentLeaveHandler) {
        currentLeaveHandler();
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }

      activeTarget = target;

      corners.forEach(corner => gsap.killTweensOf(corner));

      // Pause rotation immediately and snap to 0, completely removing the 180 twist loop
      gsap.killTweensOf(cursor, 'rotation');
      spinTl.pause();
      gsap.set(cursor, { rotation: 0 });

      const rect = target.getBoundingClientRect();
      const { borderWidth, cornerSize } = constants;

      targetCornerPositions = [
        { x: rect.left - borderWidth, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.top - borderWidth },
        { x: rect.right + borderWidth - cornerSize, y: rect.bottom + borderWidth - cornerSize },
        { x: rect.left - borderWidth, y: rect.bottom + borderWidth - cornerSize }
      ];

      gsap.to(activeStrength, {
        current: 1,
        duration: hoverDuration,
        ease: 'power2.out'
      });

      const cursorX = gsap.getProperty(cursor, 'x');
      const cursorY = gsap.getProperty(cursor, 'y');

      corners.forEach((corner, i) => {
        gsap.to(corner, {
          x: targetCornerPositions[i].x - cursorX,
          y: targetCornerPositions[i].y - cursorY,
          duration: 0.2,
          ease: 'power2.out'
        });
      });

      const leaveHandler = () => {
        gsap.set(activeStrength, { current: 0, overwrite: true });
        targetCornerPositions = null;
        activeTarget = null;
        currentLeaveHandler = null;

        gsap.killTweensOf(corners);
        const { cornerSize } = constants;
        
        // This is safe because GSAP will tween the 'x' and 'y' properties independently of percentages
        const positions = [
          { x: -cornerSize * 1.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: -cornerSize * 1.5 },
          { x: cornerSize * 0.5, y: cornerSize * 0.5 },
          { x: -cornerSize * 1.5, y: cornerSize * 0.5 }
        ];

        corners.forEach((corner, index) => {
          gsap.to(corner, {
            x: positions[index].x,
            y: positions[index].y,
            duration: 0.3,
            ease: 'power3.out'
          });
        });

        // Restart spinning smoothly without twisting backwards
        resumeTimeout = setTimeout(() => {
          if (!activeTarget) {
            const currentRotation = gsap.getProperty(cursor, 'rotation') || 0;
            const normalizedRotation = currentRotation % 360;
            
            spinTl.kill();
            spinTl = gsap.timeline({ repeat: -1 })
              .to(cursor, { rotation: '+=360', duration: spinDuration, ease: 'none' });
            
            gsap.to(cursor, {
              rotation: normalizedRotation + 360,
              duration: spinDuration * (1 - normalizedRotation / 360),
              ease: 'none',
              onComplete: () => {
                spinTl.restart();
              }
            });
          }
          resumeTimeout = null;
        }, 50);

        target.removeEventListener('mouseleave', leaveHandler);
      };

      currentLeaveHandler = leaveHandler;
      target.addEventListener('mouseleave', leaveHandler);
    };

    window.addEventListener('mouseover', enterHandler, { passive: true });

    return () => {
      gsap.ticker.remove(tickerFn);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', enterHandler);
      window.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('mousedown', mouseDownHandler);
      window.removeEventListener('mouseup', mouseUpHandler);

      if (activeTarget && currentLeaveHandler) {
        activeTarget.removeEventListener('mouseleave', currentLeaveHandler);
      }

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
      }

      spinTl.kill();
      document.body.style.cursor = originalCursor;
    };
  }, [targetSelector, spinDuration, hideDefaultCursor, isMobile, hoverDuration, parallaxOn, constants]);

  if (isMobile) return null;

  return (
    <div 
      ref={cursorRef} 
      className="target-cursor-wrapper"
      style={{
        opacity: isVisible ? 1 : 0,
        pointerEvents: 'none',
        visibility: isVisible ? 'visible' : 'hidden',
        transition: 'opacity 0.2s ease, visibility 0.2s'
      }}
    >
      <div ref={dotRef} className="target-cursor-dot" />
      <div className="target-cursor-corner corner-tl" />
      <div className="target-cursor-corner corner-tr" />
      <div className="target-cursor-corner corner-br" />
      <div className="target-cursor-corner corner-bl" />
    </div>
  );
};

export default TargetCursor;
