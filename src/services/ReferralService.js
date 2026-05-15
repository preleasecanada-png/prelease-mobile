import api from './api';

const ReferralService = {
  generateCode: () => api.post('/referrals/generate-code'),

  applyCode: referralCode =>
    api.post('/referrals/apply-code', {referral_code: referralCode}),

  myReferrals: () => api.get('/referrals/my-referrals'),
};

export default ReferralService;
