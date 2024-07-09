interface Props {
        item: string[];
        language: "norwegian";
}

type Mappings = {
    [key: string]: {[key: string]: string};
};

const mappings: Mappings = {
    norwegian: {
        Guest: "Gjest",
        Teacher: "Lærer",
        SchoolAdmin: "Skoleadministrator", 
        Adviser: "Rådgiver",
        SchoolLeader: "Skoleleder",
        MunicipalityAdmin: "Kommuneadministrator",
        SuperAdmin: "Superbruker"
    }

  
  }


export function TranslateKeysToLanguage({ item, language }: Props): string[] {
    if (Array.isArray(item)) {
        if (language) return Object.values(mappings[language]);
    } 
    return item

}


export function TranslateLanguageToKey(word: string, language: string): string | undefined {
    return Object.keys(mappings[language]).find(key => mappings[language][key] === word);
}

export function TranslateKeyToLanguage({ key, language }:{key: string, language: string}){
    if (key) {
        const output = mappings[language][key]
        return output
    } else {
        return "not found"
    }
}