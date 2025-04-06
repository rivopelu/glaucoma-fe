import * as React from 'react';
import { useRef, useState } from 'react';
import Button from '../components/Button.tsx';
import { Card, CardBody } from '../components/Card.tsx';
import PageContainer from '../components/PageContainer.tsx';
import { SpinnerLoading } from '../components/SpinnerLoading.tsx';

interface IRes {
  confidence: number;
  explanation: string;
  gradcam_image: string;
  predicted_class: string;
  uploaded_image: string;
}
export function HomePage() {
  const BASE_URL = 'http://127.0.0.1:5000/';
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [response, setResponse] = useState<IRes | undefined>();

  function onReset() {
    setFile(null);
    setError(null);
    setResponse(undefined);
  }

  function onChangeFile(e: React.ChangeEvent<HTMLInputElement>) {
    setError(null);
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
    }
  }

  const handleUpload = async () => {
    setError(null);
    setLoading(true);
    if (!file) {
      setLoading(false);
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        body: formData,
      });
      setLoading(false);

      if (!res.ok) {
        setError('Upload failed');
      }

      const data = await res.json();
      setResponse(data);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError((err as Error).message);
    }
  };

  function inputCard() {
    return (
      <div className={'grid gap-4'}>
        <div
          onClick={() => inputRef?.current?.click()}
          className={
            'bg-slate-100 h-48 rounded-md cursor-pointer hover:bg-slate-200 duration-200  flex items-center justify-center border border-gray-300 border-dashed'
          }
        >
          <>
            {loading ? (
              <SpinnerLoading />
            ) : (
              <>{file ? <img className={'h-32'} src={URL.createObjectURL(file)} alt="" /> : <div>Upload Image</div>}</>
            )}
          </>
          <input onChange={(e) => onChangeFile(e)} hidden ref={inputRef} type={'file'} />
        </div>
        {error && <div className={'text-red-500'}>{error}</div>}
        <Button disable={loading} onClick={handleUpload}>
          Prediksi
        </Button>
      </div>
    );
  }

  function responseCard() {
    return (
      <div className={'flex flex-col gap-4 items-center justify-center text-center'}>
        {response?.gradcam_image && (
          <div className={'flex gap-3'}>
            {file && <img className={'h-48 aspect-square'} alt={'hell'} src={URL.createObjectURL(file)} />}
            <img className={'h-48 aspect-square'} alt={'hell'} src={BASE_URL + 'gradcam/' + response.gradcam_image} />
          </div>
        )}
        <div>
          <div className={'font-semibold'}>{response?.predicted_class}</div>
        </div>
        <div>
          <div className={'text-slate-500'}>Confidence</div>
          <div className={'font-semibold'}>{response?.confidence ? response.confidence.toFixed(2) : 0} %</div>
        </div>
        <div>{response?.explanation}</div>
        <Button onClick={onReset}>RESET</Button>
      </div>
    );
  }

  return (
    <div className={'min-h-screen w-screen bg-gray-100 grid'}>
      <div className='bg-primary-main py-10 h-full flex items-center justify-center'>
        <PageContainer >
          <div className='mt-top-bar-height flex items-center gap-4 justify-center'>
            <img src='/assets/home_img.svg' className='h-42' />
            <div>
              <p className='text-4xl uppercase font-semibold text-white '>Glaucoma Clasification</p>
              <p className='text-white'>HELLO WORLD</p>
            </div>
          </div>

        </PageContainer>
      </div>
      <PageContainer>
        <div className={'p-16 grid  gap-4 pt-24'}>
          <p className='font-semibold text-4xl'>Judul 1</p>
          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>


          <div className='grid grid-cols-4 my-10 gap-4'>
            {
              Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardBody className='grid gap-2'>
                    <img className='w-full aspect-square' src='/assets/gl_1.png' />
                    <p className='font-semibold '>Judul 3</p>
                    <p className='text-gray-600 '>Description 1</p>
                  </CardBody>
                </Card>
              ))
            }

          </div>

          <div>
            <Card>
              <CardBody className={'grid gap-4'}>
                <div>
                  <h1 className={'text-2xl'}>Prediction</h1>
                </div>
                {response ? responseCard() : inputCard()}
              </CardBody>
            </Card>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
