/* Global Variables */
const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = 'b900d49b318c7241818540ea2e1f7bd5';

// API requests
// GET project data
const getProjectData = async (url) => {
    const rawProjectData = await fetch(url);
    try {
        console.log('Project data loaded: ');
        return await rawProjectData.json();
    }
    catch (error) {
        console.log('Error!: ' + error);
    }
}

// GET weather information
const getWeatherInfo = async (url) => {
    const weatherRes = await fetch(url);
    try {
        return await weatherRes.json();
    }
    catch(error) {
        console.log(error);
    }
}

// POST request
const postProjectData = async (url, dataToPost) => {
    const postData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost)
    })
}

// Interaction functionalities
const inputButton = document.getElementById('generate');
inputButton.addEventListener('click', onClick);

// send input
function onClick(event) {
    event.preventDefault()
    console.log('Log: Generate button clicked');
    const zip = document.getElementById('zip').value;
    const feeling = document.getElementById('feelings').value;
    if(zip != '' && feeling != ''){
        processResult(zip, feeling);
    }
    else {
        document.getElementById('temp').innerHTML = 'Please talk to us :)';
    }
}

// Get weather information from openweathermap.org and send to server
function processResult(zip, feeling) {
    const urlWeatherZip = `${urlWeather}zip=${zip}&appid=${apiKey}`;
    console.log(urlWeatherZip);
    getWeatherInfo(urlWeatherZip)
    .then((weatherData) => {
        console.log(weatherData);
        Object.assign(weatherData, {feel: feeling});
        postProjectData('post', weatherData);
    })
    .then(showResult);
}

// Get data from server and update UI
async function showResult() {
    const entryHolder = document.getElementById('temp');
    // get project data
    const projectRes = await fetch('get');
    try {
        const projectData = await projectRes.json();
        document.getElementById('temp').innerHTML = `It is ${Math.round((projectData.main.temp - 273))} Degrees Celsius`;
        document.getElementById('content').innerHTML = `And you feel ${projectData.feel}`;
        document.getElementById('date').innerHTML = `It is ${getTime(projectData.dt)}, so the time to be happy :D`;
    }
    catch(error) {
        console.log(error);
    }
}

// convert timestamp to Time
function getTime(timestamp) {
    const date = new Date(timestamp*1000);
    return date;
}