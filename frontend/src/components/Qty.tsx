export function Qty({
  value,
  onChange,
  max,
}: {
  value: number
  onChange: (next: number) => void
  max?: number
}) {
  return (
    <div className="qty" role="group" aria-label="Quantity">
      <button type="button" onClick={() => onChange(Math.max(1, value - 1))} aria-label="Decrease quantity">
        −
      </button>
      <span>{value}</span>
      <button
        type="button"
        onClick={() => onChange(max ? Math.min(max, value + 1) : value + 1)}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  )
}
