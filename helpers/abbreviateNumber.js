function abbreviateNumber(value) {
    let newValue = value;
    const suffixes = ["", "K", "M", "B", "T"];
    let suffixNum = 0;
    while (newValue >= 1000) {
      newValue /= 1000;
      suffixNum++;
    }
    newValue = newValue.toPrecision(1);
    if (Number.isInteger(newValue)) newValue = parseInt(newValue)
    newValue += suffixes[suffixNum];
    return newValue;
  }

  module.exports = abbreviateNumber