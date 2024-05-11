/**
 * Represents an application for extracting and displaying colors from images using the ImageColorExtractor class.
 */
import ImageColorExtractor from "./ImageColorExtractor.js";
const apiKey = process.env.AZURE_API_KEY;
const imageColorExtractors = new ImageColorExtractor(apiKey);

class ColorExtractorApp {
  /**
   * Creates an instance of ColorExtractorApp.
   * @param {ImageColorExtractor} imageColorExtractor - The ImageColorExtractor instance to use for color extraction.
   */
  constructor(imageColorExtractor) {
    this.imageColorExtractor = imageColorExtractor;
    this.colorContainer = document.getElementById("colorContainer");
    this.searchInput = document.getElementById("searchInput");
    this.searchButton = document.getElementById("searchButton");
    this.setupListeners();
  }

  /**
   * Sets up event listeners for the search button.
   */
  setupListeners() {
    this.searchButton.addEventListener(
      "click",
      this.handleSearchClick.bind(this)
    );
  }

  /**
   * Handles the click event on the search button.
   * Triggers color extraction based on the search term entered by the user.
   */
  async handleSearchClick() {
    const searchTerm = this.searchInput.value.trim();
    this.colorContainer.innerHTML = ""; // Clear previous color blocks
    this.showLoader();
    if (searchTerm !== "") {
      try {
        const colors =
          await this.imageColorExtractor.searchImagesAndExtractColors(
            searchTerm,
            20
          );
        // Hide loader after fetching colors
        this.hideLoader();

        if (colors.length === 0) {
          this.displayNoResultMessage();
        } else {
          this.displayColors(colors);
        }
      } catch (error) {
        console.error("Error fetching colors:", error);
        this.hideLoader();
        this.displayErrorMessage();
      }
    }
  }

  /**
   * Displays a loader while fetching colors.
   */
  showLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    this.colorContainer.appendChild(loader);
  }

  /**
   * Hides the loader once colors are fetched.
   */
  hideLoader() {
    const loader = this.colorContainer.querySelector(".loader");
    if (loader) {
      this.colorContainer.removeChild(loader);
    }
  }

  /**
   * Displays a message when no results are found.
   */
  displayNoResultMessage() {
    const element = document.createElement("div");
    element.classList.add("no-result-message");
    element.textContent = "No Result Found";
    this.colorContainer.appendChild(element);
  }

  /**
   * Displays an error message when there's an issue fetching colors.
   */
  displayErrorMessage() {
    const element = document.createElement("div");
    element.textContent = "Error fetching colors. Please try again later.";
    element.classList.add("error-message");
    this.colorContainer.appendChild(element);
  }

  /**
   * Displays the extracted colors in color cards.
   * @param {Array} colors - An array of color data objects to display.
   */
  displayColors(colors) {
    colors.forEach((colorData) => {
      const colorCard = document.createElement("div");
      colorCard.classList.add("card");
      colorCard.style.backgroundColor = colorData.color;
      const colorInfo = document.createElement("p");
      colorInfo.classList.add("card-content");
      colorInfo.textContent = `${colorData.color}`;

      colorCard.appendChild(colorInfo);
      this.colorContainer.appendChild(colorCard);
    });
  }
}

const colorExtractorApp = new ColorExtractorApp(imageColorExtractors);
