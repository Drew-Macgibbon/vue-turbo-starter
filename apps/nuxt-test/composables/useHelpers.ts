function useHelpers() {
  //
  function capatalizeFirstLetters(str: string): string {
    let str2 = str || 'No String'
    if (/[-| |_]+/.test(str2)) {
      const arr = str2.split(/[-| |_]+/)
      
      //loop through each element of the array and capitalize the first letter.
      for (let i = 0; i < arr.length; i++) {
        arr[i] = `${arr[i].charAt(0).toUpperCase()}${arr[i].slice(1)}`
      }
      
      //Join all the elements of the array back into a string 
      //using a blankspace as a separator 
      str2 = arr.join(" ")

    } else str2 = `${str2.charAt(0).toUpperCase()}${str2.slice(1)}`

    //Outptut: I Have Learned Something New Today`
    return str2
  }

  function capitalizeFirstLetter(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1)
  }

  return {
    capatalizeFirstLetters,
    capitalizeFirstLetter,
  }
}

export default useHelpers
