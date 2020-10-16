class ColourHelper {
    
    /**
     * JavaScript implementation of the point-gradient formula, calculating "y" given "x" and two points (x1, y1) and (x2, y2).
     * 
     * @param {number} xn
     * @param {number} x1 
     * @param {number} x2 
     * @param {number} y1 
     * @param {number} y2 
     */
	static interpolate(xn, x1, x2, y1, y2) {
        var gradient = (y2 - y1)/(x2 - x1);
        
        // point-gradient formula: yn - y1 = gradient*(x - x1)
        // .'. yn = y1 + gradient*(xn - x1)
        
        return y1 + gradient*(xn - x1);
    }

    /**
     * Given a value, find its percentile in the range [min..max].
     * @param {number} min 
     * @param {number} max 
     * @param {number} someValue Number between `min` and `max`.
     */
    static valueToPercentile(min, max, someValue) {
        return this.interpolate(someValue, min, max, 0, 1);
    }

    /**
     * Give a percentile for the range [min..max], deduce the equivalent value in the range [min..max].
     * 
     * @param {number} min 
     * @param {number} max 
     * @param {number} somePercentile Number in range [0..1]
     */
    static percentileToValue(min, max, somePercentile) {
        return min + somePercentile*(max - min);
    }
    
    /**
     * Return colour on a gradient given starting colour (`minRGB`), ending colour (`maxRGB`) and position.
     * 
     * @param {Object} minRGB 
     * @param {Object} maxRGB 
     * @param {number} position Number in range [0..1]
     */
    static twoPointColourGradient(minRGB, maxRGB, position) {
        // we use floor function because we must avoid exceeding 255
        var calculatedRed = Math.floor(this.percentileToValue(minRGB.red, maxRGB.red, position));
        var calculatedGreen = Math.floor(this.percentileToValue(minRGB.green, maxRGB.green, position));
        var calculatedBlue = Math.floor(this.percentileToValue(minRGB.blue, maxRGB.blue, position));

        return {
            "red": calculatedRed
            , "green": calculatedGreen
            , "blue": calculatedBlue
        };
    }

    /**
     * Return colour on a gradient given starting colour (`minRGB`), middle colour (`midRGB`), ending colour (`maxRGB`) and position.
     * 
     * @param {Object} minRGB 
     * @param {Object} midRGB 
     * @param {Object} maxRGB 
     * @param {number} position Number in range [0..1]
     */
    static threePointColourGradient(minRGB, midRGB, maxRGB, position) {
        if (position == 0) {
            return minRGB;
        } else if (position == 0.5) {
            return midRGB;
        } else if (position == 1) {
            return maxRGB;
        } else if (position < 0.5) {
            return this.twoPointColourGradient(minRGB, midRGB, this.valueToPercentile(0, 0.5, position));
        } else {
            return this.twoPointColourGradient(midRGB, maxRGB, this.valueToPercentile(0.5, 1, position));
        }
    }

    /**
     * Given a dictionary with keys `red`, `green` and `blue`, generate the HTML string.
     * 
     * @param {Object} rgbDictionary 
     */
    static rgbDictionaryToHTMLString(rgbDictionary) {
        var preparedReturn = "rgb(" + rgbDictionary.red + ", " + rgbDictionary.green + ", " + rgbDictionary.blue + ")";
        return preparedReturn;
    }

    /**
     *  Return HTML string for colour on a gradient given starting colour (`minRGB`), ending colour (`maxRGB`) and position.
     * 
     * @param {Object} minRGB 
     * @param {Object} maxRGB 
     * @param {number} position Number in range [0..1]
     */
    static colourGradientHTMLString2(minRGB, maxRGB, position) {
        var cg = this.twoPointColourGradient(minRGB, maxRGB, position);
        return this.rgbDictionaryToHTMLString(cg);
    }

    /**
     *  Return HTML string for colour on a gradient given starting colour (`minRGB`), middle colour (`midRGB`), ending colour (`maxRGB`) and position.
     * 
     * @param {Object} minRGB 
     * @param {Object} maxRGB 
     * @param {number} position Number in range [0..1]
     */
    static colourGradientHTMLString3(minRGB, midRGB, maxRGB, position) {
        var cg = this.threePointColourGradient(minRGB, midRGB, maxRGB, position);
        return this.rgbDictionaryToHTMLString(cg);
    }
}