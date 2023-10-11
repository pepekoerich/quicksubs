export default function TranscriptionItem({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}) {
  if (!item) {
    return "";
  }

  return (
    <div className="my-1 grid grid-cols-3 gap-1  items-center">
      <input
        type="text"
        className="rounded-md bg-slate-800/30 text-white/80 p-1 "
        value={item.start_time}
        onChange={handleStartTimeChange}
      />
      <input
        type="text"
        className="rounded-md bg-slate-800/30 text-white/80 p-1"
        value={item.end_time}
        onChange={handleEndTimeChange}
      />
      <input
        type="text"
        className="rounded-md bg-slate-800/30 text-white/80 p-1"
        value={item.content}
        onChange={handleContentChange}
      />
    </div>
  );
}
