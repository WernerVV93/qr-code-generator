import QRCode from "qrcode.react";
import { useState } from "react";
import { saveAs } from "file-saver";
import "./QrCode.css";

export default function QrCode() {
  const [text, setText] = useState("");

  const [generated, setGenerated] = useState(false);

  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  const handleGenerate = () => {
    if (!generated && text) {
      setGenerated(true);
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob(function (blob) {
      saveAs(blob, `${text}.png`);
    });
  };

  const handleClear = () => {
    setText("");
    // setNumber("");
    setGenerated(false);
  };

  return (
    <div className="QrCode">
      <h2 className="Qr-header">QR Code Generator</h2>
      <input
        className="Box"
        type="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter Box Name"
        disabled={generated}
      />

      <button
        className="Generate-button"
        onClick={handleGenerate}
        disabled={generated || !text}
      >
        Generate
      </button>
      {generated && text && <QRCode className="QR-block" value={text} />}
      {generated && text && (
        <button className="Download-button" onClick={handleDownload}>
          Download
        </button>
      )}
      {generated && text && (
        <button className="Clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
}
