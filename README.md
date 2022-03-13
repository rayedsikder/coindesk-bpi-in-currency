# API: Bitcoin Price Index by Currency

An API to retrieve the current and the maximum, minimum of BPI according to fiat currencies (USD, EUR, GBP).

The API will respond with the following information upon passing parameters via GET:

- The current Bitcoin rate, in the requested currency 
- The lowest Bitcoin rate in the last 30 days, in the requested currency  
- The highest Bitcoin rate in the last 30 days, in the requested currency

# Install & Run
StackEdit stores your files in your browser, which means all your files are automatically saved locally and are accessible **offline!**

## Dependencies
- Node 14.0+
- yarn or npm

## Installation
    $ yarn install

## Run

To run on dev mode run: `yarn dev` The app can be opened in [localhost 5000](http://localhost:5000/).
