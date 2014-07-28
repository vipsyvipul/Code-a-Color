$(document).ready(function() {
    $('#calc-btn').click(function() {


        // Obtaining the length of inputted values
        var hexLen = $('#hex').val().length;
        var rgbLen = $('#rgb').val().length;
        var cmykLen = $('#cmyk').val().length;


        // Checking if the length is 0
        // Doing so confirms the target
        if (hexLen != 0) {
            hexToRGB($('#hex').val());

        } else if (rgbLen != 0) {
            rgbToHex($('#rgb').val());

        } else if (cmykLen != 0) {
            cmykToRGB($('#cmyk').val());

        } else {
            btnText('Too Quick!');
        }

    });

    // Function to convert Hex to RGB
    function hexToRGB(hexValue) {

        // Removing #
        var hexVal = hexValue.charAt(0) == '#' ? hexValue.substring(1, 7) : hexValue;

        // Checking if the inputted HEX value is a valid 6
        // digit string
        if (hexVal.match(/([A-Fa-f0-9]{6})/)) {

            // parseInt converts the HEX code to corressponding integer
            var red = parseInt((hexVal.substring(0, 2)), 16);
            var green = parseInt((hexVal.substring(2, 4)), 16);
            var blue = parseInt((hexVal.substring(4, 6)), 16);
            btnText('Hex all the way');

        } else
        // Checking if the inputted HEX value is a valid 3
        // digit string
        if (hexVal.match(/([A-Fa-f0-9]{3})/)) {

            // The following process produces a valid 6 digit HEX value
            var red = parseInt((hexVal.charAt(0) + hexVal.charAt(0)), 16);
            var green = parseInt((hexVal.charAt(1) + hexVal.charAt(1)), 16);
            var blue = parseInt((hexVal.charAt(2) + hexVal.charAt(2)), 16);
            btnText('Hex all the way');

        } else {

            btnText('Hexadecimal dude!!');
        }

        // Printing the obtained RGB value in the input box
        $('#rgb').val(red + ',' + green + ',' + blue);

        // The respective values of RGB will now be used to
        // obtain its CMYK equivalent
        rgbToCMYK(red, green, blue);

    }

    // Function to convert RGB to CMYK
    function rgbToCMYK(r, g, b) {

        var c, m, y, k, w;
        if (r == 0 && g == 0 && b == 0) {
            c = 0;
            m = 0;
            y = 0;
            k = 1;

        } else {
            var r1 = r / 255;
            var g1 = g / 255;
            var b1 = b / 255;

            w = Math.max(r1, Math.max(g1, b1));


            c = (w - r1) / w;
            m = (w - g1) / w;
            y = (w - b1) / w;
            k = 1 - w;


        }
        $('#cmyk').val(c.toFixed(3) + ',' + m.toFixed(3) + ',' + y.toFixed(3) + ',' + k.toFixed(3));
    }



    // Function to convert RGB to Hex
    function rgbToHex(rgbValue) {

        var rgb = rgbValue.split(',');
        var r = parseInt(rgb[0]);
        var g = parseInt(rgb[1]);
        var b = parseInt(rgb[2]);

        // Checking for valid numbers
        if (rgb[0] < 0 || rgb[1] < 0 || rgb[2] < 0) {
            btnText('Be positive');
        } else if (rgb[0] > 255 || rgb[1] > 255 || rgb[2] > 255) {
            btnText('Too far!')
        } else if (isNaN(rgb[0]) || isNaN(rgb[1]) || isNaN(rgb[2])) {
            btnText('Show me numbers');
        } else {
            rgbToCMYK(r, g, b);
            var hex1 = r.toString(16);
            var hex2 = g.toString(16);
            var hex3 = b.toString(16);
            $('#hex').val('#' + hex1 + hex2 + hex3);
            btnText('Primary colors eh?');
            return
        }
    }



    // Function to convert CMYK to RGB
    function cmykToRGB(cmykValue) {

        var cmyk = cmykValue.split(',');
        var c = parseFloat(cmyk[0]);
        var m = parseFloat(cmyk[1]);
        var y = parseFloat(cmyk[2]);
        var k = parseFloat(cmyk[3]);


        if (c >= 0 && c <= 1 && m >= 0 && m <= 1 && y >= 0 && y <= 1 && k >= 0 && k <= 1) {
            var r = parseInt(255 * (1 - c) * (1 - k));
            var g = parseInt(255 * (1 - m) * (1 - k));
            var b = parseInt(255 * (1 - y) * (1 - k));

            $('#rgb').val(r + ',' + g + ',' + b);
            rgbToHex(r + ',' + g + ',' + b);
            btnText('Mind the key');

        } else {
            btnText('Invalid Sir');
        }


    }

    // Easy copy
    $('input').click(function(event) {
        var selected = event.target.id;
        $(this).select();
    });

    // Just a fancy message button message
    function btnText(text) {
        $('#calc-btn').text(text);
    }

});
