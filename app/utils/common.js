export const mergeWords = (data) => {
  const input = JSON.parse(JSON.stringify(data));
  const output = [];
  let word = "",
    start = input[0].start;
  for (let i = 0; i < input.length; i++) {
    if (i + 1 === input.length) {
      output.push({ start, end: input[i].end, word: word + input[i].word });
      break;
    }
    if (input[i].end === input[i + 1].start) {
      word += input[i].word + " ";
    } else {
      output.push({ start, end: input[i + 1].start, word: word + input[i].word });
      word = "";
      start = input[i + 1].start;
    }
  }
  return output;
};
export const splitTimeSeries = (data, intervalLength = 2.0) => {
  const inputList = JSON.parse(JSON.stringify(data));
  const output = [];
  for (const interval of inputList) {
    const start = interval.start;
    const end = interval.end;
    const series = [];
    let currentStart = start;
    while (currentStart < end) {
      let currentEnd = Math.min(currentStart + intervalLength, end);
      // If the remaining duration is less than the interval length, merge it with the previous interval
      if (series.length > 0 && currentEnd - currentStart < intervalLength) {
        series[series.length - 1].end = currentEnd; // Merge with the previous interval
      } else {
        series.push({ start: currentStart, end: currentEnd });
      }
      currentStart = currentEnd;
    }
    output.push({
      start: start,
      end: end,
      series: series,
      word: interval.word,
    });
  }
  return output;
};
export const getSubtitleWithImageIndex = (inputList) => {
  const data = JSON.parse(JSON.stringify(inputList));
  let count = 0;
  const subtitleWithImageIndex = [];

  for (let item of data) {
    item.index = [];
    for (let i = 0; i < item.series.length; i++) {
      const series = item.series[i];
      series.index = count;
      subtitleWithImageIndex.push({ ...series }); // Create a shallow copy
      item.index.push(count);
      count++;
    }
  }
  return subtitleWithImageIndex;
};
