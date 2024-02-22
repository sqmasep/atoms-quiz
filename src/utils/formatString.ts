const specialCharsRegex = /[/' "\-()`.,:;!?€^*%£¤µ§°=+{}[\]|\\<>@#&~_]/g;
const accentRegex = /é|è|ê|à|â|ç|î|ô|ù|û/g;

export function normalizeString(string: string) {
  return string.toLowerCase().trim();
}

export function escapeSpecialChars(string: string) {
  let formattedString = string;

  if (specialCharsRegex.test(formattedString)) {
    formattedString = formattedString.replaceAll(specialCharsRegex, "");
  }

  if (accentRegex.test(formattedString)) {
    formattedString = formattedString.replaceAll(accentRegex, match => {
      switch (match) {
        case "é":
        case "è":
        case "ê":
          return "e";
        case "à":
        case "â":
          return "a";
        case "ç":
          return "c";
        case "î":
          return "i";
        case "ô":
          return "o";
        case "ù":
        case "û":
          return "u";
        default:
          return match;
      }
    });
  }

  return formattedString;
}
