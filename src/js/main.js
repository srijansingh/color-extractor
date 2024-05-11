import ImageColorExtractor from "./ImageColorExtractor.js";
const apiKey = process.env.AZURE_API_KEY;
const imageColorExtractors = new ImageColorExtractor(apiKey);

class ColorExtractorApp {
  constructor(imageColorExtractor) {
    this.imageColorExtractor = imageColorExtractor;
    this.colorContainer = document.getElementById("colorContainer");
    this.searchInput = document.getElementById("searchInput");
    this.searchButton = document.getElementById("searchButton");
    this.setupListeners();
  }

  setupListeners() {
    this.searchButton.addEventListener(
      "click",
      this.handleSearchClick.bind(this)
    );
  }

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

  showLoader() {
    const loader = document.createElement("div");
    loader.classList.add("loader");
    this.colorContainer.appendChild(loader);
  }

  hideLoader() {
    const loader = this.colorContainer.querySelector(".loader");
    if (loader) {
      this.colorContainer.removeChild(loader);
    }
  }

  displayNoResultMessage() {
    
    const element = document.createElement("div");
    element.classList.add("no-result-message");
    element.textContent = "No Result Found";
    this.colorContainer.appendChild(element);
  }

  displayErrorMessage() {
    const element = document.createElement("div");
    element.textContent = "Error fetching colors. Please try again later.";
    element.classList.add("error-message");
    this.colorContainer.appendChild(element);
  }

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
