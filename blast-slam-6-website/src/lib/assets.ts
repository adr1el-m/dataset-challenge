// ============================================================
// Asset URL helpers for team logos and hero icons
// ============================================================

/** Map team name → local logo path (served from /public/teams/) */
export const teamLogoMap: Record<string, string> = {
  "Team Liquid": "/teams/liquid.png",
  "Natus Vincere": "/teams/navi.png",
  "OG": "/teams/og.png",
  "Team Yandex": "/teams/yandex.png",
  "Team Falcons": "/teams/falcons.png",
  "HEROIC": "/teams/heroic.png",
  "Tundra Esports": "/teams/tundra.png",
  "Xtreme Gaming": "/teams/xtreme_gaming.png",
  "Team Spirit": "/teams/spirit.png",
  "GamerLegion": "/teams/gamer_legion.png",
  "MOUZ": "/teams/mouz.png",
  "REKONIX": "/teams/rekonix.png",
};

/** Get team logo URL by team name, with fallback */
export function getTeamLogo(name: string): string {
  return teamLogoMap[name] || "/teams/liquid.png";
}

/**
 * Hero name → Dota 2 internal name for CDN URLs.
 * Used for hero minimap icons from the Valve CDN.
 * Includes all heroes whose internal name differs from the lowercase/underscore form.
 */
const heroInternalNames: Record<string, string> = {
  // Direct mappings (simple names that match convention)
  "Tiny": "tiny",
  "Jakiro": "jakiro",
  "Mars": "mars",
  "Invoker": "invoker",
  "Phoenix": "phoenix",
  "Earthshaker": "earthshaker",
  "Rubick": "rubick",
  "Puck": "puck",
  "Enigma": "enigma",
  "Chen": "chen",
  "Morphling": "morphling",
  "Pangolier": "pangolier",
  "Lina": "lina",
  "Dazzle": "dazzle",
  // Special internal names (legacy API names used by Valve CDN)
  "Anti-Mage": "antimage",
  "Centaur Warrunner": "centaur",
  "Clockwerk": "rattletrap",
  "Crystal Maiden": "crystal_maiden",
  "Doom": "doom_bringer",
  "Drow Ranger": "drow_ranger",
  "Faceless Void": "faceless_void",
  "Io": "wisp",
  "Keeper of the Light": "keeper_of_the_light",
  "Largo": "elder_titan",
  "Lifestealer": "life_stealer",
  "Lone Druid": "lone_druid",
  "Magnus": "magnataur",
  "Monkey King": "monkey_king",
  "Naga Siren": "naga_siren",
  "Nature's Prophet": "furion",
  "Necrophos": "necrolyte",
  "Night Stalker": "night_stalker",
  "Nyx Assassin": "nyx_assassin",
  "Ogre Magi": "ogre_magi",
  "Outworld Destroyer": "obsidian_destroyer",
  "Phantom Assassin": "phantom_assassin",
  "Phantom Lancer": "phantom_lancer",
  "Queen of Pain": "queenofpain",
  "Sand King": "sand_king",
  "Shadow Demon": "shadow_demon",
  "Shadow Fiend": "nevermore",
  "Shadow Shaman": "shadow_shaman",
  "Skywrath Mage": "skywrath_mage",
  "Spirit Breaker": "spirit_breaker",
  "Storm Spirit": "storm_spirit",
  "Templar Assassin": "templar_assassin",
  "Timbersaw": "shredder",
  "Treant Protector": "treant",
  "Troll Warlord": "troll_warlord",
  "Underlord": "abyssal_underlord",
  "Vengeful Spirit": "vengefulspirit",
  "Void Spirit": "void_spirit",
  "Windranger": "windrunner",
  "Winter Wyvern": "winter_wyvern",
  "Witch Doctor": "witch_doctor",
  "Wraith King": "skeleton_king",
  "Zeus": "zuus",
  "Arc Warden": "arc_warden",
  "Bounty Hunter": "bounty_hunter",
  "Chaos Knight": "chaos_knight",
  "Dark Seer": "dark_seer",
  "Dark Willow": "dark_willow",
  "Death Prophet": "death_prophet",
  "Dragon Knight": "dragon_knight",
  "Earth Spirit": "earth_spirit",
  "Ember Spirit": "ember_spirit",
  "Legion Commander": "legion_commander",
  "Primal Beast": "primal_beast",
  "Ancient Apparition": "ancient_apparition",
};

/**
 * Get hero minimap icon URL from the Valve / Cloudflare CDN.
 * Falls back to a generic conversion of the hero name.
 */
export function getHeroIcon(heroName: string): string {
  const internal =
    heroInternalNames[heroName] ||
    heroName.toLowerCase().replace(/\s+/g, "_").replace(/'/g, "").replace(/-/g, "");
  return `https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/${internal}.png`;
}

/**
 * Get a generated player avatar using DiceBear API.
 * Produces a unique SVG avatar based on the player's name — no file upload needed.
 */
export function getPlayerAvatar(playerName: string): string {
  return `https://api.dicebear.com/9.x/bottts-neutral/svg?seed=${encodeURIComponent(playerName)}&backgroundColor=0d1128`;
}

export const blurDataUrl =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAiIGhlaWdodD0iMTAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwIiBoZWlnaHQ9IjEwIiBmaWxsPSIjMGQxMTI4Ii8+PC9zdmc+";
