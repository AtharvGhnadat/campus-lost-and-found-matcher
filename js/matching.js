/**
 * Campus Lost-and-Found Matcher — Rule-Based Matching Engine
 * Implements a 100-point transparent heuristic scoring system:
 * 1. Category Match: 35 pts
 * 2. Description Keyword Overlap (Stopwords filtered): up to 30 pts
 * 3. Location Similarity: up to 20 pts
 * 4. Date Proximity: up to 15 pts
 * Total: Max 100 points
 */

const MatchingEngine = {
  // Common stopwords to exclude from description keyword matching
  STOPWORDS: new Set([
    'a', 'an', 'the', 'and', 'or', 'but', 'if', 'because', 'as', 'what',
    'which', 'this', 'that', 'these', 'those', 'then', 'so', 'than', 'such',
    'both', 'through', 'about', 'for', 'is', 'of', 'while', 'during', 'to',
    'from', 'in', 'out', 'on', 'off', 'again', 'further', 'then', 'once',
    'here', 'there', 'when', 'where', 'why', 'how', 'all', 'any', 'both',
    'each', 'few', 'more', 'most', 'other', 'some', 'no', 'nor', 'not',
    'only', 'own', 'same', 'so', 'than', 'too', 'very', 'can', 'will',
    'just', 'should', 'now', 'lost', 'found', 'left', 'near', 'table', 'behind'
  ]),

  /**
   * Tokenize and normalize text, removing punctuation and common stopwords
   */
  extractKeywords(text) {
    if (!text || typeof text !== 'string') return [];
    
    // Clean and split into alphanumeric tokens
    const tokens = text
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(token => token.length > 2 && !this.STOPWORDS.has(token));

    return Array.from(new Set(tokens)); // Unique tokens
  },

  /**
   * Calculate difference in days between two YYYY-MM-DD date strings
   */
  calculateDayDifference(dateStr1, dateStr2) {
    if (!dateStr1 || !dateStr2) return 999;
    const d1 = new Date(dateStr1);
    const d2 = new Date(dateStr2);
    if (isNaN(d1) || isNaN(d2)) return 999;
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  },

  /**
   * Evaluate a single pair: (Lost Report, Found Report)
   * Returns score (0-100) and itemized breakdown
   */
  evaluatePair(lostReport, foundReport) {
    const breakdown = {
      categoryScore: 0,
      keywordScore: 0,
      locationScore: 0,
      dateScore: 0,
      totalScore: 0,
      matchedKeywords: [],
      reasons: []
    };

    // 1. Category Match (35 Points Max)
    if (lostReport.category && foundReport.category) {
      if (lostReport.category.trim().toLowerCase() === foundReport.category.trim().toLowerCase()) {
        breakdown.categoryScore = 35;
        breakdown.reasons.push(`Exact Category Match: "${lostReport.category}" (+35 pts)`);
      } else {
        breakdown.reasons.push(`Different Categories (${lostReport.category} vs ${foundReport.category}) (+0 pts)`);
      }
    }

    // 2. Keyword Similarity (30 Points Max)
    const combinedLostText = `${lostReport.title} ${lostReport.description} ${lostReport.identifyingTraits || ''}`;
    const combinedFoundText = `${foundReport.title} ${foundReport.description} ${foundReport.safeLocation || ''}`;
    
    const lostTokens = this.extractKeywords(combinedLostText);
    const foundTokens = this.extractKeywords(combinedFoundText);

    if (lostTokens.length > 0 && foundTokens.length > 0) {
      const foundTokenSet = new Set(foundTokens);
      const overlapping = lostTokens.filter(token => foundTokenSet.has(token));
      breakdown.matchedKeywords = overlapping;

      if (overlapping.length > 0) {
        // Overlap ratio using min length for realistic practical match
        const minTokens = Math.min(lostTokens.length, foundTokens.length);
        const overlapRatio = Math.min(overlapping.length / Math.max(minTokens * 0.7, 1), 1.0);
        breakdown.keywordScore = Math.round(overlapRatio * 30);
        breakdown.reasons.push(`Description Keyword Overlap: [${overlapping.join(', ')}] (+${breakdown.keywordScore} pts)`);
      } else {
        breakdown.reasons.push('No significant shared descriptive keywords (+0 pts)');
      }
    } else {
      breakdown.reasons.push('Insufficient text for keyword comparison (+0 pts)');
    }

    // 3. Location Similarity (20 Points Max)
    const loc1 = (lostReport.location || '').trim().toLowerCase();
    const loc2 = (foundReport.location || '').trim().toLowerCase();

    if (loc1 && loc2) {
      if (loc1 === loc2) {
        breakdown.locationScore = 20;
        breakdown.reasons.push(`Exact Campus Location Match: "${lostReport.location}" (+20 pts)`);
      } else if (loc1.includes(loc2) || loc2.includes(loc1)) {
        breakdown.locationScore = 12;
        breakdown.reasons.push(`Partial Campus Zone Proximity: "${lostReport.location}" & "${foundReport.location}" (+12 pts)`);
      } else {
        breakdown.reasons.push(`Distinct Locations: "${lostReport.location}" vs "${foundReport.location}" (+0 pts)`);
      }
    } else {
      breakdown.reasons.push('Location details unspecified (+0 pts)');
    }

    // 4. Date Proximity (15 Points Max)
    const dayDiff = this.calculateDayDifference(lostReport.date, foundReport.date);
    if (dayDiff === 0) {
      breakdown.dateScore = 15;
      breakdown.reasons.push('Reported on the same calendar day (+15 pts)');
    } else if (dayDiff <= 2) {
      breakdown.dateScore = 12;
      breakdown.reasons.push(`Incident dates within ${dayDiff} day(s) of each other (+12 pts)`);
    } else if (dayDiff <= 5) {
      breakdown.dateScore = 8;
      breakdown.reasons.push(`Incident dates within ${dayDiff} days (+8 pts)`);
    } else if (dayDiff <= 10) {
      breakdown.dateScore = 4;
      breakdown.reasons.push(`Incident dates within ${dayDiff} days (+4 pts)`);
    } else {
      breakdown.dateScore = 0;
      breakdown.reasons.push(`Dates separated by ${dayDiff} days (+0 pts)`);
    }

    // Total Score Calculation (Capped at 100)
    breakdown.totalScore = Math.min(
      breakdown.categoryScore + breakdown.keywordScore + breakdown.locationScore + breakdown.dateScore,
      100
    );

    return breakdown;
  },

  /**
   * Evaluate all pairs of Lost vs Found items
   * Optional lostId parameter to filter matches for a specific lost item
   */
  findMatches(reports, targetLostId = null) {
    const lostReports = reports.filter(r => r.type === 'lost' && r.status !== 'Resolved');
    const foundReports = reports.filter(r => r.type === 'found' && r.status !== 'Resolved');

    const matches = [];

    const activeLost = targetLostId
      ? lostReports.filter(r => r.id === targetLostId)
      : lostReports;

    for (const lost of activeLost) {
      for (const found of foundReports) {
        const evaluation = this.evaluatePair(lost, found);
        
        // Include candidates with at least some similarity (score >= 20)
        if (evaluation.totalScore >= 20) {
          matches.push({
            lost,
            found,
            score: evaluation.totalScore,
            breakdown: evaluation
          });
        }
      }
    }

    // Sort descending by total score
    return matches.sort((a, b) => b.score - a.score);
  }
};

window.MatchingEngine = MatchingEngine;
