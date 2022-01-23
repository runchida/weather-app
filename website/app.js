/* Global Variables */
const url = window.location.pathname;

// API requests
// GET Request
const getProjectData = async (url) => {
    const rawProjectData = await fetch(url);
    try {
        const projectData = await rawProjectData.json();
        console.log('Project data loaded: ');
        console.log(projectData);
    }
    catch (error) {
        console.log('Error!: '+ error);
    }
}

// POST request
const dataToPost = {"data": "fromApp"};
const postProjectData = async (url, dataToPost) => {
    const postData = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToPost),
    })
}

console.log('Path: ' + url);
getProjectData(url);
postProjectData(url, dataToPost);