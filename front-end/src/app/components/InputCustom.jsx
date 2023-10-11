export default function InputCustom({type, labelName, placeholder, value, onChange}) {
  return (
    <div className="mb-6">
      <label
        className="block mb-2 text-lg font-medium text-white dark:text-white"
      >
        {labelName}
      </label>
      <input
        type={type}
        className="mt-2 mb-6 shadow-lg bg-[#FE7BE5]/30 border border-[#FE7BE5]  text-white text-sm rounded-lg block w-full p-2.5 placeholder:text-white/70"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}
