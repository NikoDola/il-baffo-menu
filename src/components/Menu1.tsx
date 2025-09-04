// Menu.tsx - Part 1: Imports, Interface, and State

"use client";
import Image from "next/image";
import "./Menu1.css"; // Ensure your CSS file is correctly linked and exists
import Link from "next/link";
import { useEffect, useState } from "react";
import SuggestionModal from '@/components/SuggestionModal';

// Define the updated type for a single menu item
interface MenuType {
  name: string;
  description: string[];
  price: number | number[];
  category: string;
  meal_type: string; // Added meal_type property
  suggestions?: { // Updated suggestions structure
    pairs_with_categories?: string[];
    before_categories?: string[];
    after_categories?: string[];
    upsell_notes?: string[];
  };
}

// The main Menu component
export default function Menu() {
  // State to hold the entire menu data, initialized as an empty array
  const [menu, setMenu] = useState<MenuType[]>([]);
  // State to manage the current language, defaulting to Macedonian ('mk')
  const [language, setLanguage] = useState("mk");
  // State to control the visibility and content of the suggestion modal
  // It will store the item for which suggestions are requested, or null if no modal is open.
  const [selectedItemForSuggestions, setSelectedItemForSuggestions] = useState<MenuType | null>(null);

  // useEffect hook to fetch menu data whenever the language state changes
  useEffect(() => {
    async function getData() {
      try {
        const jsonFilePath = `/menu-${language}.json`;
        console.log(`Attempting to fetch: ${jsonFilePath}`);

        const response = await fetch(jsonFilePath);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} from ${jsonFilePath}`);
        }

        const data = await response.json();
        console.log(`Fetched data for ${language}:`, data);
        setMenu(data);
      } catch (error) {
        console.error("Failed to fetch menu data:", error);
        setMenu([]); // Clear the menu to reflect an error state
      }
    }
    getData(); // Call the async function to fetch data
  }, [language]); // Dependency array: this effect re-runs when 'language' state changes

  // Function to open the suggestion modal for a given item
  const openSuggestionModal = (item: MenuType) => {
    setSelectedItemForSuggestions(item);
  };

  // Function to close the suggestion modal
  const closeSuggestionModal = () => {
    setSelectedItemForSuggestions(null);
  };

  // Group menu items by their category for easier rendering
  // This uses the `reduce` method to transform the flat `menu` array
  // into an object where keys are categories and values are arrays of MenuType items.
  const menuByCategory = menu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, MenuType[]>);

// Menu.tsx - Part 2: JSX for Menu Display and "See Suggestion" Button

  return (
    <div className="menuWrapper">
      {/* Logo Section */}
      <div className="logoWrapper">
        <Image
          src={"/images/branding/il-baffo_logo-white.svg"}
          width={300}
          height={100}
          alt="il-baffo logo"
          priority // Prioritize loading of the logo image for LCP
        />
      </div>

      {/* Language Selection Section */}
      <div className="languagesWrapper">
        {/* Macedonian Flag */}
        <Image
          className={language === "mk" ? "languageSelected" : "language"}
          onClick={() => setLanguage("mk")}
          src={"/images/flags/mk.svg"}
          width={30}
          height={30}
          alt="macedonian language flag"
        />
        {/* English Flag */}
        <Image
          className={language === "eng" ? "languageSelected" : "language"}
          onClick={() => setLanguage("eng")}
          src={"/images/flags/eng.svg"}
          width={30}
          height={30}
          alt="english language flag"
        />
        {/* Albanian Flag */}
        <Image
          className={language === "alb" ? "languageSelected" : "language"}
          onClick={() => setLanguage("alb")}
          src={"/images/flags/alb.svg"}
          width={30}
          height={30}
          alt="albanian language flag"
        />
        {/* Greek Flag */}
        <Image
          className={language === "gr" ? "languageSelected" : "language"}
          onClick={() => setLanguage("gr")}
          src={"/images/flags/gr.svg"}
          width={30}
          height={30}
          alt="greek language flag"
        />
        {/* Italian Flag */}
        <Image
          className={language === "ita" ? "languageSelected" : "language"}
          onClick={() => setLanguage("ita")}
          src={"/images/flags/ita.svg"}
          width={30}
          height={30}
          alt="italian language flag"
        />
      </div>

      {/* Menu Items Display Section */}
      <div className="menuItemsWrapper">
        {/* Check if there are any categories to display after data is loaded */}
        {Object.keys(menuByCategory).length > 0 ? (
          // Iterate over each category and its items
          Object.entries(menuByCategory).map(([category, items]) => (
            <div className="categorySection" key={category}>
              {/* Display the category title */}
              <h2 className="categoryTitle">{category}</h2>
              {/* Iterate over each item within the current category */}
              {items.map((item, index) => {
                // Determine if the item has any suggestions defined
                const hasSuggestions = item.suggestions &&
                                       (item.suggestions.pairs_with_categories?.length ||
                                        item.suggestions.before_categories?.length ||
                                        item.suggestions.after_categories?.length);

                return (
                  <div className="menuItemWrapper" key={index}>
                    <h3 className="itemName">{item.name}</h3>
                    <div className="descriptionWrapper">
                      {item.description.map((desc, i) => (
                        <span className="descriptionItem" key={i}>
                          {desc}
                          {/* Add a comma and space if it's not the last description item */}
                          {i < item.description.length - 1 ? ", " : ""}
                        </span>
                        
                      ))}
                    </div>
                    <div className="priceBox">
                      <span className="priceCurrency">ден</span>
                      <span className="priceValue">
                      
                        {Array.isArray(item.price)
                          ? item.price.join(" / ")
                          : item.price}
                      </span>
                    </div>
                                     {hasSuggestions ? (
                      // When clicked, open the modal and pass the current item
                      <div className="seeSuggestionButton" onClick={() => openSuggestionModal(item)}>
                        What Goes With {item.name}?
                      </div>
                    ) : (
                      // Optionally, display nothing or a placeholder if no suggestions
                      <div className="noSuggestionPlaceholder"></div> // Added for consistent spacing, if needed
                    )}
                  </div>
                );
              })}
            </div>
          ))
        ) : (
          // Display a loading message if no menu items are loaded yet or fetching failed
          <p className="loadingText">Loading...</p>
        )}
      </div>

      {/* Phone Number Link */}
      <Link href="tel:+38978669092" className="phoneNumber">
        {/* Display phone number based on selected language */}
        {language === "mk" && <span>📞 Јави се на: 078-669-092</span>}
        {language === "eng" && <span>📞 Call us: 078-669-092</span>}
        {language === "alb" && <span>📞 Na telefononi: 078-669-092</span>}
        {language === "gr" && <span>📞 Καλέστε μας: 078-669-092</span>}
        {language === "ita" && <span>📞 Chiamaci: 078-669-092</span>}
      </Link>

      {/* Suggestion Modal Component - only rendered if selectedItemForSuggestions is not null */}
      {selectedItemForSuggestions && (
        <SuggestionModal
          item={selectedItemForSuggestions}
          menuData={menu} // Pass the entire menu data for filtering
          onClose={closeSuggestionModal}
        />
      )}
    </div>
  );
}