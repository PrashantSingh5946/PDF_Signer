import { createRef, useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import {
  faPenNib,
  faUnderline,
  faStamp,
  faCalendar,
  faUser,
  faUserTag,
  faEnvelope,
  faBuilding,
  faBriefcase,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sign from "./components/Sign";
import { Page } from "./components/Page";
function App() {
  const [droppables, setDroppables] = useState([]);
  const [isSignActive, setIsSignActive] = useState(false);
  const [isSignVisible, setIsSignVisible] = useState(false);
  const [coordinates, setCoordinates] = useState({ left: 0, top: 0 });
  const [isFileUploaded, setIsFileUploaded] = useState(false);
  const [isFileUploading, setIsFileUploading] = useState(false);
  const [pageDimensions, setPageDimensions] = useState({ width: 0, height: 0 });
  const [file, setFile] = useState();
  const [pageIndex, setPageIndex] = useState(0);

  let downloadPDF = async (name = "editedPdf") => {
    await download(file.file, "Edited.pdf", "application/pdf");
  };

  let saveChanges = async () => {
    let pdfDoc = await PDFLib.PDFDocument.load(
      await readAsArrayBuffer(file.file)
    );
    let pages = pdfDoc.getPages();
    let page1 = pages[pageIndex];

    //let img = pdfDoc.embedPng((await readAsArrayBuffer(await readAsImage("sign.png")))) //accepts blob
    // page1.drawImage(img,{
    //   x:400,
    //   y:400,
    //   width:200,
    //   height:50,
    // })

    const pngImageBytes = await fetch("sign.png").then((res) =>
      res.arrayBuffer()
    );
    const pngImage = await pdfDoc.embedPng(pngImageBytes);
    await page1.drawImage(pngImage, {
      x: 0,
      y: 0,
      width: 196,
      height: 50,
    });
    let newFile = await pdfDoc.save();

    // console.log("NewFile",newFile)
    // setFile({...file,file:newFile});

    const pdf = await readAsPDF(newFile);
    let result = {
      file: new Blob([newFile]),
      name: file.name,
      pages: Array(pdf.numPages)
        .fill(0)
        .map((_, index) => pdf.getPage(index + 1)),
    };
    setFile(result);
  };

  const readAsArrayBuffer = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };

  const pdfRef = createRef();

  const pdfDropHandler = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log(e);
    // console.log(e.dataTransfer.files);
    let file = e.dataTransfer.files[0];
    let result = null;
    try {
      const pdf = await readAsPDF(file);
      result = {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      };
      setFile(result);
      setIsFileUploaded(true);
    } catch (error) {
      console.log("Failed to load pdf", error);
    }
  };
  useEffect(() => {
    prepareAssets();
  }, []);

  let afterUpload = async (e) => {
    let file = e.target.files[0];
    let result = null;
    try {
      const pdf = await readAsPDF(file);
      result = {
        file,
        name: file.name,
        pages: Array(pdf.numPages)
          .fill(0)
          .map((_, index) => pdf.getPage(index + 1)),
      };
      setFile(result);
      setIsFileUploaded(true);
    } catch (error) {
      console.log("Failed to load pdf", error);
    }
  };

  //helpers
  const assets = {};

  const scripts = [
    {
      name: "pdfjsLib",
      src: "https://unpkg.com/pdfjs-dist@2.3.200/build/pdf.min.js",
    },
    {
      name: "PDFLib",
      src: "https://unpkg.com/pdf-lib@1.17.1/dist/pdf-lib.min.js",
    },
    {
      name: "download",
      src: "https://unpkg.com/downloadjs@1.4.7",
    },
    {
      name: "makeTextPDF",
      src: "https://cdn.jsdelivr.net/gh/snamoah/react-pdf-editor/public/makeTextPDF.js",
    },
    { name: "w3Color", src: "https://www.w3schools.com/lib/w3color.js" },
  ];

  const readAsPDF = async (file) => {
    // Safari possibly get webkitblobresource error 1 when using origin file blob
    const blob = new Blob([file]);
    const url = window.URL.createObjectURL(blob);
    return pdfjsLib.getDocument(url).promise;
  };

  const prepareAssets = () => {
    // prepare scripts
    scripts.forEach(({ name, src }) => {
      assets[name] = new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
          resolve(window[name]);
        };
        script.onerror = () =>
          reject(`The script ${name} didn't load correctly.`);
        document.body.appendChild(script);
      });
    });
  };

  let hoverHandler = (e) => {
    //let rect = e.target.getBoundingClientRect();
    let rect = document.querySelector("#page").getBoundingClientRect();
    setCoordinates({ left: e.clientX - rect.left, top: e.clientY - rect.top });
  };

  let dropHandler = (e) => {
    e.preventDefault();
    let rect = document.querySelector("#page").getBoundingClientRect();
    setDroppables([
      ...droppables,
      {
        name: "signature" + Math.random(),
        left: 5 * (e.clientX - rect.left),
        top: 5 * (e.clientY - rect.top),
      },
    ]);
    setIsSignActive(false);
    setIsSignVisible(false);
  };

  let pasteHandler = (e) => {
    // console.log(e);

    let rect = document.querySelector("#page").getBoundingClientRect();

    isSignActive &&
      setDroppables([
        ...droppables,
        {
          name: "signature" + Math.random(),
          left: e.clientX - rect.left,
          top: e.clientY - rect.top,
        },
      ]);
    setIsSignActive(false);
    setIsSignVisible(false);
  };

  const hiddenInputs = (
    <>
      <input
        ref={pdfRef}
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={(e) => afterUpload(e)}
        onClick={(e) => {
          //console.log(e);
        }}
        style={{ display: "none" }}
      />
    </>
  );

  return (
    <div className="App">
      {hiddenInputs}
      <div className="droppables">
        <div></div>
        <ul>
          <h2>FIELDS</h2>
          <hr />
          <li>
            <div
              className="credential"
              draggable
              id="sign"
              onClick={() => setIsSignActive(true)}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faPenNib}></FontAwesomeIcon>
              </div>
              <small>Signature</small>
            </div>
          </li>

          <li>
            <div
              className="credential"
              onClick={() => {
                pdfRef.current.click();
              }}
            >
              <div className="icon">
                <FontAwesomeIcon icon={faUnderline}></FontAwesomeIcon>
              </div>
              <small>Upload PDF</small>
            </div>
          </li>

          <li>
            <div
              className="credential"
              onClick={() => {
                setPageIndex(pageIndex + 1);
              }}
              id="sign"
            >
              <div className="icon">
                <FontAwesomeIcon icon={faStamp}></FontAwesomeIcon>
              </div>
              <small>Next</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faCalendar}></FontAwesomeIcon>
              </div>
              <small>Date Signed</small>
            </div>
          </li>

          <hr />

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Name</small>
            </div>
          </li>

          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUserTag}></FontAwesomeIcon>
              </div>
              <small>First name</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
              </div>
              <small>Last name</small>
            </div>
          </li>
          <li>
            <div className="credential" id="sign">
              <div className="icon">
                <FontAwesomeIcon icon={faEnvelope}></FontAwesomeIcon>
              </div>
              <small>Email</small>
            </div>
          </li>
          <li>
            <div className="credential" onClick={saveChanges}>
              <div className="icon">
                <FontAwesomeIcon icon={faBuilding}></FontAwesomeIcon>
              </div>
              <small>Save</small>
            </div>
          </li>
          <li>
            <div className="credential" onClick={downloadPDF}>
              <div className="icon">
                <FontAwesomeIcon icon={faBriefcase}></FontAwesomeIcon>
              </div>
              <small>Download</small>
            </div>
          </li>
        </ul>
      </div>
      <div
        className="playground"
        id="playground"
        onDragOver={(e) => e.preventDefault()}
        onDrop={pdfDropHandler}
      >
        <div
          className="page"
          id="page"
          style={{ width: pageDimensions.width, height: pageDimensions.height }}
          onClick={pasteHandler}
          onMouseMove={hoverHandler}
          onDragOver={(e) => e.preventDefault()}
          onDrop={dropHandler}
          onMouseEnter={() => isSignActive && setIsSignVisible(true)}
          onMouseLeave={() => setIsSignVisible(false)}
        >
          {droppables.map((droppable, index) => (
            <Sign key={index} left={droppable.left} top={droppable.top} />
          ))}
          {isSignActive && isSignVisible && (
            <Sign left={coordinates.left} top={coordinates.top} />
          )}

          {isFileUploaded && (
            <Page
              updateDimensions={setPageDimensions}
              page={file.pages[pageIndex]}
            ></Page>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
