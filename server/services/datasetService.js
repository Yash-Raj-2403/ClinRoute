/**
 * Dataset Service - Loads and manages medical disease dataset
 */

const fs = require('fs').promises;
const path = require('path');

class DatasetService {
  constructor() {
    this.dataset = [];
    this.isLoaded = false;
    this.datasetPath = path.join(__dirname, '../../Diseases_1000_Symptoms_Balanced.csv');
  }

  /**
   * Load dataset from CSV file
   */
  async loadDataset() {
    try {
      console.log('📊 Loading disease dataset...');
      const csvContent = await fs.readFile(this.datasetPath, 'utf-8');
      const lines = csvContent.split('\n').filter(line => line.trim());
      
      // Skip header
      const dataLines = lines.slice(1);
      
      this.dataset = dataLines.map(line => {
        const columns = this.parseCSVLine(line);
        if (columns.length < 2) return null;
        
        const disease = columns[0];
        const symptoms = columns.slice(1).filter(s => s && s.trim());
        
        return {
          disease,
          symptoms,
          // Create search text combining disease and symptoms
          searchText: `${disease} ${symptoms.join(' ')}`.toLowerCase()
        };
      }).filter(entry => entry !== null);
      
      this.isLoaded = true;
      console.log(`✅ Loaded ${this.dataset.length} diseases`);
      return this.dataset;
    } catch (error) {
      console.error('❌ Error loading dataset:', error);
      throw new Error('Failed to load disease dataset');
    }
  }

  /**
   * Parse CSV line handling quoted values
   */
  parseCSVLine(line) {
    const result = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    
    result.push(current.trim());
    return result;
  }

  /**
   * Get all diseases from dataset
   */
  getAllDiseases() {
    if (!this.isLoaded) {
      throw new Error('Dataset not loaded. Call loadDataset() first.');
    }
    return this.dataset;
  }

  /**
   * Search diseases by symptoms (basic text matching)
   */
  searchBySymptoms(symptoms) {
    if (!this.isLoaded) {
      throw new Error('Dataset not loaded. Call loadDataset() first.');
    }
    
    const searchTerms = symptoms.map(s => s.toLowerCase().trim());
    const matches = [];
    
    for (const entry of this.dataset) {
      let matchCount = 0;
      
      for (const term of searchTerms) {
        if (entry.searchText.includes(term)) {
          matchCount++;
        }
      }
      
      if (matchCount > 0) {
        matches.push({
          ...entry,
          matchScore: matchCount / searchTerms.length
        });
      }
    }
    
    // Sort by match score
    matches.sort((a, b) => b.matchScore - a.matchScore);
    
    return matches;
  }

  /**
   * Get dataset statistics
   */
  getStats() {
    if (!this.isLoaded) {
      return { loaded: false };
    }
    
    return {
      loaded: true,
      totalDiseases: this.dataset.length,
      sampleDisease: this.dataset[0]?.disease
    };
  }
}

// Singleton instance
const datasetService = new DatasetService();

module.exports = datasetService;
