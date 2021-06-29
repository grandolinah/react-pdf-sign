import React, { useState, useEffect, } from 'react';
import { Font, usePDF, PDFViewer, PDFDownloadLink, BlobProvider  } from '@react-pdf/renderer';
// import  emailjs,{ init } from 'emailjs-com';

import DrawingArea from './components/DrawingArea'
import PdfDocument from './components/PdfDocument';

// init("user_p5eQKx6hFdm4UaIRH094v");

Font.register({
  family: "Roboto",
  src:
    "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf"
});

function App() {
  const [name, setName] = useState('');
  const [privateNumber, setPrivateNumber] = useState('');
  const [job, setJob] = useState('');
  const [startDate, setStartDate] = useState(''); // need to format it
  const [days, setDays] = useState(0);
  const [signature, setSignature] = useState(null);
  const [option, setOption] = useState('paid');
  const [blob, setBlob] = useState(null);

  const sendEmail = (e) => {
    e.preventDefault();
    // const pdf = pdfRef.current;
    // console.log(pdf);

  //   emailjs.send('default_service', 'template_op4a0kx', {
  //     content: pdf
  // }).then((result) => {
  //   console.log(result.text);
  //   }, (error) => {
  //       console.log(error.text);
  //   });
  }

  useEffect(() => console.log(blob));

  return (
    <div className="App">
      <div style={{ display: 'flex'}}>
        <div style={{
          // width: '50%',
          // height: '100vh'
        }}>
          <form style={{display: 'none', flexDirection: 'column', alignItems: 'center', maxWidth: 300, margin: '20px auto'}}>
            <label>
              Tрите имена по документ за самоличност:
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
              ЕГН
              <input type="text" value={privateNumber} onChange={(e) => setPrivateNumber(e.target.value)} />
            </label>
            <label>
              длъжност
              <input type="text" value={job} onChange={(e) => setJob(e.target.value)} />
            </label>
            <label for="start">Начална дата на отпуск:
              <input type="date" id="start" name="trip-start"
                value={startDate}
                min="2020-01-01" max="2020-12-31" onChange={(e) => setStartDate(e.target.value)}></input>
              </label>
            <label>
              Дни отпуск:
              <input type="number" value={days} onChange={(e) => setDays(e.target.value)} />
            </label>
            <select id="lang" onChange={(e) => setOption(e.target.value)} value={option}>
              <option value="paid">платен</option>
              <option value="not paid">неплатен</option>
            </select>
          </form>
          <div style={{ border: '1px solid grey', width: 350, height: 350, margin: 50, padding: 10 }}>
            <DrawingArea onSaveImage={(image) => setSignature(image)} />
          </div>
          <button type="button" onClick={sendEmail}>Изпрати</button>
        </div>
        <PDFViewer>
            <PdfDocument  
              name={name}
              privateNumber={privateNumber}
              job={job}
              days={days}
              startDate={startDate}
              option={option}
              signature={signature}
            />
        </PDFViewer>

      <PDFDownloadLink document={<PdfDocument  
              name={name}
              privateNumber={privateNumber}
              job={job}
              days={days}
              startDate={startDate}
              option={option}
              signature={signature}
            />} fileName="somename.pdf">
        {({ blob, url, loading, error }) =>
          loading ? 'Loading document...' : 'Свали PDF'
        }
      </PDFDownloadLink>

      <BlobProvider document={<PdfDocument
              name={name}
              privateNumber={privateNumber}
              job={job}
              days={days}
              startDate={startDate}
              option={option}
              signature={signature}
            />}>
      {({ blob, url, loading, error }) => {
        // Do whatever you need with blob here
        console.log(blob, url, loading, error)
        setBlob(blob);
        return <div>There's something going on on the fly</div>;
      }}
    </BlobProvider>
      </div>
    </div>
  );
};

export default App;
