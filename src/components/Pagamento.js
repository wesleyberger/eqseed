import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, Row, Col, Button } from 'react-bootstrap';
import Header from './ui/Header';
import '../styles/Pagamento.css';

function Pagamento({ dadosPagamento }) {
    if (!dadosPagamento) {
        return <div>Dados de pagamento não fornecidos.</div>;
    }

    const {
        chave_pix,
        nome_favorecido,
        agencia,
        banco,
        numero_conta_corrente,
        cnpj
    } = dadosPagamento;

    const handleCopyPix = () => {
        navigator.clipboard.writeText(chave_pix)
          .then(() => {
            alert('Chave PIX copiada para a área de transferência!');
          })
          .catch(err => {
            console.error('Erro ao copiar a chave PIX: ', err);
          });
    };

    return (
        <Card className="p-4 my-3">
            <Header title="Chave Pix" />
            <Row>
                <Col sm={3} className='text-center customResponsive'>
                    <QRCodeCanvas value={chave_pix} size={100} />
                    <Button
                        variant="outline-primary"
                        className="mt-2"
                        onClick={handleCopyPix}
                    >
                        Copiar Chave PIX
                    </Button>
                </Col>
                <Col>
                    <Card.Body>
                        <Row>
                            <Col>
                                <Card.Text><strong>Chave PIX:</strong><br /> {chave_pix}</Card.Text>
                                <Card.Text><strong>Agência:</strong><br /> {agencia}</Card.Text>
                                <Card.Text><strong>Conta Corrente:</strong><br /> {numero_conta_corrente}</Card.Text>
                            </Col>
                            <Col>
                                <Card.Text><strong>Favorecido:</strong><br /> {nome_favorecido}</Card.Text>
                                <Card.Text><strong>CNPJ:</strong><br /> {cnpj}</Card.Text>
                                <Card.Text><strong>Banco:</strong><br /> {banco}</Card.Text>
                            </Col>
                        </Row>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default Pagamento;
