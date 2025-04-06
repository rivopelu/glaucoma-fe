import * as React from 'react';
import { useRef, useState } from 'react';
import Button from '../components/Button.tsx';
import { Card, CardBody } from '../components/Card.tsx';
import PageContainer from '../components/PageContainer.tsx';
import { SpinnerLoading } from '../components/SpinnerLoading.tsx';
import Divider from '../components/Divider.tsx';

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
      <div className='bg-gradient-to-bl from-secondary-light to-primary-light py-10 h-full flex items-center justify-center'>
        <PageContainer >
          <div className='mt-top-bar-height flex items-center gap-4 justify-center'>
            <img src='/assets/home_img.svg' className='h-42' />
            <div>
              <p className='text-4xl uppercase font-semibold text-white '>Glaucoma Clasification</p>
              <p className='text-white'>Sebuah demo model prediksi glaucoma berbasis Deep Learning              </p>
            </div>
          </div>

        </PageContainer>
      </div>
      <PageContainer>
        <div className={'p-16 grid  gap-4 pt-24'}>
          <div>
            <p className='font-semibold text-4xl'>Apa itu glaucoma?          </p>
            <p>
              Glaucoma adalah penyakit mata yang merusak saraf optik, biasanya disebabkan oleh tekanan tinggi di dalam bola mata (intraocular pressure/IOP). Saraf optik adalah bagian penting dari sistem penglihatan karena mengirimkan informasi dari mata ke otak. Jika saraf ini rusak, penglihatan bisa menurun dan bahkan menyebabkan kebutaan permanen.


            </p>
          </div>
          <div className='mt-6'>
            <p className='font-semibold text-4xl'>Tentang Aplikasi Ini          </p>
            <p>
              Aplikasi ini merupakan demo dari model klasifikasi glaucoma menggunakan arsitektur deep learning ResNet50. Model ini dilatih untuk mengidentifikasi dan mengklasifikasikan kondisi mata berdasarkan citra fundus (gambar retina) ke dalam beberapa kategori, termasuk tahap awal (early stage) glaucoma. Tujuan dari aplikasi ini adalah untuk membantu eksplorasi dan pemahaman teknologi deteksi dini glaucoma menggunakan kecerdasan buatan.

            </p>
          </div>


          <div>
            <h1 className=' text-3xl mt-10 font-semibold'>Contoh Gambar Retina</h1>
            <p>Berikut adalah contoh gambar retina dari dataset yang digunakan. Gambar ini digunakan untuk melatih dan menguji performa model prediksi:
            </p>
            <div className='grid grid-cols-2 my-10 gap-4'>
              <Card >
                <CardBody className='flex gap-4 items-center'>
                  <img className='w-40 aspect-square' src='/assets/gl_1.png' />
                  <div>
                    <p className='font-semibold text-3xl '>Retina Normal</p>
                    <p className='text-gray-600 text-xl '> Tidak ditemukan tanda-tanda glaucoma.</p>
                  </div>

                </CardBody>
              </Card>
              <Card >
                <CardBody className='flex gap-4 items-center'>
                  <img className='w-40 aspect-square' src='/assets/gl_1.png' />
                  <div>
                    <p className='font-semibold text-3xl '>Retina dengan Glaucoma</p>
                    <p className='text-gray-600 text-xl '>Tampak perubahan pada optic disc yang menjadi indikasi glaucoma.</p>
                  </div>

                </CardBody>
              </Card>
            </div>
          </div>

          <div>
            <Card>
              <CardBody className={'grid gap-4'}>
                <div>
                  <h1 className={'text-2xl'}>Prediction</h1>
                  <p>Unggah gambar retina untuk melihat hasil prediksi dari model kami. Model akan mengklasifikasikan gambar ke dalam salah satu kategori:
                  </p>
                </div>
              </CardBody>
              <Divider />
              <CardBody>
                {response ? responseCard() : inputCard()}

              </CardBody>
            </Card>
          </div>
        </div>
      </PageContainer>
    </div>
  );
}
