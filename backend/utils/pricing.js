const { Pricings } = require('../models/servicesModel');

exports.getSpiralBindingPrice = async (req) => {
    try {
        let articlePrice = 0;
        const operatorID = "OPRADMN79939";
        const printColor = req.body.printColor;
        const printSides = req.body.printSides;
        const paperDim = 'A4';
        const paperGSM = req.body.paperGSM || '70GSM';

        const colorPagesNos = req.body.colorPagesNos;
        const noOfCopies = req.body.noOfCopies;
        const noOfPages = req.body.noOfPages;

        // Fetch the price data from the database
        const price = await Pricings.findOne({ operatorID });
        if (!price) {
            throw new Error('Pricing data not found for the given operatorID');
        }

        // console.log('Pricing Object:', price);
        // console.log('Print Color:', printColor);
        // console.log('Print Sides:', printSides);
        // console.log('Paper Dimension:', paperDim);
        // console.log('Paper GSM:', paperGSM);
        // console.log('BW Pricing:', price?.BW);
        // console.log('Color Pricing:', price?.Color);
        // console.log('Accessing Price:', price?.[printColor]?.[printSides]?.[paperDim]?.[paperGSM]);

        // Mixed color case
        if (printColor === 'BWandColorMix') {
            const colorPages = colorPagesNos.length;
            const bwPages = noOfPages - colorPages;

            const colorPagesPrice = price.Color.get(printSides).get(paperDim)[paperGSM];
            const bwPagesPrice = price.BW.get(printSides).get(paperDim)[paperGSM];

            if (!colorPagesPrice || !bwPagesPrice) {
                throw new Error('Pricing details not available for the specified parameters');
            }

            if (printSides === 'singleSide') {
                articlePrice = (colorPages * colorPagesPrice + bwPages * bwPagesPrice);
            } else if (printSides === 'bothSides') {
                const totalPages = Math.ceil(noOfPages / 2);  // Calculate as if double-sided
                articlePrice = ((colorPages / 2) * colorPagesPrice + (bwPages / 2) * bwPagesPrice);
            }
            articlePrice = articlePrice + price.spiralBindingPrice;
            return  articlePrice * noOfCopies;
        }

        // Non-mixed case (all color or all black and white)
        const pagePrice = price.get(printColor).get(printSides).get(paperDim)[paperGSM];
        if (!pagePrice) {
            throw new Error('Pricing details not available for the specified parameters');
        }

        if (printSides === 'singleSide') {
            articlePrice = pagePrice * noOfPages;
        } else if (printSides === 'bothSides') {
            const totalPages = Math.ceil(noOfPages / 2);
            articlePrice = pagePrice * totalPages;
        }

        articlePrice = articlePrice + price.spiralBindingPrice;
        return  articlePrice * noOfCopies;
    } catch (err) {
        console.error('Error fetching price:', err);
        throw new Error('Failed to calculate the price');
    }
};
