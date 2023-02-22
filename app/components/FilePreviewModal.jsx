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
      <div className="bg-white rounded-lg overflow-hidden h-[95%] w-[95%] max-w-[1158px] mx-auto">
        <div className="flex items-center justify-between px-4 py-3  bg-[#030303]">
          <h2 className="text-lg font-bold font-mtn">File Preview</h2>
          <button
            className="text-red-500 hover:text-white focus:outline-none"
            onClick={closeModal}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="px-4 py-2 w-full h-full">
          {isPdf && (
            <embed
              className="preview"
              style={{ width: "100%", height: "100%" }}
              src={file ? URL.createObjectURL(file) : filePath}
              type="application/pdf"
            />
          )}
          {isDoc && (
            <iframe
              className="preview"
              style={{ width: "100%", height: "100%" }}
              src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(
                file ? URL.createObjectURL(file) : filePath
              )}`}
            />
          )}
          {isVideo && (
            <video
              className="preview"
              style={{ width: "100%", height: "100%" }}
              controls
            >
              <source src={filePath} type={`video/${fileExtension}`} />
            </video>
          )}
          {isAudio && (
            <audio
              className="preview"
              style={{ width: "100%", height: "100%" }}
              controls
            >
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
