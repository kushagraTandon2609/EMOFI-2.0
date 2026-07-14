interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

export default function Input({
  className = "",
  ...props
}: InputProps) {
  return (
    <input
      className={`w-full rounded-xl border border-gray-300 px-4 py-3 outline-none transition focus:border-violet-500 ${className}`}
      {...props}
    />
  );
}