import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import Redirect from 'react-router/Redirect';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import Modal from '../../components/Modal';
import { Form } from 'react-redux-form';
import InputGroup from '../../components/InputGroup';
import Button from '../../components/Button';
import { firebase as withFirebase } from 'redux-react-firebase';

export class OrderModal extends React.Component {
  static propTypes = {
    auth: PropTypes.object,
    params: PropTypes.object.isRequired,
    formData: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    firebase: PropTypes.object.isRequired,
  };

  state = {
    closeModal: false,
    goBack: false,
  };

  onModalClosed = ::this.onModalClosed;
  onModalClosed() {
    this.setState({ goBack: true });
  }

  closeModal = ::this.closeModal;
  closeModal() {
    this.setState({ closeModal: true });
  }

  submitForm = ::this.submitForm;
  submitForm() {
    if (!this.props.auth) {
      return;
    }
    const { params } = this.props;
    const data = this.props.formData;
    const parsedPrice = parseInt(parseFloat(data.price.replace(',', '.')) * 100, 10);

    const newMeal = {
      name: data.name,
      orderer: this.props.auth.displayName,
      price: parsedPrice,
    };

    this.props.firebase.push(`/orders/${params.order}/meals`, newMeal);
    this.closeModal();
  }

  render() {
    const { location } = this.props;
    const { goBack } = this.state;

    if (goBack) {
      const pathBack = location.pathname.replace(/\/new-meal$/, '');
      return <Redirect to={pathBack} />;
    }

    return (
      <Modal
        title={<FormattedMessage {...messages.header} />}
        triggerClose={this.state.closeModal}
        onClose={this.onModalClosed}
      >
        <Form model="createOrder" onSubmit={this.submitForm}>
          <FormattedMessage {...messages.mealPlaceholder}>{(placeholder) => (
            <InputGroup
              label={<FormattedMessage {...messages.meal} />}
              model=".name"
              placeholder={placeholder}
            />
          )}</FormattedMessage>
          <FormattedMessage {...messages.pricePlaceholder}>{(placeholder) => (
            <InputGroup
              label={<FormattedMessage {...messages.price} />}
              model=".price"
              placeholder={placeholder}
            />
          )}</FormattedMessage>
          <div style={{ textAlign: 'right' }}>
            <Button variant="flat" type="button" onClick={this.closeModal}>Cancel</Button>
            <Button variant="primary" type="submit">Create</Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default compose(
  withFirebase(),
  connect((state) => ({
    auth: state.getIn(['firebase', 'auth']),
    formData: state.get('forms').createOrder,
  }), mapDispatchToProps)
)(OrderModal);
