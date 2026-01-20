const API_BASE_URL = 'http://localhost:8000';

export const getImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x300?text=No+Image";

    // If it's already a full URL, return it
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
        return imagePath;
    }

    // Ensure the path starts with a /
    let normalizedPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;

    // If it's a relative path to an image (no /uploads/ prefix), prepend /uploads
    if (!normalizedPath.startsWith('/uploads/') && !normalizedPath.startsWith('/tester.jpeg')) {
        normalizedPath = `/uploads${normalizedPath}`;
    }

    return normalizedPath;
};

export default API_BASE_URL;
