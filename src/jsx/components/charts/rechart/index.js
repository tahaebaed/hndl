import React from 'react';
// import { Link } from 'react-router-dom';
import { Row, Col, Card } from 'react-bootstrap';
import PageTitle from '../../../layouts/PageTitle';
import loadable from '@loadable/component';
import pMinDelay from 'p-min-delay';
const BarChartNoPadding = loadable(() => pMinDelay(import('./BarChartNoPadding1'), 1000));
const PositiveNagative = loadable(() => pMinDelay(import('./PositiveNagative'), 1000));

function RechartJs() {
  return (
    <>
      <PageTitle headingPara='ReChartJs' motherMenu='Charts' activeMenu='ReChartJs' />
      <Row>
        <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Bar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <BarChartNoPadding />
            </Card.Body>
          </Card>
        </Col>
        <Col xl={6}>
          <Card>
            <Card.Header>
              <Card.Title>Bar Chart</Card.Title>
            </Card.Header>
            <Card.Body>
              <PositiveNagative />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}

export default RechartJs;
