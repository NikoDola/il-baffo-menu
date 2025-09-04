// components/SuggestionModal.tsx
"use client";
import React from 'react';


import './SuggestionModal.css'; // You'll need to create this CSS file

// Redefine MenuType interface here as well for consistency
interface MenuType {
  name: string;
  description: string[];
  price: number | number[];
  category: string;
  meal_type: string;
  suggestions?: {
    pairs_with_categories?: string[];
    before_categories?: string[];
    after_categories?: string[];
    upsell_notes?: string[];
  };
}

interface SuggestionModalProps {
  item: MenuType; // The item for which suggestions are being displayed
  menuData: MenuType[]; // The entire menu data to filter suggestions from
  onClose: () => void; // Function to close the modal
}

export default function SuggestionModal({ item, menuData, onClose }: SuggestionModalProps) {
  if (!item || !item.suggestions) {
    return null; // Don't render if no item or no suggestions
  }

  // Helper function to filter menu items by category
  const getSuggestedItems = (categories: string[] | undefined) => {
    if (!categories || categories.length === 0) {
      return [];
    }
    // Filter the entire menuData to find items whose category is in the provided list
    return menuData.filter(menuItem => categories.includes(menuItem.category));
  };

  const pairsWithItems = getSuggestedItems(item.suggestions.pairs_with_categories);
  const beforeItems = getSuggestedItems(item.suggestions.before_categories);
  const afterItems = getSuggestedItems(item.suggestions.after_categories);

  return (
    <div className="suggestionModalOverlay" onClick={onClose}> {/* Click overlay to close */}
      <div className="suggestionModalContent" onClick={(e) => e.stopPropagation()}> {/* Prevent clicks inside from closing */}
        <button className="closeModalButton" onClick={onClose}>&times;</button>
        <h2>Suggestions for {item.name}</h2>

        {item.suggestions.upsell_notes && item.suggestions.upsell_notes.length > 0 && (
          <div className="upsellNotes">
            {item.suggestions.upsell_notes.map((note, i) => (
              <p key={i}>{note}</p>
            ))}
          </div>
        )}

        {pairsWithItems.length > 0 && (
          <div className="suggestionCategory">
            <h3>Pairs Well With:</h3>
            <ul>
              {pairsWithItems.map((suggestedItem, i) => (
                <li key={i}>
                  {suggestedItem.name} - {Array.isArray(suggestedItem.price) ? suggestedItem.price.join(" / ") : suggestedItem.price} ден
                  <span className="suggestedDescription"> ({suggestedItem.description.join(', ')})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {beforeItems.length > 0 && (
          <div className="suggestionCategory">
            <h3>Before Your Meal:</h3>
            <ul>
              {beforeItems.map((suggestedItem, i) => (
                <li key={i}>
                  {suggestedItem.name} - {Array.isArray(suggestedItem.price) ? suggestedItem.price.join(" / ") : suggestedItem.price} ден
                  <span className="suggestedDescription"> ({suggestedItem.description.join(', ')})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {afterItems.length > 0 && (
          <div className="suggestionCategory">
            <h3>After Your Meal:</h3>
            <ul>
              {afterItems.map((suggestedItem, i) => (
                <li key={i}>
                  {suggestedItem.name} - {Array.isArray(suggestedItem.price) ? suggestedItem.price.join(" / ") : suggestedItem.price} ден
                  <span className="suggestedDescription"> ({suggestedItem.description.join(', ')})</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* If no suggestions are found but the button was clicked */}
        {!pairsWithItems.length && !beforeItems.length && !afterItems.length && (
          <p>No specific suggestions found for this item.</p>
        )}
      </div>
    </div>
  );
}