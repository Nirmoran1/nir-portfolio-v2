'use client';

interface Upgrade {
  id: string;
  name: string;
  emoji: string;
  cost: number;
  perSecond: number;
  description: string;
}

export const UPGRADES: Upgrade[] = [
  { id: 'truck', name: 'עגלת פלאפל', emoji: '🚚', cost: 100, perSecond: 1, description: 'שקל אחד בשנייה' },
  { id: 'restaurant', name: 'מסעדה', emoji: '🏪', cost: 1000, perSecond: 10, description: '10 שקלים בשנייה' },
  { id: 'chain', name: 'רשת מסעדות', emoji: '🏢', cost: 10000, perSecond: 100, description: '100 שקלים בשנייה' },
  { id: 'factory', name: 'מפעל פלאפל', emoji: '🏭', cost: 50000, perSecond: 500, description: '500 שקלים בשנייה' },
  { id: 'empire', name: 'אימפריה גלובלית', emoji: '🌍', cost: 250000, perSecond: 2500, description: '2,500 שקלים בשנייה' },
];

interface UpgradesProps {
  shekels: number;
  owned: Record<string, number>;
  onBuy: (upgrade: Upgrade) => void;
}

export default function UpgradesList({ shekels, owned, onBuy }: UpgradesProps) {
  return (
    <div className="space-y-3 w-full max-w-md">
      <h2 className="text-xl font-bold text-amber-900 text-center">🛒 שדרוגים</h2>
      {UPGRADES.map(upgrade => {
        const count = owned[upgrade.id] || 0;
        const price = Math.floor(upgrade.cost * Math.pow(1.15, count));
        const canAfford = shekels >= price;
        return (
          <button
            key={upgrade.id}
            onClick={() => canAfford && onBuy({ ...upgrade, cost: price })}
            disabled={!canAfford}
            className={`w-full p-3 rounded-xl flex items-center gap-3 transition-all ${
              canAfford
                ? 'bg-white border-2 border-amber-300 hover:border-amber-500 hover:shadow-md cursor-pointer'
                : 'bg-gray-100 border-2 border-gray-200 opacity-60 cursor-not-allowed'
            }`}
          >
            <span className="text-3xl">{upgrade.emoji}</span>
            <div className="flex-1 text-right">
              <div className="font-bold text-amber-900">{upgrade.name} <span className="text-sm text-amber-600">x{count}</span></div>
              <div className="text-sm text-amber-600">{upgrade.description}</div>
            </div>
            <div className="text-lg font-bold text-amber-800">₪{price.toLocaleString()}</div>
          </button>
        );
      })}
    </div>
  );
}
