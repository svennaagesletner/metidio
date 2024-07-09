interface Props {
    searchValue: string;
    list: { 
        id: string;
        name: string;
    }[];
    searchBy: string;
}

export const searchFilter = ({searchValue, list, searchBy}:Props): Array<Props['list'][0]> | undefined=> {
    let lowerCaseQuery = searchValue.toLowerCase();
    let filteredList = searchValue
      ? list.filter((item:any) => item[searchBy].toLowerCase().includes(lowerCaseQuery))
      : list;
    return filteredList.length === 0 ? undefined : filteredList;
    
};
  