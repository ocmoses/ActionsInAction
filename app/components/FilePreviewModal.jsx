import React from "react"
import PropTypes from "prop-types"

function FilePreviewModal({ file, filePath, closeModal }) {
  const fileExtension = file
    ? file.name.split(".").pop().toLowerCase()
    : filePath.split(".").pop().toLowerCase()
  const isPdf = fileExtension === "pdf"
  const isDoc = ["doc", "docx"].includes(fileExtension)
  const isVideo = ["mp4", "webm", "ogg"].includes(fileExtension)
  const isAudio = ["mp3", "wav", "ogg"].includes(fileExtension)

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg overflow-hidden h-5/6 w-5/6">
        <div className="flex items-center justify-between bg-gray-200 px-4 py-3">
          <h2 className="text-lg font-medium">File Preview</h2>
          <button
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
            onClick={closeModal}
          >
            <svg className="h-6 w-6 fill-current" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10.707 9.293a1 1 0 0 0-1.414 0L7.586 11.5H3a1 1 0 1 0 0 2h4.586l1.707 1.707a1 1 0 0 0 1.414-1.414L9.414 12l1.293-1.293a1 1 0 0 0 0-1.414z"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2">
          {isPdf && (
            <embed
              className="preview"
              src={file ? URL.createObjectURL(file) : filePath}
              type="application/pdf"
            />
          )}
          {isDoc && (
            <iframe
              className="preview"
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                file ? URL.createObjectURL(file) : filePath
              )}`}
            />
          )}
          {isVideo && (
            <video className="preview" controls>
              <source src={filePath} type={`video/${fileExtension}`} />
            </video>
          )}
          {isAudio && (
            <audio className="preview" controls>
              <source src={filePath} type={`audio/${fileExtension}`} />
            </audio>
          )}
        </div>
      </div>
    </div>
  )
}

FilePreviewModal.propTypes = {
  file: PropTypes.object,
  filePath: PropTypes.string,
  closeModal: PropTypes.func.isRequired,
}

export default FilePreviewModal
