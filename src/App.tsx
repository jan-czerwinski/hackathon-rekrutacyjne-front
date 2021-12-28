import { useEffect, useRef, useState } from 'react';
import RingLoader from 'react-spinners/RingLoader';

function App() {
  const [inputImgSrc, setInputImgSrc] = useState<string>();
  const [outputImgSrc, setOutputImgSrc] = useState<string>();
  const [isDetectingEdges, setIsDetectingEdges] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const inputImgRef = useRef<HTMLImageElement>(null);
  const [imgTranslateCss, setImgTranslateCss] =
    useState<string>('-translateY(0px)');

  useEffect(() => {
    //check file dimensions and translate image to center it verically
    //i really couldn't find another way lol
    inputImgRef.current?.height &&
      setImgTranslateCss(
        `translateY(-${Math.round(inputImgRef.current?.height / 2)}px)`
      );
  }, [inputImgRef.current?.height]);

  const onFileChange = () => {
    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];
    const fileUrl = URL.createObjectURL(file);
    setInputImgSrc(fileUrl);
  };

  const detectEdges = async () => {
    setIsDetectingEdges(true);

    const detectEdgesCloudFunctionUrl =
      'https://europe-central2-optimistic-host-320114.cloudfunctions.net/function-1';

    if (!inputFileRef.current?.files) return;
    const file = inputFileRef.current.files[0];

    const formData = new FormData();
    formData.append('image', file);

    console.log('fetching.... ');
    const response = await fetch('http://127.0.0.1:5000/im_size', {
      method: 'POST',
      body: formData,
    });

    console.log(response);

    const responseImgUrl = URL.createObjectURL(await response.blob());

    setIsDetectingEdges(false);

    setOutputImgSrc(responseImgUrl);
  };

  return (
    <div className="w-screen h-screen p-12 bg-blue-200">
      <div className="w-full h-full flex flex-col justify-between">
        <div className="flex justify-around w-full h-4/5 my-auto">
          <div className="w-1/2 h-full">
            {inputImgSrc && imgTranslateCss && (
              <img
                className="relative top-1/2 mx-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white transform"
                src={inputImgSrc}
                ref={inputImgRef}
                style={{
                  transform: imgTranslateCss,
                }}
                alt=""
              />
            )}
          </div>
          <div className="w-1/2 h-full">
            <div className="h-full grid place-content-center">
              {/* <RingLoader color="blue" size={120} loading={isDetectingEdges} /> */}
              <img
                className="relative top-1/2 mx-auto w-auto h-auto max-h-full object-contain shadow-md p-4 bg-white transform"
                src={outputImgSrc}
                style={{
                  transform: imgTranslateCss,
                }}
                alt=""
              />
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
