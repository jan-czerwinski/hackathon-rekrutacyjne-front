import { useRef, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

function App() {
  const [inputImgSrc, setInputImgSrc] = useState<string>();
  const [isDetectingEdges, setIsDetectingEdges] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  const onFileChange = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const fileUrl = URL.createObjectURL(file);
    setInputImgSrc(fileUrl);
  };

  const detectEdges = async () => {
    setIsDetectingEdges(true);
    //TODO send image, recieve it and display after edge detection
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setIsDetectingEdges(false);
  };

  return (
    <div className="w-screen h-screen p-12 bg-blue-200">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-around w-full h-4/5 my-auto">
          <div className="w-1/2 h-full">
            {inputImgSrc && (
              <img
                className="mx-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white"
                src={inputImgSrc}
                alt=""
              />
            )}
          </div>
          <div className="w-1/2 h-full">
            <div className="h-full grid place-content-center">
              <RingLoader color="blue" size={120} loading={isDetectingEdges} />
            </div>
          </div>
        </div>

        <div className="flex h-1/5 justify-around text-white text-xl">
          <input
            onChange={onFileChange}
            type="file"
            ref={inputFileRef}
            accept=".png, .jpg, .jpeg"
            className="hidden"
          />
          <button
            className="m-6 w-1/4 rounded-xl bg-blue-300 shadow-md "
            onClick={() => inputFileRef.current?.click()}
          >
            upload..
          </button>

          <button
            className="m-6 w-1/4 rounded-xl bg-blue-300 shadow-md"
            onClick={detectEdges}
          >
            detect edges
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
