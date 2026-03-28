'use client';

import { useState, useCallback } from 'react';
import { rooms } from './data';
import TitleScreen from './components/TitleScreen';
import VictoryScreen from './components/VictoryScreen';
import ProgressBar from './components/ProgressBar';
import Inventory from './components/Inventory';
import RoomView from './components/RoomView';

type Screen = 'title' | 'game' | 'victory';

export default function AIArchaeologistPage() {
  const [screen, setScreen] = useState<Screen>('title');
  const [currentRoomId, setCurrentRoomId] = useState(1);
  const [clearedRooms, setClearedRooms] = useState<Set<number>>(new Set());
  const [inventory, setInventory] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);
  const [roomKey, setRoomKey] = useState(0);

  const currentRoom = rooms.find((r) => r.id === currentRoomId)!;

  const handleStart = () => {
    setScreen('game');
  };

  const handleAnswer = useCallback((correct: boolean) => {
    setTotalAttempts((p) => p + 1);
    if (correct) {
      setScore((p) => p + 1);
      setInventory((prev) => [...prev, `${currentRoom.lootEmoji} ${currentRoom.loot}`]);
    }
    setClearedRooms((prev) => {
      const next = new Set(prev);
      next.add(currentRoomId);
      if (next.size === rooms.length) {
        setTimeout(() => setScreen('victory'), 1200);
      }
      return next;
    });
  }, [currentRoomId, currentRoom]);

  const handleNavigate = useCallback((roomId: number) => {
    setFadeIn(false);
    setTimeout(() => {
      setCurrentRoomId(roomId);
      setRoomKey((k) => k + 1);
      setFadeIn(true);
    }, 200);
  }, []);

  const handleRestart = () => {
    setScreen('title');
    setCurrentRoomId(1);
    setClearedRooms(new Set());
    setInventory([]);
    setScore(0);
    setTotalAttempts(0);
    setRoomKey(0);
  };

  if (screen === 'title') return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <TitleScreen onStart={handleStart} />
    </div>
  );

  if (screen === 'victory') return (
    <div className="min-h-screen bg-[#0d0d0d] text-white">
      <VictoryScreen
        score={score}
        totalAttempts={totalAttempts}
        inventory={inventory}
        onRestart={handleRestart}
      />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d0d0d] text-white pt-6">
      <ProgressBar
        cleared={clearedRooms.size}
        total={rooms.length}
        score={score}
        totalAttempts={totalAttempts}
      />
      <Inventory items={inventory} />
      <div
        className={`transition-opacity duration-300 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
      >
        <RoomView
          key={roomKey}
          room={currentRoom}
          isCleared={clearedRooms.has(currentRoomId)}
          onAnswer={handleAnswer}
          onNavigate={handleNavigate}
          allRooms={rooms}
        />
      </div>
    </div>
  );
}
