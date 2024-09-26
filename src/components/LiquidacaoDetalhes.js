import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';

function LiquidacaoDetalhes({ liquidacao }) {
  if (!liquidacao) {
    return <div>Nenhum item selecionado</div>;
  }

  const formatarValor = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <Card>
      <Row className='text-end px-3 py-2'>
        <Card.Text>
          <span className={`${liquidacao.status === 'Pendente' ? 'bg-warning' : 'bg-success'} text-white p-1 border rounded fs-6`}>
            {liquidacao.status}
          </span>
        </Card.Text>
      </Row>
      <Row>
        <Col>
          <Card.Body>
            <Card.Title>{liquidacao.nome_oferta}</Card.Title>
            <Card.Text>{liquidacao.slogan}</Card.Text>
            <>
              {liquidacao.status === 'Pendente' ? (
                <small className='text-muted pb-3'>Para finalizar seu investimento, realize o pagamento na conta bancária de
                  <span className='text-success fw-bolder'> {liquidacao.nome_favorecido}.</span>
                </small>
              ) : (
                <small className='text-muted pb-3'>Seu pagamento foi confirmado. Obrigado por investir em
                  <span className='text-success'> {liquidacao.nome_favorecido}.</span>
                </small>
              )}
            </>
          </Card.Body>
        </Col>
        <Col>
          <Card.Body className='py-3'>
            <Row className='pe-2'>
              <Col sm={7} className='bg-body-tertiary border rounded-start p-1 ps-3'>
                <Card.Text>Pagamento válido até:</Card.Text>
                <Card.Text className='fw-bold'>
                  {liquidacao.validade}
                </Card.Text>
              </Col>
              <Col className='bg-success text-white fw-bold rounded-end p-1 ps-3'>
                <Card.Text className='fs-6'>Valor</Card.Text>
                <Card.Text>{formatarValor(liquidacao.valor_a_ser_liquidado)}</Card.Text>
              </Col>
            </Row>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
}

export default LiquidacaoDetalhes;
