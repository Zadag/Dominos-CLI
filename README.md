# Dominos-CLI

A CLI program to order Dominos from your nearest store.  Currently only works for orders to US addresses. 

## MAC/Linux setup

Open up terminal and find a suitable location to clone this repository 

`git clone git@github.com:Zadag/Dominos-CLI.git`

Navigate to the root directory and create a new config folder.

```
cd Dominos-CLI/
mkdir config
```

Inside of that config folder, create a file called default.json

```
cd config/
touch default.json
```

Open default.json, paste the following block of code and enter your credentials

```
{
    "address": "",
    "firstName": "",
    "lastName": "",
    "phone": "",
    "email": "",
    "number": "",
    "expiration": "",
    "securityCode": "",
    "postalCode": "",
    "tipAmount": 5
}
```

Navigate back to the root directory 

```
cd ..
```

in terminal type the following to order pizza!

`dominos`

