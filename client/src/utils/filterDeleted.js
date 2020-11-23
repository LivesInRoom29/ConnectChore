const filterDeleted = (array) => {
    const undeletedArray = [];

    // if there are elements in the array
    if (array.length) {
        // loop through the array; if the isDeleted property is false on the element,
        //add it to the undeletedArray
        array.forEach(element => {
            if (!element.isDeleted) {
                undeletedArray.push(element);
            }
        });
        return undeletedArray;
    } else {
      return array;
    }
}

export default filterDeleted;