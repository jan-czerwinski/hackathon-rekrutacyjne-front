import { useCallback, useEffect, useRef, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import CSS from 'csstype';

function App() {
  const [inputImgSrc, setInputImgSrc] = useState<string>();
  const [outputImgSrc, setOutputImgSrc] = useState<string>();
  const [isDetectingEdges, setIsDetectingEdges] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [edgeDetectionTime, setEdgeDetectionTime] = useState(0);

  const onInputFileChange = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const fileUrl = URL.createObjectURL(file);
    setOutputImgSrc(undefined);
    setInputImgSrc(fileUrl);
  };

  const detectEdges = async () => {
    setIsDetectingEdges(true);
    const startTime = performance.now();

    const detectEdgesCloudFunctionUrl =
      'https://europe-central2-optimistic-host-320114.cloudfunctions.net/detect-edges';

    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append('image', file);

    const response = await fetch(detectEdgesCloudFunctionUrl, {
      method: 'POST',
      body: formData,
    });

    console.log(response);

    const responseImgUrl = URL.createObjectURL(await response.blob());

    setIsDetectingEdges(false);
    const endTime = performance.now();

    setEdgeDetectionTime(endTime - startTime);
    setOutputImgSrc(responseImgUrl);
  };

  return (
    <div className="w-screen h-screen p-12 bg-blue-200">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-around w-full h-4/5 my-auto">
          <div className="w-1/2 h-full flex">
            {inputImgSrc && (
              <img
                className="m-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white"
                src={inputImgSrc}
              />
            )}
          </div>
          <div className="w-1/2 h-full flex justify-center items-center">
            {isDetectingEdges ? (
              <RingLoader color="blue" size={120} />
            ) : (
              outputImgSrc && (
                <img
                  className="m-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white"
                  src={outputImgSrc}
                />
              )
            )}
          </div>
        </div>

        <div className="flex h-1/5 justify-around text-white text-3xl">
          <input
            onChange={onInputFileChange}
            type="file"
            ref={inputFileRef}
            accept=".png, .jpg, .jpeg"
            className="hidden"
          />
          <button
            className="m-6 w-1/4 rounded-xl bg-blue-300 shadow-md "
            onClick={() => inputFileRef.current?.click()}
          >
            Upload png/jpg/jpeg image
          </button>
          {outputImgSrc ? (
            <span className="grid place-content-center text-center w-1/4">
              Total time: <br />
              {edgeDetectionTime} ms
            </span>
          ) : (
            <button
              className="m-6 w-1/4 rounded-xl bg-blue-300 shadow-md"
              onClick={detectEdges}
              disabled={isDetectingEdges}
            >
              Detect edges
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
