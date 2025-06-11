'use client';

import { useState, useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  children: ReactNode;
}

export const Portal = ({ children }: PortalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Dijalankan di sisi klien setelah komponen mount
    ref.current = document.getElementById('portal');
    setMounted(true);
  }, []);

  // Hanya render portal jika sudah di sisi klien (mounted) dan target div ditemukan
  return mounted && ref.current ? createPortal(children, ref.current) : null;
};
