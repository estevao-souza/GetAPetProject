// CSS
import './Input.css'

const Input = ({
  type,
  text,
  name,
  placeholder,
  handleOnChange,
  value,
  multiple,
  ref = null,
}) => {
  return (
    <div className="input-control">
      <label htmlFor={name}>{text}</label>
      <input
        type={type}
        name={name}
        id={name}
        placeholder={placeholder}
        onChange={handleOnChange}
        value={value}
        ref={ref}
        {...(multiple ? { multiple } : '')}
      />
    </div>
  )
}

export default Input
