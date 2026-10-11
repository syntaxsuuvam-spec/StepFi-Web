export interface TierConfig {
  label: string;
  badgeClass: string;
  minScore: number;
}

export const REPUTATION_TIERS: Record<string, TierConfig> = {
  DIAMOND: { label: 'Diamond', badgeClass: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30', minScore: 900 },
  GOLD: { label: 'Gold', badgeClass: 'bg-amber-500/20 text-amber-300 border-amber-500/30', minScore: 750 },
  SILVER: { label: 'Silver', badgeClass: 'bg-slate-400/20 text-slate-300 border-slate-400/30', minScore: 600 },
  BRONZE: { label: 'Bronze', badgeClass: 'bg-amber-700/20 text-amber-400 border-amber-700/30', minScore: 0 }
};

export function getTierForScore(score: number): TierConfig {
  if (score >= 900) return REPUTATION_TIERS.DIAMOND;
  if (score >= 750) return REPUTATION_TIERS.GOLD;
  if (score >= 600) return REPUTATION_TIERS.SILVER;
  return REPUTATION_TIERS.BRONZE;
}