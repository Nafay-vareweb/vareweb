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
      className="fixed inset-0 z-[10001] flex items-center justify-center p-4 overflow-y-auto"
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
        className="relative w-full max-w-5xl max-h-[calc(100vh-80px)] overflow-hidden overflow-y-auto z-10 rounded-[36px] bg-[#0b0916]/95 border border-white/10 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-3 text-white/70 hover:text-white bg-black/30 rounded-full backdrop-blur-md transition-colors duration-200 z-20"
          aria-label="Close popup"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Horizontal Layout: Video left, Text right */}
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-6 lg:gap-10 items-start">
          {/* LEFT: Video Player - Vertical Format (9:16) */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-[9/16] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl">
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
          <div className="flex flex-col justify-center gap-6 px-2 sm:px-0 lg:pl-4 text-center lg:text-left">
            {/* Client Avatar and Info */}
            <div className="space-y-4">
              <img
                src={video.profileImage}
                alt={video.name}
                className="hidden sm:block w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-lg"
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
