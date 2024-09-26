import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ListGroup, Col, Row, Badge } from 'react-bootstrap';
import LiquidacaoDetalhes from './LiquidacaoDetalhes';
import Pagamento from './Pagamento';  
import UploadComprovante from './UploadComprovante';
import '../styles/Liquidacao.css';

function Liquidacao() {
  const [liquidacoes, setLiquidacoes] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios.get('https://66d62a1ef5859a704268886b.mockapi.io/api/v1/oferta')
      .then(response => {
        setLiquidacoes(response.data);
        setSelectedItem(response.data[0]);
      })
      .catch(error => console.error('Erro ao buscar liquidações', error));
  }, []);

  const handleSelect = (item) => {
    setSelectedItem(item);
  };

  return (
    <Row>
      <Col md={3} className='mb-3'>
        <ListGroup>
          {liquidacoes.map(liquidacao => (
            <ListGroup.Item 
              key={liquidacao.nome_oferta}
              action
              onClick={() => handleSelect(liquidacao)}
              className={liquidacao === selectedItem ? 'selected-item' : ''}
            >
              {liquidacao.nome_oferta}
              <>
              {
                liquidacao.status === 'Pendente' ? (
                  <Badge bg="warning" className='ms-2'>{liquidacao.status}</Badge>
                ) : (
                  <Badge bg="success" className='ms-2'>{liquidacao.status}</Badge>
                )	
              }
              </>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Col>

      <Col md={9}>
        {selectedItem && (
          <>
            <LiquidacaoDetalhes liquidacao={selectedItem} />
            <Pagamento dadosPagamento={{
              chave_pix: selectedItem.chave_pix,
              nome_favorecido: selectedItem.nome_favorecido,
              agencia: selectedItem.agencia,
              banco: selectedItem.banco,
              numero_conta_corrente: selectedItem.numero_conta_corrente,
              cnpj: selectedItem.cnpj,
            }} />
           <UploadComprovante listaAnexos={selectedItem.lista_anexos} />
          </>
        )}
      </Col>
    </Row>
  );
}

export default Liquidacao;
