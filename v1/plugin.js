class StripeCheckoutButtonPlugin {
  stripePublishableKey;
  constructor() {
    this.name = 'stripeCheckoutButton';
  }
  install() {
    return {
      init: this.init,
      bind: this.bind,
    };
  }
  init(obj) {
    if (obj.apiKey === undefined || obj.apiKey.length === 0) {
      console.log('API Key is required to initialize');
      return;
    }
    if (!obj.apiKey.startsWith('pk_')) {
      console.log('Invalid Publishable Key');
      return;
    }
    this.stripePublishableKey = obj.apiKey;
  };
  bind(elem, params) {
    if (!checkRequiredParams(params)) {
      return;
    }
    elem.addEventListener('click', () => {
      let option = {
        lineItems: [{ price: params.priceId, quantity: params.quantity ?? 1 }],
        mode: params.mode ?? 'payment',
        successUrl: params.successUrl,
        cancelUrl: params.cancelUrl,
        locale: params.locale ?? 'ja',
        submitType: params.submitType ?? 'auto'
      };
      if ('clientReferenceId' in params) {
        option.clientReferenceId = params.clientReferenceId;
      }
      if ('customerEmail' in params) {
        option.customerEmail = params.customerEmail;
      }
      if ('billingAddressCollection' in params) {
        option.billingAddressCollection = params.billingAddressCollection;
      }
      if ('shippingAddressCollection' in params) {
        option.shippingAddressCollection = params.shippingAddressCollection;
      }
      Stripe(this.stripePublishableKey, {
        apiVersion: '2020-08-27'
      }).redirectToCheckout(option);
    });
    function checkRequiredParams(obj) {
      if (obj.priceId === undefined) {
        console.log('PriceId is required');
        return false;
      }
      if (!obj.priceId.startsWith('price_')) {
        console.log('Invalid PriceId');
      }
      if ('quantity' in obj && obj.quantity < 0) {
        console.log('Invalid Quantity');
      }
      if (obj.successUrl === undefined) {
        console.log('SuccessUrl is required');
        return false;
      }
      if (obj.cancelUrl === undefined) {
        console.log('CancelUrl is required');
        return false;
      }
      return true;
    }
  };
}