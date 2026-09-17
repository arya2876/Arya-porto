import React, { useState, useCallback } from 'react';
import { useRive, useStateMachineInput, Layout, Fit, Alignment } from '@rive-app/react-canvas';
import catPawRiv from '../../assets/cat-paw-button.riv?url';

/**
 * RiveCatPawButton — Combines custom portfolio button designs with the Rive Cat animation.
 *
 * Uses mix-blend-multiply to completely dissolve the white Rive artboard background,
 * leaving ONLY the black cat & pink paw peeking over your original custom portfolio button!
 */
export function RiveCatPawButtonContent({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  className = '',
  artboard = 'Get Started',
  stateMachine = 'State Machine 1',
  hoverInputName = 'hover',
  clickInputName = 'clicked',
  type = 'button',
  disabled = false,
  icon: Icon,
  as: Component = 'button',
  ...props
}) {
  const [isHovered, setIsHovered] = useState(false);

  // Initialize Rive runtime hook
  const { rive, RiveComponent } = useRive({
    src: catPawRiv || '/cat-paw-button.riv',
    artboard: artboard,
    stateMachines: stateMachine,
    autoplay: true,
    layout: new Layout({
      fit: Fit.Contain,
      alignment: Alignment.Center,
    }),
  });

  // Rive State Machine inputs
  const hoverInput = useStateMachineInput(rive, stateMachine, hoverInputName);
  const clickInput = useStateMachineInput(rive, stateMachine, clickInputName);

  const handleMouseEnter = useCallback(
    (e) => {
      setIsHovered(true);
      if (hoverInput) {
        if (typeof hoverInput.value === 'boolean') {
          hoverInput.value = true;
        } else if (typeof hoverInput.fire === 'function') {
          hoverInput.fire();
        }
      }
      if (onMouseEnter) onMouseEnter(e);
    },
    [hoverInput, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e) => {
      setIsHovered(false);
      if (hoverInput && typeof hoverInput.value === 'boolean') {
        hoverInput.value = false;
      }
      if (onMouseLeave) onMouseLeave(e);
    },
    [hoverInput, onMouseLeave]
  );

  const handleClick = useCallback(
    (e) => {
      if (disabled) return;
      if (clickInput && typeof clickInput.fire === 'function') {
        clickInput.fire();
      }
      if (onClick) onClick(e);
    },
    [disabled, clickInput, onClick]
  );

  const hasBgClass = /\b(bg-|border-)\b/.test(className);
  const baseStyleClasses = hasBgClass
    ? ''
    : 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-lg shadow-amber-500/25';

  return (
    <Component
      type={Component === 'button' ? type : undefined}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`
        relative inline-flex items-center justify-center
        px-7 py-3.5 rounded-full font-medium text-sm md:text-base
        transition-all duration-300 transform active:scale-95
        select-none cursor-pointer overflow-visible group
        ${baseStyleClasses}
        ${isHovered ? 'translate-y-1' : 'translate-y-0'}
        ${className}
      `}
      {...props}
    >
      {/* Rive Cat Canvas — mix-blend-multiply eliminates the white canvas background */}
      <div 
        className="absolute -top-16 left-1/2 -translate-x-1/2 w-44 h-32 pointer-events-none z-10 overflow-hidden mix-blend-multiply"
        style={{
          clipPath: 'inset(0% 0% 46% 0%)',
        }}
      >
        <RiveComponent className="w-full h-full transform scale-[1.35] translate-y-1" />
      </div>

      {/* Custom Button Content (CONTACT / Send Message label + icon) */}
      <span className="relative z-20 flex items-center justify-center gap-2 font-semibold tracking-wide">
        {Icon && <Icon className="w-4 h-4 shrink-0" />}
        {children}
      </span>
    </Component>
  );
}

export default RiveCatPawButtonContent;
