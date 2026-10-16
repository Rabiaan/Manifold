import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, Pause, Scissors, Layers, Sliders } from 'lucide-react';

export const EditDesignStudy: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [scrubberPosition, setScrubberPosition] = useState(38);
  const [activeTrack, setActiveTrack] = useState<string>('Picture');
  const scrubberPosRef = useRef(38);

  useEffect(() => {
    scrubberPosRef.current = scrubberPosition;
  }, [scrubberPosition]);

  useEffect(() => {
    if (!isPlaying) return;

    const onTick = () => {
      let next = scrubberPosRef.current + 0.35;
      if (next > 100) next = 0;
      scrubberPosRef.current = next;
      setScrubberPosition(next);
    };

    gsap.ticker.add(onTick);
    return () => {
      gsap.ticker.remove(onTick);
    };
  }, [isPlaying]);

  const tracks = [
    {
      name: 'Picture',
      blocks: [
        { start: 0, width: 25, isAccent: false, label: 'Scene 01 / A-Cam' },
        { start: 27, width: 35, isAccent: true, label: 'Hero Cut / Anamorphic' },
        { start: 64, width: 18, isAccent: false, label: 'B-Roll Close' },
        { start: 84, width: 16, isAccent: true, label: 'Ending Wide' },
      ],
    },
    {
      name: 'Colour',
      blocks: [
        { start: 0, width: 45, isAccent: false, label: 'ACEScg / Kodak 2383' },
        { start: 47, width: 53, isAccent: false, label: 'Emerald Grade 2.4' },
      ],
    },
    {
      name: 'Motion',
      blocks: [
        { start: 15, width: 30, isAccent: false, label: 'Kinetic Titles' },
        { start: 48, width: 40, isAccent: true, label: '3D Vector Compositing' },
      ],
    },
    {
      name: 'Audio',
      blocks: [
        { start: 0, width: 38, isAccent: true, label: 'Sub-bass & Score Mix' },
        { start: 40, width: 60, isAccent: false, label: 'Foley & Sound Design Master' },
      ],
    },
  ];

  return (
    <div className="w-full bg-[#111111] border border-[#2B2B2B] rounded-xl p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#2B2B2B]">
        <div className="flex items-center gap-3">
          <span className={`w-2.5 h-2.5 rounded-full bg-[#1FCD6E] ${isPlaying ? 'animate-ping' : ''}`} />
          <h3 className="font-mono text-xs uppercase tracking-widest text-[#1FCD6E]">
            THE EDIT / A DESIGN STUDY
          </h3>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-neutral-400">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1.5 rounded bg-[#222] hover:bg-[#333] text-white transition-colors cursor-pointer"
              aria-label={isPlaying ? 'Pause timeline' : 'Play timeline'}
            >
              {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            </button>
            <span className="text-white">
              TC 00:01:{Math.floor(scrubberPosition * 0.6).toString().padStart(2, '0')}:12
            </span>
          </div>
          <span className="hidden md:inline text-neutral-500">·</span>
          <span className="hidden md:inline">24.000 FPS / MULTI-TRACK NLE</span>
        </div>
      </div>

      <div
        className="relative flex flex-col gap-3 py-2 cursor-crosshair select-none"
        onClick={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pos = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
          setScrubberPosition(pos);
          scrubberPosRef.current = pos;
        }}
      >
        <div
          className="absolute top-0 bottom-0 w-[2px] bg-[#1FCD6E] z-20 pointer-events-none shadow-[0_0_10px_#1FCD6E]"
          style={{ left: `${scrubberPosition}%` }}
        >
          <div className="w-3 h-3 bg-[#1FCD6E] -ml-[5px] -top-1 absolute rotate-45 shadow-[0_0_6px_#1FCD6E]" />
        </div>

        {tracks.map((track) => (
          <div
            key={track.name}
            onClick={(e) => {
              e.stopPropagation();
              setActiveTrack(track.name);
            }}
            className="flex items-center gap-4 group"
          >
            <div className="w-16 sm:w-20 shrink-0 font-mono text-xs text-neutral-400 group-hover:text-white flex items-center justify-between">
              <span>{track.name}</span>
              <span className={`text-[10px] ${activeTrack === track.name ? 'text-[#1FCD6E]' : 'text-neutral-600'}`}>
                ●
              </span>
            </div>

            <div className="relative flex-1 h-9 bg-[#171717] rounded border border-[#2B2B2B]/60 overflow-hidden">
              {track.blocks.map((block, idx) => (
                <div
                  key={idx}
                  style={{
                    left: `${block.start}%`,
                    width: `${block.width}%`,
                  }}
                  className={`absolute top-1 bottom-1 rounded transition-all duration-200 flex items-center px-2.5 overflow-hidden text-[10px] font-mono tracking-tight cursor-pointer ${
                    block.isAccent
                      ? 'bg-[#1FCD6E] text-[#0D0D0D] font-bold shadow-sm hover:brightness-110'
                      : 'bg-[#2B2B2B] hover:bg-[#333333] text-neutral-300'
                  }`}
                  title={block.label}
                >
                  <span className="truncate">{block.label}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="pt-2 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <Layers size={13} className="text-[#1FCD6E]" /> 4 Parallel Stems
          </span>
          <span className="flex items-center gap-1.5">
            <Scissors size={13} className="text-neutral-500" /> Frame-accurate edits
          </span>
          <span className="flex items-center gap-1.5">
            <Sliders size={13} className="text-neutral-500" /> Dynamic color pipeline
          </span>
        </div>
        <span className="text-[#1FCD6E]">Click lane to reposition playhead</span>
      </div>
    </div>
  );
};
