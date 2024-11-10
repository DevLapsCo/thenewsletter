export function convertToTitleCase(str: string) {
    // Step 1: Split the string into words
    // This regex splits on capital letters and underscores
    const words = str.split(/(?=[A-Z])|_/).filter(word => word !== '');

    // Step 2: Capitalize the first letter of each word and make the rest lowercase
    const titleCaseWords = words.map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

    // Step 3: Join the words back together with spaces
    return titleCaseWords.join(' ');
  }
