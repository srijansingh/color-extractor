import Vibrant from "./vibrant.min.js";

class ImageColorExtractor {
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

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

    async searchImagesAndExtractColors(keyword, numImages) {
        const images = await this.getImageFromBing(keyword, numImages);
        console.log({images})
        const colorPromises = images.map((img) => this.getColor(img));
        const results = await Promise.allSettled(colorPromises);

        const dominantColors = results
            .filter((result) => result.status === "fulfilled")
            .map((result) => result.value);

        return dominantColors;
    }
}

export default ImageColorExtractor;
