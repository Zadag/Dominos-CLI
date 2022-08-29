#! /usr/bin/env node
import config from 'config';
import {Order,Customer,Item,Payment,NearbyStores,Tracking} from 'dominos';

console.log('hello world');

// Large Cheese Pizza with peperoni and jalopenos 
const pizza=new Item(
    {
        //16 inch hand tossed crust
        code:'16SCREEN',
        options:{
            //sauce, whole pizza : normal
            X: {'1/1' : '1'}, 
            //cheese, whole pizza  : normal
            C: {'1/1' : '1'},
            //pepperoni, whole pizza : normal
            P: {'1/2' : '1'},
            //jalopeno, whole pizza: normal
            J: {'1/1': '1'}
        }
    }
);

const customer = new Customer({
    address: config.get('address'),
    firstName: config.get('firstName'),
    lastName: config.get('lastName'),
    phone: config.get('phone'),
    email: config.get('email')
});

console.log(customer.address);

const nearbyStores = await new NearbyStores(customer.address);
let storeID = 0;
let distance = 20;
console.log(nearbyStores);
for (const store of nearbyStores.stores) {
    console.log("checking stores")
    if (
        store.IsOnlineCapable
        && store.IsDeliveryStore
        && store.IsOpen
        && store.ServiceIsOpen.IsDeliveryStore
        && store.MinDistance < distance
    ){
        distance = store.MinDistance;
        storeID = store.StoreID;
        console.log(store);
    };
};
// if nearbyStores.stores returns an empty array 
console.log(storeID);
if (storeID === 0) {
    throw ReferenceError('No Stores found');
}

const order = new Order(customer);
order.storeID = storeID;

order.addItem(pizza);
await order.validate();
await order.price();

const myCard = new Payment({
    amount: order.amountsBreakdown.customer,
    number: config.get('number'),
    expiration: config.get('expiration'),
    securityCode: config.get('securityCode'),
    postalCode: config.get('postalCode'),
    tipAmount: config.get('tipAmount')
});

order.payments.push(myCard);

try {
    await order.place()
    const tracking = new Tracking();
    const trackingResult = await tracking.byPhone(customer.phone);
    console.log('Order Tracking');
    console.dir(trackingResult, {depth: 3});
} catch(err) {
    console.trace(err);
    console.dir(
        order.placeResponse,
        {depth: 5}
    );
}
