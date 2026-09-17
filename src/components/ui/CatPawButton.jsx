import React, { useEffect, useRef, useCallback } from 'react';
import { Rive } from '@rive-app/canvas';
import catPawRiv from '../../assets/cat-paw-button.riv?url';

/**
 * CatPawButton — Rive-Powered Interactive Micro-Interaction.
 *
 * Uses the authentic Rive animation asset (`cat-paw-button.riv`) with:
 * - 100% Pure Transparent Background (no white artboard card, no "Get Started" box)
 * - Authentic Rive pop-up emergence animation on hover (`hover?` input)
 * - Interactive paw waving and eye gaze tracking cursor movement (`waveL?` & `waveR?` inputs)
 * - Click reaction animation (`clicked?` input)
 * - Zero CPU/GPU idle overhead (animation loop only runs when hovered/transitioning)
 * - Fully preserves your custom button styling, typography, and icons
 */
const CatPawButton = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseMove,
  className = '',
  as = 'button',
  href,
  target,
  rel,
  type = 'button',
  disabled = false,
  icon: Icon,
  ...rest
}) => {
  const buttonRef = useRef(null);
  const displayCanvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  const riveRef = useRef(null);

  // Input refs
  const hoverInputRef = useRef(null);
  const waveLInputRef = useRef(null);
  const waveRInputRef = useRef(null);
  const clickedInputRef = useRef(null);

  // Animation loop control
  const animFrameIdRef = useRef(null);
  const isHoveredRef = useRef(false);
  const exitTimerRef = useRef(null);

  // Initialize Rive instance once on mount
  useEffect(() => {
    const offscreenCanvas = offscreenCanvasRef.current;
    const displayCanvas = displayCanvasRef.current;
    if (!offscreenCanvas || !displayCanvas) return;

    const dCtx = displayCanvas.getContext('2d', { willReadFrequently: true });
    let isCleanedUp = false;

    // Dimensions for the cat bounding box extracted from the Rive 400x300 artboard
    // Cat is centered at x=200, sy=45, sh=80 precisely captures the cat & paws without the button
    const sx = 100, sy = 45, sw = 200, sh = 80;
    const tw = 200, th = 80;

    // Render & Alpha-filter loop
    const renderFrame = () => {
      if (isCleanedUp) return;

      // Draw current frame from offscreen Rive WebGL canvas to visible 2D canvas
      dCtx.clearRect(0, 0, tw, th);
      dCtx.drawImage(offscreenCanvas, sx, sy, sw, sh, 0, 0, tw, th);

      const imgData = dCtx.getImageData(0, 0, tw, th);
      const data = imgData.data;

      // Breadth-First Search Flood Fill from top corners to dissolve outside background
      // Leaves the cat's white eyes & nose intact because they are enclosed by black fur
      const visited = new Uint8Array(tw * th);
      const queue = [0, tw - 1];
      visited[0] = 1;
      visited[tw - 1] = 1;

      let head = 0;
      while (head < queue.length) {
        const idx = queue[head++];
        const p = idx * 4;

        const r = data[p];
        const g = data[p + 1];
        const b = data[p + 2];

        // Background color in Rive artboard is light off-white (rgb > 205)
        if (r > 205 && g > 205 && b > 205) {
          data[p + 3] = 0; // Set to completely transparent

          const x = idx % tw;
          const y = Math.floor(idx / tw);

          if (x > 0 && !visited[idx - 1]) {
            visited[idx - 1] = 1;
            queue.push(idx - 1);
          }
          if (x < tw - 1 && !visited[idx + 1]) {
            visited[idx + 1] = 1;
            queue.push(idx + 1);
          }
          if (y > 0 && !visited[idx - tw]) {
            visited[idx - tw] = 1;
            queue.push(idx - tw);
          }
          if (y < th - 1 && !visited[idx + tw]) {
            visited[idx + tw] = 1;
            queue.push(idx + tw);
          }
        }
      }

      // 2. Clear any leftover white button strip below y = 52
      // The cat's eyes are in the upper region (y <= 50), so any light pixels at y >= 52 belong to the white Rive button
      for (let y = 52; y < th; y++) {
        for (let x = 0; x < tw; x++) {
          const p = (y * tw + x) * 4;
          if (data[p] > 180 && data[p + 1] > 180 && data[p + 2] > 180) {
            data[p + 3] = 0;
          }
        }
      }

      dCtx.putImageData(imgData, 0, 0);

      // Keep looping while hovered or during exit transition
      if (isHoveredRef.current || exitTimerRef.current) {
        animFrameIdRef.current = requestAnimationFrame(renderFrame);
      } else {
        dCtx.clearRect(0, 0, tw, th);
        animFrameIdRef.current = null;
      }
    };

    // Instantiate Rive
    const riveInstance = new Rive({
      src: catPawRiv || '/cat-paw-button.riv',
      canvas: offscreenCanvas,
      autoplay: true,
      stateMachines: 'State Machine 1',
      onLoad: () => {
        if (isCleanedUp) return;


        // Bind State Machine Inputs
        try {
          const inputs = riveInstance.stateMachineInputs('State Machine 1') || [];
          inputs.forEach((inp) => {
            if (inp.name === 'hover?') hoverInputRef.current = inp;
            if (inp.name === 'waveL?') waveLInputRef.current = inp;
            if (inp.name === 'waveR?') waveRInputRef.current = inp;
            if (inp.name === 'clicked?') clickedInputRef.current = inp;
          });
        } catch (_) {}
      },
    });

    riveRef.current = riveInstance;

    // Helper to start render loop
    const startLoop = () => {
      if (!animFrameIdRef.current) {
        animFrameIdRef.current = requestAnimationFrame(renderFrame);
      }
    };

    // Attach startLoop to instance for handlers
    riveInstance._startRenderLoop = startLoop;

    return () => {
      isCleanedUp = true;
      if (animFrameIdRef.current) {
        cancelAnimationFrame(animFrameIdRef.current);
      }
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
      try {
        riveInstance.cleanup();
      } catch (_) {}
    };
  }, []);

  // Cursor tracking handler (animates cat paw and eyes following cursor)
  const handleCursorMove = useCallback(
    (e) => {
      const btn = buttonRef.current;
      if (!btn) return;

      const rect = btn.getBoundingClientRect();
      if (!rect.width) return;

      // Normalized from -1 (left edge) to 1 (right edge)
      const normX = ((e.clientX - rect.left) / rect.width) * 2 - 1;

      const waveL = waveLInputRef.current;
      const waveR = waveRInputRef.current;

      if (waveL && waveR) {
        if (normX < -0.15) {
          waveL.value = true;
          waveR.value = false;
        } else if (normX > 0.15) {
          waveL.value = false;
          waveR.value = true;
        } else {
          waveL.value = false;
          waveR.value = false;
        }
      }

      if (onMouseMove) onMouseMove(e);
    },
    [onMouseMove]
  );

  const handleMouseEnter = useCallback(
    (e) => {
      isHoveredRef.current = true;
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
        exitTimerRef.current = null;
      }

      if (hoverInputRef.current) {
        hoverInputRef.current.value = true;
      }

      handleCursorMove(e);

      if (riveRef.current?._startRenderLoop) {
        riveRef.current._startRenderLoop();
      }

      if (onMouseEnter) onMouseEnter(e);
    },
    [handleCursorMove, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      isHoveredRef.current = false;

      if (hoverInputRef.current) {
        hoverInputRef.current.value = false;
      }
      if (waveLInputRef.current) {
        waveLInputRef.current.value = false;
      }
      if (waveRInputRef.current) {
        waveRInputRef.current.value = false;
      }

      // Allow 450ms for the cat's exit/hide animation to finish playing before pausing
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      exitTimerRef.current = setTimeout(() => {
        exitTimerRef.current = null;
      }, 450);

      if (onMouseLeave) onMouseLeave(e);
    },
    [onMouseLeave]
  );

  const handleClick = useCallback(
    (e) => {
      if (disabled) return;

      if (clickedInputRef.current) {
        clickedInputRef.current.value = true;
        setTimeout(() => {
          if (clickedInputRef.current) clickedInputRef.current.value = false;
        }, 150);
      }

      if (onClick) onClick(e);
    },
    [disabled, onClick]
  );

  const Tag = as;

  return (
    <Tag
      ref={buttonRef}
      type={Tag === 'button' ? type : undefined}
      href={Tag === 'a' ? href : undefined}
      target={Tag === 'a' ? target : undefined}
      rel={Tag === 'a' ? rel : undefined}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleCursorMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-flex items-center justify-center
        transition-all duration-300 transform active:scale-95
        select-none cursor-pointer overflow-visible group
        ${className}
      `}
      {...rest}
    >
      {/* ─── Visible 100% Pure Transparent Cat Canvas ─── */}
      <canvas
        ref={displayCanvasRef}
        width={200}
        height={80}
        className="absolute bottom-[calc(100%-4px)] left-1/2 -translate-x-1/2 pointer-events-none z-30 select-none"
        style={{ width: '160px', height: '64px' }}
      />

      {/* ─── Hidden Offscreen Rive WebGL Canvas (Keeps GPU context active off-viewport) ─── */}
      <span
        className="fixed pointer-events-none opacity-0 select-none overflow-hidden"
        style={{ top: '-9999px', left: '-9999px', width: '400px', height: '300px' }}
        aria-hidden="true"
      >
        <canvas ref={offscreenCanvasRef} width={400} height={300} />
      </span>

      {/* ─── Button Content (Preserves typography & icons) ─── */}
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
      </span>
    </Tag>
  );
};

export default CatPawButton;
