'use client'
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const MetronomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
    width: 50%;
  height: 100vh;
  background-color: #f8f9fa;
    gap: 20px;
`;

const Display = styled.div`
  font-size: 3rem;
  font-weight: bold;
  margin-bottom: 20px;
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


export default function Home() {
    const [bpm, setBpm] = useState(60);
    const [isPlaying, setIsPlaying] = useState(false);
    const [lastTap, setLastTap] = useState(0);
    const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

    // useEffect(() => {
    //     if (isPlaying) {
    //         if (intervalId) clearInterval(intervalId);
    //         const newInterval = setInterval(() => {
    //             metronomeClick.currentTime = 0;
    //             metronomeClick.play();
    //         }, (60 / bpm) * 1000);
    //         setIntervalId(newInterval);
    //     } else {
    //         if (intervalId) clearInterval(intervalId);
    //     }
    //     return () => {
    //         if (intervalId) clearInterval(intervalId);
    //     };
    // }, [isPlaying, bpm]);

    const handleTap = () => {
        const now = Date.now();
        if (lastTap) {
            const diff = now - lastTap;
            const newBpm = Math.round(60000 / diff);
            setBpm(newBpm);
        }
        setLastTap(now);
    };

    return (
        <MetronomeContainer>
            <Display>{bpm} BPM</Display>
            <Controls>
                <Button onClick={() => setBpm((prev) => Math.max(30, prev - 5))}>-</Button>
                <Button onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? 'Stop' : 'Start'}</Button>
                <Button onClick={() => setBpm((prev) => Math.min(300, prev + 5))}>+</Button>
            </Controls>
            <TapButton onClick={handleTap}>Tap Tempo</TapButton>
        </MetronomeContainer>
    );

}
