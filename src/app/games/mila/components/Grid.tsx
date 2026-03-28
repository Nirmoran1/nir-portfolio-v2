'use client';

type CellStatus = 'correct' | 'present' | 'absent' | 'empty' | 'active';

interface GridProps {
  guesses: string[];
  currentGuess: string;
  target: string;
  maxAttempts: number;
  wordLength: number;
}

function getCellStatuses(guess: string, target: string): CellStatus[] {
  const statuses: CellStatus[] = Array(guess.length).fill('absent');
  const targetChars = target.split('');
  const used = Array(target.length).fill(false);

  // First pass: correct positions
  for (let i = 0; i < guess.length; i++) {
    if (guess[i] === targetChars[i]) {
      statuses[i] = 'correct';
      used[i] = true;
    }
  }

  // Second pass: present but wrong position
  for (let i = 0; i < guess.length; i++) {
    if (statuses[i] === 'correct') continue;
    for (let j = 0; j < targetChars.length; j++) {
      if (!used[j] && guess[i] === targetChars[j]) {
        statuses[i] = 'present';
        used[j] = true;
        break;
      }
    }
  }

  return statuses;
}

export default function Grid({ guesses, currentGuess, target, maxAttempts, wordLength }: GridProps) {
  const getColor = (status: CellStatus) => {
    switch (status) {
      case 'correct': return 'bg-green-500 text-white border-green-600';
      case 'present': return 'bg-yellow-500 text-white border-yellow-600';
      case 'absent': return 'bg-gray-400 text-white border-gray-500';
      case 'active': return 'bg-white border-amber-400 text-amber-900';
      default: return 'bg-white border-gray-200 text-gray-400';
    }
  };

  const rows = [];

  for (let i = 0; i < maxAttempts; i++) {
    const cells = [];
    if (i < guesses.length) {
      // Submitted guess
      const statuses = getCellStatuses(guesses[i], target);
      for (let j = 0; j < wordLength; j++) {
        cells.push(
          <div key={j} className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${getColor(statuses[j])}`}>
            {guesses[i][j] || ''}
          </div>
        );
      }
    } else if (i === guesses.length) {
      // Current guess row
      for (let j = 0; j < wordLength; j++) {
        cells.push(
          <div key={j} className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${getColor(j < currentGuess.length ? 'active' : 'empty')}`}>
            {currentGuess[j] || ''}
          </div>
        );
      }
    } else {
      // Empty row
      for (let j = 0; j < wordLength; j++) {
        cells.push(
          <div key={j} className={`w-14 h-14 flex items-center justify-center text-2xl font-bold rounded-lg border-2 ${getColor('empty')}`}>
          </div>
        );
      }
    }
    rows.push(<div key={i} className="flex gap-1.5 justify-center">{cells}</div>);
  }

  return <div className="flex flex-col gap-1.5">{rows}</div>;
}

export { getCellStatuses };
export type { CellStatus };
