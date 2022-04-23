# Stripe Checkout Button Plugin for LIFF
Stripeのチェックアウトボタンを追加するLIFFプラグインです。
<br><br>



# 使い方
<p>

### 1. LIFF SDK、Stripeのクライアント用ライブラリ、プラグインを読み込む
ドキュメントのbody部分で3つのJSファイルを読み込みます。
```HTML
<script src="https://js.stripe.com/v3"></script>
<script src="https://static.line-scdn.net/liff/edge/2/sdk.js"></script>
<script src="https://cdn.jsdelivr.net/gh/kota-imai/liff-plugin-stripe-checkout-button@main/v1/plugin.min.js"></script>
```
</p>

<p>

### 2. ボタン要素を追加する
```HTML
<button id="checkout-button"></button>
```
</p>

<p>

### 3. liff.use()でプラグインを追加する
```Javascript
liff.use(new StripeCheckoutButtonPlugin());
```
</p>

<p>

### 4. Stripeの公開可能キーで初期化
```Javascript
liff.$stripeCheckoutButton.init({
   apiKey: 'pk_XXXXXXXXXXXXXXXXXXXXXX'
});
```
</p>

<p>

### 5. ボタン要素にバインドする</p>
```Javascript
const button = document.getElementById("checkout-button");
liff.$stripeCheckoutButton.bind(button, {
    priceId: 'price_XXXXXXXXXX', 
    successUrl: `${location.origin}/success?id={CHECKOUT_SESSION_ID}`, 
    cancelUrl: `${location.origin}/cancel`
});
```

<br>

# APIの一覧

<p>

### - 初期化処理
StripeのAPIを使用するために、プラグインにご自身のStripeアカウントの公開可能キーを設定します。
```Javascript
liff.$stripeCheckoutButton.init({
   apiKey: 'pk_XXXXXXXXXXXXXXXXXXXXXX'
});
```

【引数の項目】

- apiKey <span style="color: red; font-size: x-small">REQUIRED</span> ...  Stripeの公開可能キー。[Stripeのダッシュボード](https://dashboard.stripe.com/apikeys)から取得してください。
</p>

<p>
<br>

### - 支払いボタンの設置
特定の要素をクリックしたときに、支払い画面へ遷移させます。
```Javascript
const button = document.getElementById('checkout-button');
liff.$stripeCheckoutButton.bind(button, {
    priceId: 'price_XXXXXXXXXX',
    successUrl: `${location.origin}/success?id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${location.origin}/cancel`,
    quantity: 1,
    mode: 'payment',
    customerEmail: 'test@customeremail.com',
    clientReferenceId: 'value123',
    shippingAddressCollection: 'JP',
    submitType: 'auto'
});
```

【引数の項目】

- priceId <span style="color: red; font-size: x-small">REQUIRED</span> ... 商品の価格ID。[Stripeのダッシュボード](https://dashboard.stripe.com/test/products?active=true)から取得してください。
- successUrl <span style="color: red; font-size: x-small">REQUIRED</span> ... 決済成功時に遷移する先のURL、サンキューページ
- cancelUrl <span style="color: red; font-size: x-small">REQUIRED</span> ... 決済をキャンセルした時に遷移する先のURL
- quantity ... 数量。デフォルト→1
- mode ... 単発決済は `'payment'`、継続課金は `'subscription'`、デフォルト→`'payment'`
- customerEmail ... 顧客のメールアドレス。決済画面に Prefill されます。
- clientReferenceId ... 任意の値をいれるとCheckoutオブジェクトに紐づけられて後から参照できます。
- shippingAddressCollection ... 住所を収集したい場合は 'JP' をセットします。
- submitType ... 支払いの種類。単純な支払いは`'pay'`、予約などは`'book'`、寄付は`'donate'`、デフォルト→`'auto'`
</p>