import api from './api';

const PaymentService = {
  list: (role = 'renter') => api.get(`/payments?role=${role}`),

  get: id => api.get(`/payments/${id}`),

  initiate: (leaseAgreementId, paymentMethod) =>
    api.post('/payments/initiate', {
      lease_agreement_id: leaseAgreementId,
      payment_method: paymentMethod,
    }),

  confirm: (paymentId, transactionId) =>
    api.post(`/payments/${paymentId}/confirm`, {
      transaction_id: transactionId,
    }),

  breakdown: leaseAgreementId =>
    api.get(`/payments/breakdown/${leaseAgreementId}`),
};

export default PaymentService;
