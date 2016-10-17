exports.getWeatherData = function () {
    return {
        locations: [
            {
                name: 'Portland',
                forecastUrl: 'http://wunderground.com/US/OR/Portland.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
                weather: 'Сплошная облачность',
                temp: '54.1 F (12.3 C)'
            },
            {
                name: 'Bend',
                forecastUrl: 'http://wunderground.com/US/OR/Bend.html',
                iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
                weather: 'Малооблачно',
                temp: '54.1 F (12.3 C)' 
            }
        ]
    }
}