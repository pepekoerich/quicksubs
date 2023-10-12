export default function clearTranscriptionItems(items) {
  items.forEach((item, key) => {
    if (!item.start_time) {
      const prev = items[key - 1];
      prev.alternatives[0].content += item.alternatives[0].content;
      delete items[key];
    }
  });
  return items.map((item) => {
    const { start_time, end_time } = item;
    const content = item.alternatives[0].content;
    return { start_time, end_time, content };
  });
}

function formatTime(timeString) {
  const time = new Date(parseFloat(timeString) * 1000);
  return time.toISOString().slice(11, 23).replace(".", ",");
}

export function formatTranscriptionItems(items) {
  let srt = "";
  let i = 1;
  items.filter(item => !!item).forEach((item) => {
    // sequencial
    srt += `${i}\n`;
    //timestamps
    const { start_time, end_time } = item;
    srt += `${formatTime(start_time)} --> ${formatTime(end_time)}\n`;
    //content
    srt += `${item.content}\n\n`;
    i++;
  });
  return srt;
}
