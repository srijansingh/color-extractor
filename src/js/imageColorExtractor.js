import Vibrant from "./vibrant.min.js";

/**
 * A utility class for extracting dominant colors from images using the Vibrant library.
 */
class ImageColorExtractor {
    /**
     * Creates an instance of ImageColorExtractor.
     * @param {string} apiKey - The API key required for accessing the Bing image search API.
     */
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    /**
     * Fetches images related to a search term from Bing Image Search API.
     * @param {string} searchTerm - The term to search images for.
     * @param {number} [count=10] - The number of images to fetch (default is 10).
     * @returns {Promise<Array>} - A promise that resolves with an array of image URLs and thumbnails.
     */
    async getImageFromBing(searchTerm, count = 10) {
        try {
            const response = await fetch(`https://api.bing.microsoft.com/v7.0/images/search/?q=${encodeURIComponent(searchTerm)}&count=${count}`, {
                headers: {
                    'Ocp-Apim-Subscription-Key': this.apiKey,
                },
            });
            const result = await response.json();
            if (result?.value?.length > 0) {
                const imageUrls = result?.value.map((res) => ({
                  url: res.contentUrl,
                  thumbnail: res.thumbnail,
                }));
                return imageUrls;
            } else {
                return [];
            }
        } catch (error) {
            console.error('Error fetching images from Bing:', error);
            return [];
        }
    }

    /**
     * Extracts the dominant color from an image using the Vibrant library.
     * @param {Object} img - The image object containing URL and thumbnail information.
     * @returns {Promise<Object>} - A promise that resolves with color information (hex value, width, height).
     */
    async getColor(img) {
        const V = await Vibrant.from(img.url);
        const palette = await V.getPalette();    
        const color = await palette.Vibrant.getHex();
        return {
            color,
            width: img.thumbnail.width,
            height: img.thumbnail.height,
        };
    }

    /**
     * Searches images related to a keyword, extracts dominant colors from them, and returns the color information.
     * @param {string} keyword - The keyword to search images for.
     * @param {number} numImages - The number of images to search and extract colors from.
     * @returns {Promise<Array>} - A promise that resolves with an array of color data objects.
     */
    async searchImagesAndExtractColors(keyword, numImages) {
        const images = await this.getImageFromBing(keyword, numImages);
        const colorPromises = images.map((img) => this.getColor(img));
        const results = await Promise.allSettled(colorPromises);

        const dominantColors = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);

        return dominantColors;
    }
}

export default ImageColorExtractor;
