import QRCode from "qrcode.react";
import { useState } from "react";
import { saveAs } from "file-saver";
import "./QrCode.css";

export default function QrCode() {
  const [text, setText] = useState("");
  const [number, setNumber] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "text") {
      setText(value);
    } else if (name === "number") {
      setNumber(value);
    }
  };

  const handleGenerate = () => {
    if (!generated && text && number) {
      setGenerated(true);
    }
  };

  const handleDownload = () => {
    const canvas = document.querySelector("canvas");
    canvas.toBlob(function (blob) {
      saveAs(blob, `${text}_${number}.png`);
    });
  };

  const handleClear = () => {
    setText("");
    setNumber("");
    setGenerated(false);
  };

  return (
    <div className="QrCode">
      <h1 className="Qr-header">QR Code Generator</h1>
      <input
        className="Box"
        type="text"
        name="text"
        value={text}
        onChange={handleInputChange}
        placeholder="Enter Box Name"
        disabled={generated}
      />
      <input
        className="Box"
        type="number"
        name="number"
        value={number}
        onChange={handleInputChange}
        placeholder="Enter Box Number"
        disabled={generated}
      />

      <button
        className="Generate-button"
        onClick={handleGenerate}
        disabled={generated || !text || !number}
      >
        Generate
      </button>
      {generated && text && number && (
        <QRCode className="QR-block" value={`${text} ${number}`} />
      )}
      {generated && text && number && (
        <button className="Download-button" onClick={handleDownload}>
          Download
        </button>
      )}
      {generated && text && number && (
        <button className="Clear-button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
}
