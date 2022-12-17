function ButtonSolid({ label, Component, handleClick }) {
  return (
    <button
      onClick={handleClick ?? null}
      className="rounded-full flex justify-between items-center bg-mtn hover:bg-mtn-400 transition ease-in-out 5000 text-xl mr-4 pl-6 pr-3 py-2"
    >
      {label ?? 'Button'}{' '}
      {Component && <Component iconClass="w-12 h-12 ml-4" />}
    </button>
  )
}

export default ButtonSolid
