export default function FaqsQA({ question, answer }) {
  return (
    <div className="p-5">
      <details className="group">
        <summary className="flex justify-between items-center cursor-pointer list-none">
          <span>{question}</span>
          <span className="transition group-open:rotate-180 duration-700">
            <svg
              fill="none"
              height="24"
              shapeRendering="geometricPrecision"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              width="24"
            >
              <path d="M6 9l6 6 6-6"></path>
            </svg>
          </span>
        </summary>
        <p className="text-white mt-3 text-xs p-3 group-open:scale-110 duration-500">
          {answer}
        </p>
      </details>
    </div>
  );
}
