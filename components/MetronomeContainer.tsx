'use client';
import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const MetronomeWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const BeatCounterWrap = styled.div`
  display: flex;
  gap: 10px;
`;

const BeatCounter = styled.div<{ $active: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 1px solid green;
  background-color: ${({ $active }) => ($active ? 'green' : 'transparent')};
  transition: background-color 0.2s;
`;

const Display = styled.div`
  font-size: 3rem;
  font-weight: bold;
  transform: translateY(3px);
`;

const BeatRange = styled.input`
  width: 80%;
`;

const Controls = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
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

const Selector = styled.select`
  padding: 5px 10px;
  font-size: 1rem;
`;

export default function MetronomeContainer() {
  const [bpm, setBpm] = useState(60);
  const [isPlaying, setIsPlaying] = useState(false);
  const [lastTap, setLastTap] = useState(0);
  const [currentBeat, setCurrentBeat] = useState(0);
  const [beatsPerMeasure, setBeatsPerMeasure] = useState(4);

  const timer = useRef<NodeJS.Timeout | null>(null);
  const click1 = useRef<HTMLAudioElement | null>(null);
  const click2 = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    click1.current = new Audio('/sounds/click1.wav');
    click2.current = new Audio('/sounds/click2.wav');
  }, []);

  const playClick = (beat: number) => {
    if (beat === 0) {
      click1.current?.play(); // 첫 박자
    } else {
      click2.current?.play(); // 나머지 박자
    }
    setCurrentBeat(beat);
  };

  useEffect(() => {
    if (isPlaying) {
      let beat = 0;
      playClick(beat); // 첫 클릭

      timer.current = setInterval(
        () => {
          beat = (beat + 1) % beatsPerMeasure;
          playClick(beat);
        },
        (60 / bpm) * 1000,
      );
    } else {
      if (timer.current) clearInterval(timer.current);
    }

    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [isPlaying, bpm, beatsPerMeasure]);

  const handleTap = () => {
    const now = Date.now();
    if (lastTap) {
      const diff = now - lastTap;
      const newBpm = Math.round(60000 / diff);
      setBpm(Math.min(newBpm, 280));
    }
    setLastTap(now);
  };

  const handleBeatsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setBeatsPerMeasure(Number(e.target.value));
    setCurrentBeat(0);
  };

  const handleSetBeat = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = (e.target as HTMLButtonElement).textContent;
    setBpm((prev) =>
      text === '-' ? Math.max(20, prev - 1) : Math.min(280, prev + 1),
    );
    // currentBeat 유지됨
  };

  return (
    <MetronomeWrap>
      <BeatCounterWrap>
        {Array.from({ length: beatsPerMeasure }).map((_, i) => (
          <BeatCounter key={i} $active={i === currentBeat} />
        ))}
      </BeatCounterWrap>
      <Display>{bpm} BPM</Display>
      <BeatRange
        type="range"
        min={20}
        max={280}
        value={bpm}
        onChange={(e) => setBpm(Number(e.target.value))}
      />
      <Controls>
        <Button onClick={handleSetBeat}>-</Button>
        <Button
          onClick={() => {
            setIsPlaying((prev) => !prev);
            setCurrentBeat(0);
          }}
        >
          {isPlaying ? 'Stop' : 'Start'}
        </Button>
        <Button onClick={handleSetBeat}>+</Button>
        <TapButton onClick={handleTap}>Tap Tempo</TapButton>
      </Controls>
      <Controls>
        <label>
          박자 수:{' '}
          <Selector value={beatsPerMeasure} onChange={handleBeatsChange}>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </Selector>
        </label>
      </Controls>
    </MetronomeWrap>
  );
}
