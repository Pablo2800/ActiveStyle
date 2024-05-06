export default function TallesButton({
  talle,
  onClick,
  isSelected,
  isDisabled,
}) {
  return (
    <div>
      <button
        className={`text-lg p-1 m-3 rounded-full border-2 w-12 h-12 flex justify-center items-center ${
          isSelected
            ? "bg-black text-white"
            : isDisabled
            ? "border-gray-300 text-gray-300"
            : "border-black text-black hover:bg-black hover:text-white"
        }`}
        onClick={onClick}
        disabled={isDisabled}
      >
        {talle}
      </button>
    </div>
  );
}
