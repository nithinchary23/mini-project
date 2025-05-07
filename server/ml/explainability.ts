// This file contains the functions for model explainability

import { getFeatureImportance } from './prediction';

/**
 * Returns SHAP or LIME explanation for a specific prediction
 */
export async function getModelExplanation(patientId: string) {
  // In a real app, this would generate actual SHAP/LIME explanations
  // For demonstration, we get the feature importance and convert to explanation
  const featureImportance = await getFeatureImportance(patientId);
  
  // Convert feature importance to visual explanation data
  const shapValues = featureImportance.map(feature => ({
    feature: feature.feature,
    shapValue: (feature.importance / 100) * (Math.random() > 0.5 ? 1 : -1) * 2,
    importance: feature.importance
  }));
  
  // Sort by absolute SHAP value
  shapValues.sort((a, b) => Math.abs(b.shapValue) - Math.abs(a.shapValue));
  
  return {
    method: 'SHAP',
    patientId,
    baseValue: 0.5, // Base prediction value (e.g., 0.5 for binary classification)
    shapValues,
    featureDistributions: [
      {
        feature: 'Genetic Compatibility',
        distribution: Array.from({ length: 10 }, () => Math.random() * 100)
      },
      {
        feature: 'Immune Response Profile',
        distribution: Array.from({ length: 10 }, () => Math.random() * 100)
      },
      {
        feature: 'Organ Health Metrics',
        distribution: Array.from({ length: 10 }, () => Math.random() * 100)
      },
      {
        feature: 'Patient Health History',
        distribution: Array.from({ length: 10 }, () => Math.random() * 100)
      }
    ]
  };
}

/**
 * Returns a summary explanation for a prediction in natural language
 */
export async function getNaturalLanguageExplanation(patientId: string) {
  // In a real app, this would generate an actual NL explanation
  // For demonstration, we return a template-based explanation
  
  const featureImportance = await getFeatureImportance(patientId);
  
  // Get the most important feature
  const topFeature = featureImportance[0];
  
  // Generate a human-readable explanation
  let explanation = `This transplant has a `;
  
  if (topFeature.importance > 30) {
    explanation += `strong compatibility profile mainly due to favorable ${topFeature.feature.toLowerCase()} (${topFeature.importance}% importance). `;
  } else {
    explanation += `moderate compatibility profile with ${topFeature.feature.toLowerCase()} being the most significant factor (${topFeature.importance}% importance). `;
  }
  
  explanation += `Secondary factors include ${featureImportance[1].feature.toLowerCase()} (${featureImportance[1].importance}%) and ${featureImportance[2].feature.toLowerCase()} (${featureImportance[2].importance}%).`;
  
  return {
    summary: explanation,
    detailedFactors: featureImportance.map(feature => ({
      factor: feature.feature,
      explanation: `This factor contributes ${feature.importance}% to the overall prediction. The patient's value of "${feature.value}" is ${feature.importance > 25 ? 'highly favorable' : 'moderately favorable'} for transplant success.`
    }))
  };
}
