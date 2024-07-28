export const truncateText = (text, maxLength) => {
    if (text)
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};