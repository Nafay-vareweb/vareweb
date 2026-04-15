'use client';

import { useEffect, useRef, memo } from 'react';
import { X } from 'lucide-react';
import gsap from 'gsap';

interface VideoPopupProps {
  isOpen: boolean;
  onClose: () => void;
  video: {
    name: string;
    role: string;
    quote: string;
    videoUrl: string;
    gradient: string;
    profileImage: string;
  };
}

function VideoPopup({ isOpen, onClose, video }: VideoPopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Prevent scrolling
    document.body.style.overflow = 'hidden';

    // Animate in
    if (backdropRef.current) {
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { scale: 0.85, opacity: 0, y: 50 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.4)' }
      );
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleEscape);
    }
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Video Player"
    >
      {/* Backdrop */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Content Container */}
      <div
        ref={contentRef}
        className="relative w-full max-w-5xl z-10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-10 right-4 p-2 text-white/50 hover:text-white transition-colors duration-200 z-20"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Horizontal Layout: Video left, Text right */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-6 md:gap-8 items-center">
          {/* LEFT: Video Player - Vertical Format (9:16) */}
          <div className="flex justify-center md:justify-end">
            <div className="relative w-full max-w-xs aspect-[9/16] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl">
              <video
                ref={videoRef}
                src={video.videoUrl}
                controls
                autoPlay
                preload="auto"
                className="w-full h-full object-cover"
                controlsList="nodownload"
              />
            </div>
          </div>

          {/* RIGHT: Text Content */}
          <div className="flex flex-col justify-start gap-6 md:pl-4">
            {/* Client Avatar and Info */}
            <div className="space-y-4">
              <img
                src={video.profileImage}
                alt={video.name}
                className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-lg"
              />
              <div>
                <h3 className="text-white font-bold text-xl">{video.name}</h3>
                <p className="text-white/50 text-sm font-medium mt-1">{video.role}</p>
              </div>
            </div>

            {/* Quote */}
            <div className="space-y-3 border-l-2 border-vare-purple/30 pl-4">
              <p className="text-white/70 text-base leading-relaxed italic">
                &ldquo;{video.quote}&rdquo;
              </p>
            </div>

            {/* Action Button */}
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-lg bg-vare-purple hover:bg-vare-purple-light text-white font-semibold transition-all duration-300 text-sm w-fit"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(VideoPopup);
