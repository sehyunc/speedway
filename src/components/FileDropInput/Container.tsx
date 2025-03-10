import FileDropInputComponent from "./Component"
import { useState } from "react"
import { fileToBase64 } from "../../utils/files"
import { objectToBase64 } from "../../utils/object"

interface FileDropInputContainerProps {
  onChange: (value: string) => void
  onRemove: Function
  onSizeError: Function
}

function FileDropInputContainer({
  onChange,
  onSizeError,
  onRemove,
}: FileDropInputContainerProps) {
  const [hasFile, setHasFile] = useState(false)

  async function onInput(file: File) {
    const base64File = await fileToBase64(file)
    onChange(objectToBase64({ base64File, fileName: file.name }))
  }

  return (
    <FileDropInputComponent
      onRemove={onRemove}
      onSizeError={onSizeError}
      setHasFile={setHasFile}
      onInput={(file: any) => {
        setHasFile(true)
        onInput(file)
      }}
      hasFile={hasFile}
    />
  )
}

export default FileDropInputContainer
