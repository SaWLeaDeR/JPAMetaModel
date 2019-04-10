import * as React from 'react';
import { DropdownItem } from 'reactstrap';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from '../header-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <DropdownItem tag={Link} to="/entity/product">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Product
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product-category">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Product Category
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/customer">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Customer
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/product-order">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Product Order
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/order-item">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Order Item
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/invoice">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Invoice
    </DropdownItem>
    <DropdownItem tag={Link} to="/entity/shipment">
      <FontAwesomeIcon icon="asterisk" />&nbsp; Shipment
    </DropdownItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
