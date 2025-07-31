import React, { useEffect, useRef, useState } from 'react';
import followingGamjik from '@assets/gamjik_cursor.svg';

//
//
//

const SPEED = 1.5;

//
//
//

const CursorFollower = () => {
  const followerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  //
  //
  //
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      pos.current.x += (mouse.x - pos.current.x) * SPEED;
      pos.current.y += (mouse.y - pos.current.y) * SPEED;

      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${pos.current.x + 20}px, ${pos.current.y - 80}px)`;
      }

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouse]);

  return (
    <div
      ref={followerRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'transform 0.3s ease-out',
      }}
    >
      <img src={followingGamjik} alt="cursor" width={100} height={100} />
    </div>
  );
};

//
//
//

export default CursorFollower;
