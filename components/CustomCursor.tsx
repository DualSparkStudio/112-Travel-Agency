'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isViewing, setIsViewing] = useState(false)

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === 'BUTTON' || target.closest('button') || target.closest('a')) {
        setIsHovering(true)
      } else if (target.tagName === 'IMG' || target.closest('.image-hover')) {
        setIsViewing(true)
      } else {
        setIsHovering(false)
        setIsViewing(false)
      }
    }

    window.addEventListener('mousemove', updateMousePosition)
    document.addEventListener('mouseover', handleMouseEnter)

    return () => {
      window.removeEventListener('mousemove', updateMousePosition)
      document.removeEventListener('mouseover', handleMouseEnter)
    }
  }, [])

  if (typeof window !== 'undefined' && window.innerWidth <= 768) {
    return null
  }

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? 'hover' : ''} ${isViewing ? 'view' : ''}`}
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: `translate(-50%, -50%) ${isHovering ? 'scale(1.5)' : ''}`,
        }}
      />
      <div
        className="custom-cursor-dot"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
        }}
      />
      {isViewing && (
        <div
          className="fixed pointer-events-none text-teal-blue font-semibold z-[10000]"
          style={{
            left: `${mousePosition.x + 50}px`,
            top: `${mousePosition.y - 10}px`,
            transform: 'translateY(-50%)',
          }}
        >
          View →
        </div>
      )}
    </>
  )
}

