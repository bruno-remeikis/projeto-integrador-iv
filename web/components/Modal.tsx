type ModalProps = {
  children: React.ReactNode
}

export function Modal({ children }: ModalProps) {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-3 rounded-sm">
        { children }
      </div>
    </div>
  )
}
