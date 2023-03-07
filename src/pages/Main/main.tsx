import React, { useEffect, useState } from "react";
import Breadcrumbs from "../../components/Common/Breadcrumb";
import {
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Table,
} from "reactstrap";

export const MainDashboard = () => {
  const [filter, setFilter] = useState<any>({});

  useEffect(() => {
    console.log(filter);
  }, [filter]);
  return (
    <React.Fragment>
      <div className="page-content bg-light bg-opacity-75">
        <Container fluid>
          {/* Render Breadcrumbs */}
          <Breadcrumbs title="메인화면" breadcrumbItem="대시보드" />

          {/*<SearchFilter setData={setFilter} />*/}
          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h4 className="card-title m-0">HEV 충전기 현황</h4>
                  <div className={"d-flex"}>
                    <i className={"mdi mdi-arrow-up-thin text-light"} />
                    <i className={"mdi mdi-arrow-down-thin text-light"} />
                    <i className={"mdi mdi-arrow-up-down-bold"} />
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>Column heading</th>
                          <th>Column heading</th>
                          <th>Column heading</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-light">
                          <th scope="row">1</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-success">
                          <th scope="row">2</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-info">
                          <th scope="row">3</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-warning">
                          <th scope="row">4</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-danger">
                          <th scope="row">5</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col>
              <Card>
                <CardHeader>
                  <h4 className="card-title m-0">HEV 충전기 현황</h4>
                </CardHeader>
                <CardBody>
                  <div className="table-responsive">
                    <Table className="table mb-0">
                      <thead>
                        <tr>
                          <th>구분</th>
                          <th>Column heading</th>
                          <th>Column heading</th>
                          <th>Column heading</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="table-light">
                          <th scope="row">1</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-success">
                          <th scope="row">2</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-info">
                          <th scope="row">3</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-warning">
                          <th scope="row">4</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>

                        <tr className="table-danger">
                          <th scope="row">5</th>
                          <td>Column content</td>
                          <td>Column content</td>
                          <td>Column content</td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};
