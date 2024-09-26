import React, { useState, useEffect } from 'react';
import { Button, Alert, Row, Col } from 'react-bootstrap';
import '../styles/Upload.css';

function UploadComprovante({ listaAnexos = [] }) {
  const [anexos, setAnexos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (listaAnexos.length > 0) {
      setAnexos(listaAnexos);
    }
  }, [listaAnexos]);

 
  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const validFiles = [];
    const maxSize = 25 * 1024 * 1024; // 25 MB
    const validTypes = ['application/pdf', 'image/jpeg', 'image/png'];

    files.forEach((file) => {
      if (validTypes.includes(file.type) && file.size <= maxSize) {
        const url = URL.createObjectURL(file);
        validFiles.push({ nome_arquivo: file.name, url });
      } else {
        setError(`Arquivo ${file.name} não é suportado ou excede o tamanho máximo.`);
      }
    });


    setAnexos([...anexos, ...validFiles]); 
    event.target.value = '';
  };

  const handleRemoveAnexo = (index) => {
    const novosAnexos = anexos.filter((_, i) => i !== index);
    setAnexos(novosAnexos);
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <div className='mb-5'>
      <h6 className='text-success fw-bold my-4'>Após efetuar o pagamento</h6>
      <div className="upload-comprovante bg-body-tertiary border rounded px-3 py-4">
        <h6 className="text-success fw-bold">Arquivos Enviados</h6>
        <small className="text-black-50">Arquivos permitidos PDF, JPEG ou PNG - Max 25mb.</small>
        <div className='my-5'>
          {anexos.map((anexo, index) => (
            <span key={index} className='me-3 border rounded py-1 px-2'>
              <a href={anexo.url} target="_blank" rel="noopener noreferrer">
                {anexo.nome_arquivo}
              </a>
              <Button
                variant="link"
                className="fw-bold text-black-50"
                onClick={() => handleRemoveAnexo(index)}
                style={{ textDecoration: 'none' }}
              >
                X
              </Button>
            </span>
          ))}
        </div>

        <input
          id="fileInput"
          type="file"
          accept=".pdf,image/jpeg,image/png"
          onChange={handleFileUpload}
          multiple
          hidden
        />
        <div className='text-center m-auto btnControl'>
          <Row>
            <Col><Button onClick={triggerFileInput} variant="outline-success" className="mt-2 fw-bold btnFile">
              Anexar Arquivo
            </Button></Col>
            <Col><Button variant="success" className="mt-2 fw-bold btnSend">
              Finalizar envio
            </Button></Col>
            {error && <Alert variant="danger">{error}</Alert>}
          </Row>
        </div>
      </div>
    </div>
  );
}

export default UploadComprovante;
