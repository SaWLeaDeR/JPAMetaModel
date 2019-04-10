import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICustomer } from 'app/shared/model/customer.model';
import { getEntities as getCustomers } from 'app/entities/customer/customer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './product-order.reducer';
import { IProductOrder } from 'app/shared/model/product-order.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer } from 'app/shared/util/date-utils';
import { keysToValues } from 'app/shared/util/entity-utils';

export interface IProductOrderUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: number }> {}

export interface IProductOrderUpdateState {
  isNew: boolean;
  customerId: number;
}

export class ProductOrderUpdate extends React.Component<IProductOrderUpdateProps, IProductOrderUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      customerId: 0,
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getCustomers();
  }

  saveEntity = (event, errors, values) => {
    values.placedDate = new Date(values.placedDate);

    if (errors.length === 0) {
      const { productOrderEntity } = this.props;
      const entity = {
        ...productOrderEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
      this.handleClose();
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/product-order');
  };

  customerUpdate = element => {
    const email = element.target.value.toString();
    if (email === '') {
      this.setState({
        customerId: -1
      });
    } else {
      for (const i in this.props.customers) {
        if (email === this.props.customers[i].email.toString()) {
          this.setState({
            customerId: this.props.customers[i].id
          });
        }
      }
    }
  };

  render() {
    const isInvalid = false;
    const { productOrderEntity, customers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jpaMetaModelApp.productOrder.home.createOrEditLabel">
              <Translate contentKey="jpaMetaModelApp.productOrder.home.createOrEditLabel">Create or edit a ProductOrder</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : productOrderEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="product-order-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="placedDateLabel" for="placedDate">
                    <Translate contentKey="jpaMetaModelApp.productOrder.placedDate">Placed Date</Translate>
                  </Label>
                  <AvInput
                    id="product-order-placedDate"
                    type="datetime-local"
                    className="form-control"
                    name="placedDate"
                    value={isNew ? null : convertDateTimeFromServer(this.props.productOrderEntity.placedDate)}
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel">
                    <Translate contentKey="jpaMetaModelApp.productOrder.status">Status</Translate>
                  </Label>
                  <AvInput
                    id="product-order-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && productOrderEntity.status) || 'COMPLETED'}
                  >
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="PENDING">PENDING</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="codeLabel" for="code">
                    <Translate contentKey="jpaMetaModelApp.productOrder.code">Code</Translate>
                  </Label>
                  <AvField
                    id="product-order-code"
                    type="text"
                    name="code"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="customer.email">
                    <Translate contentKey="jpaMetaModelApp.productOrder.customer">Customer</Translate>
                  </Label>
                  <AvInput
                    id="product-order-customer"
                    type="select"
                    className="form-control"
                    name="customer.email"
                    onChange={this.customerUpdate}
                  >
                    {customers
                      ? customers.map(otherEntity => (
                          <option value={otherEntity.email} key={otherEntity.id}>
                            {otherEntity.email}
                          </option>
                        ))
                      : null}
                  </AvInput>
                  <AvInput id="product-order-customer" type="hidden" name="customer.id" value={this.state.customerId} />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/product-order" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />&nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={isInvalid || updating}>
                  <FontAwesomeIcon icon="save" />&nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  customers: storeState.customer.entities,
  productOrderEntity: storeState.productOrder.entity,
  loading: storeState.productOrder.loading,
  updating: storeState.productOrder.updating
});

const mapDispatchToProps = {
  getCustomers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProductOrderUpdate);
