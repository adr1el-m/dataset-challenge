# BLAST Slam 6 Dota 2 Tournament Analysis Plan

## 🗓️ Timeline
- **Tournament Dates:** February 6-15, 2026
- **Analysis Start:** February 15, 2026 (after tournament concludes)
- **Data Source:** Liquipedia + OpenDota API

## 🎯 Refactored Analysis Goals

### Primary Questions to Answer
1. **Why did the champion win?** - Draft patterns, hero preferences, tempo control
2. **Key turning points** - What matches/moments defined the tournament?
3. **Team-specific insights** - What made each team's playstyle unique?
4. **Meta analysis** - Most picked/banned heroes, successful strategies
5. **Upset analysis** - Why did favorites lose? What went wrong?

## 📊 Data to Collect (Post-Tournament)

### From Liquipedia
- [ ] Final standings & bracket results
- [ ] All match scores
- [ ] Team rosters
- [ ] Prize pool distribution

### From OpenDota API
- [ ] Match IDs for all BLAST Slam 6 games
- [ ] Draft data (picks/bans per match)
- [ ] Match durations
- [ ] Gold/XP graphs (10-min differentials)
- [ ] Tower/Roshan timings
- [ ] Player performances (KDA, net worth)

## 🔍 Planned Analysis Sections

### 1. Tournament Overview
- Format breakdown
- Participating teams
- Group stage results
- Playoff bracket

### 2. Champion Deep Dive
- Road to victory (all matches)
- Signature heroes
- Draft tendencies
- Win conditions (early/mid/late game focus)

### 3. Hero Meta Analysis
- Most contested heroes (pick + ban rate)
- Hero win rates in tournament
- Surprise picks that worked
- Failed strategies

### 4. Team Comparisons
- Playstyle fingerprints (tempo vs draft-focused)
- Average game duration per team
- First blood/tower statistics
- Comeback vs stomp ratios

### 5. Key Storylines
- Biggest upsets
- Closest games (gold graphs)
- Standout player performances
- Defining moments

## 📈 Visualizations Planned
- [ ] Tournament bracket with match scores
- [ ] Hero pick/ban heatmap
- [ ] Team playstyle radar charts
- [ ] Gold differential timeline (key matches)
- [ ] Win probability swings for close games

## 🛠️ Technical Approach

```python
# Pseudo-code for data collection
BLAST_SLAM_6_LEAGUE_ID = TBD  # Get from OpenDota after tournament

# Fetch all tournament matches
matches = opendota.get_matches(league_id=BLAST_SLAM_6_LEAGUE_ID)

# For each match, get detailed data
for match in matches:
    details = opendota.get_match(match_id)
    # Extract: picks, bans, gold_advantage, xp_advantage, objectives
```

## ✅ Pre-Tournament Checklist
- [x] Initial notebook structure created
- [x] Git repository set up
- [ ] Wait for tournament to conclude (Feb 15)
- [ ] Collect all match IDs
- [ ] Run full analysis
- [ ] Generate insights and visualizations

## 📝 Notes
- Tournament URL: https://liquipedia.net/dota2/BLAST/Slam/6
- Will need to find BLAST Slam 6 league ID in OpenDota after matches are played
- Consider using Liquipedia API or scraping for bracket/roster data

---
*Analysis will begin after February 15, 2026*
