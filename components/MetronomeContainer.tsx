'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MetronomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 20px;
`;

const BeatCounterWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const BeatCounter = styled.div<{ $active: boolean }>`
  border: solid 1px green;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? 'green' : 'transparent')};
  transition: background 0.2s;
`;

const BeatRange = styled.input`
  width: 80%;
`;

const Display = styled.div`
  font-size: 3rem;
  font-weight: bold;
  transform: translateY(3px);
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  background: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const TapButton = styled(Button)`
  background: #28a745;

  &:hover {
    background: #218838;
  }
`;

export default function MetronomeContainer() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [activeBeat, setActiveBeat] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setActiveBeat(0);
  }, [bpm]);

  useEffect(() => {
    if (isPlaying) {
      if (intervalRef.current) clearInterval(intervalRef.current);

      intervalRef.current = setInterval(
        () => {
          setActiveBeat((prev) => (prev + 1) % 4); // 3개의 비트
        },
        (60 / bpm) * 1000,
      );
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, bpm]);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap) {
      const diff = now - lastTap;
      const newBpm = Math.round(60000 / diff);
      setBpm(Math.min(newBpm, 280)); // 최대 BPM 280 제한
    }
    setLastTap(now);
  };

  return (
    <MetronomeWrap>
      <BeatCounterWrap>
        {[0, 1, 2, 3].map((i) => (
          <BeatCounter key={i} $active={i === activeBeat} />
        ))}
      </BeatCounterWrap>
      <Display>{bpm} BPM</Display>
      <BeatRange
        type="range"
        value={bpm}
        min={20}
        max={280}
        onChange={(e) => setBpm(Number(e.target.value))}
      />
      <Controls>
        <Button onClick={() => setBpm((prev) => Math.max(30, prev - 1))}>
          -
        </Button>
        <Button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={() => setBpm((prev) => Math.min(300, prev + 1))}>
          +
        </Button>
      </Controls>
      <TapButton onClick={handleTap}>Tap Tempo</TapButton>
    </MetronomeWrap>
  );
}
